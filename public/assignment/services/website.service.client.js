/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService)

    function websiteService($http)   {

        this.findWebsiteByUserId = findWebsiteByUserId;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteByName = findWebsiteByName;
        this.findWebsiteById = findWebsiteById;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        var websites = [];

        function findWebsiteByUserId(userId) {
            //alert("inside client service - findWebsiteByUserId");
            return $http.get("/api/profile/" + userId + "/website");
        }

        function findWebsitesByUser(userId) {
            return this.findWebsiteByUserId(userId);
        }

        function findWebsiteByName(userId, websiteName) {
            //console.log([userId, websiteName]);
            //console.log("/api/profile/" + userId + "/website?websiteName=" + websiteName);
            return $http.get("/api/profile/" + userId + "/website?websiteName=" + websiteName);
        }

        function findWebsiteById(userId, websiteId) {
            return $http.get("/api/profile/"+ userId + "/website/" + websiteId);
        }

        function createWebsite(userId, website) {
            //"/api/profile/:userId/website"
            return $http.post("/api/profile/"+ userId + "/website", website);
        }

        function updateWebsite(userId, websiteId, website1)  {
            return $http.put("/api/profile/"+ userId + "/website/" + websiteId, website1);
        }

        function deleteWebsite(userId, websiteId)   {
            //"api/profile/:userId/website/:websiteId"
            return $http.delete("/api/profile/"+ userId + "/website/" + websiteId);
        }

    }

})();