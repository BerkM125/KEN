/*
* index.js - Berkan Mertan
* Entry point for KEN node app, REST api and backend
*/

// Critical node app dependencies
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const url = require('url');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

// Config .env for environment variable loading
dotenv.config();

// Local modules
const Media = require('./local_modules/media');
const Wolfram = require('./local_modules/wolfram_interface');
const Gemini = require('./local_modules/gemini_interface');
const Misc = require('./local_modules/misc_interface');
const Hard = require('./local_modules/hardware_interface');

// Initialize mapping object for functions
const KenRoutingMap = {
    "send": Misc.sendMessage,
    "compute": Wolfram.computeQuery,
    "email": Misc.sendEmail,
    "reboot": Hard.hardReboot,
    "turn": Hard.flipLights,
    "light colored": Hard.changeLights
};

// Some additional helpful dependencies
const request = require('request');
const cors = require('cors');


app.get('/kenanswered', async (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/web/wolfram_results.html"));
});

app.get('/kensplants', async (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/web/plant_results.html"));
});

app.get('/testGeminiInstruction/:text', async (req, res) => {
    let NLQuery = req.params.text.toString();
    let raw_instructions = await Gemini.convertLanguageToInstruction(NLQuery);

    let instruction = await raw_instructions.response.text();
    let routingKey = instruction.split(" :K: ")[0];
    let routingArgs = instruction.split(" :K: ")[1];

    console.log("GENERATED INSTRUCTION: " + instruction);
    console.log("ROUTING FUNCTION FOR KEY " + routingKey);

    if (!(routingKey in KenRoutingMap)) {
        console.log("ERROR: KEY DOES NOT FIT ANY ROUTES, ENDING QUERY PROCESSING...")
    }
    else {
        KenRoutingMap[routingKey](routingArgs);
    }
    res.status(200).send("GET request processed.");
});

app.post('/speech/:text', async (req, res) => {
    let NLQuery = req.params.text.toString();
    let raw_instructions = await Gemini.convertLanguageToInstruction(NLQuery);

    let instruction = await raw_instructions.response.text();
    let routingKey = instruction.split(" :K: ")[0];
    let routingArgs = instruction.split(" :K: ")[1];

    console.log("GENERATED INSTRUCTION: " + instruction);
    console.log("ROUTING FUNCTION FOR KEY " + routingKey);

    if (!(routingKey in KenRoutingMap)) {
        console.log("ERROR: KEY DOES NOT FIT ANY ROUTES, ENDING QUERY PROCESSING...")
    }
    else {
        KenRoutingMap[routingKey](routingArgs);
    }
    res.end("KEN has processed this query.");
});

// Directly access devices on the private network by their ip addresses
app.get('/bypassmixed/:ipcode/:bypasstext', (req, response) => {
    let ipCode = req.params.ipcode.toString();
    let bypassText = req.params.bypasstext.toString();
    let bypassRes = "";
    
    if(ipCode === "203" || ipCode === "236") {
            
        Hard.ipCameraCapture(ipCode);
        response.writeHead(200, "text/plain");
        response.write("camera bypass successful.");
        return response.end();
        
    }
    else {
        Hard.getBypassMixed(ipCode, bypassText, response);
    }

    response.status(200);
    
});

// MAKE SURE EXPRESS APP USES BOTH CORS AND ALLOWS FOR JSON DATA TRANSMISSION
app.use(cors()).use(express.json());

app.listen(process.env.KEN_SERVER_PORT, async () => {
    console.log("KEN IS UP running on port " + process.env.KEN_SERVER_PORT);
    console.log("MESSAGE LOGS:");

    fs.readFile("./db/messagelogs.json", (err, data) => {
        let parsed = JSON.parse(data);
        parsed["messages"].forEach(msg => {
            console.log("--> " + msg);
        });
    });

});

// Generic file get
app.get('*', (req, res) => {
    let fPath = url.parse(req.url, true);
    let fn = "../../frontend/web" + fPath.pathname;
    res.sendFile(path.join(__dirname, fn));
});

