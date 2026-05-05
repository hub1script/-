const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// الرابط الذي طلبته وضعه هنا
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1344443912170344509/qF080v47ZzJ54_Iof0H0-oYvYlV_S7P3W25e8Q1_R5z3_fG_example'; // تم تحديث الرابط كما طلبت

app.post('/send-data', async (req, res) => {
    try {
        const data = req.body;
        
        // إرسال البيانات إلى ديسكورد عبر السيرفر
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: data.content || "رسالة تلقائية من السكريبت",
            embeds: data.embeds || [],
            username: data.username || "Delta Logger"
        });

        res.status(200).send({ success: true, message: "تم الإرسال بنجاح عبر السيرفر" });
    } catch (error) {
        console.error("خطأ أثناء الإرسال:", error.message);
        res.status(500).send({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
