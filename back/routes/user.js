const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordCheck = require("../middleware/password-config");

//Routes pour la connexion et l'inscription des utilisateurs

router.post('/signup', passwordCheck, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;