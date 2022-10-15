const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordCheck = require("../middleware/password-config");
const auth = require("../middleware/jsonwebtoken-config");
const verifySignUp = require("../middleware/verifySignUp")

//Routes pour la connexion et l'inscription des utilisateurs

router.post('/signup', passwordCheck, /*verifySignUp.checkDuplicateUsernameOrEmail,
verifySignUp.checkRolesExisted,*/ userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/users/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;