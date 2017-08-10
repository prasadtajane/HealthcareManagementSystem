/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("weblistController", weblistController);

    function weblistController($location, $routeParams, websiteService) {

        var model = this;
        model.backToProfile=backToProfile;
        model.createNewWebsite=createNewWebsite;
        model.editWebsite=editWebsite;
        model.goToPages=goToPages;

        var userId = $routeParams["userId"];

        function init() {
            websiteService.findWebsiteByUserId(userId)
                .then(function (response) {
                    //alert("inside controller - findWebsiteByUserId");
                    model.websiteList = response.data;
                    return model.websiteList;
                });
        }
        init();

        function backToProfile() {
            $location.url("/profile/" + userId);
        }

        function createNewWebsite() {
            $location.url("/profile/" + userId + "/website/new");
        }

        function editWebsite(websiteName) {
            //find website
            //get website id
            //add in location
            //alert("Finding website with name '" + websiteName + "'");
            websiteService.findWebsiteByName(userId, websiteName)
                .then(function (response) {
                    model.website = response.data;
                    var websiteId = model.website._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId);
                });
        }

        function goToPages(websiteName)    {
            websiteService.findWebsiteByName(userId, websiteName)
                .then(function (responce) {
                    model.website = responce.data;
                    var websiteId = model.website._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
                });
        }


        model.brand="Websites";
        model.object=model.website;
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            backToProfile();
        }

        function okay(website) {
        }
    }
})();