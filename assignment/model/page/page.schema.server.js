/**
 * Created by prasadtajane on 8/5/17.
 */
var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
    _website:{type:mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name:String,
    title:String,
    description:String,
    widgets:[{type:mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}],
    dateCreated:{type:Date, default:Date.now()}
},  {
    collection:"page"
});

module.exports = pageSchema;