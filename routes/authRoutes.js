const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
router.get('/signup', (req, res) => res.sendFile(path.join(__dirname, '../views/signup.html')));
router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);

module.exports = router;
