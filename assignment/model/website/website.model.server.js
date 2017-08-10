/**
 * Created by prasadtajane on 8/4/17.
 */
var mongoose = require('mongoose');
var db = require("../models.server");

var userModel = require("../user/user.model.server");

var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.removePage = removePage;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.addPageInWebsite = addPageInWebsite;
websiteModel.findWebsiteByName = findWebsiteByName;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;

module.exports = websiteModel;
Website = websiteModel;




function addPageInWebsite(websiteId, pageId)  {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })
}

//function removeWebsite(userId, websiteId) {
function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function createWebsiteForUser(userId, website) {
    var tempWebsite = null;
    return Website
        .create(website)
        .then(function (website) {
            tempWebsite = website;
            userModel
                .addWebsiteInUser(userId, website._id)
                .then(function (user) {
                    return tempWebsite;
                });
        })
}

function findWebsiteById(websiteId){
    return Website.findOne({_id:websiteId});
}

function findWebsiteByName(websiteName){
    return Website.findOne({name:websiteName});
}

function findAll() {
    return Website.find(callback);
}

function findAllWebsitesForUser(userId) {
    //console.log(userId);
    return Website.find({_user: userId})
}

function updateWebsite(websiteId, website)   {
    return Website.update({_id:websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
    return Website
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .removeWebsite(userId, websiteId);
        });
}


//website = {"_user" : "59852da4cd24bf4f03ed2690", "name" : "Checkmate", "description" : "M"}
//createWebsiteForUser("59852da4cd24bf4f03ed2690", website);
//findAll();
//console.log("print");
//findAllWebsitesForUser("456");
//findWebsiteById("59852fe522c8f94f25051eed");
//website = {"_user" : "59852da4cd24bf4f03ed6699", "name" : "Checker", "description" : "Moto"}
//updateWebsite("59852fe522c8f94f25051eed", website);
//deleteWebsite("59852fe522c8f94f25051eed");
