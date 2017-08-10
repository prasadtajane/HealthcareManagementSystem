/**
 * Created by prasadtajane on 7/21/17.
 */

(function() {
    angular
        .module("WamApp")
        .controller("editPageController", editPageController);

    function editPageController($location, $routeParams, pageService)    {

        var model = this;
        var userId = $routeParams.userId;
        var pageId = $routeParams.pageId;
        var websiteId = $routeParams.websiteId;

        model.goToWidgetList=goToWidgetList;
        model.backToPageList=backToPageList;
        model.backToProfile=backToProfile;
        model.updatePage=updatePage;
        model.deletePage=deletePage;
        model.goToPages=goToPages;

        model.createNewPage=createNewPage;
        model.goToWidgets=goToWidgets
        model.editPage=editPage;

        function init() {
            //alert(model.page);
            pageService.findPagesByWebsite(userId, websiteId)
                .then(function (responce) {
                    model.pageList = responce.data;
                });
            //alert("Inside page-edit.controller init. pageId - " + pageId)
            pageService.findPageById(userId, websiteId, pageId)
                .then(function (response) {
                    model.page = response.data;
                    model.object=model.page;
                    return model.page;
                });
        }
        init();

        function backToProfile() {
            //alert("inside backToProfile")
            $location.url("/profile/" + userId);
        }

        function backToPageList() {
            //alert("inside backToPageList from page-edit.controller")
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }

        //function updatePage(pageId, page1)
        function updatePage(page1) {
            //alert("Inside update website");
            pageService.updatePage(userId, websiteId, pageId, page1)
                .then(function (response) {
                    var page = response.data;
                    if (page)   {
                        $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
                    }
                });
        }

        //function deletePage(pageId)
        function deletePage()   {
            //alert("Inside delete website");
            pageService.deletePage(userId, websiteId, pageId)
                .then(function (response) {
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page");

                });
        }
        
        function goToPages() {
            ///user/:userId/website/:websiteId/page
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }

        function goToWidgetList() {
            ///profile/:userId/website/:websiteId/page/pageId/widget
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
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


        model.brand="Edit Page";
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            backToPageList();
        }

        function okay(page) {
            updatePage(page);
        }
    }
})();