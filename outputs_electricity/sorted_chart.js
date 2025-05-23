// 核電發電成本與除役費用分析圖表腳本

// 數據配置
const chartData = {
    // 圖表基本信息
    title: '台灣核電政策關鍵數據分析',
    subtitle: '發電成本比較與核電廠除役費用統計',
    description: '本視覺化呈現了不同發電方式的成本差異、各核電廠除役費用，以及新增燃氣機組容量等關鍵數據，幫助理解台灣能源轉型的經濟影響。',
    notes: '數據顯示核電具有明顯的成本優勢，每度電僅需1元，遠低於天然氣的3.5元和再生能源的5元。核電廠除役總費用約779億元，而新增燃氣機組總容量達481萬瓩，遠超過核三廠2號機的95萬瓩。這些數據反映了台灣從核電轉向火力發電的重大政策轉變及其經濟成本。',
    dataSource: 'BBC、天下雜誌、中央社等多家媒體報導',
    
    // 圖表數據
    labels: [
        '核電發電成本',
        '天然氣發電成本', 
        '再生能源發電成本',
        '核一廠除役費用',
        '核二廠除役費用',
        '核三廠除役費用',
        '大潭7號機容量',
        '興達新1號機容量',
        '興達新2號機容量',
        '台中新1號機容量',
        '核三2號機容量'
    ],
    values: [1, 3.5, 5, 182, 345.9, 251, 91.3, 130, 130, 130, 95.1],
    
    // 圖表設置
    chartTitle: '核電政策關鍵數據統計',
    xAxisTitle: '數值（元/度 或 億元 或 萬瓩）',
    yAxisTitle: '項目類別',
    unit: '（混合單位）',
    
    // 圖表高度設定
    chartHeight: 700  // 根據資料數量調整高度
};

// 初始化應用
function initSortedChartApp() {
    // 創建HTML結構
    createAppStructure();
    
    // 設置當前日期
    document.getElementById('update-date').textContent = new Date().toLocaleDateString('zh-TW');
    
    // 創建圖表
    createSortedChart();
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

// 生成分類顏色
function generateCategoryColors(labels, values) {
    return labels.map((label, index) => {
        if (label.includes('發電成本')) {
            // 發電成本用藍色系
            const intensity = 0.6 + (values[index] / 5) * 0.3;
            return `rgba(33, 150, 243, ${intensity})`;
        } else if (label.includes('除役費用')) {
            // 除役費用用紅色系
            const intensity = 0.5 + (values[index] / 400) * 0.4;
            return `rgba(244, 67, 54, ${intensity})`;
        } else {
            // 機組容量用綠色系
            const intensity = 0.5 + (values[index] / 150) * 0.4;
            return `rgba(76, 175, 80, ${intensity})`;
        }
    });
}

// 數據排序處理
function prepareSortedData(labels, values) {
    const combinedData = labels.map((label, index) => ({ 
        label, 
        value: values[index] 
    }));
    
    combinedData.sort((a, b) => b.value - a.value);
    
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
    const colors = generateCategoryColors(sortedLabels, sortedValues);
    
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
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',  // 水平條形圖
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: chartData.chartTitle,
                    color: '#2c3e50',
                    font: { size: 18, weight: 'bold' },
                    padding: { bottom: 25 }
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label;
                            const value = context.parsed.x;
                            
                            if (label.includes('發電成本')) {
                                return `${value} 元/度`;
                            } else if (label.includes('除役費用')) {
                                return `${value} 億元`;
                            } else {
                                return `${value} 萬瓩`;
                            }
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: chartData.xAxisTitle,
                        color: '#34495e',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: { 
                        color: 'rgba(52, 73, 94, 0.1)',
                        lineWidth: 1
                    },
                    ticks: { 
                        color: '#34495e',
                        font: { size: 12 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: chartData.yAxisTitle,
                        color: '#34495e',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: { display: false },
                    ticks: {
                        color: '#34495e',
                        font: { size: 11, weight: '500' },
                        maxRotation: 0,
                        callback: function(value, index) {
                            const label = this.getLabelForValue(value);
                            // 縮短標籤以適應顯示
                            if (label.length > 15) {
                                return label.substring(0, 12) + '...';
                            }
                            return label;
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'index'
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