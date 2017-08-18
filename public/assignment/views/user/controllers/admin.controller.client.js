/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("adminController", adminController);

    function adminController($routeParams, $location, userService, $rootScope) {


        var model = this;
        var uId = $routeParams["userId"];

        var user;
        var userWithInsurance;

        model.newUser;
        model.logout = logout;
        model.editUser = editUser;
        model.deleteUser = deleteUser;
        model.createNewuser = createNewuser;
        model.changeUserType = changeUserType;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

        function init() {
            //alert("inside profile service!")
            model.users;
            /*userService
                .findAllUsers()
                .then(function (response) {
                    //model.userList =response.data;
                    model.userList = [
                        {"username":"a","userType":"agent"},
                        {"username":"b","userType":"doctor"},
                        {"username":"c","userType":"patient"}
                    ];

                });*/
            model.userList = [
                {"username":"a","userType":"agent"},
                {"username":"b","userType":"doctor"},
                {"username":"c","userType":"patient"}
            ];


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

        function editUser(userId) {
            $location("/admin/user/" + userId +"/edit");
        }

        function createNewuser(newUser) {
            var newUser = {
                username:newUser.username,
                password:newUser.password,
                userType:newUser.userType
            } ;
            userService
                .createUser(newUser)
                .then(function (response) {
                    var user = response.data;
                    console.log(user);
                    alert("Created user sucessfully.");
                    $location("/admin/user/" + user._id +"/edit");
                });

        }

        function changeUserType(userId, uType) {
            userService
                .findUserById(userId)
                .then(function (response) {
                    console.log(response);
                    var newUser = response.data;
                    newUser.userType = uType;
                    userService
                        .updateUserByUserId(newUser, userId)
                        .then(function (status) {
                            console.log(status);
                            alert("Updated user sucessfully.");
                        });
                });
        }

        function deleteUser(userId) {
            userService
                .deleteUserByUserId(userId)
                .then(function (status) {
                    console.log(status);
                    alert("Deleted user sucessfully.");
                });
        }




    }

})();