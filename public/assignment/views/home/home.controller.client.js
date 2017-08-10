(function () {
    angular
        .module("WamApp")
        .controller("homeController", homeController);

    function homeController($location, $rootScope) {

        var model = this;
        model.logout = logout;

        function init() {
        }
        init();

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/login");
        }

    }
})();