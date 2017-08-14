/**
 * Created by Sourabh Punja on 8/13/2017.
 */
var mongoose = require("mongoose");


var reportSchema = new mongoose.Schema({
    doctorName:String,
    patientName:String,
    prescription: String,
    dosage: String,
    doctorcomments: String,
    futureappointments: String,
    imageurl: String,
    appointmentId:{type:mongoose.Schema.Types.ObjectId, ref:"AppointmentModel"},
},{
    collection:"report"
});

module.exports = reportSchema;