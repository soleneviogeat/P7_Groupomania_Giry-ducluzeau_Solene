const express = require('express');
const router = express.Router();
const auth = require("../middleware/jsonwebtoken-config");
const multer = require("../middleware/multer-config")
const comController = require("../controllers/com");

//Routes pour les évènements liés à la gestion des coms
router.post('/upload', multer, (req, res) => {
    res.json({ file: req.file })
})

router.get("/", auth, comController.getAllComs);
router.get("/:postId", auth, comController.getAllComsOfOnePost);
router.post("/", auth, multer, comController.createCom)
router.get('/:id',auth, comController.getOneCom);
router.put('/:id', auth, multer, comController.modifyCom);
router.delete('/:id', auth, comController.deleteCom);
router.post("/:id/like", auth, comController.likeCom);

module.exports = router;
