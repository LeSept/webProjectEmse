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
        "lemonde": "lemonde.fr",
        "france24": "france24.com",
        "afp": "afp.com",
        "topito": "topito.com"
    },
    
    /* list of RSS grouped by source */
    "lemonde": {
        "une": "http://www.lemonde.fr/rss/une.xml",
        "videos" : "http://www.lemonde.fr/videos/rss_full.xml"
    },
    
    "france24": {
        "france": "http://www.france24.com/fr/france/rss",
        "monde": "http://www.france24.com/fr/actualites/rss",
        "europe": "http://www.france24.com/fr/europe/rss"
    },
    
    "topito": {
        "une":"http://feeds.feedburner.com/topito"
    },
    
    "lefigaro": {
        "une":"http://www.lefigaro.fr/rss/figaro_actualites-a-la-une.xml",
        "politique":"http://www.lefigaro.fr/rss/figaro_politique.xml"
    }
    
}