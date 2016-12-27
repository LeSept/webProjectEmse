
var myApp = angular.module('myApp',['ngSanitize']);

myApp.controller("searchSpace", function($scope){
    $scope.searchBar = "all";
    $scope.search = function(){
       searchKeyword($scope.searchBar);
    };
});

