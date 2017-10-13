(function () {
    var app = angular.module('magazineApp', []);
    
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

        var loadArticals = function () {

            var onGetListCompleted = function (response) {
                $scope.articals = response.data;
            };

            var onGetListError = function (err) {
                $scope.error = "Could not retrieve the artical list, error: " + err.message;
            };

            $http.get("http://localhost:1337/articals/")
                .then(onGetListCompleted, onGetListError);
        }

        // Load list of articals on page load
        loadArticals();

        //////////////// ADD ARTICAL ///////////////
        $scope.addArticalView = 'views/add-artical.html';

        $scope.addArtical = function (data) {

            var newArtical = {
                'category': data.articalCategory,
                'title': data.articalTitle,
                'date': data.articalDate,
                'img_url': data.articalImage,
                'paid': data.articalCategory == "Food & Drink" ? 3
                        : data.articalCategory == "Travel, Style" ? 5
                        : 6
            }

            var onPostCompleted = function (res) {
                loadArticals();
            };
            var onPostError = function (err) {
                $scope.error = "Could not add new artical to the list, error: " + err.message;
            };

            $http.post("http://localhost:1337/articals/", newArtical)
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

                $http.delete("http://localhost:1337/articals/" + _id)
                    .then(onDeleteCompleted, onDeleteError);                        
            }
            else {

                // If they said no to the confirm, do nothing
                return false;
            }
        };
    })
})();
