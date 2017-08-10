/**
 * Created by prasadtajane on 8/4/17.
 */

var mongoose = require('mongoose');
var db = require("../models.server");

var widgetSchema = require("./widget.schema.server");
var pageModel = require("../page/page.model.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.findAll = findAll;
widgetModel.createWidget = createWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findWidgetByName = findWidgetByName;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;

module.exports = widgetModel;
Widget = widgetModel;




function createWidget(pageId, widget) {
    var tempWidget = null;
    return Widget
        .create(widget)
        .then(function (widget) {
            tempWidget = widget;
            console.log("widget model");
            console.log(tempWidget);
            return pageModel
                .addWidgetInPage(pageId, widget._id)
                .then(function (page) {
                    console.log(tempWidget);
                    return tempWidget;
                });
        });
}

function findWidgetById(widgetId)   {
    return Widget.findOne({_id:widgetId});
}

function findWidgetByName(widgetName)   {
    return Widget.findOne({name:widgetName});
}

function findAll() {
    Widget.find();
}

function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            //console.log(page);
            return page.widgets;
        });
}

function updateWidget(widgetId, widget)   {
    return Widget.update({_id:widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return Widget
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .removeWidget(pageId, widgetId);
        });
}

//widget={ _page: '321', name: 'Test2345', text: 'Loremo o ipsumo', size: 1};

function reorderWidget(pageId, start, end) {
    // save the start in temp then delete
    // start from end go till length
    //      save current in newTemp
    //      update current with temp
    //      make temp as newTemp


    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            console.log("page");
            var widgets = page.widgets;
            widgets.splice(end, 0, (widgets.splice(start, 1))[0]);
            page.widgets = widgets;
            return pageModel
                .updatePage(pageId,page)
                .then(function (status){
                    console.log(widgets);
                    return widgets;
                });
            // page.widgets = widgets;
            // console.log(widgets);
            // return widgets;
        });

    /*return Widget
        .find(function(err, result)  {
            widgets = result;
            widgets.splice(end, 0, (widgets.splice(start, 1))[0]);

            for(w in widgets)   {
                Widget
                    .create(widgets[w])
                    .then(function (err, result) {
                        console.log(err);
                    });
                Widget.remove({});

            }
        });*/
}

//findAll();
//createWidget("59852da4cd24bf4f03ed2694", widget)
//findAllWidgetsForPage("59852da4cd24bf4f03ed2694")
//findWidgetById("59853c0ef89d954fcce7aaf5")
//updateWidget("59853c0ef89d954fcce7aaf5", widget)
//deleteWidget("59853c0ef89d954fcce7aaf5")
//===========reorderWidget(pageId, start, end)
