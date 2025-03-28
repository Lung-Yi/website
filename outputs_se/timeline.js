// timeline.js

// 事件資料 - 台灣軍事審判制度重要歷史節點
const events = [
  {
    date: "1949-1987",
    title: "戒嚴時期軍事審判制度",
    description: "戒嚴時期軍事審判制度廣泛適用於民間，留下眾多冤案，成為台灣民主化進程中的歷史傷痕。",
    details: "台灣戒嚴時期長達38年，軍事審判權力擴張，不僅軍人，許多政治異議人士也被送交軍事法庭審判。這段期間軍事審判缺乏獨立性與透明度，導致諸多冤假錯案，如江國慶案等。軍事法庭成為政治控制的工具之一，對台灣社會造成深遠影響。"
  },
  {
    date: "1996",
    title: "江國慶冤案",
    description: "空軍作戰司令部士兵江國慶被控性侵殺害女童，經軍事法庭倉促審理後槍決，後證實為冤案。",
    details: "1996年，空軍作戰司令部士兵江國慶被控性侵殺害女童，經軍事法庭審理後被判處死刑並迅速執行。2011年，真凶許榮洲才被發現並定罪，江國慶案成為台灣軍事審判制度最知名的冤案之一，凸顯軍事審判制度的嚴重缺陷，包括程序不正義、證據審查不嚴謹等問題。此案成為推動軍事審判制度改革的重要契機。"
  },
  {
    date: "2013年7月",
    title: "洪仲丘事件",
    description: "義務役士官洪仲丘在軍中受不當處分致死，引發50萬人「白衫軍運動」，推動軍事審判法修正。",
    details: "2013年7月，義務役士官洪仲丘在退伍前夕遭受不當體罰，導致熱衰竭死亡。此事件引發台灣社會強烈反響，超過50萬民眾走上街頭參與「白衫軍運動」，要求軍中人權改革。洪仲丘案成為台灣軍事審判制度改革的關鍵轉捩點，促使立法院迅速修正《軍事審判法》，大幅限縮軍事審判權。"
  },
  {
    date: "2013年8月",
    title: "軍事審判法修正通過",
    description: "立法院三讀通過《軍事審判法》修正案，平時軍人犯罪改由普通法院審理，軍事審判僅限「戰時」啟動。",
    details: "2013年8月6日，立法院三讀通過《軍事審判法》修正案，規定平時軍人犯罪案件一律移送普通法院檢察署偵辦，軍事審判制度僅限「戰時」啟動。這項修法被視為台灣軍事司法改革的里程碑，大幅限縮了軍事審判權，強化了軍中人權保障。同時也成立軍事冤案申訴委員會，但該委員會僅運作一年即中止。"
  },
  {
    date: "2013-2024",
    title: "軍法體系12年斷層",
    description: "台灣凍結平時軍事審判近12年，導致第一線軍中法制人員多缺乏實務經驗，軍法專業能量萎縮。",
    details: "2013年軍審法修正後，台灣軍法體系經歷了近12年的斷層期。這段期間，軍法官培訓不足，專業能量萎縮。2017年起法務部開放15名軍法官定期借調到地檢署擔任「檢察事務官」，但整體而言，軍法體系人才培養與實務經驗累積出現明顯斷層。國防部也承認過去對軍法官培訓不足，需要進一步受訓才能勝任相關工作。"
  },
  {
    date: "2025年3月13日",
    title: "賴清德宣布恢復軍事審判",
    description: "總統賴清德召開國安高層會議，宣布恢復軍事審判制度，以因應中國對台灣軍隊的滲透威脅。",
    details: "2025年3月13日，總統賴清德召開國安高層會議，盤點台灣面臨的五大國安及統戰威脅，並宣布17項因應策略，其中包含恢復軍事審判制度。賴清德首次在官方場合明確將中華人民共和國定義為「境外敵對勢力」，並指出去年共諜案起訴64人中，66%為現役和退役軍人，顯示軍中存在潛在風險。此舉被視為台灣國安策略的重大轉變。"
  },
  {
    date: "2025年3月",
    title: "軍審修法爭議與討論",
    description: "恢復軍審引發社會討論，政府強調僅針對現役軍人軍事犯罪，民團呼籲同步設立軍冤委員會。",
    details: "恢復軍審的宣布引發社會各界熱烈討論。政府方面強調，修法僅針對現役軍人涉犯叛亂、洩密、利敵等軍事犯罪，不影響一般民眾，也非戒嚴。國防部承諾將透過立法確保軍法官獨立性，包括制定「軍事法院組織法」、「軍事檢察署組織法」及「軍法官人事條例」。民間團體則呼籲在恢復軍審前，應先設立軍事冤案申訴委員會，建立透明調查機制，保障軍中人權。"
  },
  {
    date: "2025年3月26日",
    title: "民調顯示六成民眾支持恢復軍審",
    description: "TVBS民調顯示60%民眾贊成恢復軍事審判制度，不同政黨支持者態度有明顯差異。",
    details: "TVBS於2025年3月26日發布民調結果顯示，60%民眾贊成恢復軍事審判制度，25%不贊成，15%未表態。政黨支持度分析顯示，民進黨支持者87%贊成恢復軍審，國民黨支持者則呈現五五波（45%贊成、41%不贊成），民眾黨支持者53%贊成、41%不贊成。此民調反映台灣社會對軍審制度恢復的整體態度傾向支持，但不同政治立場者看法仍有明顯差異。"
  },
  {
    date: "2025年4月",
    title: "軍審修法期程定調",
    description: "行政院長卓榮泰宣布將於4月上旬召開會議，律定軍審等修法期程，國防部表示將配合規劃。",
    details: "行政院長卓榮泰宣布將於2025年4月上旬親自召開會議，聽取各部會針對中國5大威脅的因應方案，並律定軍事審判法等相關法案的修法期程。國防部副部長柏鴻輝表示，國防部將遵從行政院指導，配合規劃相關工作。司法院則表示，關於軍事審判未來的制度規劃，希望朝獨立、公正、專業性方向建構，確保符合憲法要求的正當法律程序。"
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