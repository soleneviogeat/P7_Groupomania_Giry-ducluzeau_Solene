const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordCheck = require("../middleware/password-config");
const auth = require("../middleware/jsonwebtoken-config");
const verifySignUp = require("../middleware/verifySignUp")

//Routes pour la connexion et l'inscription des utilisateurs

router.post('/services', passwordCheck, userCtrl.services);
router.post('/presentation', userCtrl.presentation);
router.post('/pictures', userCtrl.pictures);
router.post('/contact', userCtrl.contact);
router.get('/users', userCtrl.getAllUsers);
router.get('/users/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/changeAdminRole/:id', auth, userCtrl.changeUserAdminRole);

module.exports = router;