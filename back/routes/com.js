const express = require('express');
const router = express.Router();
const auth = require("../middleware/jsonwebtoken-config");
const multer = require("../middleware/multer-config")
const comController = require("../controllers/com");

//Routes pour les évènements liés à la gestion des coms

router.get("/", auth, comController.getAllComs);
router.get("/:postId", auth, comController.getAllComsOfOnePost);
router.post("/", auth, multer, comController.createCom)
//router.get('/:id',auth, comController.getOneCom);
router.put('/:id', auth, multer, comController.modifyCom);
router.delete('/:id', auth, comController.deleteCom);
router.post("/:id/like", auth, comController.likeCom);

module.exports = router;

/**
 * router.get("/postId/", auth, comController.getAllComs);
router.post("/postId/", auth, multer, comController.createCom)
//router.get('/:id',auth, comController.getOneCom);
router.put('/postId:id', auth, multer, comController.modifyCom);
router.delete('/postId:id', auth, comController.deleteCom);
router.post("/postId:id/like", auth, comController.likeCom);
 */