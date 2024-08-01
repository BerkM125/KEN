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

// Config .env for environment variable loading
dotenv.config();


// Local modules
const Media = require('./local_modules/media');
const Wolfram = require('./local_modules/wolfram_interface');
const Gemini = require('./local_modules/gemini_interface');
const Misc = require('./local_modules/misc_interface');

// Initialize mapping object for functions
const KenRoutingMap = {
    "send": Misc.sendMessage
};

// Some additional helpful dependencies
const request = require('request');
const cors = require('cors');

var nodemailer = require('nodemailer');

// Create transport from .env account info
const KenMailer = nodemailer.createTransport({
    host: "mail.ihmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PWD
    },
    tls: {
        ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH'
    }
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
    let routingKey = instruction.split(":K:")[0];
    let routingArgs = instruction.split(":K:")[1];

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

