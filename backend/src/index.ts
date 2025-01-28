import express from 'express'
import { ChatOpenAI } from "@langchain/openai";
import cors from 'cors'
import router from './routes/chatRouter';

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/chat',router)

const port = process.env.PORT || 8000

const model = new ChatOpenAI({
    temperature: 0.7,
    apiKey: process.env.OPENAI_TOKEN,
    modelName: 'gpt-3.5-turbo',
})

app.post('/',async(req,res)=>{
    const { name, purpose, keyPoints } = req.body 

    const generate = `
    Write a professional email for the following: 
    - Recipient: ${name}
    - Purpose: ${purpose},
    - key Points: ${keyPoints}
    `

    try{
        const response = await model.invoke(generate)
        res.status(200).json({
            msg: 'done',
            data: response
        })
    }
    catch(err){
        res.status(403).json({
            msg: 'failed to generate',
            data: err
        })
    }
})

app.listen(port)