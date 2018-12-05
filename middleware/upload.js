const koaBody = require("koa-body");

module.exports = koaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/assets/img/products'
    }
})