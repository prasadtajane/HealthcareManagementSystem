/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("appointmentController", appointmentController);

    function appointmentController($routeParams, $location, appointmentService, reportService, userService, $rootScope) {

        var model = this;

        var uId = $routeParams["userId"];
        var appointmentId = $routeParams["appointmentId"];

        model.logout = logout;
        model.createReport = createReport;
        model.updateAppointment = updateAppointment;
        model.deleteAppointment = deleteAppointment;
        model.approveAppointment = approveAppointment;
        model.function = selectFunction;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

        function init() {
            //alert("inside profile service!")
            var promise = appointmentService.findappointmentById(uId, appointmentId);
            promise.then(function (response) {
                model.appointment = response.data;
                model.appointment.date = new Date(model.appointment.date);
                var appointment = model.appointment;
                if(appointment.isApproved)    {
                    model.appointment.status = "Approved!";
                }
                else model.appointment.status = "Not Yet Approved!";
                return appointment;
                });

            userService
                .findUserById(uId)
                .then(function (response) {
                    model.user = response.data;
                    model.button = "Approve";
                    if (model.user.userType === 'patient')    {
                        model.button = "Save";
                    }
                });
        }
        init();

        function selectFunction(appointment) {

            if (model.user.userType === 'patient')    {
                updateAppointment(appointment);
            }
            else {
                approveAppointment(appointment);
            }
        }

        function updateAppointment(appointment) {
            //alert("inside update of controller");
            appointmentService
                .updateappointment(uId, appointmentId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside appointment controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    //console.log();
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                });
            alert("Values have been updated successfully!");

        }

        function approveAppointment(appointment) {
            appointment.isApproved = "True";
            appointmentService
                .updateappointment(uId, appointmentId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside appointment controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    //console.log();
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                });
            alert("Appointment approved successfully!");

        }

        function deleteAppointment(appointment) {
            appointmentService
                .deleteAppointment(uId, appointmentId)
                .then(function (response) {
                    suCode = response.data;
                    if (suCode === "200") {
                        alert("Appointment has been removed!");
                        $location.url("/user/" + uId);
                    }
                });
        }
        
        function createReport(appointment) {
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

        function findWebsites() {
        }
    }

})();