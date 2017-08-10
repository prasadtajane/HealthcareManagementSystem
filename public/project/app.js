/**
 * Created by Sourabh Punja on 8/4/2017.
 */
(function (){
   angular
       .module("healthcareApp",['ngRoute'])
       .config(configuration)
       .controller("searchController",searchController)
       .service("doctorService", doctorService);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
    }
    function searchController(doctorService) {
        var model = this;

        model.searchDoctorByName = searchDoctorByName;

        function init() {

        }

        init();

        function searchDoctorByName(doctorName) {
            doctorService
                .searchDoctorByName(doctorName)
                .then(doctorNames);
        }
        function doctorNames(docnames){
            console.log(docnames);
            model.docnames = docnames;

        }
    }
    function doctorService($http) {
        this.searchDoctorByName = searchDoctorByName;
        function searchDoctorByName(doctorName){
            var url = "https://api.betterdoctor.com/2016-03-01/doctors?name="+doctorName+"&user_key=09d8cd29366f73fbec522ef95f41fa69";
                       return $http.get(url)
                            .then(function (response) {
                                return response.data;
                            });
        }
    }

})();