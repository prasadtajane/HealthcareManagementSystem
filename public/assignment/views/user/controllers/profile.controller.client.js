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
        //model.showUserReportById = showUserReportById;

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

        function createAppointment() {

            appointment = {
                patient_name:model.user.username,
                patientId:uId,
                doctor_name:"Select Doctor",
                doctorId:"5993630a91ba6b3fedd0c2b4",
                date:Date.now(),
                time:"12:00 PM"
            };

            console.log("##########");
            appointmentService
                .createappointment(uId, appointment)
                .then(function (appointmentOut) {
                    console.log("************");
                    console.log("inside profile controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    console.log()
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                });
        }

        function showInsuranceById () {
            $location.url("/user/" + uId + "/insurance");
        }
    }

})();