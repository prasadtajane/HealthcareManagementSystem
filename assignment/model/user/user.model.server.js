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
userModel.findUserByUsername = findUserByUsername;
userModel.addInsuranceInUser = addInsuranceInUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.addAppointmentInUsers = addAppointmentInUsers;
userModel.removeInsuranceFromUser = removeInsuranceFromUser;
userModel.findAllInsurancesByUserId = findAllInsurancesByUserId;
userModel.removeAppointmentFromUsers = removeAppointmentFromUsers;
userModel.findAllAppointmentsByUserId = findAllAppointmentsByUserId;
//userModel.findAppointmentReportByUserId = findAppointmentReportByUserId;

module.exports = userModel;

User = userModel;




function createUser(user) {
    //console.log(user);
    return User
        .create(user);
}

function addInsuranceInUser(insuranceId, userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._insurances.push(insuranceId);
            return user.save();
        });
}

function removeInsuranceFromUser(insuranceId, userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._insurances.indexOf(insuranceId);
            user._insurances.splice(index, 1);
            return user.save();
        });
}

function addAppInSingleUser(appointmentId, userId) {
    console.log("inside user server - addAppInSingleUser")
    console.log(appointmentId, userId)
    return userModel
        .findOne({_id:userId})
        .then(function (user) {
            user._appointments.push(appointmentId);
            console.log("inside user server then - addAppInSingleUser");
            console.log(user._appointments);
            return user.save();
        });
}

function addAppointmentInUsers(appointmentId, userList) {
    for(u in userList)   {
        console.log("inside user server - addAppointmentInUsers");
        addAppInSingleUser(appointmentId, userList[u]);
    }
    console.log("inside user server outside for - addAppointmentInUsers");
    return appointmentId;
}

function removeAppFromSingleUser(appointmentId, userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._appointments.indexOf(appointmentId);
            user._appointments.splice(index, 1);
            return user.save();
        });
}

function removeAppointmentFromUsers(appointmentId, userList) {
    for(userId in userList)   {
        removeAppFromSingleUser(appointmentId, userId);
    }
    return;
}

function findUserById(userId) {
    //console.log("inside findByUserId of model! = "+userId);
    return userModel
        .findOne({_id:userId});
}

function findAll() {
    return User
        .find({});
}

function findUserByUsername(name)   {
    return userModel
        .findOne({username: name});
}

function findUserByCredentials(username, password) {
    return User
        .findOne(
            {username: username, password: password});
}

function updateUser(userId, user)   {
    return userModel
        .update({_id:userId}, {$set: user});
}


function deleteUser(userId) {
    return User
        .remove({_id:userId});
}

function findAllAppointmentsByUserId(userId) {
    return userModel
        .findOne({username: userId})
        .then( function (user) {
            var appointmentList = user._appointments;
            if (appointmentList.length !== 0)    {
                user
                    .populate('_appointments')
                    .exec()
                    .then(function (userOut) {
                        return userOut;
                    })
            }
            else return user;
        });
}

function findAllInsurancesByUserId(userId) {
    return userModel
        .findOne({username: name})
        .then( function (user) {
            var appointmentList = user._insurances;
            if (appointmentList.length !== 0)    {
                user
                    .populate('_insurances')
                    .exec()
                    .then(function (userOut) {
                        return userOut;
                    })
            }
            else return user;
        });
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
