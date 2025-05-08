// piechart.js

// 定義圓餅圖的資料與顏色
const pieData = {
  labels: ['出口產業受衝擊', '內需產業受惠', '金融業匯損風險', '民眾換匯需求增加', '觀光旅遊影響'],
  datasets: [{
    data: [35, 25, 20, 15, 5],
    backgroundColor: [
      'rgb(220, 53, 69)',  // 紅色 - 負面影響
      'rgb(40, 167, 69)',  // 綠色 - 正面影響
      'rgb(255, 193, 7)',  // 黃色 - 風險
      'rgb(0, 123, 255)',  // 藍色 - 中性
      'rgb(111, 66, 193)'   // 紫色 - 次要影響
    ],
    borderWidth: 1,
    borderColor: '#fff'
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
        size: 14
      },
      formatter: (value) => {
        return value + '%';
      }
    },
    title: {
      display: true,
      text: '台幣升值對各產業影響比例分析',
      font: {
        size: 22,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    subtitle: {
      display: true,
      text: '根據2025年5月新聞報導分析',
      font: {
        size: 14,
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          size: 14
        },
        generateLabels: function(chart) {
          const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
          const labels = original.call(this, chart);
          
          const descriptions = [
            '半導體、機械、工具機等出口業者面臨匯損',
            '航空、觀光、食品加工、造紙及資產營建股',
            '壽險業拋售美元資產，金融業匯兌風險增加',
            '民眾趁台幣升值搶換日圓美金',
            '國人出國意願增加，國際客來台消費變貴'
          ];
          
          labels.forEach((label, i) => {
            label.text = `${label.text} - ${descriptions[i]}`;
          });
          
          return labels;
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: ${value}%`;
        }
      }
    }
  }
};

// 等待頁面完全載入後再初始化圓餅圖
window.addEventListener('load', function() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  Chart.register(ChartDataLabels);
  new Chart(ctx, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  });
});