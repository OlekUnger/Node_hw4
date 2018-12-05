module.exports = ((ctx, next)=>{
    if (ctx.session.isAdmin) {
        next();
    } else {
        ctx.redirect("/login");
    }

});