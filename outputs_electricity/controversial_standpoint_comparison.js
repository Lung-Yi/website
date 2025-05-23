/**
 * 核電延役議題爭議立場比較分析表 - JavaScript 控制檔案
 * 負責動態生成表格內容並套用數據
 */

// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', function() {
    // 載入比較資料
    loadComparisonData();
});

// 比較分析資料 - 核電延役議題
const comparisonData = {
    // === 基本信息區塊 ===
    title: "核電延役議題爭議立場比較分析表",
    topic: "核電延役與非核家園政策",
    positionA: "支持核電延役立場",
    positionB: "反對核電延役立場",
    description: "核電延役議題存在明顯的政黨立場分歧（民進黨vs國民黨民眾黨）、環保團體vs產業界、以及民眾對核安vs能源安全的不同關切重點。",
    
    // === 議題比較區塊 ===
    issues: [
        // --- 政黨立場分歧 ---
        {
            name: "政黨立場分歧",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "國民黨、民眾黨：核電具平價、穩定、低碳優勢，因應AI用電需求增加，應延役至60年確保能源安全",
                    positionB: "民進黨：堅持非核家園政策，核電廠已運轉40年存在安全隱患，應發展再生能源與新式核能技術"
                },
                {
                    name: "支持理據",
                    positionA: "核二、三延役成本約900億元，可節省發電成本1.2兆元；核電每度成本1.4元比燃氣便宜2元",
                    positionB: "核電僅占3%發電量，新增480萬瓩燃氣機組遠超核三2號機95萬瓩；2032年前供電無虞"
                },
                {
                    name: "代表人物/組織",
                    positionA: "國民黨立委許宇甄、民眾黨團、教文委員會召委葛如鈞",
                    positionB: "總統賴清德、行政院長卓榮泰、民進黨立委林楚茵等36名立委連署"
                },
                {
                    name: "立法行動",
                    positionA: "5月13日藍白聯盟以60票贊成通過《核管法》修正案，延長核電廠運轉年限最長20年",
                    positionB: "批評藍白黑箱修法、程序不正義，強調核廢料無解、違反世代正義"
                }
            ]
        },
        
        // --- 環保團體vs產業界 ---
        {
            name: "環保團體vs產業界",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "產業界：核電為穩定基載電力，AI與半導體產業用電激增，需要24小時無碳能源供應",
                    positionB: "環保團體：核電危險且昂貴，台灣地狹人稠承擔不起核災風險，應發展再生能源"
                },
                {
                    name: "用電需求數據",
                    positionA: "2024-2028年AI用電從24萬瓩增至224萬瓩成長8倍；台積電2030年用電將占全台近四分之一",
                    positionB: "再生能源近五年平均年增率達21.9%；光電與風電今年新增350萬瓩，發電量達323億度"
                },
                {
                    name: "代表組織",
                    positionA: "半導體產業、AI產業、中華經濟研究院、氣候先鋒者聯盟",
                    positionB: "全國廢核行動平台、台灣環境保護聯盟、綠色公民行動聯盟、社民黨"
                },
                {
                    name: "環境影響觀點",
                    positionA: "核電發電時不造成空污與二氧化碳排放；電力排碳係數需降至0.319公斤CO2e目標",
                    positionB: "火力電廠空污排放量已下降七成；核廢料壽命高達十萬年，全球尚無完善處置方案"
                }
            ]
        },
        
        // --- 核安vs能源安全關切 ---
        {
            name: "核安vs能源安全關切",
            aspects: [
                {
                    name: "核心關切",
                    positionA: "能源安全：台灣能源近100%依賴進口，天然氣儲量僅約10-14天，面臨中國潛在封鎖威脅",
                    positionB: "核安風險：核三廠位於恆春活動斷層帶，台海衝突時核電廠恐成攻擊目標，福島核災陰影仍在"
                },
                {
                    name: "國防安全考量",
                    positionA: "俄烏戰爭經驗顯示核電成為主要電力來源(占60%以上)；核電廠因核輻射風險敵方不敢攻擊",
                    positionB: "中國東風-17導彈誤差僅約10公尺具精準打擊能力；核二廠出意外台北市71%土地不能使用"
                },
                {
                    name: "國際壓力",
                    positionA: "美國在台協會處長谷立言兩度提及可協助引進SMR；美國基於印太戰略期待台灣擁有核電",
                    positionB: "德國已實現擺脫核電，台灣成為亞洲第一個曾使用核電又廢除的國家，具示範意義"
                },
                {
                    name: "民意變化",
                    positionA: "中研院調查：支持非核家園民眾從2017年超過七成降至2024年僅剩一半；約75%民眾支持延長核電廠使用",
                    positionB: "2018年公投否決2025年無核化提議；反核運動40年歷程，福島核災後超過二十萬人走上街頭"
                }
            ]
        },
        
        // --- 技術與成本爭議 ---
        {
            name: "技術與成本爭議",
            aspects: [
                {
                    name: "重啟技術挑戰",
                    positionA: "核電廠重啟需16-18個月至3年半；全球有417部核能機組運轉，160部運轉超過40年",
                    positionB: "台灣缺乏核電重啟經驗，國際上無停機除役後重啟先例；面臨設備更新、地震帶影響等技術難題"
                },
                {
                    name: "新式核能發展",
                    positionA: "SMR建造成本約為普通反應器一半，2030年可望商轉；比爾蓋茲在美國籌建SMR安全性更高",
                    positionB: "SMR成本每MWh達189-414美元，遠高於風光能源80-122美元；需生產3,000座SMR才達經濟效益"
                }
            ]
        }
    ],
    
    // === 總結與分析區塊 ===
    summary: "核電延役議題反映台灣能源政策的深層分歧：支持方強調能源安全、經濟效益與國防考量，反對方關注核安風險、環境正義與技術挑戰。隨著AI產業用電需求激增、國際地緣政治緊張，以及民意的微妙變化，這場爭議將持續影響台灣未來的能源政策走向。雙方都需要在科學證據基礎上進行理性對話，尋求兼顧能源安全與核安的平衡方案。",
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
    
    // 設置摘要
    const summaryElement = document.querySelector('#comparison-summary p');
    if (summaryElement) {
        summaryElement.textContent = comparisonData.summary;
    }
}

/**
 * 生成表格內容
 */
function generateTableContent() {
    const tableBody = document.querySelector('#comparison-table tbody');
    tableBody.innerHTML = ''; // 清空現有內容
    
    // 遍歷每個議題
    comparisonData.issues.forEach((issue, issueIndex) => {
        // 添加議題行
        const issueRow = document.createElement('tr');
        issueRow.className = 'issue-row';
        issueRow.innerHTML = `<td colspan="3" class="issue-title">${issue.name}</td>`;
        tableBody.appendChild(issueRow);
        
        // 添加各方面比較行
        issue.aspects.forEach((aspect, aspectIndex) => {
            const aspectRow = document.createElement('tr');
            aspectRow.className = 'aspect-row';
            aspectRow.innerHTML = `
                <td class="aspect-name">${aspect.name}</td>
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