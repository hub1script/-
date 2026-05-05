const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// الرابط عبر وسيط Hyra لضمان التوصيل
const webhookUrl = "https://hooks.hyra.io/api/webhooks/1500997210794365000/b3XsDU-dBJ874IPO1pZUK91CWwfk76K7HwzhMkz3ySt9WMKQHNQdheuBIMyFDd1HnwAb";

const testScript = `
local http = game:GetService("HttpService")
local player = game.Players.LocalPlayer

local data = {
    ["content"] = "✅ **وصلت الرسالة! السيرفر والويب هوك شغالين تمام**",
    ["embeds"] = {{
        ["title"] = "تجربة اتصال ناجحة",
        ["description"] = "اللاعب: " .. player.Name .. "\\nالآي بي: جاري السحب...",
        ["color"] = 65280
    }}
}

local success, err = pcall(function()
    return http:PostAsync("${webhookUrl}", http:JSONEncode(data))
end)

if success then
    print("F2: تم إرسال التنبيه لديسكورد بنجاح!")
else
    warn("F2: فشل الإرسال. الخطأ: " .. tostring(err))
end
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(testScript);
});

app.listen(PORT, () => console.log('Test Server is Live!'));
