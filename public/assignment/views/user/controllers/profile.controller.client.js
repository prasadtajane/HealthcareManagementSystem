/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService, appointmentService, $rootScope) {


        var model = this;
        var uId = $routeParams["userId"];

        model.logout = logout;
        model.createAppointment = createAppointment;
        model.showInsuranceById = showInsuranceById;
        model.showUserReportById = showUserReportById;
        model.rescheduleAppointment = rescheduleAppointment;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

        function init() {
            //alert("inside profile service!")
            model.user={};

            userService
                .findAllAppointmentsByUserId(uId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);

                    var _appointments_future = [];
                    var _appointments_previous = [];
                    model.user.email = user.email;
                    model.user.profile = user.profile;
                    model.user.userType = user.userType;
                    model.user.username = user.username;
                    model.user._appointments_future = [];
                    model.user._appointments_previous = [];

                    //console.log(new Date(Date.now()));
                    //console.log(user);

                    for(d in user._appointments)   {
                        if (new Date(user._appointments[d].date) >= new Date(Date.now())) {
                            _appointments_future.push(user._appointments[d]);
                        }
                    };
                    model.user._appointments_future = _appointments_future.slice(0,3);

                    for(d in user._appointments)   {
                        if (new Date(user._appointments[d].date) < new Date(Date.now())) {
                            _appointments_previous.push(user._appointments[d]);
                        }
                    };
                    model.user._appointments_previous = _appointments_previous.slice(0,3);
                    //console.log(model.user._appointments);

                    return model.user;
                });
        }
        init();

        /*function createAppointment() {

            appointment = {
                patient_name:model.user.username,
                patientId:uId,
                doctor_name:"Select Doctor",
                doctorId:"5993630a91ba6b3fedd0c2b4",
                date:Date.now(),
                time:"12:00 PM"
            };

            //console.log("##########");
            appointmentService
                .createappointment(uId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside profile controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    //console.log()
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                });
        }*/

        function createAppointment() {
            $location.url("/user/" + uId + "/doctor");}

        function showInsuranceById () {
            $location.url("/user/" + uId + "/insurance");
        }

        function showUserReportById () {
            $location.url("/user/" + uId + "/appointment/" + model.user._appointments_previous[0]._id + "/report/" + model.user._appointments_previous[0]._reports[0]);
        }

        function rescheduleAppointment (appointmentId) {
            $location.url("/user/" + uId + "/appointment/" + appointmentId);
        }
    }

})();