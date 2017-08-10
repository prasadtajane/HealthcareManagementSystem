/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("pageController", pageController);

    function pageController($location, $routeParams, pageService) {

        var model = this;

        model.backToWebsiteList=backToWebsiteList;
        model.backToProfile=backToProfile;
        model.createNewPage=createNewPage;
        model.goToWidgets=goToWidgets
        model.editPage=editPage;

        var userId = $routeParams["userId"];
        var websiteId = $routeParams["websiteId"];

        function init() {
            //alert("Inside page-list.controller init.")
            pageService.findPagesByWebsite(userId, websiteId)
                .then(function (responce) {
                    model.pageList = responce.data;
                    return model.pageList;
                });
            //alert("Hello " + userId);
        }
        init();

        function backToWebsiteList() {
            $location.url("/profile/" + userId + "/website");
        }

        function backToProfile() {
            $location.url("/profile/" + userId);
        }

        function createNewPage() {
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/new");
        }

        function editPage(pageName) {
            pageService.findPageByName(userId, websiteId, pageName)
                .then(function (responce) {
                    model.page = responce.data;
                    var pageId = model.page._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId);
                });
        }

        function goToWidgets(pageName)    {
            ///user/:uid/website/:wid/page/:pid/widget
            pageService.findPageByName(userId, websiteId, pageName)
                .then(function (responce) {
                    model.page = responce.data;
                    var pageId = model.page._id;
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                });
        }


        model.brand="Pages";
        model.object=model.page;
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            backToWebsiteList();
        }

        function okay(website) {
        }

    }
})();