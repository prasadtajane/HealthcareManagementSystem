/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var users = [];

app.post("/api/user", getUsers);
// app.get("/api/user/:userId",findUserById);
app.get("/api/user/:userId",findUserById);
app.get("/api/user/:userId/populateappointments",findAllAppointmentsByUserId);
app.post("/api/user/create", createUser);
app.put("/api/user/:userId", updateUser);
app.post("/api/upload",upload.single('myFile'), uploadImage);
app.delete("/api/user/:userId", deleteUser);
app.post("/api/login",passport.authenticate('local'), login);
app.get("/api/checkLogin",checkLogin);

function checkLogin(req,res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username,password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(request, response){
    var user =request.user;
    response.json(user);
    // userModel
    //     .findUserByCredentials(
    //         request.query.username
    //         , request.query.password)
    //     .then(function (user) {
    //         console.log(user);
    //         response.json(user);
    //         return;
    //     }, function (err) {
    //         response.sendStatus(404).send(err);
    //         return;
    //     });
}

function uploadImage(req, res) {

    var myFile        = req.file;

    var userId        = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var photourl     = '/assignment/uploads/'+filename;

    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.profile.image_url=photourl;
            userModel
                .updateUser(userId, user)
                .then(function (status) {
                    var callbackUrl = "/assignment/#!/user/"+userId+"/patient";
                    res.redirect(callbackUrl);
                }, function (err) {
                    console.log(err);
                    return err;
                });
        });
    // widget.url = '/uploads/'+filename;

    // console.log(widget);
    // user.url = '/assignment/uploads/'+myFile.filename ;
    // widget.myFile = myFile;
    // widget.name = name;
    // widget.width = width;
    // widget.text = text;
    // console.log("widget service - after setting property");
    // console.log(widget);

    // widgetModel
    //     .updateWidget(widgetId, widget)
    //     .then(function (widget) {
    //         return widget;
    //     }, function (err) {
    //         console.log(err);
    //         return err;
    //     });
    // var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId;
    // var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    // var callbackUrl = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    // res.redirect(callbackUrl);
}

function callback(err, result) {
     if(err) {
         console.log(err);
     }
     else {
         //console.log(result);
         return result;
     }
}

function getUsers(request, response) {
    var body =request.body;
    var npi = body.npi;
    var username = body.username;
    var password = body.password;
    var userType = body.userType;
    // var npi = request.query.npi;
    // var username = request.query.username;
    // var password = request.query.password;
    // var userType = request.query.userType;
    // if (username && password)   {
    //     findUserByCredentials(request, response);
    // }
    if (username && userType)  {
        //findUserByUsernameAndUserType(name, uType)
        findUserByUsernameAndUserType(request, response);
    }
    else if (username)  {
        findUserByUsername(request, response);
    }else if(npi)   {
        findUserByNPI(request, response);
    }
    else    {
        findAll(request, response);
    }
}

// function findUserByCredentials(request, response)  {
//     userModel
//         .findUserByCredentials(
//             request.query.username
//             , request.query.password)
//         .then(function (user) {
//             console.log(user);
//             response.json(user);
//             return;
//         }, function (err) {
//             response.sendStatus(404).send(err);
//             return;
//         });
// }

function findUserByUsername(request, response) {
    userModel
        .findUserByUsername(request.body.username)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findUserByNPI(request, response) {
    userModel
        .findUserByNPI(request.body.npi)
        .then(function (user) {
            //console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findUserByUsernameAndUserType(request, response) {
    userModel
        .findUserByUsernameAndUserType(request.body.username, request.body.us)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}
function findAll(request, response) {
    return userModel
        .findAll()
        .then(function (user) {
            console.log(user);
            return response.json(user);
        });
}

function findUserById(request, response) {
    //console.log(request.params.userId)
    return  userModel
        .findUserById(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function findAllAppointmentsByUserId(request, response) {
    //console.log(request.params.userId)
    return  userModel
        .findAllAppointmentsByUserId(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function createUser(request, response) {
    var newuser = request.body;
    //console.log("user service")
    //console.log(newuser);

    userModel
        .createUser(newuser)
        .then(function (user){
            console.log(user);
            response.json(user);
        });
    //return;
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user = request.body;
    //console.log([user, userId]);

    userModel
        .updateUser(userId,user)
        .then(function (status){
            //console.log(status);
            response.json(status);
        },function (err){
            //console.log(err);
            response.sendStatus(404).send(err);
        });
    return;
}

function deleteUser(request, response) {
    var userId = request.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (user) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}