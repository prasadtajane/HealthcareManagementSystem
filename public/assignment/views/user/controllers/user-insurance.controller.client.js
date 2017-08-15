/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("insuranceController", insuranceController);

    function insuranceController($location, insuranceService, userService, $routeParams)   {

        var model = this;
        model.userId = $routeParams.userId;
        model.deleteInsuranceByAgent = deleteInsuranceByAgent;
        model.removeInsuranceFromUser = removeInsuranceFromUser;
        model.deleteInsurance = deleteInsurance;

        function init() {
            listInsurance=[];
            userInsuracnce={};
            insuranceService
                .findAllInsurancesByUserId(model.userId)
                .then(function (insurances){
                    model.insurances = insurances;
                    for(i in insurances)   {
                        for (j in insurances[i].plans)  {
                            userInsuracnce.id = insurances[i].uid;
                            userInsuracnce.title = insurances[i].name;
                            userInsuracnce.name = insurances[i].plans[j].name;
                            userInsuracnce.planid = insurances[i].plans[j].uid;
                            userInsuracnce.category = insurances[i].plans[j].category;
                            listInsurance.push(userInsuracnce);
                            userInsuracnce={};
                        }
                    }
                    console.log(listInsurance);
                    model.listInsurance = listInsurance;
                    return listInsurance;
                });
        }
        init();

        function deleteInsuranceByAgent(insuranceId) {
            insuranceService
                .deleteInsuranceByAgent(model.userId,insuranceId)
                .then(function (status){
                    //$location.url('/user/'+ model.userId + "/insurance");
                    removeInsuranceFromUser(insuranceId);
                });
        }

        function removeInsuranceFromUser(insuranceId){
            insuranceService
                .removeInsuranceFromUser(model.userId,insuranceId)
                .then(function (status){
                    $location.url('/user/'+ model.userId + "/patient");
                });
        }

        function deleteInsurance() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    if(user.userType === 'agent')    {
                        deleteInsuranceByAgent(insuranceId);
                        return;
                    }
                    else    {
                        removeInsuranceFromUser(insuranceId);
                        return;
                    }
                });
        }
    }
})();