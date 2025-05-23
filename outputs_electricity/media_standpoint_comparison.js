// media_standpoint_comparison.js

// 定義媒體資料陣列
const mediaData = [
  {
    name: "BBC",
    angle: "國際視角，關注地緣政治與能源安全",
    source: "總統賴清德訪談、美國智庫、國際核能趨勢",
    focus: "台灣能源政策轉向、美國壓力、國際核能復興趨勢"
  },
  {
    name: "天下雜誌",
    angle: "政策分析，探討藍白綠三方立場差異",
    source: "立法院修法過程、民意調查、國際案例",
    focus: "核管法修正背景、政黨立場轉變、民意變化"
  },
  {
    name: "中央社 CNA",
    angle: "官方中性報導，重視程序與時程",
    source: "台電官方、行政院、核安會",
    focus: "停機時程、供電替代方案、法規修正程序"
  },
  {
    name: "聯合新聞網",
    angle: "經濟效益導向，支持核電延役",
    source: "學者專家、成本效益分析、國際比較",
    focus: "延役經濟效益、供電成本、光電轉型規劃"
  },
  {
    name: "中時新聞網",
    angle: "強烈支持核電，批評非核政策",
    source: "《外交家雜誌》、國防安全專家、民調數據",
    focus: "國防安全風險、能源自主、戰略脆弱性"
  },
  {
    name: "環境資訊中心",
    angle: "環保立場，支持非核家園政策",
    source: "環保團體、反核運動史、國際環保組織",
    focus: "反核運動歷程、環境影響、核廢料處置"
  },
  {
    name: "公視新聞網PNN",
    angle: "平衡報導，呈現多方觀點",
    source: "政府官員、民間團體、專家學者",
    focus: "社會各界反應、技術細節、未來挑戰"
  },
  {
    name: "工商時報",
    angle: "產業觀點，關注經濟與競爭力",
    source: "產業界、經濟部、台電公司",
    focus: "產業用電需求、經濟成本、企業競爭力"
  }
];

// 動態生成表格資料列
function populateTable() {
  const tableBody = document.querySelector("#mediaTable tbody");
  
  mediaData.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.style.animationDelay = `${index * 0.1}s`;

    const tdName = document.createElement("td");
    tdName.textContent = item.name;
    tdName.className = "media-name";

    const tdAngle = document.createElement("td");
    tdAngle.textContent = item.angle;
    tdAngle.className = "media-angle";

    const tdSource = document.createElement("td");
    tdSource.textContent = item.source;
    tdSource.className = "media-source";

    const tdFocus = document.createElement("td");
    tdFocus.textContent = item.focus;
    tdFocus.className = "media-focus";

    tr.appendChild(tdName);
    tr.appendChild(tdAngle);
    tr.appendChild(tdSource);
    tr.appendChild(tdFocus);

    // 添加hover效果
    tr.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f0f8ff';
      this.style.transform = 'scale(1.02)';
    });
    
    tr.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.transform = 'scale(1)';
    });

    tableBody.appendChild(tr);
  });
}

// 創建立場分布圖表
function createStanceChart() {
  const chartContainer = document.createElement('div');
  chartContainer.className = 'stance-chart';
  chartContainer.innerHTML = `
    <h3>媒體立場分布</h3>
    <div class="stance-bars">
      <div class="stance-bar">
        <div class="bar-label">支持核電</div>
        <div class="bar" style="width: 37.5%; background-color: #ff6b6b;">
          <span class="bar-text">中時、聯合、工商</span>
        </div>
      </div>
      <div class="stance-bar">
        <div class="bar-label">中性報導</div>
        <div class="bar" style="width: 37.5%; background-color: #4ecdc4;">
          <span class="bar-text">BBC、中央社、公視</span>
        </div>
      </div>
      <div class="stance-bar">
        <div class="bar-label">支持非核</div>
        <div class="bar" style="width: 25%; background-color: #45b7d1;">
          <span class="bar-text">環境資訊、天下</span>
        </div>
      </div>
    </div>
  `;
  
  return chartContainer;
}

