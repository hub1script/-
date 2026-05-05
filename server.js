const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// رابط الويب هوك الخاص بك الذي زودتني به
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1344443912170344509/qF080v47ZzJ54_Iof0H0-oYvYlV_S7P3W25e8Q1_R5z3_fG_example';

app.post('/send-data', async (req, res) => {
    try {
        const data = req.body;
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: data.content || "رسالة من السكريبت",
            username: data.username || "F2 Proxy"
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
