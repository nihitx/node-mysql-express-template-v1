var db = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

getAllUser = () => new Promise((resolve, reject) => {
    db.query('SELECT * from user', function (error, results, fields) {
        if (error){
            reject();
        }else{
            resolve(results[0]);
        }
    });
});

saveUser = (userinfo) => new Promise((resolve,reject)=>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(userinfo.password, salt);

    userinfo.password = hash;
    userinfo.token = jwt.sign({Owner : userinfo.Owner},'secretkeyyo');

    db.query('INSERT INTO user SET ?',userinfo,function(error,results,fields){
        if(error){
            reject();
        }else{
            resolve(userinfo);
        }
    })
});

getUserByToken = (token) => new Promise((resolve, reject) => {
    var decoded ;
    try{
        decoded = jwt.verify(token,'secretkeyyo');
        resolve(decoded);
    }catch(e){
        reject();
    }
});

// The code below export the above functios so it can be used in other files.
module.exports = {
    saveUser,
    getUserByToken
};
