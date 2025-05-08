/**
 * 爭議立場比較分析表 - JavaScript 控制檔案
 * 負責動態生成表格內容並套用數據
 */

// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', function() {
    // 載入比較資料
    loadComparisonData();
});

// 比較分析資料 - 台幣升值爭議
const comparisonData = {
    // === 基本信息區塊 ===
    title: "台幣升值爭議立場比較分析表",
    topic: "台幣升值原因與影響",
    positionA: "央行與政府觀點",
    positionB: "市場與專家觀點",
    description: "2025年5月初，新台幣對美元匯率急速升值，短期內升值幅度超過10%，引發各界關注與爭議。本表比較不同立場對台幣升值原因、影響及應對策略的觀點。",
    
    // === 議題比較區塊 ===
    issues: [
        // --- 議題1: 升值原因 ---
        {
            name: "台幣升值原因",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "台幣升值主要反映台灣經濟基本面強韌，與市場預期心理及熱錢炒作有關，非美國施壓所致。",
                    positionB: "台幣升值除了市場因素外，很可能受到美國施壓，作為台美貿易談判的籌碼，以及美國對貿易順差國的匯率政策要求。"
                },
                {
                    name: "支持理據",
                    positionA: "央行總裁楊金龍表示台美經貿談判中沒有匯率議題；賴清德總統強調台灣經濟基本面穩健；央行發現有'禿鷹'炒匯跡象。",
                    positionB: "韓國央行行長李昌鏞透露亞洲貨幣走強部分原因是美國政府施壓；台幣升值時間點與台美貿易談判高度重合；台幣升值幅度遠超其他亞洲貨幣。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "央行總裁楊金龍、總統賴清德、國發會副主委高仙桂",
                    positionB: "韓國央行行長李昌鏞、財信傳媒董事長謝金河、BBC分析報導、英國《金融時報》"
                },
                {
                    name: "關鍵數據",
                    positionA: "台灣外匯存底充足，達5828.3億美元(2025年4月)；台灣第一季經濟成長率達5.37%，較2月預測高出1.91個百分點。",
                    positionB: "台幣自4月初至5月5日急速升值達11.06%；台灣對美貿易順差超過700億美元；台灣壽險業累積1.7兆美元海外資產，主要為美國債券。"
                }
            ]
        },
        
        // --- 議題2: 升值影響 ---
        {
            name: "台幣升值影響",
            aspects: [
                {
                    name: "對出口產業",
                    positionA: "短期內會有匯損，但長期而言出口企業有應對匯率變化經驗，預期能降低匯率波動對獲利的影響。",
                    positionB: "嚴重衝擊出口商獲利，尤其中小企業；若台幣匯率升破30元，機械及工具機業外銷將失去競爭力；若進一步升至27、28元，可能導致一半以上機械業廠商關廠倒閉。"
                },
                {
                    name: "對金融業",
                    positionA: "金融業具備匯率波動的自然避險能力，影響有限。",
                    positionB: "台灣壽險業償付能力押注於央行能避免台幣大幅升值，導致新台幣計價負債與美元計價資產間存在巨大錯配，面臨財務危機風險。"
                },
                {
                    name: "對股市",
                    positionA: "統一投信指出，依歷史經驗，新台幣升值時台股多呈上漲趨勢；過去30年中4次新台幣明顯升值期間，台股漲幅都在20%～68%以上。",
                    positionB: "台幣升值將導致第二季經濟成長率可能下滑，台股整體獲利面臨下修；研究機構估計2025年Q2獲利可能因匯率因素受約10%衝擊。"
                },
                {
                    name: "對觀光業",
                    positionA: "短期內影響不明顯，但長期恐影響來台旅遊的國際遊客數量；交通部已要求觀光署密切關注進出國人次數據。",
                    positionB: "台幣升值有利推升國內旅客出國意願，但國際客來台消費變貴；航空業受益於油價下跌及美元計價成本降低，但國際旅客來台意願可能下降。"
                }
            ]
        },
        
        // --- 議題3: 央行角色與應對 ---
        {
            name: "央行角色與應對策略",
            aspects: [
                {
                    name: "央行立場",
                    positionA: "央行不會操縱匯率，但必要時會採取行動穩定匯市；央行調節匯市的力道將會逐步加大，希望這波因為預期心理造成的非理性行為到此為止。",
                    positionB: "央行面臨兩難：若干預力道小則無法阻止升值，力道大則可能被美國指控'操縱匯率'；央行可能擔心被美國列為'匯率操縱國'而不敢大力干預。"
                },
                {
                    name: "歷史脈絡",
                    positionA: "楊金龍指出台幣升至30元兌1美元並非首次，2019年下半年及2022年底都曾出現類似情況；央行有足夠工具與經驗應對匯率波動。",
                    positionB: "台灣已連續五次被列入美國'匯率操縱國'觀察名單；憂慮台灣可能重蹈日本在'廣場協議'後快速升值導致'失落的二十年'的覆轍。"
                },
                {
                    name: "應對措施",
                    positionA: "央行於5月7日啟動專案金檢，嚴查疑似'禿鷹'(熱錢)跡象；呼籲廠商不要產生非理性預期而拋匯；強調外匯市場供需將回歸平衡。",
                    positionB: "建議政府協助出口產業，請銀行不要'雨天收傘'；放寬企業以土地及廠房作為抵押擔保成數，協助業者周轉資金；提升至行政院觀光產業振興層級，跨部會整合討論國旅優惠補助方案。"
                }
            ]
        }
    ],
    
    // === 總結與分析區塊 ===
    summary: "台幣升值爭議反映了不同利益相關者的立場差異。央行與政府強調市場機制與經濟基本面，否認外部政治壓力；而市場與專家則關注美國可能的施壓因素及對出口產業的嚴重衝擊。不同產業受影響程度各異，出口導向企業面臨挑戰，內需產業相對受惠。此議題凸顯台灣作為出口導向經濟體在國際貿易與匯率政策間的平衡挑戰，以及央行在維護金融穩定與應對外部壓力間的兩難處境。",
};

