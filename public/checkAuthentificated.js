function checkAuthentificated(req, res, next){ 
    if(req.isAuthenticated()){   
        return next()
    }
    res.redirect(302,'/login')
}

function checkNotAuthentificated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect(302,'/')
        return;
    }
    return next()
}
// nu am stiut unde sa pun modulele facute de mine asa ca am pus aici

module.exports.checkAuthentificated = checkAuthentificated
module.exports.checkNotAuthentificated = checkNotAuthentificated