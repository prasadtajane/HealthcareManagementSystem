/**
 * Created by prasadtajane on 7/22/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($location, $routeParams, $sce, widgetService) {

        var model = this;

        var pageId = $routeParams.pageId;
        var userId = $routeParams["userId"];
        var widgetId = $routeParams.widgetId;
        var websiteId = $routeParams["websiteId"];


        model.updateWidget=updateWidget;
        model.deleteWidget=deleteWidget;
        model.backToProfile=backToProfile;
        model.backToWidgets=backToWidgets;

        model.getSnippetUrl=getSnippetUrl;
        model.goToEditWidget=goToEditWidget;
        model.getEmbededYouTubeLink=getEmbededYouTubeLink;

        model.trust = trust;

        function init() {
            model.pageId = pageId;
            model.userId = userId;
            model.widgetId = widgetId;
            model.websiteId = websiteId;

            widgetService.findWidgetById(userId, websiteId, pageId, widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });

            widgetService.findWidgetsByPageId(userId, websiteId, pageId)
                .then(function (response) {
                    model.widgetList = response.data;
                    model.widgets = model.widgetList;
                });
            //return model.widgets;
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function updateWidget(widget) {
            widgetService.updateWidget(userId, websiteId, pageId, widgetId, widget)
                .then(function (response) {
                    if(response.data)   {
                        widgetService.clean();
                        $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                    }
                });
        }

        function deleteWidget() {
            widgetService.deleteWidget(userId, websiteId, pageId, widgetId)
                .then(function (response) {
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

                });
        }

        function backToProfile() {
            widgetService.clean();
            //alert("inside backToProfile from page-new.controller")
            $location.url("/profile/" + userId);
        }

        function backToWidgets() {
            //alert("inside backToWidgets before clean");
            widgetService.clean();
            //alert("inside backToWidgets after clean");
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }

        function getSnippetUrl(type) {
            //alert(type);
            return ("views/widget/templates/snippets/widget-" + type.toLowerCase() + "-snippet.view.client.html");
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
    }
})();