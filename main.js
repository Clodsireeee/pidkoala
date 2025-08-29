// -------------------------------------
// 遊戲變數與資源宣告
// -------------------------------------
let canvas, ctx;
let coverImg, homeImg, shopImg, frogImg, grassImg, nImg, packImg;
let shop1Img, shop2Img, shop3Img, shop4Img;
let shop5Img, shop6Img, shop7Img, shop8Img;
let clodsireImg, pokImg, koalaImg;
let frogWidth = 0, frogHeight = 0;
let currentScene = 'cover'; // 畫面狀態
let shopImages;             // 商店商品圖片陣列

let currentAmulet = null; // 目前攜帶的護身符
let currentTool = null;   // 目前攜帶的隨身物品
let missionCarryingAmulet = false;
let missionCarryingTool = false;


homeImg = new Image(); homeImg.src = "assets/test02.png";
frogImg = new Image(); frogImg.src = "assets/frog.png";
packImg = new Image(); packImg.src = "assets/pack.png";
shopImg = new Image(); shopImg.src = "assets/shop.png";
shop1Img = new Image(); shop1Img.src = "assets/shop1.png";
shop2Img = new Image(); shop2Img.src = "assets/shop2.png";
shop3Img = new Image(); shop3Img.src = "assets/shop3.png";
shop4Img = new Image(); shop4Img.src = "assets/shop4.png";
shop5Img = new Image(); shop5Img.src = "assets/shop5.png";
shop6Img = new Image(); shop6Img.src = "assets/shop6.png";
shop7Img = new Image(); shop7Img.src = "assets/shop7.png";
shop8Img = new Image(); shop8Img.src = "assets/shop8.png";
let nor1Img = new Image(); nor1Img.src = "assets/nor1.jpg";
let nor2Img = new Image(); nor2Img.src = "assets/nor2.jpg";
let nor3Img = new Image(); nor3Img.src = "assets/nor3.png";
let nor4Img = new Image(); nor4Img.src = "assets/nor4.png";
let nor5Img = new Image(); nor5Img.src = "assets/nor5.png";
let nor6Img = new Image(); nor6Img.src = "assets/nor6.png";
let nor7Img = new Image(); nor7Img.src = "assets/nor7.png";
let nor8Img = new Image(); nor8Img.src = "assets/nor8.png";
clo1Img = new Image(); clo1Img.src = "assets/clo1.png";
clo2Img = new Image(); clo2Img.src = "assets/clo2.png";
tt1Img = new Image(); tt1Img.src = "assets/tt1.png";
tt2Img = new Image(); tt2Img.src = "assets/tt2.png";
fla1Img = new Image(); fla1Img.src = "assets/fla1.png";
fla2Img = new Image(); fla2Img.src = "assets/fla2.png";
const norImgs = [null, nor1Img, nor2Img, nor3Img, nor4Img, nor5Img, nor6Img, nor7Img, nor8Img];


// 青蛙主角資料
const frog = {
    name: "小蛙",
    status: "home",
    backpack: [],
    souvenirs: [],
    coins: 100,
    x: 200,
    y: 300,
    width: 0,
    height: 0,
    action: "idle"
};


// 朋友資料（拜訪與特殊片）
const friends = [
    { name: "clodsire", specialSouvenir: "土王的特別明姓片" },
    { name: "poke", specialSouvenir: "沼王的特別明姓片" },
    { name: "koala", specialSouvenir: "無尾熊的特別明姓片" }
];


// 朋友名字對應圖片物件
const friendImageMap = {};


const shopItems = [
    { name: "初級護身符", price: 10, x: 100, y: 300 },
    { name: "中級護身符", price: 15, x: 450, y: 300 },
    { name: "高級護身符", price: 20, x: 800, y: 300 },
    { name: "最高級護身符", price: 30, x: 1150, y: 300 },
    { name: "Kiwi", price: 10, x: 100, y: 600 },
    { name: "Red", price: 15, x: 450, y: 600 },
    { name: "Bear", price: 20, x: 800, y: 600 },
    { name: "Penguin", price: 30, x: 1150, y: 600 }


];
let isOnMission = false;        // 是否正在出任務
let missionEndTime = 0;         // 回家的時間戳記（毫秒）

