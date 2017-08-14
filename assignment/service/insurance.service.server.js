/**
 * Created by Sourabh Punja on 8/14/2017.
 */


var app = require("../../express");
var insuranceModel = require("../model/insurance/insurance.model.server");

// var pages=[
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.get("/api/user/:userId/insurance",findAllInsurance);
app.post("/api/user/:userId/insurance",createInsurance);
app.get("/api/user/:userId/insurance/:insuranceId",findInsuranceById);
app.put("/api/user/:userId/insurance/:insuranceId",updateInsurance);
app.delete("/api/user/:userId/insurance/:insuranceId",deleteInsurance);

function findAllInsurance(req,res){
    var userId= req.params.userId;
    insuranceModel
        .findAllInsurance()
        .then(function (insurances){
            res.json(insurances);
        });
}

function deleteInsurance(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    insuranceModel
        .deleteInsurance(insuranceId)
        .then(function (status){
            res.json(status);
        });

    // for (var p in pages) {
    //         if (pages[p]._id === pageId) {
    //         pages.splice(p,1);
    //         res.sendStatus(200);
    //         return;
    //         }
    //     }
    // res.sendStatus(404);
}

function updateInsurance(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    var insurance = req.body;
    insuranceModel
        .updateInsurance(insuranceId,insurance)
        .then(function(status){
            return insuranceModel
                .findInsuranceById(insuranceId);
        },function (err) {
            res.sendStatus(404).send(err);
        })
        .then(function(insurance){
            res.json(insurance);
            return;
        },function(err){
            res.sendStatus(404).send(err);
            return;
        });
    // for (var p in pages){
    //         if (pages[p]._id === pageId){
    //             pages[p]=page;
    //             res.json(pages[p]);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
}

function findInsuranceById(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    insuranceModel
        .findInsuranceById(insuranceId)
        .then(function(insurance){
            res.json(insurance);
        });
    // for (var p in pages){
    //     if (pages[p]._id === pageId){
    //         res.json(pages[p]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createInsurance(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    var insurance = req.body;
    insuranceModel
        .createInsurance(insurance)
        .then(function(insurance){
            res.json(insurance);
        });
    // page.websiteId = websiteId;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);
}
