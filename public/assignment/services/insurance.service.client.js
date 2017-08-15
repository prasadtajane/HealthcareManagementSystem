/**
 * Created by Sourabh Punja on 8/14/2017.
 */


(function () {
    angular
        .module("WamApp")
        .factory("insuranceService",insuranceService);

    function insuranceService($http) {

        var api= {
            "findAllInsurance": findAllInsurance,
            "findAllInsurancesByUserId": findAllInsurancesByUserId,
            "createInsurance": createInsurance,
            "updateInsurance": updateInsurance,
            "deleteInsuranceByAgent": deleteInsuranceByAgent,
            "findInsuranceById": findInsuranceById,
            "addInsuranceInUser": addInsuranceInUser,
            "removeInsuranceFromUser": removeInsuranceFromUser
        };

        return api;

        function removeInsuranceFromUser(userId,insuranceId) {
            var url = "/api/user/"+userId+ "/insurance/"+insuranceId+"/patient";
            return $http.delete(url)
                .then(function(response){
                    return response.status;
                });
            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //     pages.splice(p,1);
            //     return;
            //     }
            // }
        }

        function addInsuranceInUser(insuranceId,userId){
            var url = "/api/user/"+userId+"/insurance/"+insuranceId+"/add";
            return $http.get(url)
                .then(function (response){
                    return response.status;
                });
        }

        function findAllInsurancesByUserId(userId){
            var url = "/api/user/"+userId+ "/insurance";
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findAllInsurance(){
            var url = "/api/insurance";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var pagelist=[];
            // for (var p in pages){
            //     if (pages[p].websiteId === websiteId){
            //         pagelist.push(pages[p]);
            //     }
            // }
            // return pagelist;
        }

        function findInsuranceById(userId,insuranceId){
            var url = "/api/user/"+userId+ "/insurance/"+insuranceId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         return angular.copy(pages[p]);
            //     }
            // }
        }

        function createInsurance(userId,insurance){
            var url = "/api/user/"+userId+ "/insurance";
            return $http.post(url,insurance)
                .then(function(response){
                    return response.data;
                });
            // page._id = (new Date()).getTime() + "";
            // pages.push(page);
            // return page;
        }

        function updateInsurance(userId,insuranceId,insurance){
            var url = "/api/user/"+userId+ "/insurance/"+insuranceId;
            return $http.put(url,insurance)
                .then(function(response){
                    return response.data;
                });
            // for (var p in pages){
            //     if (pages[p]._id === pageId){
            //         pages[p]=page;
            //         return pages[p];
            //     }
            // }
        }

        function deleteInsuranceByAgent(userId,insuranceId) {
            var url = "/api/user/"+userId+ "/insurance/"+insuranceId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
            // for (var p in pages) {
            //     if (pages[p]._id === pageId) {
            //     pages.splice(p,1);
            //     return;
            //     }
            // }
        }

    }

})();