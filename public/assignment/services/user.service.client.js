/**
 * Created by prasadtajane on 7/19/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http)  {

        var users = [];

        var api =  {
            createUser:createUser,
            findUserById:findUserById,
            updateUserByUserId:updateUserByUserId,
            deleteUserByUserId:deleteUserByUserId,
            "findUserByUsername": findUserByUsername,
            findUserByUsernameAndUserType:findUserByUsernameAndUserType,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword
        };
        return api;

        function findUserByUsernameAndPassword(username, password) {
            var host = "/api/user?";
            var query = "username=" + username + "&password=" + password;
            var url = host + query;
            return $http.get(url);
            //alert(response);
            //return res;
        }

        function findUserById(userId) {
            ///api/user/:userId
            return $http.get("/api/user/" + userId);
                /*.then(function (response) {
                    response.data;
                });*/
        }

        function findUserByUsername(username)   {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByUsernameAndUserType(username, uType)   {
            return $http.get("/api/user?username=" + username + "&userType=" + uType);
        }

        function createUser(newuser)   {
            //console.log(newuser);
            return $http.post("/api/user/", newuser);
        }

        function updateUserByUserId(user, userId)   {
            $http.put("/api/user/" + userId, user);
            //alert("inside update service " + userId + " " + user);
        }

        function deleteUserByUserId(userId) {
            ///api/user/:userId
            return $http.delete("/api/user/" + userId);
        }

    }
})();
