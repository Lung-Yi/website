// 頁面載入後執行
document.addEventListener('DOMContentLoaded', function() {
    // 移動端導航菜單功能
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // 防止背景滾動
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 點擊導航連結時關閉菜單
        const navLinks = mainNav.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // 點擊外部區域關閉菜單
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 窗口大小改變時關閉菜單
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 分類標籤切換
    const categoryTabs = document.querySelectorAll('.tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有標籤的 active 類別
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // 為當前點擊的標籤添加 active 類別
            this.classList.add('active');
            
            // 獲取分類數據
            const category = this.getAttribute('data-category');
            console.log(`已選擇類別: ${category}`);
            
            // 篩選文章
            filterArticlesByCategory(category);
        });
    });
    
    // 文章分類篩選功能
    function filterArticlesByCategory(category) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // 搜索功能
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox ? searchBox.querySelector('input') : null;
    const searchButton = searchBox ? searchBox.querySelector('.search-button') : null;
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log(`搜尋關鍵字: ${searchTerm}`);
                // 在實際應用中，可以根據關鍵字搜尋文章
                // searchArticles(searchTerm);
            }
        });
        
        // 按Enter鍵搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log(`搜尋關鍵字: ${searchTerm}`);
                    // 在實際應用中，可以根據關鍵字搜尋文章
                    // searchArticles(searchTerm);
                }
            }
        });
    }
    
    // 電子報訂閱
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                console.log(`訂閱電子報: ${email}`);
                // 這裡可以添加實際的訂閱處理邏輯
                
                // 顯示成功訊息
                alert('感謝您的訂閱！');
                emailInput.value = '';
            } else {
                // 顯示錯誤訊息
                alert('請輸入有效的電子郵件地址。');
            }
        });
    }
    
    // 電子郵件格式驗證
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 自動輪播（可添加到首頁大圖區域）
    function setupAutoSlider() {
        // 這只是一個基本示例，實際應用中需要實現完整的輪播功能
        const headlines = [
            {
                category: "國際政治",
                title: "全球高峰會商討氣候政策 緊張局勢升溫",
                description: "世界領袖齊聚一堂，在近期外交局勢複雜化背景下，討論雄心勃勃的氣候目標及應對地緣政治挑戰。"
            },
            {
                category: "國內政治",
                title: "立法院通過關鍵改革法案 引發社會熱議",
                description: "該法案將對多個關鍵行業產生深遠影響，專家分析認為這將是近年來最具變革性的政策之一。"
            },
            {
                category: "財經",
                title: "亞洲股市創新高 經濟復甦信號明顯",
                description: "分析師認為，這波上漲反映了投資者對區域經濟前景的信心增強，預計下半年將有更多積極發展。"
            }
        ];
        
        // 目前僅記錄功能，實際應用中可以實現輪播效
        // 目前僅記錄功能，實際應用中可以實現輪播效