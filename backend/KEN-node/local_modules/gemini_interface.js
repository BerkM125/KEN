/*
* gemini_interface.js - Berkan Mertan
* Gemini LLM and API client portion of KEN
*/
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const LLM_INSTRUCTION_SET = fs.readFileSync('./LLM/instructions/raw_instructions.txt', { 
        encoding: 'utf8', 
        flag: 'r' 
    });

const MODEL_FLAGS = {
    model: "gemini-1.5-flash",
    systemInstruction: LLM_INSTRUCTION_SET
};
KenModel = genAI.getGenerativeModel(MODEL_FLAGS);

// Given a natural language query from a user, use Gemini to parse it for 
// key info and construct an instruction that is easier to process for KEN
async function convertLanguageToInstruction (NLQuery) {
    return await KenModel.generateContent(NLQuery);
}

var test_export;

module.exports = {
    convertLanguageToInstruction,
    test_export
};