/*
* hardware_interface.js - Berkan Mertan
* Hardware communication portion of KEN, involving communicating with
* subcomponents and IoT hardware via wifi and radio signals
*/
const axios = require('axios');
const Media = require('./media');
const fs = require('fs');

// Color keywords
async function includesColor (string) {
    let colorJSON = fs.readFileSync('./dicts/colors_dict.json');
    let colorarray = JSON.parse(colorJSON)["colors"];
    let len = colorarray.length;
    for(let i = 0; i < len; i++) {
        if(string.includes(colorarray[i])) {
            return i;
        }
    }
    return -1;
}

// Basic on/off light control
async function flipLights (args) {
    const lightState = args.split(" the ")[0];
    axios.get(`http://192.168.1.217:80/turn${lightState}`)
        .then( (res, body) => {
            let successMessage = `Light flipped ${lightState}`;

            console.log(successMessage);
            Media.generateSpeech(successMessage);
        }).catch(console.error);
}

// Basic light color control
async function changeLights (args) {
    let colorState = await includesColor(args);
    axios.get(`http://192.168.1.217:80/samsung?direction=${25+colorState}`)
        .then( (res, body) => {
            console.log(`http://192.168.1.217:80/samsung?direction=${25+colorState}`);
            let successMessage = `Light changed to the color ${args}`;

            console.log(successMessage);
            Media.generateSpeech(successMessage);
        }).catch(console.error);
}

// REBOOT THE MACHINE
async function hardReboot () {
    console.log("OH IM DEFINITELY REBOOTING THE SYSTEM NOW...");
}

module.exports = {
    hardReboot,
    flipLights,
    changeLights
};