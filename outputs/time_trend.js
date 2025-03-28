// 等待 DOM 加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化圖表
    initializeTimeChart();
});

function initializeTimeChart() {
    // 獲取 canvas 元素
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // 台灣與中國國防預算數據 (單位：十億新台幣)
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    
    // 台灣國防預算數據 (單位：十億新台幣)
    const taiwanBudget = [327.8, 346.0, 358.0, 366.8, 372.6, 415.1, 436.0, 476.0];
    
    // 中國國防預算數據 (單位：十億新台幣，已換算)
    const chinaBudget = [4150, 4470, 4780, 5090, 5450, 5800, 6200, 6650];
    
    // 台灣國防預算佔 GDP 百分比
    const taiwanGDPPercentage = [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5];
    
    // 圖表配置
    const chartConfig = {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: '台灣國防預算 (十億新台幣)',
                    data: taiwanBudget,
                    borderColor: 'rgb(0, 123, 255)',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.1,
                    yAxisID: 'y'
                },
                {
                    label: '中國國防預算 (十億新台幣)',
                    data: chinaBudget,
                    borderColor: 'rgb(220, 53, 69)',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.1,
                    yAxisID: 'y1'
                },
                {
                    label: '台灣國防預算佔 GDP 百分比 (%)',
                    data: taiwanGDPPercentage,
                    borderColor: 'rgb(40, 167, 69)',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.1,
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: '台灣與中國國防預算趨勢比較 (2018-2025)',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: '資料來源：新聞報導整理',
                    padding: {
                        bottom: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.datasetIndex === 2) {
                                    label += context.parsed.y + '%';
                                } else {
                                    label += context.parsed.y + ' 十億新台幣';
                                }
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 20
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 3,
                            yMax: 3,
                            borderColor: 'rgba(40, 167, 69, 0.5)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: '台灣目標 (3% GDP)',
                                enabled: true,
                                position: 'end'
                            },
                            yScaleID: 'y2'
                        },
                        line2: {
                            type: 'line',
                            yMin: 10,
                            yMax: 10,
                            borderColor: 'rgba(220, 53, 69, 0.5)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: '美方建議 (10% GDP)',
                                enabled: true,
                                position: 'end'
                            },
                            yScaleID: 'y2'
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '年份',
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
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '台灣國防預算 (十億新台幣)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    max: 600,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '中國國防預算 (十億新台幣)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '佔 GDP 百分比 (%)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    max: 12,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    };

    // 創建圖表
    const chart = new Chart(ctx, chartConfig);
    
    // 添加註解說明
    const chartContainer = document.querySelector('.chart-container');
    const annotation = document.createElement('div');
    annotation.className = 'chart-annotation';
    annotation.innerHTML = `
        <h3>關鍵觀察：</h3>
        <ul>
            <li>台灣2025年國防預算達476億元新台幣，為歷年最高，約佔GDP 2.5%</li>
            <li>中國2025年國防預算增加7.2%，達17,847億元人民幣(約6,650億元新台幣)</li>
            <li>美方建議台灣將國防預算提高至GDP的10%(約2.5兆元新台幣)</li>
            <li>台灣政府目標是將國防預算提高至GDP的3%</li>
            <li>中國國防預算約為台灣的14倍，且持續以每年約7%的速度增長</li>
        </ul>
    `;
    chartContainer.appendChild(annotation);
}
