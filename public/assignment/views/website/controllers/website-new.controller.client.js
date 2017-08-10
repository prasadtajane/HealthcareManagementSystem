/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($location, $routeParams, websiteService) {

        var model = this;

        model.backToProfile=backToProfile;
        model.backToWebsiteList=backToWebsiteList;
        model.findPages=findPages;

        model.createNewWebsite=createNewWebsite;
        model.editWebsite=editWebsite;
        model.goToPages=goToPages;

        var userId = $routeParams["userId"];
        //var websiteId = $routeParams["websiteId"];

        function init() {
            model.object=model.website;
            websiteService.findWebsiteByUserId(userId)
                .then(function (response) {
                    model.websiteList = response.data;
                });
            //return model.websiteList;
            //alert("Hello " + userId);
        }
        init();

        function backToProfile() {
            //alert("inside backToProfile")
            $location.url("/profile/" + userId);
        }

        function backToWebsiteList() {
            $location.url("/profile/" + userId + "/website");
        }

        function findPages() {
            ///user/:uid/website/:wid/page
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }


        model.create = (
            function (website) {
                if (typeof website === "undefined")   {
                    alert("Website name and description cannot be null!")
                    return;
                }
                else if (website.name === null || website.description === null)   {
                    alert("Website name and description cannot be null!")
                    return;
                }
                else    {
                    websiteService.createWebsite(userId, website)
                        .then(function (response) {
                            if (response.data != "0")    {
                                $location.url("/profile/" + userId + "/website");
                            }
                            else    {
                                alert("Website with name '" + website.name + "' already exists !");
                            }
                        });
                }
            })


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

        function goToPages(websiteName)    {
            websiteService.findWebsiteByName(userId, websiteName)
                .then(function (responce) {
                    model.website = responce.data;
                    var websiteId = model.website._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
                });
        }



        model.brand="New Website";
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            backToWebsiteList();
        }

        function okay(website) {
            model.create(model.website);
        }

    }
})();