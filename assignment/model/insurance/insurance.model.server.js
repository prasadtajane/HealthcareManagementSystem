/**
 * Created by Sourabh Punja on 8/13/2017.
 */


var mongoose = require("mongoose");
var insuranceSchema = require('./insurance.schema.server');
var db = require('../models.server');

var insuranceModel = mongoose.model('InsuranceModel',insuranceSchema);
var userModel = require('../user/user.model.server');


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

function createInsurance(userId,insurance){
    // report.appointmentId = appointmentId;
    // var reportTmp = null;
    return insuranceModel
        .create(insurance)
        .then(function (insurance){
        insuranceTmp = insurance;
        return userModel
            .addInsuranceInUser(insurance._id,userId);
    })
    .then(function (user){
        return insuranceTmp;
    });
}

function findInsuranceById(insuranceId){
    return insuranceModel.findById(insuranceId);
}

function updateInsurance(insuranceId,insurance){
    return insuranceModel.update({_id : insuranceId},{$set : insurance});
}

function deleteInsurance(insuranceId,userId){
    return insuranceModel.remove({_id: insuranceId})
    .then(function (status){
        return userModel
            .removeInsuranceFromUser(insuranceId,userId);
    });
}

function findAllInsurance(){
    return insuranceModel.find();
}