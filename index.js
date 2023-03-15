const {Configuration, OpenAIApi} = require("openai");
const express = require("express");
const bodyParser =  require("body-parser");
const session =  require("express-session");
const dot = require("dotenv");
dot.config();
//const storeAndDisplay = require("./storeAndDisplay");
const app = express();

app.use(session({
    secret:"anything",
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(request, response){
    
    response.sendFile(__dirname + "/survey.html");
      
  })

app.post("/", function(request,response){
    if (request.body.submit){
   var userData=request.body.concerns; //user input stored
  
   const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(){

    const str_maxTokens=parseInt(process.env.MAX_TOKENS);
    const str_temp=parseInt(process.env.TEMPERATURE);
    const prompt=userData;

    const response = await openai.createCompletion({
        model :process.env.MODEL,
        prompt : prompt,
        max_tokens : str_maxTokens,  
        temperature : str_temp
    });
     // console ai answer
    var recd= response.data;
    var recd_str= JSON.stringify(recd);
    var recd_prsd= JSON.parse(recd_str);
    console.log(recd_prsd);
    return(recd_prsd);
  
}
runCompletion().then(x =>{
    request.session.response = x; //store response in session data
    response.send(x);
});
}
   else if (request.body.delete){
        if (request.session.response) { 
            response.send(request.session.response);
            request.session.destroy(); 
        } else {
            response.send("No session data found.");
        }
    }
})
// app.get("/result", function (request, response) {
//     if (request.session.response) { 
//         response.send(request.session.response);
//         request.session.destroy(); 
//     } else {
//         response.send("No session data found.");
//     }
// });


app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})


