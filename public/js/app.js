(function () {
    var app = angular.module('magazineApp', ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "/views/articals.html",
                controller: "ArticalController"
            })
            .when('/detail/:id', {
                templateUrl: "/views/details.html",
                controller: "DetailController"
            });
    });
}());