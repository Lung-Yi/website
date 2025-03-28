/**
 * 爭議立場比較分析表 - JavaScript 控制檔案
 * 負責動態生成表格內容並套用數據
 */

// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', function() {
    // 載入比較資料
    loadComparisonData();
});

// 比較分析資料 - 恢復軍事審判制度爭議
const comparisonData = {
    // === 基本信息區塊 ===
    title: "恢復軍事審判制度爭議立場比較分析表",
    topic: "恢復軍事審判制度",
    positionA: "支持恢復軍審",
    positionB: "質疑恢復軍審",
    description: "用於對比支持與反對恢復軍審的不同論點，包括政府官員(如賴清德、顧立雄)的說法與法律學者、民間團體的疑慮，呈現爭議的多方觀點。",
    
    // === 議題比較區塊 ===
    issues: [
        // --- 議題1: 恢復軍審的目的與範圍 ---
        {
            name: "恢復軍審的目的與範圍",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "恢復軍審是為了因應中國對國軍的滲透及間諜活動威脅，僅針對現役軍人涉犯叛亂、洩密、利敵等軍事犯罪案件。",
                    positionB: "擔憂軍審範圍可能擴大，或無法確保審判獨立性和公正性，可能重蹈過去軍審制度的覆轍。"
                },
                {
                    name: "支持理據",
                    positionA: "賴清德指出，去年共諜案起訴64人中，66%為現役和退役軍人，顯示軍中存在潛在風險。TVBS民調顯示60%民眾支持恢復軍審。",
                    positionB: "台灣曾在戒嚴時期留下眾多軍事審判冤案，如1996年「江國慶事件」因軍法倉促審理導致冤死。2013年因洪仲丘案修法限制軍審。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "總統賴清德、國防部長顧立雄、行政院長卓榮泰",
                    positionB: "台灣陪審團協會、軍冤家屬、台大法律系教授林鈺雄、前最高法院法官錢建榮"
                },
                {
                    name: "潛在影響",
                    positionA: "強化軍紀、杜絕中國滲透、為戰時情境做準備(平戰轉換)，提高處理軍事犯罪效率。",
                    positionB: "可能導致「分離審判」(軍人在軍事法庭、民眾在普通法庭)，造成判決標準不一致，且軍法官獨立性難以保障。"
                }
            ]
        },
        
        // --- 議題2: 軍法官獨立性與專業性 ---
        {
            name: "軍法官獨立性與專業性",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "政府承諾將透過立法確保軍法官獨立性，包括制定「軍事法院組織法」、「軍事檢察署組織法」及「軍法官人事條例」。",
                    positionB: "軍法官受軍階升遷與服役年限限制，獨立性難以保障。2012年大法官釋字第704號解釋指出「軍事審判官身分之保障應有別於一般軍官」。"
                },
                {
                    name: "支持理據",
                    positionA: "顧立雄表示將引進外部單位和多元審議委員會進行公評，不由國防部內部人士管理，確保組織面與人事面的獨立性。",
                    positionB: "台灣已凍結平時軍事審判近12年，第一線軍中法制人員多缺乏實務經驗。國防部也承認過去對軍法官培訓不足。"
                },
                {
                    name: "代表人物/組織",
                    positionA: "國防部長顧立雄、國防部法律司長沈世偉",
                    positionB: "司法院副秘書長王梅英、歐洲人權法院(要求軍事法庭具有可供檢驗的「獨立性及公正性」)"
                },
                {
                    name: "潛在影響",
                    positionA: "建立新型軍事審判制度，確保軍法官獨立性，提升軍事審判專業性與公信力。",
                    positionB: "若未能確保軍法官獨立性，可能重蹈過去軍審制度的覆轍，無法獲得社會信任。"
                }
            ]
        },
        
        // --- 議題3: 替代方案與配套措施 ---
        {
            name: "替代方案與配套措施",
            aspects: [
                {
                    name: "核心論點",
                    positionA: "恢復軍審是必要的，同時將建立完善配套措施確保軍審公正性。",
                    positionB: "建議採取替代方案，如設立「國安專門法庭」或「軍法官參審制」，而非完全恢復軍審制度。"
                },
                {
                    name: "具體建議",
                    positionA: "國防部將研擬相關配套法案，確保組織面與人事面的獨立性，並與司法院及法務部協調培訓機制。",
                    positionB: "台大法律系教授林鈺雄建議讓軍方參審員加入普通法庭審理過程，打造「量小質精」的國安專庭。民間團體呼籲先設立軍冤委員會，建立透明調查機制。"
                },
                {
                    name: "歷史教訓",
                    positionA: "國防部認為平時若不建立軍事審判制度，戰時將難以重啟，影響國家安全。",
                    positionB: "2013年洪仲丘事件後，政府暫停承平時期軍事審判並成立軍冤委員會，但該委員會僅運作一年即中止，未能有效解決軍中人權問題。"
                }
            ]
        },
        
        // --- 議題4: 法律適用範圍與誤解澄清 ---
        {
            name: "法律適用範圍與誤解澄清",
            aspects: [
                {
                    name: "適用對象",
                    positionA: "國防部明確表示軍審僅適用於現役軍人，退役軍人、後備軍人、民防團體成員及一般民眾均不受軍事審判。",
                    positionB: "仍有疑慮認為軍審可能擴大適用範圍，如馬文君質詢時提及潛艦洩密案是否會上軍事法庭。"
                },
                {
                    name: "抗命罪範圍",
                    positionA: "國防部法律司長沈世偉澄清，「抗命罪」必須與軍事命令有關，如不參加演習、逃避實彈射擊訓練等，偷吃早餐或訓話握拳不構成抗命罪。",
                    positionB: "網路流傳「軍人偷吃早餐恐判7年」等誤解，實際上違抗軍事命令最高可處5年以下有期徒刑，非軍事的行政命令則依陸海空軍懲罰法懲處。"
                },
                {
                    name: "教召不到處理",
                    positionA: "國防部明確表示，後備軍人未依規定入營報到屬妨礙兵役行為，適用妨害兵役治罪條例，不適用軍審。",
                    positionB: "網傳「50歲以下男性教召不到就軍法審判」為錯誤訊息，後備軍人收到教召令時仍屬平民身分，入營後才轉為現役軍人。"
                }
            ]
        }
    ],
    
    // === 總結與分析區塊 ===
    summary: "恢復軍事審判制度的爭議反映了台灣社會對軍事司法改革的不同觀點。支持者強調此舉是為了因應中國滲透威脅，僅針對現役軍人特定軍事犯罪，並承諾建立完善配套措施確保軍法官獨立性。質疑者則擔憂軍審獨立性難以保障，可能重蹈過去冤案覆轍，並提出替代方案如國安專庭或軍法官參審制。根據民調，60%民眾支持恢復軍審，但各政黨支持者態度不一。未來軍審制度的改革需在國家安全與人權保障間取得平衡，並建立社會信任。",
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