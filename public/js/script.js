(function () {
    var app = angular.module('magazinApp', []);
    
    app.controller('ArticalController', function ($scope, $http) {

        //////////////// FILTER ARTICAL ///////////////
        $scope.filterByPaidRange = function (minValue, maxValue) {
            if (minValue === undefined || minValue == "") minValue = Number.MIN_VALUE;
            if (maxValue === undefined || maxValue == "") maxValue = Number.MAX_VALUE;

            return function(item) {
                return (minValue <= item.paid && item.paid <= maxValue);
            };
        };


        //////////////// ARTICAL LIST ///////////////
        $scope.articalView = 'views/artical.html';
        $scope.data = {};

        var onGetListCompleted = function (response) {
            $scope.articals = response.data;
        };

        var onGetListError = function (response) {
            $scope.error = "Could not retrieve the artical list, error: " + response.message;
        };
        var loadArticals = function () {
            $http.get("http://localhost:1337/articals/articallist")
                .then(onGetListCompleted, onGetListError);

        }

        loadArticals();

        //////////////// ADD ARTICAL ///////////////
        $scope.addArticalView = 'views/add-artical.html';

        $scope.addArtical = function (data) {
            var newArtical = {
                'category': data.articalCategory,
                'title': data.articalTitle,
                'date': data.articalDate,
                'img_url': data.articalImage
            }

            var onPostCompleted = function (res) {
                loadArticals();
            };
            var onPostError = function (response) {
                $scope.error = "Could not add new artical to the list, error: " + response.message;
            };

            $http.post("http://localhost:1337/articals/addartical", newArtical)
                .then(onPostCompleted, onPostError);            
        };



        //////////////// DELETE ARTICAL ///////////////
        $scope.deleteArtical = function (_id) {

            // Pop up a confirmation dialog
            var confirmation = confirm('Are you sure you want to delete this artical?');

            // Check and make sure the user confirmed
            if (confirmation === true) {

                // If they did, do our delete
                var onDeleteCompleted = function (res) {
                    loadArticals();
                };
                var onDeleteError = function (err) {
                    alert("Could not delete the artical from the list, error: " + response.msg);
                };

                $http.delete("http://localhost:1337/articals/deleteartical/" + _id)
                    .then(onDeleteCompleted, onDeleteError);                        
            }
            else {

                // If they said no to the confirm, do nothing
                return false;
            }
        };
    })
})();
