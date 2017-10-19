# node-mysql-express-template-v1 

[![Maintainability](https://api.codeclimate.com/v1/badges/f95fe5b7ba693e383e80/maintainability)](https://codeclimate.com/github/nihitx/node-mysql-express-template-v1/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f95fe5b7ba693e383e80/test_coverage)](https://codeclimate.com/github/nihitx/node-mysql-express-template-v1/test_coverage) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/20ed27a00bca48f08ae0d557d7e85367)](https://www.codacy.com/app/nihitx/node-mysql-express-template-v1?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nihitx/node-mysql-express-template-v1&amp;utm_campaign=Badge_Grade)

Node mysql express template version 1 is a easy to use template, for any start-ups to download and get started with. It can be pushed to a cloud service in a matter of seconds.

## Getting started!
> Prequisites!

You need to have a computer running the following:
  - [NODE.JS](https://nodejs.org/en/)
  - [MYSQL](https://www.mysql.com/)

> Step 1

1) Git clone the repo to your computer
2) Run the following command `npm install`
3) Go to the db.js file in the root and configure the database settings
4) Copy the sql create statement from `database_create.sql` and run it inside the mysql terminal or phpmyadmin or mysqlworkbench, to create the users table.
5) Run the following command `node index.js`

Thanks it! You have a running platform!

### Tech
The repo is using the following tech, I will break them down one by one for ease of use.

* [Node JS] - The server.
* [Express JS] - The framework that fits over Node.js.
* [MYSQL] - The database that is used with this template.
* [Json web token] - A token auth system to show how to use auth if you want to connect front and backend.
* [Bcrypt] - A framework that encrypts password and can be used to encrypt other things too.


### Break down
> `index.js`

The code below takes care of calling all the database functions to you index.js file.
```sh
const {saveUser,findUser, UpdateToken} = require('./models/user');
```
Authenticate is the middle that is being used to authenticate the front-end or user
Via the token, so all the functions you would want to restrict can be done with the below method.
```sh
const {authenticate} = require('./middleware/authenticate');
```
There are three functions in the index.js file for the app.
A `POST` request , `GET` request, and an authentication function to show how authentication middle ware is used.
The function below just renders the index.html file from the public folder in the root directory and shows it to the screen when you type
localhost:3000
```sh
app.get('/', function(req, res, next) {
   res.render('index');
});
```
The function below `/createUser`, creates a new user and stores it in the db.
The function calls `saveUser` from the `models` and then saves the user, and returns the token and the email back to the user. You can notice that `Promises` are being used.
If the function fails to register it returns a 400 error to the user.
If you want to learn more click: [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
```sh
/* The function below
app.post('/createUser',(req,res,next)=>{
    saveUser(req.body).then((result)=>{
        return res.header('x-auth', result.token).send({email : result.email});
    }).catch((e)=>{
        return res.status(400).send(e);
    });
});
```
The function below shows how the `authenticate` middle wear can be used to identify the user and allow the user to access certain functions that you want to protect.
For example here I am just using the word authenticate to block the `/get/me` from being used without any token and just simply passing the users information back.
```sh
app.get('/get/me',authenticate,(req,res,next)=>{
    res.send(req.user);
});
```
> `middleware/authenticate.js`

First we get the `getUserByToken` function from the model and pass in the token that we get back to the model, the model searches for the same token and then passes the user information back and calls `next()` to let node know that the user is validated so the user can access the function.
```sh
const {getUserByToken} = require('../models/user');
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
```

> `models/user.js`

The model has all sql functionality. It returns a `Promise` in all of the calls.
But for example lets take the function that creates a new user.
1) It uses bcrypt to encrypt the users password
2) It juses json webtoken to encrypt the users information and provide it back as token
3) It inserts to the user table
4) returns back the users table that just got inserted.

```sh
saveUser = (userinfo) => new Promise((resolve,reject)=>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(userinfo.password, salt);

    userinfo.password = hash;
    userinfo.token = jwt.sign({Owner : userinfo.Owner},'secretkey');

    db.query('INSERT INTO user SET ?',userinfo,function(error,results,fields){
        if(error){
            reject();
        }else{
            resolve(userinfo);
        }
    })
});
```
### Cloud
To get it to the cloud either click the button below to deploy to heroku
or just manually change the database to get a db in the cloud and push it to the server of your choice ( heroku, aws, digital ocean)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nihitx/node-mysql-express-template-v1/tree/master)

> Important , after deploying to Heroku, if you see error, it might be because you don't have a database in heroku, so just go to heroku add:on and get CLEARDB database for free and use the host, user name, password from there and change `db.js` to connect there.


### Final

To know more about how to setup a perfect architecture. Read the article below.
[The perfect architecture](https://medium.com/@AuroraXFi/the-perfect-technical-architecture-for-an-i-t-startup-97bec70f3c9e)
That's about!

### Author

 - Masnad

License
MIT

**Free Software, Hell Yeah!**
