const db = require('../models/db');

module.exports.login = async (ctx)=>{
    const msgslogin = ctx.flash.get() ? ctx.flash.get().msgslogin : null;

    ctx.render('login', {
        msgslogin
    });
}

module.exports.signIn = async(ctx)=>{
    try {
        const user = await db
            .get('users')
            .find({ email: ctx.request.body.email})
            .value();
        if(user){
            if(user.password === ctx.request.body.password){
                ctx.session.isAdmin = true;
                ctx.status = 200;
                ctx.redirect('/admin');
            } else {
                ctx.flash.set({msgslogin: 'Пароли не совпадают'});
                ctx.status = 401;
                ctx.redirect('/login');
            }
        } else {
            ctx.flash.set({msgslogin: 'Пользователь не найден'});
            ctx.status = 404;
            ctx.redirect('/login');
        }

    }
    catch (err) {
        ctx.flash.set({msgslogin: err.message})
        ctx.redirect('/login');
    }
}