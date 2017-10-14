const {getUserByToken} = require('../models/user');

// First we call the model using the above code.
// We pass in the token from the request header and see if we can get the
// User or not, if not then we return a 401 and if it works we pass next()
var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');
    getUserByToken(token).then((result)=>{
        req.user = result;
        req.token = token;
        next();
    }).catch((e)=>{
        return res.status(401).send();
    });
}

module.exports = {authenticate}
