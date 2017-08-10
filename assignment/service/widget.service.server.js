/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");

//var widgets = [];

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/assignment/uploads", upload.single('myFile'), uploadImage);


app.get("/api/profile/:userId/website/:websiteId/page/:pageId/widget",getwidgets);
app.get("/api/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId",findWidgetById);

app.post("/api/profile/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.put("/api/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete("/api/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);

app.put("/api/page/:pageId/widget", sortable);

function sortable(request, response) {
    var end = request.query.final;
    var start = request.query.initial;
    var pageId = request.params.pageId;
    console.log("Inside Server");
    console.log([start, end]);
    //widgets.splice(end, 0, (widgets.splice(start, 1))[0]);

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (err, result) {
            response.sendStatus(200);
        });
    return;
}

function uploadImage(req, res) {

    var widget        = req.body;

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var fileName      = originalname.split(".")
    var name          = myFile.name;
    var width         = myFile.widhth;
    var text          = myFile.text;

    /*getWidgetById(widgetId)
        .then(function (widget) {
            console.log("widget service - function call");
            console.log(widget);
            widget.url = '/assignment/uploads/'+myFile.filename ;
            widget.myFile = myFile;
            widget.name = name;
            widget.width = width;
            widget.text = text;
            console.log("widget service - after setting property");
            console.log(widget);return widgetModel;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (widget) {
                    return widget;
                });
        });*/

    console.log(widget);
    widget.url = '/assignment/uploads/'+myFile.filename ;
    widget.myFile = myFile;
    widget.name = name;
    widget.width = width;
    widget.text = text;
    console.log("widget service - after setting property");
    console.log(widget);

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (widget) {
            return widget;
        }, function (err) {
            console.log(err);
            return err;
        });

    //  /api/profile/:userId/website/:websiteId/page/:pageId/widget
    //  http://localhost:3000/assignment/index.html#!/profile/456/website/456/page/321/widget
    var callbackUrl   = "/assignment/index.html#!/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function getwidgets(request, response) {
    var widgetName = request.query.widgetName;
    if (widgetName)   {
        findWidgetByName(request, response);
    }
    else  {
        //alert("inside website service - findWebsiteByUserId");
        findWidgetsByPageId(request, response);
    }
}

function findWidgetByName(request, response) {
    var widgetName = request.query.widgetName;
    return widgetModel
        .findWidgetByName(widgetName)
        .then(function (widget) {
            response.json(widget)
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findWidgetsByPageId(request, response) {
    var pageId = request.params.pageId;
    return widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widget) {
            console.log(widget);
            response.json(widget)
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findWidgetById(request, response) {
    var widgetId = request.params.widgetId;
    return widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            response.json(widget)
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function getWidgetById(widgetId) {
    return widgetModel
    .findWidgetById(widgetId)
    .then(function (widget) {
        //response.json(widget)
        console.log("widget service getwidgetbyid");
        console.log(widget);
        return widget;
    }, function (err) {
        //response.sendStatus(404).send(err);
        return "0";
    });

}


function createWidget(request, response) {
    var pageId = request.params.pageId;
    var newWidget = request.body;
    newWidget._page = pageId;

    //console.log("Widget Server");
    //console.log(newWidget);

    widgetModel
        .createWidget(pageId, newWidget)
        .then(function (widget) {
            console.log("Widget Server - after reply from model");
            console.log(widget);
            return response.json(widget);
        });
}

function updateWidget(request, response) {
    var widgetId = request.params.widgetId;
    var newWidget = request.body;

    return widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function (widget) {
            response.json(widget);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteWidget(request, response) {
    var pageId = request.params.pageId;
    var widgetId = request.params.widgetId;

    return widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (widget) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function clean() {
    var widgets = widgetModel.findAll();
    for(w in widgets)   {
        if(typeof widgets[w].name === 'undefined' && typeof widgets[w].text === 'undefined')    {
            var delWidget = widgets[w];
            widgetModel
                .deleteWidget(delWidget._id)
                .then(function (widget) {
                    console.log("Deleted widget " + delWidget._id);
                });
        }
        else if(widgets[w].widgetType === "YOUTUBE" || widgets[w].widgetType === "IMAGE")   {
            if (typeof widgets[w].url === 'undefined') {
                var delWidget = widgets[w];
                widgetModel
                    .deleteWidget(delWidget._id)
                    .then(function (widget) {
                        console.log("Deleted widget " + delWidget._id);
                    });
            }
        }
    }
}