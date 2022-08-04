const Post = require("../models/post");
const fs = require('fs');

//Logique métier pour créer un nouveau post

exports.createPost = (req, res, next) => {
    
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject.userId;

    const post = new Post({
        ...postObject,
        likes: 0,
        dislikes: 0,
        usersDisliked: [],
        usersLiked: [],
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    post.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { 
        res.status(400).json( { error })
    })
}

//Logique métier pour modifier un post

exports.modifyPost = (req, res, next) => {
    
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete postObject._userId;
    Post.findOne({_id: req.params.id})

        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(403).json({ message : 'Unauthorized request'});
            } else {

                //Remplacement de l'image avant modification par la nouvelle image
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`);

                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
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
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
        console.log(req.params.id);
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};

//Logique métier pour récupérer tous les posts

exports.getAllPosts = (req, res, next) => {
Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

/*Logique métier pour récupérer un seul post

exports.getOnePost = (req, res, next) => {
Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}
*/

//Logique métier pour la gestion des likes et dislikes

exports.likePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    
    Post.findById(postId)
    .then((post) => {
        
        if (like === 0) {
        const likeIsInArray = (element) => element === userId;
        const indexLike = post.usersLiked.findIndex(likeIsInArray)
        const indexDislike = post.usersDisliked.findIndex(likeIsInArray)

            if (indexLike === -1) {
                post.usersDisliked.splice(indexDislike)
                post.dislikes = post.dislikes + 1
            }
            else {
                post.usersLiked.splice(indexLike)
                post.likes = post.likes - 1
            }
        }

        if (like === 1) {
            post.usersLiked.push(userId)
            post.likes = post.likes + 1
        }

        if (like === -1) {
            post.usersDisliked.push(userId)
            post.dislikes = post.dislikes + 1
        }

        post.save()
        .then((post) => res.status(200).json({ message: "Post likée" }))
        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => {
        res.status(400).json({ error });
    });
}