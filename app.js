const path = require('path');
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views/pages',
    basedir: './views/pages',
    pretty: true,
    noCache: true,
    app: app
});
const koaBody = require('koa-body');
const session = require('koa-session');
const flash = require('koa-flash-simple');
const errorHandler = require('./middleware/errors');

const homeRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');

app.use(static(path.join(__dirname, './public')));
app.use(session({
    key: 'koa:sess',
    maxAge: 'session',
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false
}, app));
app.use(flash());

app.use(homeRoutes.routes())
    .use(adminRoutes.routes())
    .use(loginRoutes.routes());

app.use(errorHandler);
app.on('error', (err,ctx)=>{
    ctx.render('error',{
        status: ctx.response.status,
        error: ctx.response.message
    })
})

module.exports = app;