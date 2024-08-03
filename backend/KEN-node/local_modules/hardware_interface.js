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

// Bypass mixed communication function
function getBypassMixed (ipCode, bypassText, res) {
    let bypassres;
    axios.get(`http://192.168.1.${ipCode}/${bypassText}`).then((response) => {
        bypassres = response.data;

        // res is from the express route
        res.status(200).send(bypassres.toString());
        return res.end();
    }).catch(console.error);
}

// Take the last segment of the camera's private IP address, use it to capture photo from a specific camera
function ipCameraCapture (ipAddress) {
    let date = new Date();
    let stamp = `${date.getHours()}H${date.getMinutes()}M${date.getSeconds()}S`;
    /*exec(`libcamera-still -o ../SHARED/roomcapture-${stamp}.jpg -n --immediate --vflip`, function(err) {
        if(err) throw err
        else {
            exec(`cp ../SHARED/roomcapture-${stamp}.jpg mostrecent.jpg`, function(err) {if(err) throw err});
        }
    });*/

    
    exec(`curl -o ../SHARED/roomcapture-${stamp}.jpg http://192.168.1.${ipAddress}:80/capture`, function(err) {
        if(err) throw err
        else {
            exec(`cp ../SHARED/roomcapture-${stamp}.jpg mostrecent.jpg`, function(err) {
                if(err) throw err;
                //only for detecting humans
                /*else {
                    request.get(`http://192.168.1.204:80/processimg`, (err, res, body) => {
                        if (err) { return console.log(err); }
                        console.log(body.url);
                        console.log(body.explanation);
                    });
                }*/
            });
        }
    });
    securitydata.detectioncount += 1;
    //securitydata.suspicioncount += 1;
    securitydata.latestlocation = "HOUSE AREA";
    securitydata.latestactivity = stamp;

}

// REBOOT THE MACHINE
async function hardReboot () {
    console.log("OH IM DEFINITELY REBOOTING THE SYSTEM NOW...");
}

module.exports = {
    hardReboot,
    flipLights,
    ipCameraCapture,
    getBypassMixed,
    changeLights
};