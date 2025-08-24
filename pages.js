const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home', { title: 'Mahadev91Club' }));
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));
router.get('/game', (req, res) => res.render('game', { title: 'Color Game' }));

module.exports = router;
