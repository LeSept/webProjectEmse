
/*var myApp = angular.module('myApp',['ngSanitize']);

myApp.controller("searchSpace", function($scope){
    $scope.searchBar = "";
    $scope.search = function(){
       searchKeyword($scope.searchBar);
    };
});*/

var myApp = angular.module('myApp',[]);

myApp.controller("articlesSpace", function($scope){
    $scope.category = "une";
    $scope.articles = "3";
        
    displayNews = function(scope) {
    //on parcourt les catégories des sources à disposition
        $scope.articles = new Array();
        for(var src in sources){
            if(src != "sites"){
                for(var url in sources[src]){
                    var feed = new google.feeds.Feed(sources[src][url]);
                    feed.load(function(result) {
                        if (!result.error) {
                            for (var i = 0; i < result.feed.entries.length; i++) {
                                
                                var date = result.feed.entries[i].publishedDate;
                                
                                date = date.substring(12,16)+"-"+getMonthFromString(date.substring(8,11))+"-"+date.substring(5,7)+" "+date.substring(17,25);

                                scope.articles.push({"title":result.feed.entries[i].title, "contentSnippet":result.feed.entries[i].contentSnippet, "link":result.feed.entries[i].link, "date":date});
                                
                            }
                        }
                    });
                }
            }
        } 
    }
    
    function getMonthFromString(mon){
       return new Date(Date.parse(mon +" 1, 2016")).getMonth()+1;
    }
    
    displayNews($scope);
    window.setTimeout(function(){$scope.$apply()}, 1000);
});