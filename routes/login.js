const Router = require('koa-router');
const router = new Router();
const koaBody = require("koa-body");
const controller = require('../controllers/login');

router
    .get('/login',  controller.login)
    .post('/login', koaBody(), controller.signIn)

module.exports = router;