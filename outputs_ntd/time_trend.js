// 等待 DOM 加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化圖表
    initializeTimeChart();
});

function initializeTimeChart() {
    // 獲取 canvas 元素
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // 歷史台幣匯率數據 (美元兌新台幣)
    const historicalData = [
        // 第一次大幅升值期 (1985-1990)
        { year: '1985', rate: 39.85 },
        { year: '1990', rate: 26.89 },
        // 間隔期
        { year: '2002', rate: 34.56 },
        // 第二次大幅升值期 (2002-2011)
        { year: '2011', rate: 29.46 },
        // 間隔期
        { year: '2016', rate: 33.83 },
        // 第三次大幅升值期 (2016-2022)
        { year: '2022', rate: 27.69 },
        // 近期升值前
        { year: '2025年3月', rate: 33.00 },
        // 近期急速升值
        { year: '2025年4月', rate: 32.00 },
        { year: '2025年5月初', rate: 30.30 },
        { year: '2025年5月5日', rate: 29.59 }
    ];
    
    // 提取數據
    const labels = historicalData.map(item => item.year);
    const rates = historicalData.map(item => item.rate);
    
    // 標註重要時期
    const annotations = {
        boxes: [
            {
                type: 'box',
                xMin: 0,
                xMax: 1,
                yMin: 26,
                yMax: 40,
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderColor: 'rgba(255, 99, 132, 0.3)',
                borderWidth: 1,
                label: {
                    display: true,
                    content: '第一次大幅升值 (32.5%)',
                    position: 'start'
                }
            },
            {
                type: 'box',
                xMin: 2,
                xMax: 3,
                yMin: 29,
                yMax: 35,
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderColor: 'rgba(54, 162, 235, 0.3)',
                borderWidth: 1,
                label: {
                    display: true,
                    content: '第二次大幅升值 (14.8%)',
                    position: 'start'
                }
            },
            {
                type: 'box',
                xMin: 4,
                xMax: 5,
                yMin: 27,
                yMax: 34,
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                borderColor: 'rgba(75, 192, 192, 0.3)',
                borderWidth: 1,
                label: {
                    display: true,
                    content: '第三次大幅升值 (18.1%)',
                    position: 'start'
                }
            },
            {
                type: 'box',
                xMin: 6,
                xMax: 9,
                yMin: 29,
                yMax: 33.5,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 0.5)',
                borderWidth: 1,
                label: {
                    display: true,
                    content: '2025年急速升值 (10.3%)',
                    position: 'start',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        ]
    };
    
    // 圖表配置
    const chartConfig = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '美元兌新台幣匯率',
                data: rates,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: '新台幣對美元匯率歷史變化趨勢 (1985-2025)',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: '比較近期急速升值與過去40年三次大幅升值期間',
                    font: {
                        size: 14
                    },
                    padding: 10
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `匯率: ${context.parsed.y} 元/美元`;
                        }
                    }
                },
                annotation: annotations
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '時間',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '匯率 (新台幣/美元)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    reverse: true, // 數值越小代表台幣越強，所以反轉Y軸
                    min: 25,
                    max: 40,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    };

    // 創建圖表
    const chart = new Chart(ctx, chartConfig);
    
    // 添加註解說明
    const chartContainer = document.querySelector('.chart-container');
    const noteElement = document.createElement('div');
    noteElement.className = 'chart-note';
    noteElement.innerHTML = `
        <p><strong>註:</strong> 匯率數值越低表示新台幣越強勢。2025年5月新台幣急速升值速度超過過去三次升值期間，
        引發市場關注。過去三次升值期間分別為1985-1990年(32.5%)、2002-2011年(14.8%)及2016-2022年(18.1%)。</p>
        <p>數據來源: 新聞報導及央行歷史匯率資料</p>
    `;
    noteElement.style.fontSize = '12px';
    noteElement.style.color = '#666';
    noteElement.style.marginTop = '10px';
    noteElement.style.padding = '10px';
    noteElement.style.borderTop = '1px solid #eee';
    chartContainer.appendChild(noteElement);
}
