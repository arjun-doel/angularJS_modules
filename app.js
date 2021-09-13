(function () {


  var app = angular.module("githubViewer", [])


  var MainController = function ($scope, $http, $interval, $log) {

    var onUserComplete = function (response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError)
    }

    var onRepos = function(response){

      $scope.repos = response.data
      console.log('repos', $scope.repos);
    }

    var onError = function (reason) {
      $scope.error = "oops could not fetch the data..."
    }

    $scope.search = function(username){
      $log.info(`Searching for ${username}`)
      $http.get(`https://api.github.com/users/${username}`)
        .then(onUserComplete, onError)
    }

    var decrementCountdown = function(){
      $scope.countdown -= 1
      if($scope.countdown){
        $scope.search($scope.username)
      }
    }

    var startCount = function(){
      $interval(decrementCountdown, 1000, $scope.countdown)
    }

    $scope.message = 'Hello Angular!'
    $scope.countdown = 5;
    startCount();

  }

  app.controller("MainController", MainController)

}());