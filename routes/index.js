const Router = require('koa-router');
const router = new Router();
const koaBody = require("koa-body");
const controller = require('../controllers/index');

router.get('/', controller.index)
    .post('/', koaBody(), controller.sendMail);

module.exports = router;