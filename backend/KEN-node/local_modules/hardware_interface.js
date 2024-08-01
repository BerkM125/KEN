/*
* hardware_interface.js - Berkan Mertan
* Hardware communication portion of KEN, involving communicating with
* subcomponents and IoT hardware via wifi and radio signals
*/
import axios from 'axios';
const Media = require('./local_modules/media');

// Basic on/off light control
async function flipLights (lightState) {
    axios.get(`http://192.168.1.217:80/turn${lightState}`)
        .then( (err, res, body) => {
            if(err) {
                console.log("Error with light flip request: " + err);
            }

            let successMessage = `Light flipped ${lightState}`;
            
            console.log(successMessage);
            Media.generateSpeech(successMessage);
        });
}

module.exports = {
    flipLights
};