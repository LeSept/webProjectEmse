
var myApp = angular.module('myApp',['ngSanitize']);

myApp.controller("searchSpace", function($scope){
    $scope.searchBar = "";
    $scope.search = function(){
       searchKeyword($scope.searchBar);
    };
});

