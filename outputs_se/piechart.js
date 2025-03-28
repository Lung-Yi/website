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

// 等待頁面完全載入後再初始化圓餅圖
window.addEventListener('load', function() {
  Chart.register(ChartDataLabels);
  
  // 繪製圓餅圖
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: pieData,
    options: pieOptions,
    plugins: [ChartDataLabels]
  });
  
  // 添加資料來源說明
  const sourceInfo = document.createElement('div');
  sourceInfo.className = 'source-info';
  sourceInfo.innerHTML = '<p>資料來源：TVBS民調中心 (2025年3月18-24日，有效樣本1,050位，誤差範圍±3.0個百分點)</p>';
  document.querySelector('.pie-chart-container').appendChild(sourceInfo);
});