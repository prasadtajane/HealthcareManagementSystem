(function () {
    angular
        .module("WamApp")
        .controller("homeController", homeController);

    function homeController($location, $rootScope) {

        var model = this;
        model.logout = logout;
        model.searchDoctor = searchDoctor;
        model.searchInsurances = searchInsurances;

        function init() {
        }
        init();

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

        function searchInsurances() {
            if($rootScope.currentUser)    {
                $location.url("/user/" + $rootScope.currentUser._id + "/insurance-search/#searchHere");
            }
            else {
                $location.url("/insurance-search/#searchHere");
            }
        }

        function searchDoctor() {
            if($rootScope.currentUser)    {
                $location.url("/user/" + $rootScope.currentUser._id + "/doctor/#searchHere");
            }
            else {
                $location.url("/doctor/#searchHere");
            }
        }

    }
})();