// 創建關注焦點分析
function createFocusAnalysis() {
  const focusContainer = document.createElement('div');
  focusContainer.className = 'focus-analysis';
  focusContainer.innerHTML = `
    <h3>報導關注焦點分析</h3>
    <div class="focus-grid">
      <div class="focus-item">
        <div class="focus-title">能源安全</div>
        <div class="focus-media">BBC、中時、工商</div>
      </div>
      <div class="focus-item">
        <div class="focus-title">經濟效益</div>
        <div class="focus-media">聯合、工商、天下</div>
      </div>
      <div class="focus-item">
        <div class="focus-title">環境影響</div>
        <div class="focus-media">環境資訊、公視</div>
      </div>
      <div class="focus-item">
        <div class="focus-title">政策程序</div>
        <div class="focus-media">中央社、公視</div>
      </div>
    </div>
  `;
  
  return focusContainer;
}

// 動態生成「分析說明」與「資料來源」區塊
function createNotesAndSource() {
  const container = document.getElementById("mediaContainer");
  
  // 添加立場分布圖表
  const stanceChart = createStanceChart();
  container.appendChild(stanceChart);
  
  // 添加關注焦點分析
  const focusAnalysis = createFocusAnalysis();
  container.appendChild(focusAnalysis);
  
  // 建立 Notes 區塊
  const notesDiv = document.createElement("div");
  notesDiv.className = "notes";
  const notesTitle = document.createElement("strong");
  notesTitle.textContent = "分析說明：";
  notesDiv.appendChild(notesTitle);
  const notesContent = document.createTextNode(" 本分析顯示不同媒體對核電政策的報導呈現明顯立場差異。支持核電的媒體（中時、聯合、工商）多從經濟效益與能源安全角度論述，引用成本分析與國際比較；中性媒體（BBC、中央社、公視）著重事實報導與程序說明；支持非核的媒體（環境資訊、天下）則關注環境風險與社會共識。讀者應綜合多方報導，理性判斷政策利弊。");
  notesDiv.appendChild(notesContent);

  // 建立 Source 區塊
  const sourceDiv = document.createElement("div");
  sourceDiv.className = "source";
  sourceDiv.textContent = "資料來源：2025年5月13-21日 各媒體核電政策相關報導綜合整理";

  // 將 Notes 與 Source 區塊添加到 container 最後
  container.appendChild(notesDiv);
  container.appendChild(sourceDiv);
}

// 添加CSS樣式
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .media-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-family: 'Arial', sans-serif;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .media-table th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 10px;
      text-align: left;
      font-weight: bold;
    }
    
    .media-table td {
      padding: 12px 10px;
      border-bottom: 1px solid #ddd;
      transition: all 0.3s ease;
    }
    
    .media-table tr {
      transition: all 0.3s ease;
    }
    
    .media-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .media-name {
      font-weight: bold;
      color: #2c3e50;
    }
    
    .stance-chart, .focus-analysis {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stance-chart h3, .focus-analysis h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .stance-bars {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .stance-bar {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .bar-label {
      width: 100px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .bar {
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: white;
      font-weight: bold;
      transition: all 0.3s ease;
      min-width: 200px;
    }
    
    .bar:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .focus-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    
    .focus-item {
      background: white;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      transition: all 0.3s ease;
    }
    
    .focus-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .focus-title {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 8px;
    }
    
    .focus-media {
      color: #666;
      font-size: 0.9em;
    }
    
    .notes {
      background: #e8f4f8;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #45b7d1;
    }
    
    .source {
      background: #f0f0f0;
      padding: 10px;
      border-radius: 8px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
    
    .analysis-description {
      color: #666;
      margin-bottom: 20px;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}

// 頁面載入時呼叫初始化函數
window.addEventListener('load', function() {
  addStyles();
  populateTable();
  createNotesAndSource();
});