const amuletNames = ["初級護身符", "中級護身符", "高級護身符", "最高級護身符"];
const toolNames = ["Kiwi", "Red", "Bear", "Penguin"];



const grassLimit = 100;
let grassPatches = []; // 草叢分布


// 任務拜訪機制
let nextMissionFriend = null; // 下次是否有朋友來拜訪


// 任務用狀態變數
let missionTimer = null;
let missionTimeLeft = 0;


// -------------------------------------
// 資源與場景初始化
// -------------------------------------
window.onload = function () {
    // 取得畫布與設定尺寸
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('gameContainer').style.height = window.innerHeight + 'px';


    // 載入各種遊戲資源圖片
    coverImg = new Image(); coverImg.src = "assets/main.png";
    grassImg = new Image(); grassImg.src = "assets/grass.png";
    clodsireImg = new Image(); clodsireImg.src = "assets/clodsire.png";
    pokImg = new Image(); pokImg.src = "assets/pok.png";
    koalaImg = new Image(); koalaImg.src = "assets/koala.png";


    // 建立朋友圖片對照表
    friendImageMap['clodsire'] = clodsireImg;
    friendImageMap['poke'] = pokImg;
    friendImageMap['koala'] = koalaImg;

    //更改




    // 商店商品圖片陣列
    shopImages = [
        shop1Img, shop2Img, shop3Img, shop4Img,
        shop5Img, shop6Img, shop7Img, shop8Img
    ];
    //------------------------------------------------------
    // 取得按鈕、彈窗 DOM


    // 設定青蛙主角圖片載入 callback
    frogImg.onload = function () {
        frogWidth = canvas.width * 0.58;
        frogHeight = frogWidth * (frogImg.height / frogImg.width + 0.1);
        frog.width = frogWidth;
        frog.height = frogHeight;
        draw();
    };


    // 各種按鈕切換事件
    document.getElementById("toPackBtn").onclick = () => { currentScene = "Pack"; draw(); showSelectableItems(); };
    document.getElementById("toHomeBtn").onclick = () => { currentScene = "home"; draw(); };
    document.getElementById("toCoverBtn").onclick = () => { currentScene = "cover"; draw(); };
    document.getElementById("toShopBtn").onclick = () => { currentScene = "shop"; draw(); };
    document.getElementById("shopReturnBtn").onclick = () => { currentScene = "home"; draw(); };


    // 畫面上的互動行為
    canvas.addEventListener("click", function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);



        // 商店購買
        if (currentScene === "shop") {
            shopItems.forEach((item) => {
                if (x >= item.x && x <= item.x + 200 && y >= item.y && y <= item.y + 200) {
                    if (frog.backpack.includes(item.name)) {
                        alert(`你已經擁有 ${item.name}！`);
                    } else {
                        let grassCount = frog.backpack.filter(i => i === "青草").length;
                        if (grassCount < item.price) {
                            alert(`青草不足無法購買 ${item.name}！\n購買需要${item.price}根青草，你擁有${grassCount}根。`);
                        } else {
                            let removed = 0;
                            frog.backpack = frog.backpack.filter(itemInBag => {
                                if (itemInBag === "青草" && removed < item.price) {
                                    removed++;
                                    return false;
                                }
                                return true;
                            });
                            frog.backpack.push(item.name);
                            alert(`購買成功：${item.name}（已消耗青草${item.price}根）！`);
                            updateStatus();
                            draw();
                        }
                    }
                }
            });
        }
        // 草叢採集
        if (currentScene === "cover") {
            for (let i = 0; i < grassPatches.length; i++) {
                const g = grassPatches[i];
                const drawWidth = g.size * 4;
                const drawHeight = g.size * 0.6;
                const dx = x - g.x;
                const dy = y - g.y;
                const rx = drawWidth / 2;
                const ry = drawHeight / 2;
                if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1) {
                    let grassCount = frog.backpack.filter(i => i === "青草").length;
                    if (grassCount >= 30) {
                        alert("背包已滿無法採收青草！");
                        return;
                    }
                    grassPatches.splice(i, 1);
                    frog.backpack.push("青草");
                    alert("你採收了一株青草！");
                    updateStatus();
                    draw();
                    break;
                }
            }
        }
    });
    // 每5分鐘檢查一次是否出任務
    setInterval(() => {
        if (!isOnMission) { // 只有在家時才有機會出任務
            if (Math.random() < 1) { // 10% 機率  更改
                startAutoMission();
            }
        }
    }, 1 * 1000); // 5分鐘 更改


    // 草叢自動生成
    setInterval(() => {
        if (currentScene === "cover" && grassPatches.length < grassLimit) {
            const size = canvas.width / 10 + Math.random() * 10;
            const drawWidth = size * 4;
            const drawHeight = size * 0.6;
            const x = Math.random() * (canvas.width / 2 - 60) + 50;
            const y = canvas.height - drawHeight / 2.2;
            grassPatches.push({ x, y, size });
            draw();
        }
    }, 3000);


    // 青蛙自動活動
    setInterval(() => {
        const actions = ["sleeping", "gaming", "watchingTV"];
        frog.action = actions[Math.floor(Math.random() * actions.length)];
        draw();
    }, 5000);


    // 狀態每秒更新
    setInterval(updateStatus, 1000);


    draw();
};


