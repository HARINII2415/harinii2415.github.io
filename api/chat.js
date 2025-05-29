import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
You are Nick AI, a friendly assistant in Harini A's portfolio.
Context about Harini:
- 3rd year B.Tech IT student at MKCE
- Skills: Python, ML, SQL, Data Analytics, UI/UX, Azure, Data Science
- Projects: Cardiovascular AI, HbA1c Diabetes Detection, Portfolio Website, Menstrual Cycle recommendation, skin cancer detection, online plant management
User asked: "${req.body.message}"
Respond in a friendly, helpful way using emojis where appropriate.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ response: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}