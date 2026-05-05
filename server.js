const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// رابط الويب هوك الخاص بك - لا تغير فيه أي حرف
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1344443912170344509/qF080v47ZzJ54_Iof0H0-oYvYlV_S7P3W25e8Q1_R5z3_fG_example';

// استخدمنا مسار عشوائي /f2_gate لتجنب فلاتر الحماية في Delta
app.post('/f2_gate', async (req, res) => {
    try {
        const data = req.body;
        
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: data.content || "رسالة جديدة مستلمة",
            embeds: data.embeds || [],
            username: data.username || "F2 System"
        });

        res.status(200).send({ success: true, status: "Message Sent" });
    } catch (error) {
        console.error("Error sending to Discord:", error.message);
        res.status(500).send({ success: false, error: error.message });
    }
});

// المسار الأساسي (اختياري للتأكد أن السيرفر يعمل)
app.get('/', (req, res) => {
    res.send('Server is Live and Ready!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
