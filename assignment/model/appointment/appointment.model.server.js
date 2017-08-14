/**
 * Created by prasadtajane on 8/4/17.
 */

var db = require("../models.server");
var mongoose = require('mongoose');
var userModel = require("../user/user.model.server");

var appointmentSchema = require("./appointment.schema.server");
var appointmentModel = mongoose.model("appointmentModel", appointmentSchema);

appointmentModel.findAll = findAll;
appointmentModel.createappointment = createappointment;
appointmentModel.updateappointment = updateappointment;
appointmentModel.deleteappointment = deleteappointment;
appointmentModel.findappointmentById = findappointmentById;
appointmentModel.findappointmentByDate = findappointmentByDate;
appointmentModel.addReportToAppointment = addReportToAppointment;
appointmentModel.findappointmentByPatient = findappointmentByPatient;
appointmentModel.findappointmentByPriority = findappointmentByPriority;
appointmentModel.findappointmentByCategory = findappointmentByCategory;
appointmentModel.removeReportFromAppointment = removeReportFromAppointment;

module.exports = appointmentModel;

appointment = appointmentModel;




function createappointment(appointmentIn) {
    //console.log(appointment);
    return appointment.create(appointmentIn)
        .then(function (appointmentOut) {
            var userList = {}
            userList.push(appointmentOut.doctorId);
            userList.push(appointmentOut.patientId);
            userModel.addAppointmentInUsers(appointmentOut._id, userList);
            return;
        });
}

function findappointmentById(appointmentId) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .findById(appointmentId)
        .populate('_reports')
        .exec();
}

function findappointmentByDate(dateIn) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({date:dateIn})
        .populate('_reports')
        .exec();
}

function findappointmentByPatient(name) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({patient_name:name})
        .populate('_reports')
        .exec();
}

function findappointmentByPriority(pri) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({priority:pri})
        .populate('_reports')
        .exec();
}

function findappointmentByCategory(category) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({appointment_category:category})
        .populate('_reports')
        .exec();
}

function findAll() {
    return appointment
        .find({})
        .populate('_reports')
        .exec();
}

function addReportToAppointment(appointmentId, reportId) {
    return appointment
        .findappointmentById(appointmentId)
        .then(function (appointment) {
            appointment._reports.push(reportId);
            return appointment.save();
        })
}


function removeReportFromAppointment(appointmentId, reportId) {
    return appointment
        .findappointmentById(appointmentId)
        .then(function (appointment) {
            appointment._reports.splice(appointment._reports.indexOf(reportId),1);
            return appointment.save();
        })
}

function updateappointment(appointmentId, appointment)   {
    return appointmentModel.update({_id:appointmentId}, {$set: appointment});
}


function deleteappointment(appointmentId, userList) {
    return appointment.remove({_id:appointmentId})
        .then(function (status) {
            userModel.removeAppointmentFromUsers(appointmentId, userList);
            return;
        });
}

//findAll();
//findappointmentById("59857d3d4d8f54554ad60a17", callback);
//       findappointmentById("59857d3d4d8f54554ad60a19", callback);
//findappointmentByappointmentname("alice");
//findappointmentByCreadentials("alice", "alice");
//var appointment = { firstName:"alicia", lastName:"wonderWomania" }
//updateappointment("598515103cf9234d20944366", appointment);
//deleteappointment("598515103cf9234d20944366")
/*
function tryM() {
    var a = findappointmentById("59852da4cd24bf4f03ed2690");
    updateappointment("59852da4cd24bf4f03ed2691",a)
    findAll();
}

tryM();*/

//
/*findappointmentByappointmentname("alice", function (err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
        return result;
    }
});*/
//
// findappointmentById("59857d3d4d8f54554ad60a19", function (err, result) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(result);
//         return result;
//     }
// });

/*var appointment = { appointmentname: 'a', password: 'a'};
console.log
("call create appointment");
createappointment(appointment
    , function (err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
            return result;
        }}
    );*/
