document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储中的主题偏好
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        // 如果没有本地存储的主题，则使用系统偏好
        if (prefersDarkScheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    }
    
    // 主题切换事件监听
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });
    
    // 添加联系卡片显示功能
    const actionButtons = document.querySelectorAll('.action-button');
    const contactCards = document.querySelector('.contact-cards');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            contactCards.classList.toggle('active');
        });
    });
    
    // 点击页面其他地方关闭联系卡片
    document.addEventListener('click', function(event) {
        const isClickInside = contactCards.contains(event.target) || 
                             Array.from(actionButtons).some(btn => btn.contains(event.target));
        
        if (!isClickInside && contactCards.classList.contains('active')) {
            contactCards.classList.remove('active');
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加滚动动画
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                section.classList.add('animated');
            }
        });
    };
    
    // 初始调用一次
    animateOnScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 为里程碑添加展示动画
    const milestones = document.querySelectorAll('.milestone');
    
    const animateMilestones = function() {
        milestones.forEach((milestone, index) => {
            setTimeout(() => {
                milestone.classList.add('visible');
            }, index * 200);
        });
    };
    
    // 当里程碑部分进入视图时触发动画
    const milestonesSection = document.querySelector('.milestones');
    
    const checkMilestonesInView = function() {
        if (milestonesSection) {
            const sectionTop = milestonesSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                animateMilestones();
                window.removeEventListener('scroll', checkMilestonesInView);
            }
        }
    };
    
    // 初始检查一次
    checkMilestonesInView();
    
    // 监听滚动以检查里程碑是否在视图中
    window.addEventListener('scroll', checkMilestonesInView);
    
    // 添加模态框功能
    const ctaBadgeTrigger = document.getElementById('cta-badge-trigger');
    const qrcodeModal = document.getElementById('qrcode-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // 点击触发按钮打开模态框
    if (ctaBadgeTrigger && qrcodeModal) {
        ctaBadgeTrigger.addEventListener('click', function() {
            qrcodeModal.classList.add('show');
        });
    }
    
    // 点击关闭按钮关闭模态框
    if (closeModal && qrcodeModal) {
        closeModal.addEventListener('click', function() {
            qrcodeModal.classList.remove('show');
        });
    }
    
    // 点击模态框外部区域关闭模态框
    if (qrcodeModal) {
        qrcodeModal.addEventListener('click', function(event) {
            if (event.target === qrcodeModal) {
                qrcodeModal.classList.remove('show');
            }
        });
    }
    
    // 卡片流动边框效果
    const glowCard = document.getElementById('glowing-card');
    const glowEffect = document.querySelector('.glow-effect');
    
    if (glowCard && glowEffect) {
        // 保持原有动画不受鼠标影响
        glowEffect.style.animationPlayState = 'running';
        
        // 鼠标进入时加速动画
        glowCard.addEventListener('mouseenter', () => {
            glowEffect.style.animationDuration = '1.5s';
        });
        
        // 鼠标离开时恢复正常速度
        glowCard.addEventListener('mouseleave', () => {
            glowEffect.style.animationDuration = '3s';
            
            const mouseGlow = document.querySelector('.glow-effect-mouse');
            if (mouseGlow) {
                mouseGlow.remove();
            }
        });
        
        // 鼠标移动时添加第二个光效，但不影响原有动画
        glowCard.addEventListener('mousemove', (e) => {
            const rect = glowCard.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // 添加第二个光效元素
            if (!document.querySelector('.glow-effect-mouse')) {
                const newGlow = document.createElement('div');
                newGlow.classList.add('glow-effect-mouse');
                document.querySelector('.glow-container').appendChild(newGlow);
                
                // 添加样式
                newGlow.style.position = 'absolute';
                newGlow.style.width = '15px';
                newGlow.style.height = '15px';
                newGlow.style.background = 'radial-gradient(circle, rgba(124, 58, 237, 1) 0%, rgba(124, 58, 237, 0.6) 50%, transparent 70%)';
                newGlow.style.borderRadius = '50%';
                newGlow.style.filter = 'blur(4px)';
                newGlow.style.transform = 'translateX(-50%) translateY(-50%)';
                newGlow.style.pointerEvents = 'none';
                newGlow.style.transition = 'left 0.2s ease, top 0.2s ease';
                newGlow.style.zIndex = '-1';
            }
            
            const mouseGlow = document.querySelector('.glow-effect-mouse');
            mouseGlow.style.left = `${mouseX}px`;
            mouseGlow.style.top = `${mouseY}px`;
            
            // 计算鼠标光效与流动光效的距离，调整流动光效方向
            const glowRect = glowEffect.getBoundingClientRect();
            const cardRect = glowCard.getBoundingClientRect();
            const glowX = glowRect.left - cardRect.left + glowRect.width / 2;
            const glowY = glowRect.top - cardRect.top + glowRect.height / 2;
            
            // 计算距离
            const distance = Math.sqrt(Math.pow(mouseX - glowX, 2) + Math.pow(mouseY - glowY, 2));
            
            // 如果距离很近(小于50px)，添加一个微小的偏移使流动光效与鼠标光效相互吸引
            if (distance < 50) {
                // 创建一个微小的引力效果，流动光效会略微被拉向鼠标光效
                const attractionForce = 1 - (distance / 50);
                const offsetX = (mouseX - glowX) * 0.1 * attractionForce;
                const offsetY = (mouseY - glowY) * 0.1 * attractionForce;
                
                // 应用微小的位置偏移
                glowEffect.style.marginLeft = `${offsetX}px`;
                glowEffect.style.marginTop = `${offsetY}px`;
            } else {
                // 重置偏移
                glowEffect.style.marginLeft = '0px';
                glowEffect.style.marginTop = '0px';
            }
        });
    }
}); 