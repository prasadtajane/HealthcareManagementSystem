/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider)   {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider
            .when("/", {
                templateUrl: "./views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "./views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website", {
                templateUrl:"views/website/templates/website-list.view.client.html",
                controller: "weblistController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/new", {
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller: "newWebsiteController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId", {
                templateUrl:"views/website/templates/website-edit.view.client.html",
                controller: "editWebsiteController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page", {
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller: "pageController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/new", {
                ///profile/456/website/456/new
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller: "newPageController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId", {
                ///profile/456/website/456/page/321
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller: "editPageController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page/:pageId/widget", {
                ///profile/456/website/456/page/432/widget
                templateUrl:"views/widget/templates/widget-list.view.client.html",
                controller: "widgetController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl:"views/widget/templates/widget-chooser.view.client.html",
                controller: "newWidgetController",
                controllerAs: "model"
            })
            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl:"views/widget/templates/widget-edit.view.client.html",
                controller: "editWidgetController",
                controllerAs: "model"
            })


            .when("/profile/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search", {
                ///profile/456/website/456/page/321/widget/345/search
                templateUrl:"views/widget/templates/widget-flickr-search.view.client.html",
                controller: "flickrController",
                controllerAs: "model"
            })

    }


})();