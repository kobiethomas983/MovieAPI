var express = require("express");
var app = express();
var request = require("request");
var portNumber = 3004;

app.use(express.static("public"));
//so we dont have to write .ejs after every file name
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/results",function(req,res){

    var userData = req.query.search;
    var url = 'http://www.omdbapi.com/?s='+ userData + '&apikey=thewdb'
    request(url, function(error,response,body){
        if(!error && response.statusCode == 200){
            var parseData = JSON.parse(body);
            res.render("results", {parseData:parseData});
        }
    })
});

app.listen(portNumber,function(){
    console.log("Movie Api has started 3004 ..");
});
