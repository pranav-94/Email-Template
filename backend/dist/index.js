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
const openai_1 = require("@langchain/openai");
const cors_1 = __importDefault(require("cors"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/chat', chatRouter_1.default);
const model = new openai_1.ChatOpenAI({
    temperature: 0.7,
    apiKey: process.env.OPENAI_TOKEN,
    modelName: 'gpt-3.5-turbo',
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, purpose, keyPoints } = req.body;
    const generate = `
    Write a professional email for the following: 
    - Recipient: ${name}
    - Purpose: ${purpose},
    - key Points: ${keyPoints}
    `;
    try {
        const response = yield model.invoke(generate);
        res.status(200).json({
            msg: 'done',
            data: response
        });
    }
    catch (err) {
        res.status(403).json({
            msg: 'failed to generate',
            data: err
        });
    }
}));
app.listen(3000);
