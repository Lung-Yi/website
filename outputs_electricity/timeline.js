// timeline.js

// 台灣核電發展重大時間線事件資料
const events = [
  {
    date: "1970年代",
    title: "核電廠興建啟動",
    description: "台灣開始興建核電廠，作為十大建設之一，核一廠1971年底施工，1978年商轉。",
    details: "1970年代台灣工業快速發展，為因應大幅增加的用電量，政府陸續興建火力發電廠。1973年10月爆發石油危機，因燃料高度仰賴進口，為確保電力穩定供應，政府改採能源多元化政策，開始發展核能發電。核一廠於1971年底施工，1978年商轉，成為台灣核電發展的起點。"
  },
  {
    date: "1980年代",
    title: "核電發展高峰期",
    description: "核能發電達到高峰，1985年核能發電占比達52.4%，核三廠2號機於1985年5月18日商轉。",
    details: "1980年代是台灣核電發展的黃金時期，核能發電占比在1985年達到歷史最高的52.4%。核三廠位於屏東縣恆春鎮，在1980年代能源危機背景下建設，2號機於1985年5月18日商轉，運轉近40年，為台灣電力供應做出重要貢獻。"
  },
  {
    date: "2011年3月11日",
    title: "福島核災衝擊",
    description: "日本福島核災發生，三座反應爐發生爐心熔毀，台灣反核聲浪達到高峰，超過二十萬人走上街頭。",
    details: "2011年3月11日日本福島核災震撼全球，三座反應爐發生爐心熔毀，引發國際對核電安全的重新思考。福島核災後，台灣各地超過二十萬人走上街頭反核，核安問題成為總統大選焦點，國民黨、民進黨候選人均喊出『核一二三不延役』。這起事件成為台灣核電政策的重要轉折點。"
  },
  {
    date: "2016年",
    title: "非核家園政策確立",
    description: "蔡英文政府推動『非核、減煤、增氣、展綠』新能源政策，目標2025年實現非核家園。",
    details: "2016年蔡英文執政後，正式推動『非核、減煤、增氣、展綠』新能源政策，將『非核家園』寫入《環境基本法》，設定2025年核電歸零的明確時程。此政策標誌著台灣能源轉型的重要里程碑，從核電占比超過10%逐步降至目前約3%，最終歸零。"
  },
  {
    date: "2025年5月17日",
    title: "核電歸零實現",
    description: "核三廠2號機正式停機除役，台灣成為亞洲第一個曾使用核電又廢除的國家，實現非核家園目標。",
    details: "2025年5月17日，台灣最後一座運轉中的核電廠反應爐（核三廠2號機）正式除役，台灣進入『無核狀態』，成為亞洲第一個曾使用核電又廢除的國家。核三廠2號機自1985年5月18日商轉，40年運轉期間累積發電約2741.6億度。台灣自1978年12月6日核一廠1號機組商轉開始，核電運作總計16,965天（約46年），正式結束核電時代。"
  },
  {
    date: "2025年5月13日",
    title: "《核管法》修正通過",
    description: "立法院三讀通過《核管法》修正案，核電廠運轉年限可從40年延長至最多60年，為重啟開闢道路。",
    details: "就在核三廠停機前4天，立法院於5月13日三讀通過《核子反應器設施管制法》修正案，以60票贊成、51票反對通過。修法內容包括：核電廠運轉執照有效期最長40年，期滿後可申請換發執照最長20年；放寬申請時限從屆滿前5-15年改為屆滿前都可申請；新增已停機核電機組可申請『重啟』條款。此修法為核電延役與重啟提供法律依據，但仍需符合核安無虞、核廢有解、社會共識三大前提。"
  }
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