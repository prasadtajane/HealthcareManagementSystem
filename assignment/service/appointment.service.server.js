/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var appointmentModel = require("../model/appointment/appointment.model.server");

var pages = [];

app.get("/api/user/:userId/appointment",getAppointments);
app.get("/api/user/:userId/appointment/:appointmentId",findappointmentById);

app.post("/api/user/:userId/appointment", createappointment);
app.put("/api/user/:userId/appointment/:appointmentId", updateappointment);
app.delete("/api/user/:userId/appointment/:appointmentId", deleteAppointment);


function getAppointments(request, response) {

    var userId = request.params.userId;

    var patientName = request.query.patientName;
    //console.log(patientName);
    var date = request.query.date;
    var category = request.query.category;
    var priority = request.query.priority;

    if(patientName)    {
        findappointmentByPatient(request, response);
    } else if (date)   {
        findappointmentByDate(request, response);
    }else if (category)   {
        findappointmentByCategory(request, response);
    }else if (priority)   {
        findappointmentByPriority(request, response);
    }
    else    {
        findAppointmentByUserId(request, response);
    }
}


function findappointmentByPatient(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.patientName)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByDate(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.date)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByCategory(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.category)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByPriority(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.priority)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findAppointmentByUserId(request, response) {
    var userId = request.params.userId;
    return appointmentModel
        .findAppointmentByUserId(userId)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findappointmentById(request, response) {
    var appointmentId = request.params.appointmentId;
    return appointmentModel
        .findappointmentById(appointmentId)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}


function createappointment(request, response) {
    console.log("Inside appointment server - createappointment");
    var userId = request.params.userId;
    var newAppointment = request.body;
    console.log(userId);
    console.log(newAppointment);

    return appointmentModel
        .createappointment(newAppointment)
        .then(function (appointment) {
            //console.log(page);
            response.json(appointment);
        });
}

function updateappointment(request, response) {
    var appointmentId = request.params.appointmentId;
    var newAppointment = request.body;

    return appointmentModel
        .updateappointment(appointmentId, newAppointment)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteAppointment(request, response) {
    var appointmentId = request.params.appointmentId;

    return appointmentModel
        .deleteappointment(appointmentId)
        .then(function (appointment) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}