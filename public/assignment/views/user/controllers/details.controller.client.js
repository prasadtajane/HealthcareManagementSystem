/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, $location, userService, appointmentService, $rootScope) {


        var model = this;
        var uId = $routeParams["userId"];
        var detailId = $routeParams["detailId"];

        model.logout = logout;
        model.cancel = cancel;
        model.postReview = postReview;
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
                .findAllAppointmentsByUserId(detailId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);

                    var _appointments_future = [];
                    var _appointments_previous = [];

                    model.user.email = user.email;
                    model.user.ratings = user.ratings;
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

        function createAppointment() {

            if ($routeParams["userId"]) {
                //console.log("User Online");

                appointment = {
                    patient_name:"Your Name...",
                    patientId:uId,
                    doctor_name:model.user.username,
                    doctorId:model.user._id,
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
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };

        }

        /*function createAppointment() {
            $location.url("/user/" + uId + "/doctor");}*/

        function showInsuranceById () {
            $location.url("/user/" + uId + "/insurance");
        }

        function showUserReportById () {
            $location.url("/user/" + uId + "/appointment/" + model.user._appointments_previous[0]._id + "/report/" + model.user._appointments_previous[0]._reports[0]);
        }

        function rescheduleAppointment (appointmentId) {
            $location.url("/user/" + uId + "/appointment/" + appointmentId);
        }

        function cancel() {
            $location.url("/user/" + uId + "/details/" + detailId);
        }

        function postReview(review) {

            var ratings = {
                provider: review.name,
                rating: review.rating,
                comments: review.comment,
                provider_url:"/details/"+ uId,
                //image_url:uId.url
                image_url:"uploads/heart-pulse.jpeg"
            };
            //console.log(ratings);

            userService
                .findAllAppointmentsByUserId(detailId)
                .then(function (response) {
                    var user = response.data;
                    user.ratings.push(ratings);

                    console.log(user);
                    console.log(detailId);
                    userService
                        .updateUserByUserId(user, detailId)
                        .then(function (status) {
                            console.log(status);
                            $location.url("/user/" + uId + "/details/" + detailId);
                        });
                });

        }

    }

})();