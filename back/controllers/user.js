const bcrypt = require("bcrypt")
const User = require("../models/user");
const Role = require("../models/role");
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
   
        .then(hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
            console.log(user)
            user.save((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                if (req.body.roles) {
                  Role.find(
                    {
                      name: { $in: req.body.roles }
                    },
                    (err, roles) => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }
                      user.roles = roles.map(role => role._id);
                      user.save(err => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }
                        res.send({ message: "User was registered successfully!" });
                      });
                    }
                  );
                } else {
                  Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    user.roles = [role._id];
                    user.save(err => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }
                      res.send({ message: "User was registered successfully!" });
                    });
                  });
                }
              });
        })

            /*user.save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé !' })
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
        })
        .catch(error => res.status(500).json({ error: error }));*/
};

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
    
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                       )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}