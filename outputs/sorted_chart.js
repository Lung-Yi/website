// 國防預算比較分析圖表腳本

// 數據配置
const chartData = {
    // 圖表基本信息
    title: '國防預算比較分析',
    subtitle: '台灣、中國、美國國防預算對比',
    description: '本視覺化呈現了台灣、中國、美國的國防預算絕對值和相對值(占GDP比例)。通過橫向條形圖的方式，清晰展現各國國防投入的差異。',
    notes: '圖表依數值大小排序，直觀呈現各國國防預算差異。顏色深淺表示數值高低，數值較高的類別使用較深的棕色。美國國防部次長提名人柯伯吉建議台灣將國防預算提高至GDP的10%，而台灣目前國防預算約占GDP的2.5%。若提高至10%，總額將高達2兆6449億元。',
    dataSource: '整理自2025年3月新聞報導數據',
    
    // 圖表數據 - 國防預算絕對值（單位：億美元）
    labels1: ['美國國防預算', '中國國防預算', '台灣國防預算', '台灣國防預算(若達GDP 10%)'],
    values1: [8770, 2457, 210, 840],
    
    // 圖表數據 - 國防預算占GDP比例（單位：%）
    labels2: ['美國國防預算占GDP', '中國國防預算占GDP', '台灣國防預算占GDP', '美方建議台灣國防預算占GDP'],
    values2: [3.5, 1.5, 2.5, 10.0],
    
    // 圖表設置
    chartTitle1: '各國國防預算比較（單位：億美元）',
    chartTitle2: '國防預算占GDP比例（單位：%）',
    xAxisTitle1: '預算金額（億美元）',
    xAxisTitle2: '占GDP比例（%）',
    yAxisTitle: '部門/國家',
    unit1: '億美元',
    unit2: '%',
    
    // 圖表高度設定
    chartHeight: 1200  // 修改為兩個圖表的總高度
};

// 初始化應用
function initSortedChartApp() {
    // 創建HTML結構
    createAppStructure();
    
    // 設置當前日期
    document.getElementById('update-date').textContent = new Date().toLocaleDateString('zh-TW');
    
    // 創建圖表，移除第三個圖表
    createSortedChart('sortedBarChart1', chartData.labels1, chartData.values1, chartData.chartTitle1, chartData.xAxisTitle1, chartData.unit1);
    createSortedChart('sortedBarChart2', chartData.labels2, chartData.values2, chartData.chartTitle2, chartData.xAxisTitle2, chartData.unit2);
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
            
            <div class="sorted-chart-canvas" style="height: ${chartData.chartHeight/2}px;">
                <canvas id="sortedBarChart1"></canvas>
            </div>
            
            <div class="sorted-chart-canvas" style="height: ${chartData.chartHeight/2}px;">
                <canvas id="sortedBarChart2"></canvas>
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

// 生成棕色漸變色彩
function generateBrownColors(values) {
    const sortedValues = [...values].sort((a, b) => a - b);
    
    return values.map(value => {
        const index = sortedValues.indexOf(value);
        const intensity = 0.4 + (index / (values.length - 1)) * 0.5;
        return `rgba(101, 67, 33, ${intensity})`;
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
function createSortedChart(canvasId, labels, values, chartTitle, xAxisTitle, unit) {
    // 排序數據
    const { sortedLabels, sortedValues } = prepareSortedData(labels, values);
    
    // 生成顏色
    const colors = generateBrownColors(sortedValues);
    
    // 獲取畫布上下文
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // 創建圖表
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: chartTitle,
                data: sortedValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/, [\d\.]+\)/, ', 1)')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',  // 水平條形圖
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    color: '#5d4037',
                    font: { size: 16, weight: 'bold' },
                    padding: { bottom: 20 }
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x} ${unit}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: xAxisTitle,
                        color: '#6d4c41',
                        font: { weight: 'bold' }
                    },
                    grid: { color: 'rgba(137, 116, 107, 0.1)' },
                    ticks: { color: '#6d4c41' }
                },
                y: {
                    title: {
                        display: true,
                        text: chartData.yAxisTitle,
                        color: '#6d4c41',
                        font: { weight: 'bold' }
                    },
                    grid: { display: false },
                    ticks: {
                        color: '#6d4c41',
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

// 更新應用數據
function updateSortedChartApp(newData) {
    // 更新配置
    Object.assign(chartData, newData);
    
    // 重新初始化應用
    initSortedChartApp();
}

// 頁面載入時初始化應用
document.addEventListener('DOMContentLoaded', initSortedChartApp);