const startBtn = document.getElementById('startBtn');
const statusDiv = document.getElementById('status');
const progressBar = document.getElementById('bar');

let mining = false;
let mined = 0;
const target = 500000; // 挖矿次数目标（模拟）

function simpleHash(str) {
    // 简单哈希函数，模拟计算
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % 1000000;
    }
    return hash;
}

function mine() {
    if (!mining) return;
    let batch = 1000;
    for (let i = 0; i < batch; i++) {
        let nonce = mined + i;
        let data = "block" + nonce;
        let hash = simpleHash(data);
    }
    mined += batch;

    let percent = Math.min((mined / target) * 100, 100);
    progressBar.style.width = percent + "%";
    statusDiv.textContent = `挖矿中... ${percent.toFixed(2)}%`;

    if (mined < target) {
        setTimeout(mine, 10);
    } else {
        mining = false;
        statusDiv.textContent = "挖矿结束！奖励已获得。";
    }
}

startBtn.onclick = () => {
    if (mining) return;
    mining = true;
    mined = 0;
    statusDiv.textContent = "初始化挖矿...";
    progressBar.style.width = "0%";
    setTimeout(mine, 500);
};