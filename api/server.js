const express = require('express');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 8000
const CHAT_API_KEY = process.env.API_KEY

const app = express();

app.use(cors());
app.use(express.json());


app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${CHAT_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 7,
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.listen(PORT, () => console.log(`'port listening at port: ${PORT}'`));

