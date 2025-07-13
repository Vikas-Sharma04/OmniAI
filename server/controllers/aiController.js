import OpenAI from "openai";
import sql from "../configs/db.js";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt, length} = req.body;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt,},],
            temperature: 0.7,
            max_tokens: length,
        });
        const content = response.choices[0].message.content;
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;
        res.json({success: true, content})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const generateBlogTitle = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt} = req.body;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt,},],
            temperature: 0.7,
            max_tokens: 100,
        });
        const content = response.choices[0].message.content;
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
        res.json({success: true, content})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const resumeReview = async (req, res) => {
    try {
        const {userId} = req.auth();
        const resume = req.file;

        if(resume.size > 5*1024*1024){
            return res.json({success: false, message: "Resume size should be less than 5MB."})
        }

        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);
        const prompt = `Review the following resume and provide constructive feedback on its 
        strengths, weaknesses and areas for improvement. Resume Content:\n\n${pdfData.text}`;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt,},],
            temperature: 0.7,
            max_tokens: 1000,
        });
        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume and suggest correction required', ${content}, 'resume-review')`;
        res.json({success: true, content})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
