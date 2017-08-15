/**
 * Created by prasadtajane on 7/19/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("appointmentService", appointmentService);

    function appointmentService($http)  {

        var users = [];

        var api =  {
            createUser:createUser,
            findUserById:findUserById,
            updateUserByUserId:updateUserByUserId,
            deleteUserByUserId:deleteUserByUserId,
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword
        };
        return api;

        function findUserByUsernameAndPassword(username, password) {
            ///api/profile?username=alice&password=alice
            var host = "/api/user?";
            var query = "username=" + username + "&password=" + password;
            var url = host + query;
            var response = $http.get(url);
            //alert(response);
            return response;
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
