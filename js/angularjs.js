var myApp = angular.module('myApp',[]);

myApp.controller("searchSpace", function($scope){
    $scope.searchBar = "all";
    $scope.search = function(){
        alert($scope.searchBar);
        return searchKeyword($scope.searchBar);    
    };
});