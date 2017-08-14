/**
 * Created by Sourabh Punja on 8/13/2017.
 */

var mongoose = require("mongoose");
var reportSchema = require('./report.schema.server');
var db = require('../database');

var reportModel = mongoose.model('ReportModel',reportSchema);
// var appointmentModel = require('../appointment/appointment.model.server');


reportModel.findReportByApppointmentId = findReportByApppointmentId;
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
        .find({appointmentId:appointmentId})
        .populate('appointmentId')
        .exec();
}

function createReport(appointmentId,report){
    report.appointmentId = appointmentId;
    // var reportTmp = null;
    return reportModel
        .create(report);
        // .then(function (page){
        //     pageTmp = page;
        //     return websiteModel
        //         .addPage(websiteId,page._id);
        // })
        // .then(function (website){
        //     return pageTmp;
        // });
}

function findReportById(reportId){
    return reportModel.findById(reportId);
}

function updateReport(reportId,report){
    return reportModel.update({_id : reportId},{$set : report});
}

function deleteReport(reportId){
    return reportModel.remove({_id: reportId});
        // .then(function (status){
        //     return websiteModel
        //         .deletePage(websiteId,pageId);
        // });
}

function findAllReport(){
    return reportModel.find();
}