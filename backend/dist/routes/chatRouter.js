"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inference_1 = require("@huggingface/inference");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const router = express_1.default.Router();
const client = new inference_1.HfInference(process.env.HUGGING_TOKEN);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, purpose, keyPoints } = req.body;
    const generate = `
    Write a professional email for the following: 
    - Recipient: ${name}
    - Purpose: ${purpose},
    - key Points: ${keyPoints}
    `;
    const chatCompletion = yield client.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
            {
                role: "user",
                content: generate
            }
        ],
        provider: "hf-inference",
        max_tokens: 500
    });
    console.log(chatCompletion.choices[0].message);
    res.status(201).json({
        msg: 'success',
        data: chatCompletion.choices[0].message
    });
}));
exports.default = router;
