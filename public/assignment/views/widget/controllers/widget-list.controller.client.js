/**
 * Created by prasadtajane on 7/21/17.
 */

(function ()    {
    angular
        .module("WamApp")
        .controller("widgetController", widgetController);

    function widgetController($location, $routeParams, $sce, widgetService) {

        var model = this;

        var pageId = $routeParams.pageId;
        var userId = $routeParams["userId"];
        var websiteId = $routeParams["websiteId"];

        model.trust=trust;
        model.getSnippetUrl=getSnippetUrl;
        model.backToProfile=backToProfile;
        model.backToPageList=backToPageList;
        model.goToEditWidget=goToEditWidget;
        model.findWidgetByPageId=findWidgetByPageId;
        model.goToNewWidgetChooser=goToNewWidgetChooser;
        model.getEmbededYouTubeLink=getEmbededYouTubeLink;

        function init() {
            model.object=model.widget;
            widgetService.findWidgetsByPageId(userId, websiteId, pageId)
                .then(function (response) {
                    model.widgetList = response.data;
                    return model.widgetList;
                });
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getSnippetUrl(type) {
            //alert(type);
            //console.log(type.toLowerCase());
            return ("views/widget/templates/snippets/widget-" + type.toLowerCase() + "-snippet.view.client.html");
        }

        function backToProfile() {
            //alert("inside backToProfile from page-new.controller")
            $location.url("/profile/" + userId);
        }

        function backToPageList() {
            //alert("inside backToPageList from page-new.controller")
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page");
        }

        function findWidgetByPageId()    {
            widgetService.findWidgetByPageId(userId, websiteId, pageId)
                .then(function (response) {
                    return response.data;
                });
        }

        function goToNewWidgetChooser() {
            ///user/:uid/website/:wid/page/:pid/widget/new
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }

        function goToEditWidget(widget) {
            ///profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId
            widgetService.getWidgetId(userId, websiteId, pageId, widget)
                .then(function (response) {
                    widgets = response.data;
                    for(w in widgets) {
                        if (widgets[w].name === widget.name && widgets[w].widgetType === widget.widgetType && widgets[w].text === widget.text) {
                            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgets[w]._id);
                            return;
                        }
                    }
                    alert("goToEditWidget Failed!");
                });
        }

        function getEmbededYouTubeLink(linkUrl) {
            var embed = "https://www.youtube.com/embed/";
            var splitUrl = linkUrl.split('/');
            embed += splitUrl[(splitUrl.length)-1];
            return $sce.trustAsResourceUrl(embed);
        }


        model.brand="Widgets";
        model.chevronLeft=chevronLeft;
        model.okay=okay;

        function chevronLeft() {
            model.backToPageList();
        }

        function okay(page) {
            model.create(model.page);
        }
    }
})();