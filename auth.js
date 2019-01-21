module.exports = {
    aauth:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/admin');
        }

    }
}