/**
 * 載入並顯示比較資料
 */
function loadComparisonData() {
    // 設置標題和描述
    document.getElementById('comparison-title').textContent = comparisonData.title;
    document.getElementById('analysis-description').textContent = comparisonData.description;
    
    // 設置立場標題
    document.querySelector('.position-a-header').textContent = comparisonData.positionA;
    document.querySelector('.position-b-header').textContent = comparisonData.positionB;
    
    // 生成表格內容
    generateTableContent();
    
    // 設置摘要和註釋
    document.querySelector('#comparison-summary p').textContent = comparisonData.summary;
    
}

/**
 * 生成表格內容
 */
function generateTableContent() {
    const tableBody = document.querySelector('#comparison-table tbody');
    tableBody.innerHTML = ''; // 清空現有內容
    
    // 遍歷每個議題
    comparisonData.issues.forEach(issue => {
        // 添加議題行
        const issueRow = document.createElement('tr');
        issueRow.className = 'issue-row';
        issueRow.innerHTML = `<td colspan="3">${issue.name}</td>`;
        tableBody.appendChild(issueRow);
        
        // 添加各方面比較行
        issue.aspects.forEach(aspect => {
            const aspectRow = document.createElement('tr');
            aspectRow.innerHTML = `
                <td>${aspect.name}</td>
                <td class="position-a-column">${aspect.positionA}</td>
                <td class="position-b-column">${aspect.positionB}</td>
            `;
            tableBody.appendChild(aspectRow);
        });
    });
}

/**
 * 更新比較資料
 * @param {Object} newData - 新的比較資料
 */
function updateComparisonData(newData) {
    // 合併新數據
    Object.assign(comparisonData, newData);
    
    // 重新載入數據到頁面
    loadComparisonData();
}

/**
 * 添加新議題
 * @param {Object} newIssue - 新議題對象
 */
function addNewIssue(newIssue) {
    // 添加新議題到數據中
    comparisonData.issues.push(newIssue);
    
    // 重新載入數據到頁面
    loadComparisonData();
}

/**
 * 移除議題
 * @param {number} issueIndex - 要移除的議題索引
 */
function removeIssue(issueIndex) {
    // 檢查索引是否有效
    if (issueIndex >= 0 && issueIndex < comparisonData.issues.length) {
        // 從數據中移除議題
        comparisonData.issues.splice(issueIndex, 1);
        
        // 重新載入數據到頁面
        loadComparisonData();
    }
}
