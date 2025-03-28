// piechart.js

// 定義當前預算分配的資料
const currentBudgetData = {
  labels: ['國防部 (2.5% GDP)', '經濟部', '教育部', '交通部', '衛福部', '內政部', '其他部會'],
  datasets: [{
    data: [476, 350, 278, 389, 317, 400, 790],
    backgroundColor: [
      'rgb(65, 105, 225)', // 國防部 - 深藍色
      'rgb(46, 139, 87)',  // 經濟部 - 綠色
      'rgb(255, 165, 0)',  // 教育部 - 橙色
      'rgb(106, 90, 205)', // 交通部 - 紫色
      'rgb(220, 20, 60)',  // 衛福部 - 紅色
      'rgb(30, 144, 255)', // 內政部 - 藍色
      'rgb(128, 128, 128)' // 其他 - 灰色
    ],
    borderWidth: 1,
    borderColor: '#ffffff'
  }]
};

// 定義若國防預算提高至GDP 10%的資料
const increasedDefenseBudgetData = {
  labels: ['國防部 (10% GDP)', '其他部會 (大幅縮減)'],
  datasets: [{
    data: [2645, 355],
    backgroundColor: [
      'rgb(65, 105, 225)', // 國防部 - 深藍色
      'rgb(128, 128, 128)' // 其他 - 灰色
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
    title: {
      display: true,
      text: '台灣中央政府總預算分配 (單位：十億新台幣)',
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: 20
    },
    subtitle: {
      display: true,
      text: '資料來源：2025年中央政府總預算約3兆新台幣',
      font: {
        size: 12,
        style: 'italic'
      },
      padding: {
        bottom: 20
      }
    },
    legend: {
      position: 'right',
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
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value}十億 (${percentage}%)`;
        }
      }
    },
    datalabels: {
      formatter: (value, ctx) => {
        const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
        const percentage = Math.round((value / total) * 100);
        return percentage > 5 ? `${percentage}%` : '';
      },
      color: '#fff',
      font: {
        weight: 'bold',
        size: 12
      }
    }
  }
};

// 建立切換按鈕功能
let currentChart = null;
let currentDataset = 'current';

function toggleDataset() {
  if (currentChart) {
    currentChart.destroy();
  }
  
  const ctx = document.getElementById('pieChart').getContext('2d');
  
  if (currentDataset === 'current') {
    currentDataset = 'increased';
    document.getElementById('toggleButton').textContent = '顯示目前預算分配';
    currentChart = new Chart(ctx, {
      type: 'pie',
      data: increasedDefenseBudgetData,
      options: {
        ...pieOptions,
        plugins: {
          ...pieOptions.plugins,
          title: {
            ...pieOptions.plugins.title,
            text: '若國防預算提高至GDP 10%的預算分配 (單位：十億新台幣)'
          },
          subtitle: {
            ...pieOptions.plugins.subtitle,
            text: '美方建議：國防預算應達GDP 10%，約2.64兆新台幣'
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  } else {
    currentDataset = 'current';
    document.getElementById('toggleButton').textContent = '顯示國防預算提高至GDP 10%';
    currentChart = new Chart(ctx, {
      type: 'pie',
      data: currentBudgetData,
      options: pieOptions,
      plugins: [ChartDataLabels]
    });
  }
}

// 等待頁面完全載入後再初始化圓餅圖
window.addEventListener('load', function() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  currentChart = new Chart(ctx, {
    type: 'pie',
    data: currentBudgetData,
    options: pieOptions,
    plugins: [ChartDataLabels]
  });
  
  // 為切換按鈕添加事件監聽器
  document.getElementById('toggleButton').addEventListener('click', toggleDataset);
});
