import express from 'express'
import { HfInference } from "@huggingface/inference";
import { configDotenv } from "dotenv";
configDotenv()

const router = express.Router()
const client = new HfInference(process.env.HUGGING_TOKEN);

router.post('/',async(req,res)=>{
    const { name, purpose, keyPoints } = req.body 

    const generate = `
    Write a professional email for the following: 
    - Recipient: ${name}
    - Purpose: ${purpose},
    - key Points: ${keyPoints}
    `

    try{
    const chatCompletion = await client.chatCompletion({
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
    })
    }

    catch(err){
        res.status(403).json({
            msg: 'failed to generate',
            data: err
        })
    }
    
})

export default router