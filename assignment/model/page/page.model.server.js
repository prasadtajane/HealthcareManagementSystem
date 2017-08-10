/**
 * Created by prasadtajane on 8/4/17.
 */

var mongoose = require('mongoose');
var db = require("../models.server");

var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.removeWidget = removeWidget;
pageModel.findPageByName = findPageByName;
pageModel.addWidgetInPage = addWidgetInPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;

module.exports = pageModel;
Page = pageModel;




//function addPageInWebsite(websiteId, pageId)  {
function addWidgetInPage(pageId, widgetId)  {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            console.log("page model");
            console.log(page);
            page.widgets.push(widgetId);
            return page.save();
        })
}

//function removePage(websiteId, pageId) {
function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function createPage(websiteId, page) {
    var tempPage = null;
    return Page
        .create(page)
        .then(function (page) {
            tempPage = page;
            websiteModel
                .addPageInWebsite(websiteId, page._id)
                .then(function (website) {
                    return tempPage;
                });
        })
}

function findPageById(pageId){
    return Page.findOne({_id:pageId});
}

function findAll() {
    return Page.find();
}

function findPageByName(pageName)   {
    return Page.findOne({name: pageName});
}

function findAllPagesForWebsite(websiteId) {
    return Page.find({_website: websiteId})
}

function updatePage(pageId, page)   {
    return Page.update({_id:pageId},{$set: page});
}

function deletePage(websiteId, pageId) {
    return Page
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .removePage(websiteId, pageId);
        });
}


//page={"_website" : "456", "name" : "Post 769", "description" : "lLeLo"};
//findAll();
//createPage("59852da4cd24bf4f03ed2699", page)
//findAllPagesForWebsite("111")
//findPageById("59853593c584f24f737880f9");
//updatePage("59853593c584f24f737880f9", page)
//deletePage("598539282351ba4fa09569ae")
