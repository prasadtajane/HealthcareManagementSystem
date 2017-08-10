/**
 * Created by prasadtajane on 7/22/17.
 */
/**
 * Created by prasadtajane on 7/22/17.
 */

(function () {
    angular
        .module("WamApp")
        .controller("newWidgetController", newWidgetController);

    function newWidgetController($location, $routeParams, $sce, widgetService) {

        var model = this;

        var pageId = $routeParams.pageId;
        var userId = $routeParams["userId"];
        var websiteId = $routeParams["websiteId"];

        model.createWidget=createWidget;
        model.backToProfile=backToProfile;
        model.backToWidgets=backToWidgets;
        model.goToNewWidget=goToNewWidget;

        model.getSnippetUrl=getSnippetUrl;
        model.goToEditWidget=goToEditWidget;
        model.getEmbededYouTubeLink=getEmbededYouTubeLink;

        model.trust = trust;

        function init() {

            model.pageId = pageId;
            model.userId = userId;
            model.websiteId = websiteId;

            widgetService.findWidgetsByPageId(userId, websiteId, pageId)
                .then(function (response) {
                    model.widgetList = response.data;
                });
        }
        init();

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function createWidget(widget) {
            widgetService.createWidget(userId, websiteId, pageId, widget)
                .then(function (response) {
                    var newWidget = response.data;
                    if(newWidget)  {
                        model.widgetId = newWidget._id;
                        $location.url("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+newWidget._id);
                    }
                });
        }

        function backToProfile() {
            //alert("inside backToProfile from page-new.controller")
            $location.url("/profile/" + userId);
        }
        
        function backToWidgets() {
            widgetService.clean();
            $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        
        function goToNewWidget(name) {
            //get name from chooser page
            //create new widget object and assign id
            //assign widget type according to the name
            //now redirect(locate) url to the edit page

            var type = name;
            if (type === 'header') {
                type = 'heading';
            }
            var widget = {
                "_page": pageId,
                "widgetType": type.toUpperCase()
            }
            //alert(widget.widgetType);
            widgetService.createWidget(userId, websiteId, pageId, widget)
                .then(function (response) {
                    var newWidget = response.data;
                    var newWidgetId = newWidget._id;
                    model.widgetId = newWidgetId;
                    $location.url("/profile/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + newWidgetId);
                });
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