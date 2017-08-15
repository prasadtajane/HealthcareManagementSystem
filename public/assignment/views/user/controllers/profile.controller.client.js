/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService, $rootScope) {


        var model = this;
        var uId = $routeParams["userId"];

        model.logout = logout;
        model.createAppointment = createAppointment;
        model.showInsuranceById = showInsuranceById;
        model.showUserReportById = showUserReportById;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

        function init() {
            //alert("inside profile service!")
            model.user={};

            userService
                .findUserById(uId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);

                    model.user.email = user.email;
                    model.user.profile = user.profile;
                    model.user.userType = user.userType;
                    model.user.username = user.username;

                    //console.log(model.user);
                    return model.user;
                });
        }
        init();

        function createAppointment(appointment) {
            report = {
                doctorName:model.appointment.doctor_name,
                patientName:model.appointment.patient_name,
                _appointment:appointmentId,
                date:Date.now(),
                time:"00:00 AM"
            };

            reportService
                .createReport(uId, appointmentId, report)
                .then(function (report) {
                    $location.url("/user/" + uId + "/appointment/" + appointmentId + "/report/" + report._id);
                });
        }

        function showInsuranceById () {
            $location.url("/user/" + uId + "/insurance");
        }
    }

})();