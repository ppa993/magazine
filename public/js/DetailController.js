(function () {
    var app = angular.module('magazineApp');
    
    app.controller('DetailController', function ($scope, $http, $routeParams) {

        //////////////// ARTICAL DETAIL ///////////////
        
            var onGetArticalCompleted = function (response) {
                $scope.artical = response.data[0];
            };

            var onGetArticalError = function (err) {
                $scope.error = "Could not retrieve the artical detail, error: " + err.message;
            };

            $http.get(location.origin + "/articals/" + $routeParams.id)
                .then(onGetArticalCompleted, onGetArticalError);
        
    })
})();
