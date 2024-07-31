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

// Some additional helpful dependencies
const request = require('request');
const cors = require('cors');

var nodemailer = require('nodemailer');

app.use(cors()).use(express.json());

app.listen(process.env.KEN_SERVER_PORT, async () => {
    console.log("KEN IS UP running on port " + process.env.KEN_SERVER_PORT);
});