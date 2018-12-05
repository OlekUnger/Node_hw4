const Router = require('koa-router');
const router = new Router();
const koaBody = require("koa-body");
const controller = require('../controllers/admin');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');


router
    .get('/admin', auth, controller.admin)
    .post('/admin/skills', koaBody(), controller.setSkills)
    .post('/admin/upload', upload, controller.setProduct)

module.exports = router;