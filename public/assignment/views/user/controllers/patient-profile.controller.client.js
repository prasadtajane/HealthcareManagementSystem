/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("patientProfileController", patientProfileController)

    function patientProfileController($routeParams, $location, userService, $rootScope) {

        var model = this;
        model.userId = $routeParams["userId"];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.firstname = {}
        model.lastname = {}

        model.updateUser = updateUser;
        model.addNewDegree = addNewDegree;

        function init() {
            //alert("inside profile service!")
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    //console.log(user);
                    user.physic.birthday = new Date(user.physic.birthday);
                    user.smokeStatus = user.smokeStatus.toString();
                    // model.location = user.practices[0].visit_address;
                    // model.address = model.location.street + "," + model.location.street2 + "," + model.location.city + ","+ model.location.state + "," + model.location.zip
                    // model.phone = user.practices[0].phones[0]
                    // model.email = user.email
                    //console.log(model.user);
                    model.user = user;
                    model.firstname = model.user.profile.first_name;
                    model.lastname = model.user.profile.last_name;


                    //console.log(model.user.educations);
                });
            //model.user = userService.findUserById(uId);

        }
        init();

        function updateUser(user) {
            //alert("inside update of controller");
            userService.updateUserByUserId(user, model.userId)
                .then(function (response){
                // console.log(model.user);
                // var usr = response.data;
                var status = response.status;
                if (status === 200){
                    model.message = "Update Successfull";
                }else{
                    model.message = "Update not successfull";
                }
                // console.log(usr);
                // usr.dob = new Date(usr.dob);
                // model.user = usr;
            });

        }

        function deleteUser(user) {
            console.log(model.userId);
            userService
                .deleteUserByUserId(model.userId)
                .then(function (response) {
                    suCode = response.data;
                    if (suCode === "200") {
                        // alert("Thank you for your patience, user with username '" + user.username + "' has been removed!");
                        $location.url("/login");
                    }
                });
        }

        function addNewDegree(newDegree) {
            //console.log("in");
            //console.log(newDegree);
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    var user = response.data;
                    user.educations.push(newDegree);

                    //console.log(user);
                    //console.log(model.userId);
                    userService
                        .updateUserByUserId(user, model.userId)
                        .then(function (status) {
                            console.log(status);
                            $location.url("/user/" + model.userId + "/edit");
                        });
                });
        }
    }

})();