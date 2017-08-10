/**
 * Created by prasadtajane on 8/4/17.
 */

var db = require("../models.server");
var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("UserModel", userSchema);

userModel.findAll = findAll;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserById = findUserById;
userModel.removeWebsite = removeWebsite;
userModel.addWebsiteInUser = addWebsiteInUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;

module.exports = userModel;

User = userModel;




function createUser(user) {
    //console.log(user);
    return User.create(user);
}

function addWebsiteInUser(userId, websiteId)  {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._websites.push(websiteId);
            return user.save();
        })
}

function removeWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index, 1);
            return user.save();
        });
}

function findUserById(userId, callback) {
    //console.log("inside findByUserId of model! = "+userId);
    return userModel
        .findById(
            userId,
            function (err, result) {
                if(err) {
                    callback(err, null);
                }
                else {
                    callback(null, result);
            }
    });
}

function findAll(callback) {
    return User
        .find(
            function (err, result) {
                if(err) {
                    callback(err, null);
                }
                else {
                    callback(null, result);
                }
            }
        );
}

function findUserByUsername(name)   {
    return userModel
        .findOne({username: name})
}

function findUserByCredentials(username, password, callback) {
    return User
        .findOne(
            {username: username, password: password});
}

function updateUser(userId, user)   {
    return userModel.update({_id:userId}, {$set: user});
}


function deleteUser(userId) {
    return User.remove({_id:userId});
}

//findAll();
//findUserById("59857d3d4d8f54554ad60a17", callback);
//       findUserById("59857d3d4d8f54554ad60a19", callback);
//findUserByUsername("alice");
//findUserByCreadentials("alice", "alice");
//var user = { firstName:"alicia", lastName:"wonderWomania" }
//updateUser("598515103cf9234d20944366", user);
//deleteUser("598515103cf9234d20944366")
/*
function tryM() {
    var a = findUserById("59852da4cd24bf4f03ed2690");
    updateUser("59852da4cd24bf4f03ed2691",a)
    findAll();
}

tryM();*/

//
/*findUserByUsername("alice", function (err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
        return result;
    }
});*/
//
// findUserById("59857d3d4d8f54554ad60a19", function (err, result) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(result);
//         return result;
//     }
// });

/*var user = { username: 'a', password: 'a'};
console.log
("call create User");
createUser(user
    , function (err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
            return result;
        }}
    );*/
