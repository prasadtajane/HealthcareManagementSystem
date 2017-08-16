/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("doctorController", doctorController);

    function doctorController($location, $routeParams, userService, doctorService, appointmentService)   {

        var model = this;

        model.showDoctorDetails = showDoctorDetails;
        model.createAppointment = createAppointment;
        model.searchDoctorByName = searchDoctorByName;

        function init() {
            /*
            console.log($routeParams["userId"]);
            if($routeParams["userId"])    {
                console.log("Hello");
            }
            else console.log("Not Logged In");

             userService
             .findUserByNPI("123456789")
             .then(function (response) {
             console.log("response");
             console.log(response.data);
             if(response.data)   {
             console.log("Doctor Found!");
             }
             else console.log("Not Found!");
             });
            */

        }
        init();

        function searchDoctorByName(doctorName) {
            doctorService
                .searchDoctorByName(doctorName)
                .then(doctorNames);
        }

        function doctorNames(docnames){
            console.log(docnames.data);
            model.doctorList = docnames.data;
        }
        
        function showDoctorDetails(doctor) {
            if ($routeParams["userId"])   {
                console.log("User Online");
                userService
                    .findUserByNPI(doctor.npi)
                    .then(function (response) {
                        console.log("response");
                        //console.log(response.data);
                        if(response.data)   {
                            console.log("Doctor Found!");
                            doctorId = response.data._id;
                            $location.url("/user/" + doctorId);
                        }
                        else    {
                            console.log("Creating a Doctor!");
                            userService
                                .createUser(doctor)
                                .then(function (response) {
                                    var user = response.data;
                                    doctorId = user._id;
                                    $location.url("/user/" + doctorId);
                                });
                        };
                    });
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };
            
        }

        function create(uId, appointment) {
            //console.log("##########");
            return appointmentService
                .createappointment(uId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside profile controller then - createAppointment");
                    //console.log(appointmentOut.data);
                    appointmentId = appointmentOut.data._id;
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                })
        }

        function createAppointment(doctor) {
            if ($routeParams["userId"])   {
                //console.log("User Online");
                var appointment = {
                    patient_name:"Your Name",
                    patientId:$routeParams["userId"],
                    doctor_name:doctor.profile.first_name+", "+doctor.profile.last_name,
                    doctorId:doctor._id,
                    date:Date.now(),
                    time:"12:00 PM"
                };
                userService
                    .findUserByNPI(doctor.npi)
                    .then(function (response) {
                        //console.log("response");
                        //console.log(response.data);
                        if(response.data)   {
                            //console.log("Doctor Found!");
                            appointment.doctorId = response.data._id;
                            create($routeParams["userId"], appointment);
                        }
                        else    {
                            //console.log("Creating a Doctor!");
                            userService
                                .createUser(doctor)
                                .then(function (response) {
                                    var user = response.data;
                                    appointment.doctorId = user._id;
                                    create($routeParams["userId"], appointment);
                                });
                        };
                    });
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };
         }

    }
})();