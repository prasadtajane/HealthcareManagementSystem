/**
 * Created by Sourabh Punja on 8/13/2017.
 */

var mongoose = require("mongoose");
var reportSchema = require('./report.schema.server');
var db = require('../database');

var reportModel = mongoose.model('ReportModel',reportSchema);
var appointmentModel = require('../appointment/appointment.model.server');


reportModel.findReportByApppointmentId = findReportByApppointmentId;
reportModel.findReportByPatientName = findReportByPatientName;
reportModel.findAllReport = findAllReport;
reportModel.createReport = createReport;
reportModel.findReportById = findReportById;
reportModel.updateReport = updateReport;
reportModel.deleteReport = deleteReport;
// reportModel.addAppointment = addAppointment;
// reportModel.deleteAppointment = deleteAppointment;

module.exports = reportModel;

// function addAppointment(reportId,appointmentId){
//     return reportModel
//         .findReportById(reportId)
//         .then(function (report){
//             report.appointments.push(appointmentId);
//             return report.save();
//         });
// }
//
// function deleteAppointment(reportId,appointmentId){
//     return reportModel
//         .findReportById(reportId)
//         .then(function (report){
//             var index = report.appointments.indexOf(appointmentId);
//             report.appointments.splice(index,1);
//             return report.save();
//         });
// }

function findReportByApppointmentId(appointmentId){
    return reportModel
        .find({_appointment:appointmentId});
}

function createReport(appointmentId,report){
    report.appointmentId = appointmentId;
    var reportTmp = null;
    return reportModel
        .create(report)
        .then(function (report){
            reportTmp = report;
            return appointmentModel
                .addReportToAppointment(appointmentId,report._id);
        })
        .then(function (appointment){
            return reportTmp;
         });
}

function findReportById(reportId){
    return reportModel.findById(reportId);
}

function updateReport(reportId,report){
    return reportModel.update({_id : reportId},{$set : report});
}

function deleteReport(appointmentId,reportId){
    return reportModel.remove({_id: reportId})
        .then(function (status){
            return appointmentModel
                .removeReportFromAppointment(appointmentId,reportId);
        });
}

function findAllReport(){
    return reportModel.find();
}

function findReportByPatientName(patientName){
    return reportModel.find({patientName:patientName});
}