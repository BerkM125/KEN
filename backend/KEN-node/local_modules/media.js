/*
* media.js - Berkan Mertan
* Multimedia (video, audio) portion of KEN node app,
*/

const SoundPlay = require("sound-play");
const GoogleTTS = require('gtts');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

var test_export;

// Simplified function to generate audio speech from text
function generateSpeech (speech) {
    let tempTTS = new GoogleTTS(speech, 'en');
    tempTTS.save('tempvoice.wav', (err, result) => {
        if(err) { 
            throw new Error(err); 
        }
        console.log("TTS process finished...");

        // Run appropriate audio play command
        exec(`${process.env.AUDIO_PLAYER_CMD} tempvoice.wav`, (err) => {
            if(err) throw err;
        });
    });

}

module.exports = {
    generateSpeech,
    test_export
};