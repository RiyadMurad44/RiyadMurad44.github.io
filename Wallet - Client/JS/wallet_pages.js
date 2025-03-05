const walletPages = {};
walletPages.base_api = "http://localhost/php-deploy/";

walletPages.get_data = async function(url){
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

walletPages.post_data = async function(url, data){
    try{
        const response = await axios.post(url, data);
        return response.data;
    }catch(error){
        console.log(error); 
    }
}

walletPages.console = function(title, values, one_value=false){
    console.log("------" + title + "------");
    if(one_value){
        console.log(values);
    }else{
        for(let i =0; i<values.length; i++){
            console.log(values[i]);
        }
    }
    console.log("------" + title + "------");
}

walletPages.loadFor = function(page_name){
    eval("walletPages.load_" + page_name + "();");
}

walletPages.load_index = async function(){
    walletPages.index = {};
    walletPages.index.articles_api = walletPages.base_api + "getArticles.php";
    walletPages.index.result = await walletPages.get_data(walletPages.index.articles_api);

    walletPages.index.displayArticles = function(){
        const articles_div = document.getElementById("articles");
        const articles_title = document.getElementById("articles_title");
        const articles_list = document.getElementById("articles_list");
        const results = walletPages.index.result;

        if(results.length >0){
            articles_title.innerText += " (Size = " + results.length + ")"
            articles_div.style.display="inline";
            for(let i = 0; i< results.length; i++){
                let item = document.createElement("li");
                item.appendChild(document.createTextNode("Article Name: " + results[i].name + " | Author Name: " + results[i].author_name));
                articles_list.appendChild(item);
            }
        }else{
            console.log("Did NOT Enter");
            articles_div.style.display="none";
        }
    };
    walletPages.index.displayArticles();
}

walletPages.load_profile = function(){
    walletPages.profile = {};
    walletPages.profile.profile_api = walletPages.base_api + "profile.php";
    walletPages.profile.name = "Charbel";
    walletPages.console("profile", walletPages.profile.profile_api, true);
}

