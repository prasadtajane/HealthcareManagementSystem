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
            reportService.findReportByApppointmentId(model.appointmentId)
                .then(function (response) {
                    //alert("inside controller - findWebsiteByUserId");
                    model.report = response.data;
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
                    model.report= report;
                });
        }

        function deleteReport(reportId) {
            reportService
                .deleteReport(model.userId,reportId)
                .then(function (){
                    $location.url('/user/'+ model.userId + "/appointment/"+model.appointmentId);
                });
        }
    }
})();