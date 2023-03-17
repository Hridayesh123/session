const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "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";
const modelId = "text-davinci-003";
const url = "https://api.openai.com/v1/engines/" + modelId + "/completions";

const config = {
  headers: {
    Authorization: "Bearer " + apiKey,
    "Content-Type": "application/json",
  },
};

const sessions = [
  { id: 1, prompt: "Hello, how are you?" },
  { id: 2, prompt: "What is your name?" },
  { id: 3, prompt: "Tell me a joke." },
];

// async function sendRequest(apiKey, modelId, prompt) {
//   const data = {
//     prompt: prompt,
//     max_tokens: 2048,
//     n: 1,
//     stop: "\n",
//   };
//   const response = await axios.post(url, data, config);
//   return response.data.choices[0].text;
// }

async function sendRequest(apiKey, modelId, prompt) {
    try {
      const data = {
        prompt: prompt,
        max_tokens: 2048,
        n: 1,
        stop: "\n",
      };
      const response = await axios.post(url, data, config);
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  

// async function runChats() {
//   for (const session of sessions) {
//     const response = await sendRequest(apiKey, modelId, session.prompt);
//     console.log(`Session ${session.id}: ${response}`);
//   }
// }

async function runChats() {
    for (const session of sessions) {
      try {
        const response = await sendRequest(apiKey, modelId, session.prompt);
        console.log(`Session ${session.id}: ${response}`);
      } catch (error) {
        console.error(`Error in session ${session.id}: ${error.message}`);
      }
    }
  }
  

runChats();

app.listen(3000, function (req, res) {
  console.log("server is running on port 3000");
});
