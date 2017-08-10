/**
 * Created by prasadtajane on 8/6/17.
 */
(function (){
    angular
        .module("WamApp")
        .controller("flickrController",flickrController);

    function flickrController($location, $routeParams, $sce, widgetService, flickrService) {

        var model = this;

        var pageId = $routeParams.pageId;
        var userId = $routeParams["userId"];
        var widgetId = $routeParams.widgetId;
        var websiteId = $routeParams["websiteId"];

        model.trust = trust;
        model.selectPhoto = selectPhoto;
        model.searchPhotos = searchPhotos;
        model.backToProfile = backToProfile;
        model.backToWidgets = backToWidgets;
        model.getSnippetUrl = getSnippetUrl;
        model.goToEditWidget = goToEditWidget;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.getEmbededYouTubeLink = getEmbededYouTubeLink;

        function init(){
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

        function selectPhoto(photo){
            var photoUrl = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg"
            var photoWidgetUrl =
                {
                    "_id":model.widgetId,
                    "name":model.widget.name,
                    "widgetType": model.widget.widgetType,
                    "pageId": model.widget.pageId,
                    "text": model.widget.text,
                    "width": model.widget.width,
                    "url":photoUrl
                };
            /*
            { "name": "Image1",     "widgetType": "IMAGE",      "pageId": "321",    "text": "lorempixel"
                , "width": "100%",     "url": "http://lorempixel.com/400/200/"},
            */
            flickrService
                .updatePhoto(model.userId,model.websiteId,model.pageId,model.widgetId,photoWidgetUrl)
                .then(function (widget){
                    model.widget=widget;
                    $location.url('/profile/'+ model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widgetId);
                });
        }
        // ng-src="https://farm{{photo.farm}}.staticflickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}_s.jpg"

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                    // console.log(response.data);
                });


        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
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

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getEmbededYouTubeLink(linkUrl) {
            var embed = "https://www.youtube.com/embed/";
            var splitUrl = linkUrl.split('/');
            embed += splitUrl[(splitUrl.length)-1];
            return $sce.trustAsResourceUrl(embed);
        }

    }
})();