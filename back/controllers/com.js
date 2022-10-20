const Com = require('../models/com');
const User = require('../models/user')
const fs = require('fs');

//Logique métier pour créer un nouveau com

exports.createCom = (req, res, next) => {
    
    const comObject = req.body;
    delete comObject._id;
    delete comObject.userId;

    const com = new Com({
        ...comObject,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likes: 0,
        dislikes: 0,
        usersDisliked: [],
        usersLiked: [],
        userId: req.auth.userId,
    });

    if (req.file) {
        com.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  
    com.save()
    .then(() => { 
        res.status(201).json({message: 'Commentaire enregistré !'})
    })
    .catch(error => { 
        res.status(400).json( { error })
    })
}

//Logique métier pour modifier un com

exports.modifyCom = (req, res, next) => {
    const comObject = req.file ? {
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete comObject._userId;
    Com.findOne({_id: req.params.id})

        .then((com) => {
            User.findById(req.auth.userId)
                .then((user) => {
                    if (!user.isAdmin && com.userId != req.auth.userId) {
                        res.status(403).json({ message : 'Unauthorized request'});
                    } else {
        
                        //Gestion de l'image lors de la modification d'un com
                        if (req.file) {
                            const filename = com.imageUrl.split('/images/')[1];
                            if (fs.existsSync(`images/${filename}`)) {
                                fs.unlinkSync(`images/${filename}`);
                            } 
                        }
        
                        Com.updateOne({ _id: req.params.id}, { ...comObject, _id: req.params.id})
                        .then(() => res.status(200).json({message : 'Objet modifié!'}))
                        .catch(error => res.status(401).json({ error }));
                    }
                });
        })
            
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Logique métier pour supprimer un com

exports.deleteCom = (req, res, next) => {
Com.findOne({ _id: req.params.id})
    .then(com => {
        User.findById(req.auth.userId)
            .then((user) => {
                if (!user.isAdmin && com.userId != req.auth.userId) {
                    res.status(403).json({message: 'Unauthorized request'});
                } else {
                    if(com.imageUrl) {
                    const filename = com.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Com.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                            .catch(error => res.status(401).json({ error }));
                    });
                    } else {
                        Com.deleteOne({_id: req.params.id})
                            .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                            .catch(error => res.status(401).json({ error }));
                    }
                }
            });
    })

    .catch( error => {
        res.status(500).json({ error });
    });
};

//Logique métier pour récupérer tous les coms

exports.getAllComs = (req, res, next) => {
Com.find()
    .then(coms => res.status(200).json(coms))
    .catch(error => res.status(400).json({ error }));
}

//Logique métier pour récupérer tous les coms d'un post

exports.getAllComsOfOnePost = (req, res, next) => {
Com.find({postId: req.params.postId})
    .then(coms => res.status(200).json(coms))
    .catch(error => res.status(400).json({ error }));
}

//Logique métier pour récupérer un seul com

exports.getOneCom = (req, res, next) => {
Com.findOne({ _id: req.params.id })
    .then(com => res.status(200).json(com))
    .catch(error => res.status(404).json({ error }));
}


//Logique métier pour la gestion des likes et dislikes

exports.likeCom = (req, res, next) => {
    const comId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    
    Com.findById(comId)
    .then((com) => {
        const likeIsInArray = (element) => element === userId;
        const indexLike = com.usersLiked.findIndex(likeIsInArray)
        const indexDislike = com.usersDisliked.findIndex(likeIsInArray)

        if (like === 1) {
            if (indexLike === -1) {
                com.usersLiked.push(userId)
                com.likes = com.usersLiked.length
            } else {
                res.status(403).json({message: 'Unauthorized request'}) 
            }
        }

        if (like === -1) {
            if (indexDislike === -1) {
                com.usersDisliked.push(userId)
                com.dislikes = com.usersDisliked.length
            } else {
                res.status(403).json({message: 'Unauthorized request'}) 
            }
        }

        if (like === 0) {
            if (indexLike === -1) {
                com.usersDisliked.splice(indexDislike, 1)
                com.dislikes = com.usersDisliked.length
            }
            else {
                com.usersLiked.splice(indexLike, 1)
                com.likes = com.usersLiked.length
            }
        }

        com.save()
        .then((com) => res.status(200).json({ message: "Com liké / disliké" }))
        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => {
        res.status(400).json({ error });
    });
}