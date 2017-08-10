/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("loginController", loginController)

    function loginController($location, userService, $rootScope) {

        var model = this;
        model.login = login;

        function login(user) {
            //alert("Hi from login controller");
            var promise = userService.findUserByUsernameAndPassword(user.username, user.password)
            promise.then(function (response)    {
                inuser = response.data;
                //alert(inuser);
                if (inuser === "0") {
                    model.message = "Incorrect credentials for user '" + user.username + "' !!!";
                    alert(model.message);
                }
                else {
                    model.message = "Welcome back " + inuser.username + " !!!";
                    $rootScope.currentUser = inuser;
                    //alert("user is " + inuser.username +" "+inuser.password+inuser._id);
                    $location.url("/profile/" + inuser._id);
                }
            });

        }

        function processResponse(response){

        }



        model.register = (function () {
            $location.url("/register");
        })
    }
})();