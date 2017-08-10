/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

var pages = [];

app.get("/api/profile/:userId/website/:websiteId/page",getpages);
app.get("/api/profile/:userId/website/:websiteId/page/:pageId",findPageById);

app.post("/api/profile/:userId/website/:websiteId/page", createPage);
app.put("/api/profile/:userId/website/:websiteId/page/:pageId", updatePage);
app.delete("/api/profile/:userId/website/:websiteId/page/:pageId", deletePage);


function getpages(request, response) {
    var pageName = request.query.pageName;
    console.log(pageName);
    var websiteId = request.params.websiteId;
    if(pageName)    {
        findPageByName(request, response);
    } else    {
        findPageByWebsiteId(request, response);
    }
}


function findPageByName(request, response) {
    return pageModel
        .findPageByName(request.query.pageName)
        .then(function (page) {
            //console.log(page);
            response.json(page);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findPageByWebsiteId(request, response) {
    var websiteId = request.params.websiteId;
    return pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (page) {
            response.json(page);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findPageById(request, response) {
    var pageId = request.params.pageId;
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            response.json(page);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}


function createPage(request, response) {
    var websiteId = request.params.websiteId;
    var newPage = request.body;

    newPage._website = websiteId;

    return pageModel
        .createPage(websiteId, newPage)
        .then(function (page) {
            //console.log(page);
            response.json(page);
        });
}

function updatePage(request, response) {
    var pageId = request.params.pageId;
    var newPage = request.body;

    return pageModel
        .updatePage(pageId, newPage)
        .then(function (page) {
            response.json(page);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deletePage(request, response) {
    var pageId = request.params.pageId;
    var websiteId = request.params.websiteId;

    return pageModel
        .deletePage(websiteId, pageId)
        .then(function (page) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}