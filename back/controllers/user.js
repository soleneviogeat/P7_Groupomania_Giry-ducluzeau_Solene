const bcrypt = require("bcrypt")
const User = require("../models/user");
const Role = require("../models/role");
const jwt = require('jsonwebtoken');
const Post = require("../models/post");
const Com = require('../models/com');
const fs = require('fs');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
   
        .then(hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
        
            user.save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé !' })
                })
                .catch(error => {
                    res.status(400).json({ error })
                });
        })
        .catch(error => res.status(500).json({ error: error }));
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

exports.changeUserAdminRole = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      user.isAdmin = !user.isAdmin;
      user.save()
        .then(() => {
            res.status(200).json({ message: 'Role admin: ' + user.isAdmin })
        })
    })
    .catch(error => res.status(404).json({ error }));
}

exports.deleteUser = ((req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then(user => 
    User.deleteOne({_id: req.params.id})
    .then(() => {
      deleteAllPostOfUser(req.params.id);
      deleteAllComOfoUser(req.params.id);
      deleteLikesAndDislikesOfUser(req.params.id);
      res.status(200).json({message: 'Utilisateur supprimé !'})
    })
    .catch(error => res.status(401).json({ error })))
  .catch(error => res.status(404).json({ error }))
})

function deleteAllPostOfUser(userId) {
  Post.find({userId})
  .then((postsUser) => {
    postsUser.forEach(post => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({_id: post._id});
        });
      } else {
        Post.deleteOne({_id: post._id});
      }
    });
  });
}

function deleteAllComOfoUser(userId) {
  Com.find({userId})
    .then((comsUser) => {
      comsUser.forEach(com => {
        if (com.imageUrl) {
          const filename = com.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Com.deleteOne({_id: com._id});
          });
        } else {
          Com.deleteOne({_id: com._id});
        }
      });
    })
}

function deleteLikesAndDislikesOfUser(userId) {
  Post.find()
  .then((posts) => {
    posts.forEach(post => {
      if (post.usersLiked.includes(userId)) {
        post.usersLiked.splice(post.usersLiked.findIndex(e=> e===userId));
        post.likes = post.likes - 1;
      }
      if (post.usersDisliked.includes(userId)) {
        post.usersDisliked.splice(post.usersDisliked.findIndex(e=> e===userId));
        post.dislikes = post.dislikes - 1;
      }
    });
  });
}