const db= require('../models/db');
const fs = require('fs');
const path = require('path');

module.exports.admin = async(ctx)=>{
    let skills = db.getState().skills || [],
        msgfile = await ctx.flash.get() ? ctx.flash.get().msgfile : null,
        msgskill = await ctx.flash.get() ? ctx.flash.get().msgskill : null;

    ctx.render('admin', {
        skills,
        msgfile,
        msgskill
    });
};

module.exports.setSkills = async (ctx) => {
    try {
        await db.set('skills', ctx.request.body).write();
        await ctx.flash.set({msgskill: 'Изменено'});
        ctx.status = 201;
        ctx.redirect('/admin');
    } catch(err) {
        ctx.flash.set({msgskill: err.message})
        ctx.redirect('/admin');
    }
};

module.exports.setProduct = async (ctx)=>{
    try {
        let uploadDir = path.join(process.cwd(), '/public', 'assets', 'img', 'products'),
            fileName = ctx.request.files.photo.name;

        fs.renameSync(ctx.request.files.photo.path, path.join(uploadDir, fileName));

        let product = {
            src: fileName ? `./assets/img/products/${fileName}` : '',
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };

        await db.get('products').push(product).write();
        ctx.flash.set({msgfile: 'Загружено'});
        ctx.status = 201
        ctx.redirect('/admin');

    } catch (err) {
        ctx.flash.set({msgfile: err.message})
        ctx.redirect('/admin');
    }
}