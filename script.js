// スムーススクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロール時のヘッダー効果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// フェードインアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // 特別なアニメーション効果を追加
            if (entry.target.classList.contains('testimonial-card')) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
            }
            if (entry.target.classList.contains('problem-item')) {
                entry.target.style.animation = 'slideInLeft 0.6s ease-out';
            }
            if (entry.target.classList.contains('future-item')) {
                entry.target.style.animation = 'bounceIn 0.8s ease-out';
            }
        }
    });
}, observerOptions);

// アニメーション対象要素の設定
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .problem-item, .future-item, .failure-item, .faq-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // カウントダウンタイマー機能
    const stockWarning = document.querySelector('.stock-warning');
    if (stockWarning) {
        let stock = 23;
        const updateStock = () => {
            if (stock > 5) {
                stock--;
                stockWarning.textContent = `※在庫残りわずか（残り${stock}個）`;
            }
        };
        
        // 30秒ごとに在庫数を減らす
        setInterval(updateStock, 30000);
    }

    // 緊急性を演出するCTAボタンの効果
    const purchaseButtons = document.querySelectorAll('.purchase-button, .hero-cta, .final-cta');
    purchaseButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) translateY(0)';
        });
    });

    // FAQアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // 初期状態では答えを非表示
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        question.style.cursor = 'pointer';
        question.style.position = 'relative';
        
        // + アイコンを追加
        const icon = document.createElement('span');
        icon.textContent = '+';
        icon.style.position = 'absolute';
        icon.style.right = '0';
        icon.style.fontSize = '1.5rem';
        icon.style.transition = 'transform 0.3s ease';
        question.appendChild(icon);
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            // すべてのFAQを閉じる
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('p');
                const otherIcon = otherItem.querySelector('h3 span');
                otherAnswer.style.maxHeight = '0';
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });
            
            // クリックされたFAQを開く（閉じていた場合）
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });
});

// ページ離脱防止機能
window.addEventListener('beforeunload', (e) => {
    const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // ページの50%以上スクロールしていて、まだ購入していない場合
    if (scrollPercent > 50) {
        e.preventDefault();
        e.returnValue = 'このページを離れますか？健康な未来への一歩を踏み出すチャンスを逃さないでください。';
        return e.returnValue;
    }
});

// スクロール進捗バー
const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #10b981, #059669);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// モバイルメニュー機能
const createMobileMenu = () => {
    // 既存のボタンがあれば削除
    const existingButton = document.querySelector('.mobile-menu-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuButton = document.createElement('button');
        
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        
        document.querySelector('.navbar .container').appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // アイコンの切り替え
            if (navMenu.classList.contains('active')) {
                mobileMenuButton.innerHTML = '✕';
            } else {
                mobileMenuButton.innerHTML = '☰';
            }
        });
        
        // メニュー項目クリック時にメニューを閉じる
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        });
        
        // 画面外クリック時にメニューを閉じる
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        });
    }
};

// アニメーションキーフレームを動的に追加
const addAnimationKeyframes = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(20px);
            }
            50% {
                opacity: 1;
                transform: scale(1.05) translateY(-5px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    createProgressBar();
    createMobileMenu();
    addAnimationKeyframes();
});

// 画面サイズ変更時の処理
window.addEventListener('resize', createMobileMenu);