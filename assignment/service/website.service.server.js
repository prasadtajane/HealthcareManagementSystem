/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

var websites = [];

app.get("/api/profile/:userId/website",getWebsites);
app.get("/api/profile/:userId/website/:websiteId",findWebsiteById);

app.post("/api/profile/:userId/website", createWebsite);
app.put("/api/profile/:userId/website/:websiteId", updateWebsite);
app.delete("/api/profile/:userId/website/:websiteId", deleteWebsite);

//api/profile/456/website?websiteName=p


function getWebsites(request, response) {
    var userId = request.params.userId;
    var websiteName = request.query.websiteName;

    if(websiteName) {
        //console.log("inside website service");
        //console.log(request.query.websiteName);
        findWebsiteByName(request, response);
    }
    //console.log(userId);
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (website) {
            response.send(website);
        }, function (err) {
            response.sendStatus("404").send(err);
        });
    return;
}

function findWebsiteByName(request, response) {
    websiteModel
        .findWebsiteByName(request.query.websiteName)
        .then(function (website) {
            response.send(website);
        }, function (err) {
            response.sendStatus("404").send(err);
        });
    return("0");
    /*for (w in websites)    {
        if (websites[w].name === websiteName) {
            return websites[w];
        }
    }
    return ("0");*/
}

function findWebsiteByUserId(request, response) {
    var userId = request.params.userId;
    //console.log(userId);
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (website) {
            response.send(website);
        }, function (err) {
            response.sendStatus("404").send(err);
        });
    return;
}

function findWebsiteById(request, response) {
    var websiteId = request.params.websiteId;
    //console.log(userId);
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            response.send(website);
        }, function (err) {
            response.sendStatus("404").send(err);
        });
    return;
}


function createWebsite(request, response) {
    var userId = request.params.userId;
    var newWebsite = request.body;

    newWebsite._user = userId;
    newWebsite.visited = "1";
    newWebsite.updated = ((new Date().getMonth()+1)+ "/" + new Date().getDate()+ "");

    websiteModel
        .createWebsiteForUser(userId, newWebsite)
        .then(function (user){
            //console.log(user);
            response.json(user);
        });
    return;
}

function updateWebsite(request, response) {
    var websiteId = request.params.websiteId;
    var newWebsite = request.body;

    websiteModel
        .updateWebsite(websiteId,newWebsite)
        .then(function (status){
            //console.log(status);
            response.json(status);
        },function (err){
            //console.log(err);
            response.sendStatus(404).send(err);
        });
    return;
}

function deleteWebsite(request, response) {
    var userId = request.params.userId;
    var websiteId = request.params.websiteId;
    return websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            response.send("200");
        });
}