/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");

var users = [];

app.get("/api/user", getUsers);
app.get("/api/user/:userId",findUserById);
app.get("/api/user/:userId/populateappointments",findAllAppointmentsByUserId);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

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
    var npi = request.query.npi;
    var username = request.query.username;
    var password = request.query.password;
    var userType = request.query.userType;
    if (username && password)   {
        findUserByCredentials(request, response);
    }
    else if (username && userType)  {
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

function findUserByCredentials(request, response)  {
    userModel
        .findUserByCredentials(
            request.query.username
            , request.query.password)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findUserByUsername(request, response) {
    userModel
        .findUserByUsername(request.query.username)
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
        .findUserByNPI(request.query.npi)
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
        .findUserByUsernameAndUserType(request.query.username, request.query.us)
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