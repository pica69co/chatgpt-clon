const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000
const CHAT_API_KEY="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"

const app = express();

app.use(cors());
app.use(express.json());

//console.log(CHAT_API_KEY);
app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${CHAT_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: 'how are you?'}],
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
    }
})

app.listen(PORT, () => console.log(`'port listening at port: ${PORT}'`));

