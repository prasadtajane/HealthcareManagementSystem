/**
 * Created by prasadtajane on 7/21/17.
 */

(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService)

    function pageService($http)   {

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPagesByWebsite = findPagesByWebsite;
        this.findPageByName = findPageByName;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [];

        //findPageByWebsiteId(websiteId)
        function findPageByWebsiteId(userId, websiteId) {
            //http://localhost:3000/api/profile/456/website/123/page
            return $http.get("/api/profile/" + userId + "/website/" + websiteId + "/page");
        }

        function findPagesByWebsite(userId, websiteId) {
            //alert("Inside findPagesByWebsite of pageService.")
            return this.findPageByWebsiteId(userId, websiteId) ;
        }

        function findPageByName(userId, websiteId, pageName) {
            //http://localhost:3000/api/profile/456/website/456/page?pageName=Post 1
            return $http.get("/api/profile/" + userId + "/website/" + websiteId + "/page?pageName=" + pageName);
        }

        function findPageById(userId, websiteId, pageId) {
            //http://localhost:3000/api/profile/456/website/456/page/432
            return $http.get("/api/profile/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }

        //createPage(websiteId, page)
        function createPage(userId, websiteId, page) {
            //http://localhost:3000/api/profile/456/website/123/page
            return $http.post("/api/profile/" + userId + "/website/" + websiteId + "/page", page);
        }

        //updatePage(pageId, page)
        function updatePage(userId, websiteId, pageId, page1)  {
            //http://localhost:3000/api/profile/456/website/456/page/432
            return $http.put("/api/profile/" + userId + "/website/" + websiteId + "/page/" + pageId, page1);
        }

        //deletePage(pageId)
        function deletePage(userId, websiteId, pageId)   {
            //http://localhost:3000/api/profile/456/website/456/page/432
            return $http.delete("/api/profile/" + userId + "/website/" + websiteId + "/page/" + pageId);
        }

    }

})();