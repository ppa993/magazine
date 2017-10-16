(function () {
    var app = angular.module('magazineApp', ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "/views/articals.html",
                controller: "ArticalController"
            })
            .otherwise({ redirectTo: '/' });
    });
}());