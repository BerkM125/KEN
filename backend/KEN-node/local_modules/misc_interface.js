/*
* misc_interface.js - Berkan Mertan
* Miscellaneous functionality portion of KEN!
*/

const Media = require('./media');
const fs = require('fs');

// Print a message in server logs and save it to a generic logs json file
async function sendMessage(msg) {
    let sendLog = "MESSAGE: " + msg;
    console.log(sendLog);
    Media.generateSpeech(sendLog);

    let logs = JSON.parse(fs.readFileSync("./db/messagelogs.json"));
    logs["messages"].push(msg);

    fs.writeFileSync("./db/messagelogs.json", JSON.stringify(logs));
}

module.exports = {
    sendMessage
};