/*
* wolfram_interface.js - Berkan Mertan
* Wolfram API client portion of KEN
*/

const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI("RLV5GQ-REK65QXW7P");
const Media = require('./media');
const Gemini = require('./gemini_interface');
const fs = require('fs');

var test_export;

function writeToFrontend (computeOutput) {
    // Print in server logs
    console.log("Computed result: " + computeOutput);
    
    const exportedHTMLContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>KEN's Findings</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');

                h2 {
                    font-family: "Raleway", sans-serif;
                    font-weight: lighter;
                    font-size: 20px;
                }
            </style>
            <script type="module" src="https://md-block.verou.me/md-block.js"></script>
        </head>

        <body>
            ${computeOutput}
        </body>
    </html>`;

    fs.writeFileSync("../../frontend/web/wolfram_results.html", exportedHTMLContent);
}

async function computeQuery(NLQuery) {
    waApi.getFull(NLQuery).then((p) => {

        // Parse through full Wolfram api output
        const pods = p.pods;

        // Stitch together the output from pods
        const output = pods.map((pod) => {
          const subpodContent = pod.subpods.map(subpod =>
            `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
          )
          .join('\n');
          return `<h2>${pod.title}</h2>\n${subpodContent}`;
        })
        .join('\n');
        
        writeToFrontend(output);
        
        // And of course, broadcast the answer
        waApi.getSpoken(NLQuery).then(function (p) {
            console.log(p);
            Media.generateSpeech(p);
        }).catch(console.error);

    }).catch(
        async (err) => {
            const backupAnswer = await Gemini.getAnswerFromLLM(NLQuery);
            const backupAudible = await Gemini.getAudibleAnswer(NLQuery);

            Media.generateSpeech(await backupAudible.response.text());

            writeToFrontend(`<md-block>${await backupAnswer.response.text()}</md-block>`);
        }
    );
}

module.exports = {
    computeQuery,
    test_export
};