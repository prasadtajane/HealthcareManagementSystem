/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("newPageController", newPageController);

    function newPageController($location, $routeParams, pageService) {

        var model = this;
        model.backToProfile=backToProfile;
        model.backToPageList=backToPageList

        model.createNewPage=createNewPage;
        model.goToWidgets=goToWidgets
        model.editPage=editPage;

        var userId = $routeParams["userId"];
        var websiteId = $routeParams["websiteId"];

        function init() {
            //alert("Inside page-new.controller init.")
            model.object=model.page;
            pageService.findPagesByWebsite(userId, websiteId)
                .then(function (responce) {
                    model.pageList = responce.data;
                    return model.pageList;
                });
        }
        init();

        function backToProfile() {
            //alert("inside backToProfile from page-new.controller")
            $location.url("/profile/" + userId);
        }

        function backToPageList() {
            //alert("inside backToPageList from page-new.controller")
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }


        model.create = (
            function (page) {
                if (typeof page === "undefined")   {
                    alert("Page name and description cannot be null!")
                    return;
                }
                else if (page.name === null || page.description === null)   {
                    alert("Page name and description cannot be null!")
                    return;
                }
                else    {
                    //createPage(websiteId, page)
                    pageService.createPage(userId, websiteId, page)
                        .then(function (response) {
                            var code = response.data;
                            if (code != "0")   {
                                $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
                            }
                            else    {
                                alert("Page with name '" + page.name + "' already exists !");
                            }
                        });
                }
            })


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

        model.brand="New Page";
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            backToPageList();
        }

        function okay(page) {
            model.create(model.page);
        }

    }
})();