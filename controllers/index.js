const db= require('../models/db');

module.exports.index = async(ctx)=>{
    let skills = await db.getState().skills || {},
        products = await db.getState().products || [];
        msgsemail = await ctx.flash.get() ? ctx.flash.get().msgsemail : null;

    ctx.render('index', {
        products,
        skills,
        msgsemail
    });
};

module.exports.sendMail = async(ctx)=>{
    await db.get('letters').push(ctx.request.body).write();
    await ctx.flash.set({msgsemail:'Письмо отправлено'});
    ctx.status = 201;
    ctx.redirect('/');
};