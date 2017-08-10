/**
 * Created by prasadtajane on 7/21/17.
 */

(function() {
    angular
        .module("WamApp")
        .controller("editWebsiteController", editWebsiteController);

    function editWebsiteController($location, $routeParams, websiteService)    {

        var model = this;
        var userId = $routeParams.userId;
        var websiteId = $routeParams.websiteId;

        model.backToProfile=backToProfile;
        model.backToWebsiteList=backToWebsiteList;
        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;
        model.goToPages=goToPages;

        model.createNewWebsite=createNewWebsite;
        model.editWebsite=editWebsite;

        model.brand="Edit Website";
        model.object=model.website;
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function init() {
            var userId = $routeParams.userId;
            var websiteId = $routeParams.websiteId;
            websiteService.findWebsiteById(userId, websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
            //alert(model.website.description);
            websiteService.findWebsiteByUserId(userId)
                .then(function (response) {
                    model.websiteList = response.data;
                });
        }
        init();

        function backToProfile() {
            //alert("inside backToProfile")
            $location.url("/profile/" + userId);
        }

        function backToWebsiteList() {
            $location.url("/profile/" + userId + "/website");
        }

        function updateWebsite(website) {
            //alert("Inside update website");
            //alert(websiteId);
            websiteService.updateWebsite(userId, websiteId, website)
                .then(function () {
                    $location.url("/profile/" + userId + "/website");
                });
        }

        function deleteWebsite()   {
            //alert("Inside delete website");
            websiteService.deleteWebsite(userId, websiteId)
                .then(function () {
                    $location.url("/profile/" + userId + "/website");
                });

        }

        function goToPages() {
            ///user/:userId/website/:websiteId/page
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }


        function createNewWebsite() {
            $location.url("/profile/" + userId + "/website/new");
        }

        function editWebsite(websiteName) {
            websiteService.findWebsiteByName(userId, websiteName)
                .then(function (response) {
                    model.website = response.data;
                    var websiteId = model.website._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId);
                });
        }

        /*
         function goToPages(websiteName)    {
         websiteService.findWebsiteByName(userId, websiteName)
         .then(function (responce) {
         model.website = responce.data;
         var websiteId = model.website._id;
         $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
         });
         }
        }*/



        function chevronLeft() {
            backToWebsiteList();
        }

        function okay(website) {
            model.updateWebsite(website);
        }


    }
})();