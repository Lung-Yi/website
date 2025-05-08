// timeline.js

// 事件資料 - 台幣升值事件時間線
const events = [
  {
    date: "2025年4月底",
    title: "台幣開始升值趨勢",
    description: "新台幣兌美元匯率開始呈現升值趨勢，從33元以上開始逐步走強。",
    details: "根據新聞報導，台幣自4月底開始急升直上，當時台幣兌美元匯率約在33元以上。這是整個台幣升值事件的起始階段，此時市場尚未出現劇烈波動。"
  },
  {
    date: "2025年5月2日",
    title: "首次單日大幅升值",
    description: "新台幣單日升值1.04元，創下單日升幅3.2%的紀錄，市場開始關注台幣升值現象。",
    details: "5月2日台幣出現首次大幅升值，單日升值1.04元，升幅達3.2%，引發市場高度關注。這一天的升值幅度已經相當罕見，但更大的波動還在後面。值得注意的是，這一天恰逢台美進行貿易談判，有分析認為兩者之間可能存在關聯。"
  },
  {
    date: "2025年5月5日",
    title: "台幣暴力升值突破30元大關",
    description: "新台幣再度暴力升值1.05元，盤中一度達29.59元，突破30元大關，創下歷史最大漲幅。",
    details: "5月5日台幣再度暴力升值，單日升值1.05元，盤中一度達29.59元，終場收在30.145元，升值9.19角、升幅2.96%。這是台幣兌美元匯率自1988年以來的最大單日漲幅。當日成交量高達43.885億美元，創史上第三大量。民眾搶換外幣導致多家銀行App系統流量暴增而當機，台銀日圓現鈔賣出價下探至0.20元，創近10個月新低。"
  },
  {
    date: "2025年5月5日晚間",
    title: "央行總裁楊金龍緊急召開記者會",
    description: "央行總裁楊金龍召開記者會，表示將加大調節匯市力道，並警告發現「炒匯禿鷹」現象。",
    details: "面對台幣暴力升值，央行總裁楊金龍於5月5日晚間緊急召開記者會對市場信心喊話，表示央行調節匯市的力道將會逐步加大。楊金龍指出匯價波動已「過度」，主因為熱錢進入及出口商拋匯形成羊群效應。他還透露央行發現有「炒匯禿鷹」現象，已發出警告並要求短期炒匯資金撤離台灣。楊金龍在記者會上回答提問時結結巴巴，引發外界揣測。"
  },
  {
    date: "2025年5月5日深夜",
    title: "賴清德總統發表談話",
    description: "賴清德總統透過影片喊話，稱升值受預期心理影響，強調台灣經濟體質仍強韌。",
    details: "賴清德總統於5月5日深夜透過影片喊話，表示台幣升值主要受預期心理影響，並強調台灣經濟體質仍然強韌。他否認美方施壓台灣匯率，並表示台美貿易談判未涉及匯率議題。賴清德試圖安撫市場情緒，但同時也暗指在野黨操作匯率波動輿論。"
  },
  {
    date: "2025年5月6日",
    title: "央行啟動專案金檢",
    description: "央行於5月6日啟動專案金檢，嚴查疑似「禿鷹」(熱錢)跡象，市場開始逐漸回穩。",
    details: "央行於5月6日啟動專案金檢，嚴查疑似「禿鷹」(熱錢)跡象。同時，在央行總裁楊金龍記者會發言後，新台幣開始出現回穩跡象，當天貶值1.35角，收30.28元(貶幅0.45%)。市場預期心理開始降溫，供需逐漸回歸平衡。"
  },
  {
    date: "2025年5月7-8日",
    title: "匯率暫時穩定在30元關卡",
    description: "新台幣匯率連續兩天維持在30元上下波動，市場關注焦點轉向升值對各產業的影響。",
    details: "5月7-8日，新台幣匯率暫時穩定在30元關卡上下波動。5月8日新台幣兌美元開盤價為30.30元，盤中一度走升至30.270元，最終收在30.303元，微幅貶值0.8分。市場關注焦點開始轉向台幣升值對各產業的影響，尤其是出口導向的製造業和機械業可能面臨的挑戰。有業者警告，若台幣持續升值，台灣機械業可能有一半以上會關廠倒閉。"
  },
  {
    date: "2025年5月8日",
    title: "楊金龍赴立法院備詢",
    description: "央行總裁楊金龍赴立法院財委會備詢，再次否認美國施壓台灣匯率，並解釋記者會結巴原因。",
    details: "央行總裁楊金龍於5月8日赴立法院財委會進行「國家主權基金」專題報告。他再次斬釘截鐵表示「絕對沒有」美國施壓台灣匯率，並解釋5月5日記者會上結結巴巴是因「口才不好」，與說謊無關。針對韓國銀行總裁李昌鏞稱美國施壓亞洲國家的報導，楊金龍表示可能是翻譯有出入。他還指出台幣升值也有好處，如增加海外購買力，但遭立委質疑。"
  }
  // 您可以按照相同的格式添加更多事件，或刪減現有事件
];

// 創建時間線
function createTimeline() {
  const timelineEl = document.getElementById('timeline');
  
  events.forEach((event, index) => {
    const eventEl = document.createElement('div');
    eventEl.className = `event ${index % 2 === 0 ? 'left' : 'right'}`;
    
    const contentEl = document.createElement('div');
    contentEl.className = 'content';
    
    const dateEl = document.createElement('div');
    dateEl.className = 'date';
    dateEl.textContent = event.date;
    
    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    titleEl.textContent = event.title;
    
    const descriptionEl = document.createElement('div');
    descriptionEl.className = 'description';
    descriptionEl.textContent = event.description;
    
    const detailsEl = document.createElement('div');
    detailsEl.className = 'details';
    detailsEl.textContent = event.details;
    
    // 添加「查看詳情」按鈕
    const expandBtn = document.createElement('span');
    expandBtn.className = 'expand-btn';
    expandBtn.textContent = '查看詳情 +';
    expandBtn.onclick = function() {
      if (detailsEl.style.display === 'block') {
        detailsEl.style.display = 'none';
        expandBtn.textContent = '查看詳情 +';
      } else {
        detailsEl.style.display = 'block';
        expandBtn.textContent = '收起 -';
      }
    };
    
    contentEl.appendChild(dateEl);
    contentEl.appendChild(titleEl);
    contentEl.appendChild(descriptionEl);
    contentEl.appendChild(detailsEl);
    contentEl.appendChild(expandBtn);
    
    eventEl.appendChild(contentEl);
    timelineEl.appendChild(eventEl);
  });
}

// 自定義函數 - 可以通過JavaScript動態添加新事件
// 使用方法: addNewEvent("您的日期", "您的標題", "您的描述", "您的詳細內容");
function addNewEvent(date, title, description, details) {
  const event = {
    date: date,
    title: title,
    description: description,
    details: details || ""
  };
  
  events.push(event);
  document.getElementById('timeline').innerHTML = "";
  createTimeline();
}

// 當整個頁面載入完畢後初始化時間線
window.addEventListener('load', function() {
  createTimeline();
});