/**
 * Created by prasadtajane on 8/5/17.
 */
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    contact:Number,
    dateCreated:{type:Date,default:Date.now()},
    isAdmin:{type:Boolean, default:false},
    _websites:[{type:mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}]

}, {     collection:"user"    });

module.exports = userSchema;