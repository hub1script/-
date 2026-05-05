const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// السكربت نظيف 100% بدون أي تعقيدات
const myScript = `
local ScreenGui = Instance.new("ScreenGui", game.CoreGui)
local MainFrame = Instance.new("Frame", ScreenGui)
local TopBar = Instance.new("Frame", MainFrame)
local Title = Instance.new("TextLabel", TopBar)
local TabsFrame = Instance.new("Frame", MainFrame)
local ContentFrame = Instance.new("Frame", MainFrame)
local MinimizeBtn = Instance.new("TextButton", ScreenGui)

-- [ إعدادات القائمة الرئيسية ]
MainFrame.Size = UDim2.new(0, 350, 0, 300)
MainFrame.Position = UDim2.new(0.3, 0, 0.3, 0)
MainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
MainFrame.Visible = true
MainFrame.Active = true
MainFrame.Draggable = true
Instance.new("UICorner", MainFrame)

-- [ زر التصغير/التكبير ]
MinimizeBtn.Parent = ScreenGui
MinimizeBtn.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
MinimizeBtn.Position = UDim2.new(0, 10, 0.4, 0)
MinimizeBtn.Size = UDim2.new(0, 50, 0, 50)
MinimizeBtn.Text = "Open"
MinimizeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
Instance.new("UICorner", MinimizeBtn).CornerRadius = UDim.new(1, 0)

-- [ الشريط العلوي ]
TopBar.Size = UDim2.new(1, 0, 0, 35)
TopBar.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
Title.Size = UDim2.new(1, 0, 1, 0)
Title.Text = "Simple Script v6"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)

-- [ قائمة الأقسام ]
TabsFrame.Size = UDim2.new(0, 80, 1, -45)
TabsFrame.Position = UDim2.new(0, 5, 0, 40)
TabsFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
Instance.new("UIListLayout", TabsFrame).Padding = UDim.new(0, 5)

-- [ محتوى الأقسام ]
ContentFrame.Position = UDim2.new(0, 90, 0, 40)
ContentFrame.Size = UDim2.new(1, -95, 1, -45)
ContentFrame.BackgroundTransparency = 1

local function CreateTab(tabName)
    local page = Instance.new("ScrollingFrame", ContentFrame)
    page.Size = UDim2.new(1, 0, 1, 0)
    page.BackgroundTransparency = 1
    page.Visible = false
    page.ScrollBarThickness = 2
    Instance.new("UIListLayout", page).Padding = UDim.new(0, 8)
    
    local btn = Instance.new("TextButton", TabsFrame)
    btn.Size = UDim2.new(1, 0, 0, 35)
    btn.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
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
    b.BackgroundColor3 = Color3.fromRGB(70, 70, 70)
    b.Text = text
    b.TextColor3 = Color3.fromRGB(255, 255, 255)
    Instance.new("UICorner", b)
    b.MouseButton1Click:Connect(callback)
end

-- [[ قسم التجميع ]]
local AmountInput = Instance.new("TextBox", TabFarm)
AmountInput.Size = UDim2.new(1, -10, 0, 40)
AmountInput.PlaceholderText = "Enter Amount"
AmountInput.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
AmountInput.TextColor3 = Color3.fromRGB(255, 255, 255)
Instance.new("UICorner", AmountInput)

AddButton(TabFarm, "Get Money", function()
    local val = tonumber(AmountInput.Text)
    if val then
        game:GetService("ReplicatedStorage").RequestTool:FireServer("Desert Deagle", -math.abs(val))
    end
end)

AddButton(TabFarm, "Auto Clicker", function() 
    loadstring(game:HttpGet("https://pastebin.com/raw/eR1HPXfw"))() 
end)

-- [[ قسم الرسبنة ]]
local items = {
    {"M4", "M4A1"}, {"Deagle", "Desert Deagle"}, {"Handcuffs", "Handcuffs"},
    {"Radio", "Radio"}, {"Ammo", "AmmoBox"}, {"Packet", "Filled Packet"},
    {"FiveSeven", "FiveSeven"}, {"Heavy Vest", "Heavy Vest"}
}
for _, item in pairs(items) do
    AddButton(TabSpawn, item[1], function() game:GetService("ReplicatedStorage").RequestTool:FireServer(item[2], 0) end)
end

-- إظهار أول قسم عند التشغيل
TabFarm.Visible = true

-- وظيفة زر الفتح والإغلاق
MinimizeBtn.MouseButton1Click:Connect(function()
    MainFrame.Visible = not MainFrame.Visible
end)
`;

app.get('/raw', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(myScript);
});

app.get('/', (req, res) => {
    res.send('Server is Online - No Protection Mode');
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
