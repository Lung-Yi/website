// 數值排序分析圖表腳本

// 數據配置
const chartData = {
    // 圖表基本信息
    title: '台幣升值對各產業影響程度分析',
    subtitle: '台幣升值對不同產業的經濟影響排序',
    description: '本視覺化呈現了台幣升值對台灣不同產業的影響程度，包括出口產業的損失與內需產業的受益情況，以及與亞洲其他貨幣升值幅度的比較。',
    notes: '台幣升值對出口導向產業造成較大負面影響，尤其是機械、工具機等外銷比重高的產業；而航空、觀光、內需導向的食品加工、造紙及資產營建股等產業則相對受益。根據新聞資料，若台幣匯率升破30元，機械及工具機業外銷將失去競爭力，若進一步升至27-28元，可能導致一半以上機械業廠商關廠倒閉。',
    dataSource: '整理自2025年5月台灣各大新聞媒體報導',
    
    // 圖表數據
    labels: [
        '機械及工具機業 (潛在倒閉風險)',
        '半導體業 (每升值1%影響毛利4-7%)',
        '網通業 (每升值1%影響毛利5-10%)',
        '電子業下游 (每升值1%影響毛利1-1.5%)',
        '金控業 (尤其壽險公司)',
        '中性影響產業',
        '食品加工業',
        '造紙業',
        '資產營建業',
        '觀光業',
        '航空業'
    ],
    values: [-50, -40, -35, -25, -20, 0, 15, 20, 25, 30, 35],
    
    // 圖表設置
    chartTitle: '台幣升值10%對各產業影響程度估計',
    xAxisTitle: '影響程度 (正值表示受益，負值表示損失)',
    yAxisTitle: '產業類別',
    unit: '%',
    
    // 圖表高度設定
    chartHeight: 600  // 請根據資料的數量調整高度
};

// 初始化應用
function initSortedChartApp() {
    // 創建HTML結構
    createAppStructure();
    
    // 設置當前日期
    document.getElementById('update-date').textContent = new Date().toLocaleDateString('zh-TW');
    
    // 創建圖表
    createSortedChart();
    
    // 創建貨幣升值比較圖表
    createCurrencyComparisonChart();
}

// 創建應用HTML結構
function createAppStructure() {
    const appContainer = document.getElementById('sortedChartApp');
    
    appContainer.innerHTML = `
        <div class="sorted-chart-container">
            <h2 class="sorted-chart-title">${chartData.title}</h2>
            <h3 class="sorted-chart-subtitle">${chartData.subtitle}</h3>
            
            <div class="sorted-chart-description">
                ${chartData.description}
            </div>
            
            <div class="sorted-chart-canvas" style="height: ${chartData.chartHeight}px;">
                <canvas id="sortedBarChart"></canvas>
            </div>
            
            <div class="sorted-chart-canvas" style="height: 400px; margin-top: 40px;">
                <h3>亞洲各國貨幣對美元升值幅度比較 (2025年4-5月)</h3>
                <canvas id="currencyComparisonChart"></canvas>
            </div>
            
            <div class="sorted-chart-notes">
                <strong>分析說明：</strong>
                ${chartData.notes}
            </div>
            
            <div class="sorted-chart-source">
                數據來源：${chartData.dataSource} | 最後更新：<span id="update-date"></span>
            </div>
        </div>
    `;
}

// 生成顏色
function generateImpactColors(values) {
    return values.map(value => {
        if (value < 0) {
            // 負面影響 - 紅色系
            const intensity = Math.min(0.9, Math.abs(value) / 50);
            return `rgba(220, 53, 69, ${intensity + 0.3})`;
        } else if (value > 0) {
            // 正面影響 - 綠色系
            const intensity = Math.min(0.9, Math.abs(value) / 50);
            return `rgba(40, 167, 69, ${intensity + 0.3})`;
        } else {
            // 中性 - 灰色
            return 'rgba(108, 117, 125, 0.6)';
        }
    });
}

// 數據排序處理
function prepareSortedData(labels, values) {
    const combinedData = labels.map((label, index) => ({ 
        label, 
        value: values[index] 
    }));
    
    combinedData.sort((a, b) => a.value - b.value);
    
    return {
        sortedLabels: combinedData.map(item => item.label),
        sortedValues: combinedData.map(item => item.value)
    };
}

// 創建排序圖表
function createSortedChart() {
    // 排序數據
    const { sortedLabels, sortedValues } = prepareSortedData(
        chartData.labels, 
        chartData.values
    );
    
    // 生成顏色
    const colors = generateImpactColors(sortedValues);
    
    // 獲取畫布上下文
    const ctx = document.getElementById('sortedBarChart').getContext('2d');
    
    // 創建圖表
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: chartData.chartTitle,
                data: sortedValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/, [\d\.]+\)/, ', 1)')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',  // 水平條形圖
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: chartData.chartTitle,
                    color: '#333',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `影響程度: ${context.parsed.x}${chartData.unit}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: chartData.xAxisTitle,
                        color: '#333',
                        font: { weight: 'bold' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    ticks: { color: '#333' }
                },
                y: {
                    title: {
                        display: true,
                        text: chartData.yAxisTitle,
                        color: '#333',
                        font: { weight: 'bold' }
                    },
                    grid: { display: false },
                    ticks: {
                        color: '#333',
                        font: { weight: 'bold' }
                    },
                    // 增加條形圖間距設定
                    barPercentage: 0.9,
                    categoryPercentage: 0.8
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 創建貨幣升值比較圖表
function createCurrencyComparisonChart() {
    const currencyData = {
        labels: ['新台幣', '日圓', '歐元', '韓元', '星元', '人民幣'],
        values: [9.27, 8.24, 9.37, 6.93, 4.0, 0.93]
    };
    
    // 生成顏色 - 藍色系
    const colors = currencyData.values.map(value => {
        const intensity = 0.4 + (value / 10) * 0.5;
        return `rgba(0, 123, 255, ${intensity})`;
    });
    
    // 獲取畫布上下文
    const ctx = document.getElementById('currencyComparisonChart').getContext('2d');
    
    // 創建圖表
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: currencyData.labels,
            datasets: [{
                label: '對美元升值幅度',
                data: currencyData.values,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/, [\d\.]+\)/, ', 1)')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `升值幅度: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '貨幣',
                        color: '#333',
                        font: { weight: 'bold' }
                    },
                    grid: { display: false },
                    ticks: { color: '#333' }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '升值幅度 (%)',
                        color: '#333',
                        font: { weight: 'bold' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    ticks: { color: '#333' }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 更新應用數據
function updateSortedChartApp(newData) {
    // 更新配置
    Object.assign(chartData, newData);
    
    // 重新初始化應用
    initSortedChartApp();
}

// 頁面載入時初始化應用
document.addEventListener('DOMContentLoaded', initSortedChartApp);