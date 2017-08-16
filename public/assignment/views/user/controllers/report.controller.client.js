/**
 * Created by Sourabh Punja on 8/12/2017.
 */
/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("reportController", reportController);

    function reportController($location,$routeParams, reportService)   {

        var model = this;
        model.userId = $routeParams.userId;
        model.appointmentId = $routeParams.appointmentId;
        model.reportId = $routeParams.reportId;
        model.updateReport=updateReport;
        model.deleteReport = deleteReport;

        function init() {
            //console.log("inside report controller init");
            reportService
                .findReportById(model.userId,model.appointmentId,model.reportId)
                //.findReportByApppointmentId(model.userId, model.appointmentId)
                .then(function (response) {
                    //alert("inside controller - findWebsiteByUserId");
                    model.report = response;
                    console.log(model.report);
                    model.report.date = new Date(model.report.date);
                    return model.report;
                });
        }
        init();

        function updateReport(report){
            reportService
                .updateReport(model.userId,model.appointmentId,model.reportId,report)
                .then(function (response){
                    var report = response.data;
                    var status = response.status;
                    if (status === 200){
                        model.message = "Update Successfull";
                    }else{
                        model.message = "Update not successfull";
                    }
                    report.date = new Date(report.date);
                    model.report = report;
                    $location.url('/user/'+ model.userId + "/appointment/"+model.appointmentId);
                });
        }

        function deleteReport() {
            reportService
                .deleteReport(model.userId,model.appointmentId ,model.reportId)
                .then(function (status){
                    $location.url('/user/'+ model.userId + "/appointment/"+model.appointmentId);
                });
        }
    }
})();