/**
 * Created by Sourabh Punja on 8/15/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("insuranceNewController", insuranceNewController);

    function insuranceNewController($location, insuranceService, userService, $routeParams)   {

        var model = this;
        model.userId = $routeParams.userId;
        model.insuranceId= $routeParams.insuranceId;
        model.updateInsurance = updateInsurance;
        model.deleteInsuranceByAgent = deleteInsuranceByAgent;
        var saveinsurance={}
        function init() {
            userInsurance={};
            console.log(model.userId,model.insuranceId);
            insuranceService
                .findInsuranceById(model.userId,model.insuranceId)
                .then(function (insurance){
                    saveinsurance = insurance;
                    console.log(insurance)
                    userInsurance.id = insurance.uid;
                    userInsurance.title = insurance.name;
                        for (j in insurance.plans)  {
                            userInsurance.name = insurance.plans[j].name;
                            userInsurance.planid = insurance.plans[j].uid;
                            userInsurance.category = insurance.plans[j].category;
                            userInsurance.dataplanid = insurance.plans[j]._id;
                        }
                    console.log(userInsurance);
                    model.userInsurance = userInsurance;
                    return userInsurance;
                });
        }
        init();

        function updateInsurance(insurance) {
            saveinsurance={}
            saveinsurance.uid= insurance.id;
            saveinsurance.name= insurance.title;
            saveinsurance.plans = [{uid:insurance.planid,name:insurance.name,category:insurance.category}]
            console.log(saveinsurance);
            // model.userInsurance = userInsurance;

            insuranceService
                .updateInsurance(model.userId,model.insuranceId,saveinsurance)
                .then(function (insurance){
                    saveinsurance = insurance;
                    console.log(insurance)
                    userInsurance.id = insurance.uid;
                    userInsurance.title = insurance.name;
                    for (j in insurance.plans)  {
                        userInsurance.name = insurance.plans[j].name;
                        userInsurance.planid = insurance.plans[j].uid;
                        userInsurance.category = insurance.plans[j].category;
                    }
                    console.log(userInsurance);
                    model.userInsurance = userInsurance;
                    return userInsurance;
                });
        }

        function deleteInsuranceByAgent(userId,insuranceId,planId) {
            insuranceService
                .deleteInsuranceByAgent(model.userId,model.insuranceId,planId)
                .then(function (insurances){
                    $location.url('/user/'+ model.userId + "/insurance");
                    // removeInsuranceFromUser(insuranceId);
                });
        }
    }
})();