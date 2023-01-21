const router = require('express').Router()

const {getLoginPage, postLogin} = require('../controller/home.controller')

/* GET home page. */
router.get('/', getLoginPage);
router.post('/login', postLogin);

module.exports = router;