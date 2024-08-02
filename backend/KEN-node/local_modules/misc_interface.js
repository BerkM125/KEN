/*
* misc_interface.js - Berkan Mertan
* Miscellaneous functionality portion of KEN!
*/

const Media = require('./media');
const fs = require('fs');

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

// Send email asynchronously
async function sendEmail(args) {
    const [ recipient, msg ] = args.split(" with ");
    const addressBook = JSON.parse(fs.readFileSync('./dicts/emails_dict.json'))
    let mailOptions = {
        from: 'bermert525@gmail.com',
        to: addressBook[recipient],
        subject: "KEN (Berkan) Sent Some Mail!",
        text: msg
    };

    KenMailer.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

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
    sendEmail,
    sendMessage
};