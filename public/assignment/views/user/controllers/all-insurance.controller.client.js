/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("allagentController", allagentController);

    function allagentController(insuranceService,$routeParams)   {

        var model = this;
        model.userId = $routeParams.userId;
        model.addInsuranceInUser = addInsuranceInUser;

        function init() {
            insuranceService
                .findAllInsurance()
                .then(function (insurances){
                    model.insurances = insurances;
                });
        }
        init();

        function addInsuranceInUser(insuranceId){
            insuranceService
                .addInsuranceInUser(insuranceId,model.userId)
                .then(function (status){
                    model.status = status;
                });
        }
    }
})();