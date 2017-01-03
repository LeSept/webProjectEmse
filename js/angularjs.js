var myApp = angular.module('myApp',[]);

myApp

.controller("pageController", ['$scope', function($scope) {
    $scope.category = "À LA UNE";
    $scope.allCategories = ["À LA UNE"];
    $scope.actualize = function(cat){
        alert(cat);
        $scope.category = cat;
        $scope.apply();
    }
}])



.controller("articlesSpace", ['$scope', function($scope){
    $scope.articles = new Array();
        
    displayNews = function(scope) {
    //on parcourt les catégories des sources à disposition
        scope.articles = new Array();
        var date = ""; // date de publication des articles
        var type = ""; // type de l'article our l'affichage, s'il doit être affiché petit, grand ou moyen.
        var now = new Date();
        var intervalle = 0; // nbr de secondes entre maintenant et la date de l'aricle
        var addarticle = false;
        
        
        for(var src in sources){
            if(src != "sites"){
                for(var url in sources[src]){
                    var feed = new google.feeds.Feed(sources[src][url]);
                    feed.load(function(result) {
                        if (!result.error) {
                            for (var i = 0; i < result.feed.entries.length; i++) {
                                
                                
                                date = result.feed.entries[i].publishedDate;
                                
                                //on détermine le type de l'article en fonction de la date
                                intervalle = (now.getFullYear()-date.substring(12,16))*86400*365+(now.getMonth()+1-getMonthFromString(date.substring(8,11)))*86400*30+(now.getDate()-date.substring(5,7))*86400+(now.getHours()-date.substring(17,19))*3600+(now.getMinutes()-date.substring(20,22))*60+(now.getSeconds()-date.substring(23,25));
                                
                                
                                if(intervalle<12*3600){
                                    type = "articles-large";
                                }else if(intervalle<86400){
                                    type = "articles-medium";
                                }else{
                                    type = "articles-small";
                                }
                                
                                //construction de le date de l'article. On ne peut pas a prendre telle qu'elle est car cela pose problème pour le tri
                                date = date.substring(12,16)+"-"+getMonthFromString(date.substring(8,11))+"-"+date.substring(5,7)+" "+date.substring(17,25);
                                
                                //met en majuscule + enregistrement dans scope.allCategories + ajout ou non de l'article
                                for(var element in result.feed.entries[i].categories){
                                    result.feed.entries[i].categories[element] = result.feed.entries[i].categories[element].toUpperCase();
                                    scope.allCategories.includes(result.feed.entries[i].categories[element]) ? true : scope.allCategories.push(result.feed.entries[i].categories[element]);
                                    if(!addarticle){
                                        addarticle = result.feed.entries[i].categories[element] == scope.category || scope.category == "À LA UNE";
                                    }
                                }
                                
                                if(addarticle){
                                    scope.articles.push({"title":result.feed.entries[i].title, "contentSnippet":result.feed.entries[i].contentSnippet, "link":result.feed.entries[i].link, "date":date, "type":type, "categories":result.feed.entries[i].categories});
                                }
                                
                                addarticle = false;
                                
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
}]);
