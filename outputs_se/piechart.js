// piechart.js

// 定義圓餅圖的資料與顏色
const pieData = {
  labels: ['支持恢復軍審', '反對恢復軍審', '未表態'],
  datasets: [{
    data: [60, 25, 15],
    backgroundColor: [
      'rgb(65, 105, 225)',  // 支持 - 皇家藍
      'rgb(220, 20, 60)',   // 反對 - 深紅色
      'rgb(169, 169, 169)'  // 未表態 - 灰色
    ],
    borderWidth: 1,
    borderColor: '#ffffff'
  }]
};

// 定義第二個圓餅圖 - 政黨支持者態度
const partyPieData = {
  labels: ['民進黨支持者-贊成', '民進黨支持者-反對', '國民黨支持者-贊成', '國民黨支持者-反對', '民眾黨支持者-贊成', '民眾黨支持者-反對'],
  datasets: [{
    data: [87, 6, 45, 41, 53, 41],
    backgroundColor: [
      'rgba(0, 135, 90, 0.8)',   // 民進黨贊成
      'rgba(0, 135, 90, 0.3)',   // 民進黨反對
      'rgba(0, 92, 161, 0.8)',   // 國民黨贊成
      'rgba(0, 92, 161, 0.3)',   // 國民黨反對
      'rgba(255, 196, 0, 0.8)',  // 民眾黨贊成
      'rgba(255, 196, 0, 0.3)'   // 民眾黨反對
    ],
    borderWidth: 1,
    borderColor: '#ffffff'
  }]
};

// 定義圓餅圖的選項設定
const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold',
        size: 16
      },
      formatter: (value) => {
        return value + '%';
      }
    },
    title: {
      display: true,
      text: 'TVBS民調：民眾對恢復軍事審判制度的態度',
      font: {
        size: 20,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    subtitle: {
      display: true,
      text: '2025年3月民調結果',
      font: {
        size: 14
      },
      padding: {
        bottom: 10
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14
        },
        padding: 20
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return context.label + ': ' + context.raw + '%';
        }
      }
    }
  }
};

// 政黨支持者圓餅圖選項
const partyPieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold',
        size: 14
      },
      formatter: (value) => {
        return value + '%';
      },
      display: function(context) {
        return context.dataset.data[context.dataIndex] > 10; // 只在數值大於10%時顯示標籤
      }
    },
    title: {
      display: true,
      text: '不同政黨支持者對恢復軍審的態度',
      font: {
        size: 20,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 12
        },
        padding: 15
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return context.label + ': ' + context.raw + '%';
        }
      }
    }
  }
};

// 等待頁面完全載入後再初始化圓餅圖
window.addEventListener('load', function() {
  Chart.register(ChartDataLabels);
  
  // 繪製第一個圓餅圖
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: pieData,
    options: pieOptions,
    plugins: [ChartDataLabels]
  });
  
  // 繪製第二個圓餅圖
  const ctx2 = document.getElementById('partyPieChart').getContext('2d');
  new Chart(ctx2, {
    type: 'pie',
    data: partyPieData,
    options: partyPieOptions,
    plugins: [ChartDataLabels]
  });
  
  // 添加資料來源說明
  const sourceInfo = document.createElement('div');
  sourceInfo.className = 'source-info';
  sourceInfo.innerHTML = '<p>資料來源：TVBS民調中心 (2025年3月18-24日，有效樣本1,050位，誤差範圍±3.0個百分點)</p>';
  document.querySelector('.pie-chart-container').appendChild(sourceInfo);
});
