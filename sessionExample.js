const axios = require("axios");
const express =  require("express");
const bodyParser =  require("body-parser");
const https = require("https"); 
const app = express();

app.use(bodyParser.urlencoded({extended: true }));

const apiKey = "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";
const modelId = "text-davinci-003";
const url = "https://api.openai.com/v1/engine/" + modelId + "/completions";
const prompt = "hello, how"
const data = {
    prompt: prompt,
    max_tokens: 2048,
    n: 1,
    stop: "\n",
  }
const config = {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  }

async function sendRequest() {
  const response = await axios.post(url,data,config);
  return response.data.choices[0].text;
}


const sessions = [
  { id: 1, prompt: "Hello, how are you?" },
  { id: 2, prompt: "What is your name?" },
  { id: 3, prompt: "Tell me a joke." },
];

async function runChats() {
  for (const session of sessions) {
    const prompt = session.prompt;
    const response = await sendRequest(apiKey, modelId,prompt);
    console.log(`Session ${session.id}: ${response}`);
  }
}

runChats();

app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})