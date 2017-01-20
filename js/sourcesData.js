var sources = {
    /*get all categories excepted "une" */
    "getCategories": function(){
        var results = new Array();
        var categories = new Array();
        
        for(var src in this){
            if(src != "getCategories" && src != "sites"){
                
                categories = Object.keys(this[src]);
                for(var cat in categories){
                    results.includes(categories[cat]) || categories[cat] == "une" ? true : results.push(categories[cat]);
                }
            }
        }
        
        return results.sort();
    },
    
    /* sites is used for research by keywords */
    "sites": {
        "bbc": "bbc.co.uk",
        "france24": "france24.com",
        "afp": "afp.com"
    },
    
    /* list of RSS grouped by source */
    "bbc": {
        "business": "http://feeds.bbci.co.uk/news/business/rss.xml",
        "world" : "http://feeds.bbci.co.uk/news/world/rss.xml",
        "uk": "http://feeds.bbci.co.uk/news/uk/rss.xml",
        "politics": "http://feeds.bbci.co.uk/news/politics/rss.xml"
    },
    
    "france24": {
        "france": "http://www.france24.com/fr/france/rss",
        "monde": "http://www.france24.com/fr/actualites/rss",
        "europe": "http://www.france24.com/fr/europe/rss"
    },
    
    "lefigaro": {
        "une":"http://www.lefigaro.fr/rss/figaro_actualites-a-la-une.xml",
        "politique":"http://www.lefigaro.fr/rss/figaro_politique.xml"
    },
    
    "cnn" : {
        "world" : "http://rss.cnn.com/rss/edition_world.rss"
    }
    
}