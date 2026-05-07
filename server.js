const express = require('express');
const axios = require('axios'); // بنستخدم هذي المكتبة للإرسال المخفي
const app = express();
const PORT = process.env.PORT || 3000;

const webhookUrl = "https://discord.com/api/webhooks/1501168985062768690/CdeVf5FMlaf4BsUi652WXTlj9wdJ9h8g440lJud44dafZdqA-OASk1cRi0-4E1DBC0oB";

// نقطة وصول جديدة لإرسال البيانات بدون كشفها من دلتا
app.get('/send', async (req, res) => {
    const { user, map } = req.query;
    try {
        await axios.post(webhookUrl, {
            content: `📢 **تم التجاوز بنجاح!**\n👤 اللاعب: ${user}\n🔗 الماب: https://www.roblox.com/games/${map}`
        });
        res.send("Sent");
    } catch (err) {
        res.status(500).send("Error");
    }
});

const myScript = `
local player = game.Players.LocalPlayer
local placeId = game.PlaceId
print("جاري التشغيل بنظام التمويه...")

-- إرسال البيانات عبر السيرفر وليس مباشرة للويب هوك
pcall(function()
    game:HttpGet("https://e11cilmcnc.onrender.com/send?user=" .. player.Name .. "&map=" .. placeId)
end)

print("✅ السكربت شغال، شيك الديسكورد")

-- حط هنا كود الواجهة حقك (SaLehDev)
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(myScript);
});

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
