/**
 * Created by prasadtajane on 7/21/17.
 */
(function() {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {

        var widgets = [];

        var api =  {
            findWidgetsByPageId:findWidgetsByPageId,
            createWidget:createWidget,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            getWidgetId:getWidgetId,
            clean:clean,
            sort:sort
        };
        return api;

        //findWidgetsByPageId(pageId)
        function findWidgetsByPageId(userId, websiteId, pageId)    {
            //http://localhost:3000/api/profile/456/website/456/page/321/widget
            return $http.get("/api/profile/" + userId +"/website/" + websiteId +"/page/" + pageId +"/widget");
        }

        //createWidget(pageId, widget)
        function createWidget(userId, websiteId, pageId, widget)   {
            //http://localhost:3000/api/profile/456/website/456/page/321/widget
            return $http.post("/api/profile/" + userId +"/website/" + websiteId +"/page/" + pageId +"/widget", widget);
        }

        //findWidgetById(widgetId)
        function findWidgetById(userId, websiteId, pageId, widgetId)   {
            //http://localhost:3000/api/profile/456/website/456/page/321/widget/123
            return $http.get("/api/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }

        //updateWidget(widgetId, widget)
        function updateWidget(userId, websiteId, pageId, widgetId, widget) {
            //http://localhost:3000/api/profile/456/website/456/page/321/widget/123
            return $http.put("/api/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId, widget);
        }

        //deleteWidget(widgetId)
        function deleteWidget(userId, websiteId, pageId, widgetId) {
            //http://localhost:3000/api/profile/456/website/456/page/321/widget/123
            return $http.delete("/api/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }

        function getWidgetId(userId, websiteId, pageId, widget){
            return $http.get("/api/profile/" + userId +"/website/" + websiteId +"/page/" + pageId +"/widget");
        }

        function clean()    {
            //alert("inside actual clean");
            for(w in widgets)   {
                if(typeof widgets[w].name === 'undefined' && typeof widgets[w].text === 'undefined')    {
                    widgets.splice(w, 1);
                }
                else if(widgets[w].widgetType === "YOUTUBE" || widgets[w].widgetType === "IMAGE")   {
                    if (typeof widgets[w].url === 'undefined') {
                        widgets.splice(w, 1);
                    }
                }
            }
        }

        function sort(pageId, start, end) {
            //http://localhost:3000/api/profile/456/website/456/age/:pageId/widget?initial=index1&final=index2
            ///page/:pageId/widget?initial=index1&final=index2
            console.log("inside service client");
            console.log([start, end]);
            url = "/api/page/"+pageId+"/widget?initial="+start+"&final="+end;
            console.log(url);
            $http.put(url);
        }

    }
})();