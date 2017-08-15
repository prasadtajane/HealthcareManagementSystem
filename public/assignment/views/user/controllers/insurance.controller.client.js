/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("agentController", agentController);

    function agentController($location, insuranceService,$routeParams)   {

        var model = this;
        model.userId = $routeParams.userId;
        model.deleteInsurance = deleteInsurance;

        function init() {
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    model.insurances = insurances;
                });
        }
        init();

        function deleteInsurance(insuranceId) {
            insuranceService
                .deleteInsurance(model.userId,insuranceId)
                .then(function (){
                    $location.url('/user/'+ model.userId + "/website");
                });
        }
    }
})();