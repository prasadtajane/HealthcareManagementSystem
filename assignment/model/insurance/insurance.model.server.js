/**
 * Created by Sourabh Punja on 8/13/2017.
 */


var mongoose = require("mongoose");
var insuranceSchema = require('./insurance.schema.server');
var db = require('../models.server');

var insuranceModel = mongoose.model('InsuranceModel',insuranceSchema);
// var appointmentModel = require('../appointment/appointment.model.server');


// insuranceModel.findinsuranceByApppointmentId = findReportByApppointmentId;
insuranceModel.findAllInsurance = findAllInsurance;
insuranceModel.createInsurance = createInsurance;
insuranceModel.findInsuranceById = findInsuranceById;
insuranceModel.updateInsurance = updateInsurance;
insuranceModel.deleteInsurance = deleteInsurance;
// reportModel.addAppointment = addAppointment;
// reportModel.deleteAppointment = deleteAppointment;

module.exports = insuranceModel;

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

// function findReportByApppointmentId(appointmentId){
//     return reportModel
//         .find({appointmentId:appointmentId})
//         .populate('appointmentId')
//         .exec();
// }

function createInsurance(insurance){
    // report.appointmentId = appointmentId;
    // var reportTmp = null;
    return insuranceModel
        .create(insurance);
    // .then(function (page){
    //     pageTmp = page;
    //     return websiteModel
    //         .addPage(websiteId,page._id);
    // })
    // .then(function (website){
    //     return pageTmp;
    // });
}

function findInsuranceById(insuranceId){
    return insuranceModel.findById(insuranceId);
}

function updateInsurance(insuranceId,insurance){
    return insuranceModel.update({_id : insuranceId},{$set : insurance});
}

function deleteInsurance(insuranceId){
    return insuranceModel.remove({_id: insuranceId});
    // .then(function (status){
    //     return websiteModel
    //         .deletePage(websiteId,pageId);
    // });
}

function findAllInsurance(){
    return insuranceModel.find();
}