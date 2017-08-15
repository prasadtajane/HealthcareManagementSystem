/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("allagentController", allagentController);

    function allagentController(insuranceService)   {

        var model = this;

        function init() {
            insuranceService
                .findAllInsurance()
                .then(function (insurances){
                    model.insurances = insurances;
                });
        }
        init();

    }
})();