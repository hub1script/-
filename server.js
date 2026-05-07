const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// رابط الويب هوك الجديد الخاص بك
const webhookUrl = "https://hooks.hyra.io/api/webhooks/1501168985062768690/CdeVf5FMlaf4BsUi652WXTlj9wdJ9h8g440lJud44dafZdqA-OASk1cRi0-4E1DBC0oB";

const testScript = `
local http = game:GetService("HttpService")
print("جاري محاولة إرسال الويب هوك...")

local data = { ["content"] = "🚀 تجربة سريعة: الويب هوك شغال!" }

local success, err = pcall(function()
    return http:PostAsync("${webhookUrl}", http:JSONEncode(data))
end)

if success then 
    print("✅ تم الإرسال بنجاح!") 
else 
    warn("❌ فشل الإرسال: " .. tostring(err)) 
end
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(testScript);
});

app.listen(PORT, () => console.log('Server is Live and Ready!'));
