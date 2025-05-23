// 等待 DOM 加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化圖表
    initializeTimeChart();
});

function initializeTimeChart() {
    // 獲取 canvas 元素
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // 核電發電占比歷史數據
    const nuclearData = {
        labels: ['1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2024', '2025'],
        datasets: [{
            label: '核電發電占比 (%)',
            data: [15, 52.4, 45, 35, 20, 18, 19, 16, 11, 4, 0],
            borderColor: '#FF6B35',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            tension: 0.3,
            fill: true,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y'
        }]
    };
    
    // 民意支持度數據（2017-2024）
    const publicOpinionData = {
        label: '非核家園民意支持度 (%)',
        data: [null, null, null, null, null, null, null, 70, null, null, null, null, null, null, null, null, null, 50],
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.3,
        fill: false,
        pointRadius: 8,
        pointHoverRadius: 10,
        yAxisID: 'y1',
        borderDash: [5, 5]
    };
    
    // 合併數據集
    const combinedLabels = ['1980', '1981', '1982', '1983', '1984', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
    const nuclearExtendedData = [15, 25, 35, 45, 50, 52.4, 45, 35, 20, 18, 19, 16, 12, 10, 8, 6, 11, 8, 6, 4.7, 4, 0];
    const opinionExtendedData = [null, null, null, null, null, null, null, null, null, null, null, null, null, 70, 68, 65, 62, 58, 55, 52, 50, null];
    
    // 圖表配置
    const chartConfig = {
        type: 'line',
        data: {
            labels: combinedLabels,
            datasets: [{
                label: '核電發電占比 (%)',
                data: nuclearExtendedData,
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y',
                borderWidth: 3
            }, {
                label: '非核家園民意支持度 (%)',
                data: opinionExtendedData,
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.3,
                fill: false,
                pointRadius: 6,
                pointHoverRadius: 8,
                yAxisID: 'y1',
                borderDash: [8, 4],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: '台灣核電發電占比與民意支持度變化趨勢 (1980-2025)',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            return '年份: ' + context[0].label;
                        },
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return '核電占比: ' + context.parsed.y + '%';
                            } else {
                                return context.parsed.y ? '民意支持度: ' + context.parsed.y + '%' : '民意支持度: 無數據';
                            }
                        }
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            xMin: '1985',
                            xMax: '1985',
                            borderColor: '#FF6B35',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: '核電高峰期 52.4%',
                                enabled: true,
                                position: 'top'
                            }
                        },
                        line2: {
                            type: 'line',
                            xMin: '2025',
                            xMax: '2025',
                            borderColor: '#FF6B35',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: '核電歸零',
                                enabled: true,
                                position: 'top'
                            }
                        },
                        line3: {
                            type: 'line',
                            xMin: '2017',
                            xMax: '2017',
                            borderColor: '#4ECDC4',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: '民意支持度 70%',
                                enabled: true,
                                position: 'bottom'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: '年份',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    max: 60,
                    grid: {
                        color: 'rgba(255, 107, 53, 0.2)'
                    },
                    title: {
                        display: true,
                        text: '核電發電占比 (%)',
                        color: '#FF6B35',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#FF6B35'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 80,
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(78, 205, 196, 0.2)'
                    },
                    title: {
                        display: true,
                        text: '民意支持度 (%)',
                        color: '#4ECDC4',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#4ECDC4'
                    }
                }
            }
        }
    };

    // 創建圖表
    const chart = new Chart(ctx, chartConfig);
}

// 如果需要更新數據的函數
function updateChartData(newNuclearData, newOpinionData) {
    const chart = Chart.getChart('trendChart');
    if (chart) {
        chart.data.datasets[0].data = newNuclearData;
        chart.data.datasets[1].data = newOpinionData;
        chart.update();
    }
}