const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// تم وضع الويب هوك الخاص بك هنا كما طلبت
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1344443912170344509/qF080v47ZzJ54_Iof0H0-oYvYlV_S7P3W25e8Q1_R5z3_fG_example';

app.post('/f2_gate', async (req, res) => {
    try {
        const data = req.body;
        
        // إرسال البيانات إلى ديسكورد
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: data.content || "رسالة تلقائية من السكريبت",
            embeds: data.embeds || [],
            username: data.username || "F2 Proxy System"
        });

        console.log("تم الإرسال لديسكورد بنجاح");
        res.status(200).send({ success: true, message: "Sent to Discord" });
    } catch (error) {
        // في حال وجود خطأ في الرابط أو البيانات
        console.error("خطأ في الديسكورد:", error.response ? error.response.data : error.message);
        res.status(500).send({ success: false, error: "Discord Error" });
    }
});

app.get('/', (req, res) => res.send('Server is Online!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
