/**
 * 爭議立場比較分析表 - JavaScript 控制檔案
 * 負責動態生成表格內容並套用數據
 */

// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', function() {
    // 載入比較資料
    loadComparisonData();
});

// 比較分析資料
const comparisonData = {
    // === 基本信息區塊 ===
    title: "爭議立場比較分析表",
    topic: "國防預算與財政資源分配",
    positionA: "執政黨立場",
    positionB: "在野黨立場",
    description: "分析朝野政黨對國防預算、財政收支劃分法等議題的不同立場，以及美國與台灣官員對國防預算占GDP比例的不同觀點。",
    
    // === 議題比較區塊 ===
    issues: [
        // --- 議題1: 國防預算占GDP比例 ---
        {
            name: "國防預算占GDP比例爭議",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "國防預算應逐步提高至GDP的3%，符合台灣財政現實。",
                    positionB: "國防預算應審慎評估，不應盲目追求GDP比例，而應注重有效監督。"
                },
                {
                    name: "支持理據",
                    positionA: "賴清德總統已宣示國防預算將達GDP 3%；2025年國防預算4760億元是歷年最高。",
                    positionB: "台灣GDP約25兆元，若達10%將需2.5兆元，而台灣年總預算僅3兆元，將嚴重排擠其他預算。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "行政院長卓榮泰、國防部長顧立雄、民進黨立委吳思瑤",
                    positionB: "國民黨立委陳玉珍、民眾黨、國民黨立院黨團總召傅崐萁"
                },
                {
                    name: "美方立場",
                    positionA: "支持美方建議，認為應增加國防預算以強化台灣自我防衛能力。",
                    positionB: "質疑美方要求，認為國防預算應由台灣自行決定，不應受外部壓力影響。"
                }
            ]
        },
        
        // --- 議題2: 國防預算刪減與凍結 ---
        {
            name: "國防預算刪減與凍結爭議",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "在野黨大幅刪凍國防預算，影響台灣防衛能力，引起美方關切。",
                    positionB: "刪減的預算主要針對執行不力的項目，且刪減幅度歷年最低，是負責任的監督。"
                },
                {
                    name: "支持理據",
                    positionA: "2025年國防預算遭在野黨刪減逾80億元，並有近900億元凍結數，影響國防建設。",
                    positionB: "2025年刪除的46.8億中，97.8%是刪減連民進黨都同意刪的獵鴞專案預算；民眾黨僅提2案凍結，未刪減。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "立院外交及國防委員會召委沈伯洋、美國聯邦參議員蘇利文",
                    positionB: "民眾黨、國民黨立委"
                },
                {
                    name: "潛在影響",
                    positionA: "削弱台灣防衛能力，向國際傳遞台灣對國防不重視的訊息。",
                    positionB: "促進國防預算有效使用，避免浪費，確保「有效能的國防」而非「毫無監督的亂花錢」。"
                }
            ]
        },
        
        // --- 議題3: 財政收支劃分法修正案 ---
        {
            name: "財政收支劃分法修正案爭議",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "財劃法修正案對國防的傷害比削減預算更大，將嚴重影響國防資源。",
                    positionB: "財劃法修正有助於地方發展，中央應合理分配資源給地方政府。"
                },
                {
                    name: "支持理據",
                    positionA: "財劃法雖後來刪成3700億元版本，但要湊到這個金額一定會先動國防預算。",
                    positionB: "2025年中央政府總預算稅課收入實徵數大於預算數3757億元，有足夠財源支應地方需求。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "立院外交及國防委員會召委沈伯洋",
                    positionB: "國民黨立院黨團"
                },
                {
                    name: "潛在影響",
                    positionA: "若覆議案未過，等於「砍了國防預算3次」，嚴重影響國防建設。",
                    positionB: "有助於平衡中央與地方財政資源，促進地方建設與發展。"
                }
            ]
        },
        
        // --- 議題4: 美國對台灣國防預算的期望 ---
        {
            name: "美國對台灣國防預算的期望",
            aspects: [
                {
                    name: "美方立場",
                    positionA: "美國官員支持台灣增加國防預算，認為這展現台灣自我防衛決心。",
                    positionB: "美國要求台灣將國防預算提高至GDP的5-10%，遠超台灣財政能力。"
                },
                {
                    name: "台灣回應",
                    positionA: "承諾逐步提高國防預算至GDP 3%，展現防衛決心。",
                    positionB: "卓榮泰表示台灣無法負擔將國防支出提升至GDP 10%，需依國家財政狀況審慎評估。"
                },
                {
                    name: "專家建議",
                    positionA: "應考量「國防預算占政府總預算比例」作為另一指標，不僅看GDP占比。",
                    positionB: "學者建議台灣在2026-2028年間務實提升國防預算至GDP的4%，而非立即達到5%或10%。"
                }
            ]
        }
    ],
    
    // === 總結與分析區塊 ===
    summary: "國防預算爭議反映台灣內部政治分歧與外部安全壓力的複雜互動。執政黨強調增加國防預算以應對區域安全挑戰，而在野黨則關注預算監督與財政平衡。美國期望台灣大幅提高國防支出，但台灣官員認為需考量財政現實。這些爭議不僅關乎資源分配，更涉及台灣的戰略定位與自主防衛能力建設。",
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
