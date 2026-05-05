const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// تم تحديث الرابط بالكامل كما زودتني به الآن
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1501168985062768690/CdeVf5FMlaf4BsUi652WXTlj9wdJ9h8g440lJud44dafZdqA-OASk1cRi0-4E1DBC0oB';

app.post('/f2_gate', async (req, res) => {
    try {
        const data = req.body;
        
        // إرسال البيانات إلى ديسكورد
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: data.content || "تم الإرسال بنجاح عبر Proxy F2!",
            username: "Captain Hook",
            embeds: data.embeds || []
        });

        console.log("✅ نجح الإرسال للقناة!");
        res.status(200).send({ success: true, message: "Done" });
    } catch (error) {
        // طباعة تفاصيل الخطأ في حال وجود مشكلة
        console.error("❌ خطأ من جهة ديسكورد:", error.response ? error.response.data : error.message);
        res.status(500).send({ success: false, error: "Discord Error" });
    }
});

// للتأكد أن السيرفر شغال
app.get('/', (req, res) => res.send('F2 Proxy is Online!'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
