const express = require('express');
const router = express.Router();
const auth = require("../middleware/jsonwebtoken-config");
const multer = require("../middleware/multer-config")
const postController = require("../controllers/post");

//Routes pour les évènements liés à la gestion des posts
router.post('/upload', multer, (req, res) => {
    res.json({ file: req.file })
})

router.get("/", auth, postController.getAllPosts);
router.post("/", auth, multer, postController.createPost)
router.get('/:id',auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);
router.post("/:id/like", auth, postController.likePost);

module.exports = router;