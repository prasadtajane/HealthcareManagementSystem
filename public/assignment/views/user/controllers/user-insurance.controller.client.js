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
        model.deleteInsuranceByAgent = deleteInsuranceByAgent;
        model.removeInsuranceFromUser = removeInsuranceFromUser;

        function init() {
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    model.insurances = insurances;
                });
        }
        init();

        function deleteInsuranceByAgent(insuranceId) {
            insuranceService
                .deleteInsuranceByAgent(model.userId,insuranceId)
                .then(function (){
                    $location.url('/user/'+ model.userId + "/agent");
                });
        }

        function removeInsuranceFromUser(insuranceId){
            insuranceService
                .removeInsuranceFromUser(model.userId,insuranceId)
                .then(function (status){
                    $location.url('/user/'+ model.userId + "/patient");
                });
        }
    }
})();