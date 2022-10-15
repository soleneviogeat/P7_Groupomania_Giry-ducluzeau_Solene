const Post = require("../models/post");
const fs = require('fs');

//Logique métier pour créer un nouveau post

exports.createPost = (req, res, next) => {    
    const postObject = req.body;
    delete postObject._id;
    delete postObject.userId;

    const post = new Post({
        ...postObject,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likes: 0,
        dislikes: 0,
        usersDisliked: [],
        usersLiked: [],
        userId: req.auth.userId,
    });

    if (req.file) {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    post.save()
    .then(() => { console.log(postObject);
        res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { 
        res.status(400).json( { error })
    })
}

//Logique métier pour modifier un post

exports.modifyPost = (req, res, next) => {
    
    const postObject = req.file ? {
        /*...JSON.parse(req.body.text),*/
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    
    delete postObject._userId;
    Post.findOne({_id: req.params.id})

        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(403).json({ message : 'Unauthorized request'});
            } else {

                //Gestion de l'image lors de la modification d'un post
                if (req.file) {
                    const filename = post.imageUrl.split('/images/')[1];
                    if (fs.existsSync(`images/${filename}`)) {
                        fs.unlinkSync(`images/${filename}`);
                    } 
                }

                Post.updateOne({ _id: req.params.id}, {
                     ...postObject,
                     updatedAt: Date.now(),
                     _id: req.params.id
                    })
                .then( res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Logique métier pour supprimer un post

exports.deletePost = (req, res, next) => {
Post.findOne({ _id: req.params.id})
    .then(post => {
        if (post.userId != req.auth.userId) {
            res.status(403).json({message: 'Unauthorized request'});
        } else {
            if (post.imageUrl) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            } else {
                Post.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }));
            }
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

//Logique métier pour récupérer tous les posts

exports.getAllPosts = (req, res, next) => {
Post.find()
    .sort('-_id')
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

//Logique métier pour récupérer un seul post

exports.getOnePost = (req, res, next) => {
Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}


//Logique métier pour la gestion des likes et dislikes

exports.likePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    
    Post.findById(postId)
    .then((post) => {
        const likeIsInArray = (element) => element === userId;
        const indexLike = post.usersLiked.findIndex(likeIsInArray)
        const indexDislike = post.usersDisliked.findIndex(likeIsInArray)

        if (like === 1) {
            if (indexLike === -1) {
                post.usersLiked.push(userId)
                post.likes = post.usersLiked.length
            } else {
                res.status(403).json({message: 'Unauthorized request'}) 
            }
        }

        if (like === -1) {
            if (indexDislike === -1) {
                post.usersDisliked.push(userId)
                post.dislikes = post.usersDisliked.length
            } else {
                res.status(403).json({message: 'Unauthorized request'}) 
            }
        }

        if (like === 0) {
            if (indexLike === -1) {
                //ici le probleme, indexDislike n'est pas l'index du user mais le code envoyé par le front (1, 0 ou -1)
                post.usersDisliked.splice(indexDislike, 1)
                post.dislikes = post.usersDisliked.length
            }
            else {
                //ici aussi le probleme
                post.usersLiked.splice(indexLike, 1)
                post.likes = post.usersLiked.length
            }
        }
        post.save()
        .then((post) => res.status(200).json({ message: "Post liké / disliké" }))
        .catch((error) => res.status(500).json({ error }));
    })
    
    .catch((error) => {
        res.status(400).json({ error });
    });
}