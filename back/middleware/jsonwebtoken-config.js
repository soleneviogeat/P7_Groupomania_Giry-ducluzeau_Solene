const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Role = require("../models/role")

/*jwt.use((req, res, next) => {
    res.setHeader('x-access-token: [header].[payload].[signature]');
});*/

module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
   /*verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };*/

   isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };
};



/**const createTokenProvider = () => {

    //variable pour stocker les jetons et restaurer les données depuis le stockage local
    let _token: { accessToken: string, refreshToken: string } = 
    JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;

    const getExpirationDate = (jwtToken?: string): number | null => {
        if (!jwtToken) {
            return null;
        }
    
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000 || null;
    };

    const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }
    
        return Date.now() > exp;
    };

    //renvoyer le jeton et le mettre à jour si nécessaire
    const getToken = async () => {
        if (!_token) {
            return null;
        }
    
        //vérifier si les jetons d'accès ont expiré ou non
        if (isExpired(getExpirationDate(_token.accessToken))) {
            //mise à jour du token
            const updatedToken = await fetch('/update-token', {
                method: 'POST',
                body: _token.refreshToken
            })
                .then(r => r.json());
    
            setToken(updatedToken);
        }
    
        return _token && _token.accessToken;
    };

    //la fonction renverra true si ce _tokens n'est pas null
    const isLoggedIn = () => {
        return !!_token;
    };

    //fonctionnalité de gestion des observateurs
    let observers: Array<(isLogged: boolean) => void> = [];

    //ajoutera un nouvel observateur au tableau
    const subscribe = (observer: (isLogged: boolean) => void) => {
        observers.push(observer);
    };
    
    //supprimera l'observateur de la liste
    const unsubscribe = (observer: (isLogged: boolean) => void) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    //sauvegarder les jetons dans le stockage local (ou de nettoyer le stockage local si le jeton est vide) et de notifier les observateurs des changements
    const setToken = (token: typeof _token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
        notify();
    };

  

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

createTokenProvider();*/