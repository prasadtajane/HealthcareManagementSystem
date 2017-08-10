/**
 * Created by prasadtajane on 8/5/17.
 */

var mongoose = require("mongoose");

var websiteSchema = new mongoose.Schema(
    {
        _user:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name:String,
        description:String,
        pages:[{type:mongoose.Schema.Types.ObjectId, ref:"PageModel"}],
        dateCreated:{type:Date, default:Date.now()}
    },
    {collection: "website"});

module.exports=websiteSchema;