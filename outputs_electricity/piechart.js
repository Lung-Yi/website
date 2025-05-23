// piechart.js

// 定義圓餅圖的資料與顏色
const pieData = {
    labels: ['燃氣發電', '燃煤發電', '再生能源', '核電'],
    datasets: [{
      data: [47.2, 31.1, 11.6, 3.4],
      backgroundColor: [
        'rgb(54, 162, 235)',   // 藍色 - 燃氣
        'rgb(75, 75, 75)',     // 深灰色 - 燃煤
        'rgb(34, 197, 94)',    // 綠色 - 再生能源
        'rgb(255, 193, 7)'     // 黃色 - 核電
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };
  
// 定義圓餅圖的選項設定
const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: true,
      text: '2024年台灣發電結構分析',
      font: {
        size: 24,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 30
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14
        },
        padding: 20,
        usePointStyle: true
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.parsed;
          return label + ': ' + value + '%';
        }
      }
    },
    datalabels: {
      display: true,
      color: 'white',
      font: {
        size: 16,
        weight: 'bold'
      },
      formatter: function(value, context) {
        return value + '%';
      }
    }
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }
};

  
// 等待頁面完全載入後再初始化圓餅圖
window.addEventListener('load', function() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: pieData,
      options: pieOptions,
      plugins: [ChartDataLabels]
    });
});