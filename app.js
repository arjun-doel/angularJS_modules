(function () {


  var app = angular.module("githubViewer", [])


  var MainController = function ($scope, $http) {

    var onUserComplete = function (response) {
      $scope.user = response.data;
    }

    var onError = function (response) {
      $scope.error = "oops could not fetch the data..."
    }

    $scope.search = function(username){
      $http.get(`https://api.github.com/users/${username}`)
      .then(onUserComplete, onError)
    }

    $scope.message = 'Hello Angular!'

  }

  app.controller("MainController", ["$scope", "$http", MainController])

}());