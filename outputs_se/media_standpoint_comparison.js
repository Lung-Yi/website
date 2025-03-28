// media_standpoint_comparison.js

// 定義媒體資料陣列
const mediaData = [
  {
    name: "報導者The Reporter",
    angle: "批判性分析，關注軍審制度歷史問題與改革挑戰",
    source: "法律學者、前最高法院法官",
    focus: "軍審制度歷史冤案、軍法官獨立性問題、軍法體系12年斷層"
  },
  {
    name: "中央社 CNA",
    angle: "中立報導，偏向官方立場",
    source: "總統賴清德、國防部長顧立雄、行政院發言人",
    focus: "政府修法動機、軍審制度改革方向、官方澄清與保證"
  },
  {
    name: "TVBS新聞網",
    angle: "民調為主，呈現多元觀點",
    source: "TVBS民調、歷史案例",
    focus: "民眾對軍審恢復的支持度、政黨立場差異、歷史背景"
  },
  {
    name: "TFC Taiwan",
    angle: "事實查核，澄清錯誤訊息",
    source: "國防部法律司長、法律條文",
    focus: "澄清軍審適用範圍、抗命罪定義、後備軍人身分釐清"
  },
  {
    name: "客新聞/Rti中央廣播電臺",
    angle: "關注軍人權益與救濟機制",
    source: "台灣陪審團協會、軍冤家屬",
    focus: "軍冤委員會設立、軍中人權保障、透明調查機制"
  },
  {
    name: "風傳媒/ETtoday",
    angle: "分析性報導，提供專業觀點",
    source: "法律專家、事實查核中心",
    focus: "國安專門法庭替代方案、軍審法條誤解澄清、民調分析"
  },
  {
    name: "RFI",
    angle: "國際視角，關注地緣政治影響",
    source: "國際關係分析、中國反應",
    focus: "中國被定義為「境外敵對勢力」的意義、兩岸關係變化"
  }
];

// 動態生成表格資料列
function populateTable() {
  const tableBody = document.querySelector("#mediaTable tbody");
  
  mediaData.forEach(item => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = item.name;

    const tdAngle = document.createElement("td");
    tdAngle.textContent = item.angle;

    const tdSource = document.createElement("td");
    tdSource.textContent = item.source;

    const tdFocus = document.createElement("td");
    tdFocus.textContent = item.focus;

    tr.appendChild(tdName);
    tr.appendChild(tdAngle);
    tr.appendChild(tdSource);
    tr.appendChild(tdFocus);

    tableBody.appendChild(tr);
  });
}

// 動態生成「分析說明」與「資料來源」區塊
function createNotesAndSource() {
  const container = document.getElementById("mediaContainer");
  
  // 建立 Notes 區塊
  const notesDiv = document.createElement("div");
  notesDiv.className = "notes";
  const notesTitle = document.createElement("strong");
  notesTitle.textContent = "分析說明：";
  notesDiv.appendChild(notesTitle);
  const notesContent = document.createTextNode(" 本分析顯示不同媒體對軍審議題的報導角度存在明顯差異。官方媒體如中央社偏向呈現政府立場，強調軍審制度改革的必要性；報導者等獨立媒體則採批判性視角，關注軍審歷史問題；TFC等事實查核媒體著重澄清錯誤訊息；TVBS等商業媒體則透過民調呈現社會觀點。讀者應綜合各類媒體報導，全面了解軍審制度的改革背景、爭議與影響。");
  notesDiv.appendChild(notesContent);

  // 建立 Source 區塊
  const sourceDiv = document.createElement("div");
  sourceDiv.className = "source";
  sourceDiv.textContent = "資料來源：2025年3月13日至3月26日各媒體報導綜合整理";

  // 將 Notes 與 Source 區塊添加到 container 最後
  container.appendChild(notesDiv);
  container.appendChild(sourceDiv);
}

// 頁面載入時呼叫初始化函數
window.addEventListener('load', function() {
  populateTable();
  createNotesAndSource();
});