// -------------------------------------
// 狀態資訊顯示（可自訂內容）
// -------------------------------------
function updateStatus() {
    const status = document.getElementById("status");
    if (!status) return;
    // 可選擇顯示草數、金幣等資訊
}


// -------------------------------------
// 主要畫面場景渲染
// -------------------------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelectorAll("button").forEach(btn => btn.style.display = "none");


    // 封面畫面
    if (currentScene === "cover") {
        if (coverImg.complete) ctx.drawImage(coverImg, 0, 0, canvas.width, canvas.height);


        // 有朋友預定下次來訪時，在封面右上顯示朋友圖片
        if (nextMissionFriend !== null) {
            const friendImg = friendImageMap[nextMissionFriend.name];
            if (friendImg && friendImg.complete) {
                const imgWidth = canvas.width * 0.2;
                const imgHeight = imgWidth * (friendImg.height / friendImg.width);
                const x = canvas.width - imgWidth - 50;
                const y = 50;
                ctx.drawImage(friendImg, x, y, imgWidth, imgHeight);
            }
        }


        // 草叢繪製與顯示
        grassPatches.forEach(g => {
            let w = g.size * 4;
            let h = g.size * 0.6;
            if (grassImg.complete)
                ctx.drawImage(grassImg, g.x - w / 2, g.y - h / 2, w, h);
            else {
                ctx.fillStyle = "#228B22";
                ctx.beginPath();
                ctx.ellipse(g.x, g.y, w / 2, h / 2, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        document.getElementById("toHomeBtn").style.display = "block";


        // 家庭場景
    } else if (currentScene === "home") {
        if (homeImg.complete) ctx.drawImage(homeImg, 0, 0, canvas.width, canvas.height);
        if (!isOnMission) {
            drawFrog();
            drawFrogOverlay();
        }
        document.getElementById("toPackBtn").style.display = "block";
        document.getElementById("toShopBtn").style.display = "block";
        document.getElementById("toCoverBtn").style.display = "block";

        // 商店場景
    } else if (currentScene === "shop") {
        if (shopImg.complete) ctx.drawImage(shopImg, 0, 0, canvas.width, canvas.height);
        ctx.font = "22px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("商店", 40, 50);
        drawShopItems();
        shopItems.forEach(i => {
            ctx.fillStyle = "#fff";
            ctx.fillRect(i.x, i.y, 200, 60);
            ctx.strokeStyle = "#333";
            ctx.strokeRect(i.x, i.y, 200, 60);
            ctx.fillStyle = "#000";
            ctx.fillText(`${i.name}($${i.price})`, i.x + 10, i.y + 35);
        });
        document.getElementById("shopReturnBtn").style.display = "block";




        // 背包場景
    } else if (currentScene === "Pack") {
        if (packImg.complete) ctx.drawImage(packImg, 0, 0, canvas.width, canvas.height);



        // 顯示選擇護身符、隨身物品按鈕
        document.getElementById("selectAmuletBtn").style.display = "block";
        document.getElementById("selectToolBtn").style.display = "block";


        // 返回家
        document.getElementById("toHomeBtn").style.display = "block";
    }
}


// -------------------------------------
// 青蛙角色繪製
// -------------------------------------
function drawFrog() {
    if (frogImg.complete) {
        ctx.drawImage(frogImg, frog.x, frog.y, frog.width, frog.height);
    }
}


// -------------------------------------
// 青蛙活動提示（睡覺、玩遊戲、看電視）
// -------------------------------------
function drawFrogOverlay() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    const msg = {
        sleeping: "Zzz...",
        gaming: "打電動中",
        watchingTV: "在看電視"
    };
    ctx.fillText(msg[frog.action], frog.x + 10, frog.y - 10);
}


// -------------------------------------
// 商店商品圖示排列繪製
// -------------------------------------
function drawShopItems() {
    const imgWidth = 200, imgHeight = 200;
    const colCount = 4;
    const startX = 100, startY = 100, gapX = 350, gapY = 300;


    shopImages.forEach((img, idx) => {
        const col = idx % colCount;
        const row = Math.floor(idx / colCount);
        const x = startX + col * gapX;
        const y = startY + row * gapY;


        if (img.complete) {
            ctx.drawImage(img, x, y, imgWidth, imgHeight);
        } else {
            ctx.fillStyle = "#ddd";
            ctx.fillRect(x, y, imgWidth, imgHeight);
        }
    });
}
function showSelectableItems() {
    const amuletPanel = document.getElementById("amuletSelectPanel");
    const toolPanel = document.getElementById("toolSelectPanel");

    // 檢查元素是否存在
    if (!amuletPanel || !toolPanel) {
        console.error("amuletSelectPanel 或 toolSelectPanel 元素找不到！");
        alert('頁面上缺少 amuletSelectPanel 或 toolSelectPanel');
        return;
    }

    // 清空面板
    amuletPanel.innerHTML = "";
    toolPanel.innerHTML = "";

    // 即時取得護身符與工具
    const amuletsInBag = frog.backpack.filter(item => amuletNames.includes(item));
    const toolsInBag = frog.backpack.filter(item => toolNames.includes(item));

    amuletsInBag.forEach(name => {
        const img = document.createElement("img");
        img.src = shopImages[amuletNames.indexOf(name)].src;
        img.className = "selectable-item";
        img.onclick = () => {
            currentAmulet = name;
            alert(`已選擇攜帶「${name}」`);
        };
        amuletPanel.appendChild(img);
    });

    toolsInBag.forEach(name => {
        const idx = toolNames.indexOf(name) + 4;
        const img = document.createElement("img");
        img.src = shopImages[idx].src;
        img.className = "selectable-item";
        img.onclick = () => {
            currentTool = name;
            alert(`已選擇攜帶「${name}」`);
        };
        toolPanel.appendChild(img);
    });
}


// -------------------------------------
// 任務啟動與獎勵
// -------------------------------------
function startMission() {
    const grassCount = frog.backpack.filter(i => i === "青草").length;
    if (grassCount < 30) {
        alert("青草不足 30 個！");
        return;
    }
    let removed = 0;
    frog.backpack = frog.backpack.filter(item => {
        if (item === "青草" && removed < 30) {
            removed++;
            return false;
        }
        return true;
    });


    missionTimeLeft = 10; // DEMO 用
    missionTimer = setInterval(() => {
        missionTimeLeft--;
        if (missionTimeLeft <= 0) {
            clearInterval(missionTimer);
            missionTimer = null;
            completeMission();
        }
        draw();
    }, 1000);


    alert("任務開始！請等待倒數結束");
}



//--------------------------------------
function getAmuletBonus() {
    if (currentAmulet === "初級護身符") return 0.05;
    if (currentAmulet === "中級護身符") return 0.10;
    if (currentAmulet === "高級護身符") return 0.15;
    if (currentAmulet === "最高級護身符") return 0.25;
    return 0;
}


function getToolBonus() {
    if (currentTool === "Kiwi") return 0.05;
    if (currentTool === "Red") return 0.10;
    if (currentTool === "Bear") return 0.15;
    if (currentTool === "Penguin") return 0.25;
    return 0;
}
function startAutoMission() {
    isOnMission = true;
    missionEndTime = Date.now() + (10 * 1000); // 1小時後回家 更改
    alert("koala出任務了！將在1小時後回家。");
    draw();

    // 確保1小時後自動回家
    setTimeout(() => {
        completeAutoMission();
    }, 10 * 1000);  //更改1
}

function completeAutoMission() {
    isOnMission = false;
    alert("koala已回家！");
    completeMission()
    draw();
}


// -------------------------------------
// 任務結算：包含朋友特殊拜訪機制
// -------------------------------------
function completeMission() {
    alert("任務完成！獎勵開始發放...");

    let popupQueue = [];
    // 清空舊的佇列


    // === ① 明信片 ===

    // === ② 護身符 ===
    const r1 = Math.random();
    let amuletName = null, amuletImg = null;
    if (r1 < 0.005) { amuletName = "最高級護身符"; amuletImg = "assets/shop4.png"; }
    else if (r1 < 0.02) { amuletName = "高級護身符"; amuletImg = "assets/shop3.png"; }
    else if (r1 < 0.05) { amuletName = "中級護身符"; amuletImg = "assets/shop2.png"; }
    else if (r1 < 0.10) { amuletName = "初級護身符"; amuletImg = "assets/shop1.png"; }


    ///if (amuletName) {
    //frog.souvenirs.push(amuletName);
    //popupQueue.push({ src: amuletImg, title: `獲得${amuletName}` });
    //}

    // === ③ 隨身道具 ===
    const r2 = Math.random();
    let toolName = null, toolImg = null;
    if (r2 < 0.005) { toolName = "最高級隨身道具"; toolImg = "assets/shop8.png"; }
    else if (r2 < 0.02) { toolName = "高級隨身道具"; toolImg = "assets/shop7.png"; }
    else if (r2 < 0.05) { toolName = "中級隨身道具"; toolImg = "assets/shop6.png"; }
    else if (r2 < 0.10) { toolName = "初級隨身道具"; toolImg = "assets/shop5.png"; }


    //if (toolName) {
    //frog.souvenirs.push(toolName);
    //popupQueue.push({ src: toolImg, title: `獲得${toolName}` });
    // 當加入 popupQueue 後，印出整個陣列內容

    //}

    if (nextMissionFriend !== null && nextMissionFriend.name === "poke") {
        const bonusA = getAmuletBonus();
        const bonusT = getToolBonus();
        const rand = Math.random();
        if (rand < 0.05 + bonusA + bonusT) {
            frog.souvenirs.push("tt1");
            popupQueue.push({ src: tt1Img.src, title: "獲得特殊明信片 " });
        } else if (rand < 0.1 + bonusA + bonusT) {
            frog.souvenirs.push("tt2");
            popupQueue.push({ src: tt2Img.src, title: "獲得特殊明信片 " });
        }
    } else if (nextMissionFriend !== null && nextMissionFriend.name === "clodsire") {
        const rand = Math.random();
        const bonusA = getAmuletBonus();
        const bonusT = getToolBonus();
        if (rand < 0.05 + bonusA + bonusT) {
            frog.souvenirs.push("clo1");
            popupQueue.push({ src: clo1Img.src, title: "獲得特殊明信片 " });
        } else if (rand < 0.1 + bonusA + bonusT) {
            frog.souvenirs.push("clo2");
            popupQueue.push({ src: clo2Img.src, title: "獲得特殊明信片 " });
        }
    } else if (nextMissionFriend !== null && nextMissionFriend.name === "koala") {
        const rand = Math.random();
        const bonusA = getAmuletBonus();
        const bonusT = getToolBonus();
        if (rand < 0.05 + bonusA + bonusT) {
            frog.souvenirs.push("fla1");
            popupQueue.push({ src: fla1Img.src, title: "獲得特殊明信片 " });
        } else if (rand < 0.1 + bonusA + bonusT) {
            frog.souvenirs.push("fla2");
            popupQueue.push({ src: fla2Img.src, title: "獲得特殊明信片 " });
        }
    } else {
        const bonusA = getAmuletBonus();
        const bonusT = getToolBonus();
        if (Math.random() < 0.1 + bonusA + bonusT) {  // 10% + 加成機率
            const i = Math.floor(Math.random() * 8) + 1; // 1~8 隨機選一張
            const cardName = `nor${i}`;
            frog.souvenirs.push(cardName);
            popupQueue.push({ src: norImgs[i].src, title: `獲得普通明信片 NO.${i}` });
        }

    }
    nextMissionFriend = null;


    // 固定草獎勵
    for (let i = 0; i < 15; i++) frog.backpack.push("青草");


    // 下一次拜訪朋友
    if (nextMissionFriend === null && Math.random() < 1) {//更改
        const visitorIdx = Math.floor(Math.random() * friends.length);
        nextMissionFriend = friends[visitorIdx];
        alert(`下次出門時，好朋友${nextMissionFriend.name}會來拜訪！`);
    }


    updateStatus();
    currentScene = "home";
    draw();

    window.popupQueue = popupQueue;
    // 顯示第一個彈窗
    if (popupQueue.length > 0) {
        showPopupQueue();
    }
}

function showPopupQueue() {
    if (!window.popupQueue || window.popupQueue.length === 0) return;

    let queue = [...window.popupQueue];

    // 建立背景遮罩層
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "9998";
    document.body.appendChild(overlay);

    // 建立彈窗容器
    let popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.background = "#fff";
    popupContainer.style.border = "1px solid #333";
    popupContainer.style.padding = "20px";
    popupContainer.style.zIndex = "9999";
    popupContainer.style.textAlign = "center";
    popupContainer.style.maxWidth = "80vw";
    popupContainer.style.maxHeight = "80vh";
    popupContainer.style.overflow = "auto";
    document.body.appendChild(popupContainer);

    let imgElem = document.createElement("img");
    imgElem.style.maxWidth = "100%";
    imgElem.style.height = "auto";
    popupContainer.appendChild(imgElem);

    let titleElem = document.createElement("p");
    titleElem.style.marginTop = "10px";
    popupContainer.appendChild(titleElem);

    let currentIndex = 0;

    function showItem(index) {
        if (index >= queue.length) {
            // 顯示結束，移除彈窗及遮罩
            document.body.removeChild(popupContainer);
            document.body.removeChild(overlay);
            window.popupQueue = [];
            return;
        }
        let item = queue[index];
        imgElem.src = item.src;
        titleElem.textContent = item.title;
    }

    // 點擊遮罩或彈窗外任意地方都切下一張（避免點到彈窗內不觸發）
    overlay.addEventListener("click", () => {
        currentIndex++;
        showItem(currentIndex);
    });

    // 預設顯示第一張
    showItem(currentIndex);
}
