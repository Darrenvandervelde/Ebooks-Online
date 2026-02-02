// BookReader Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .book-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Button hover effects with icon animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const icon = btn.querySelector('.icon');
        
        btn.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced book card interactions
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        const cover = card.querySelector('.book-cover');
        const stats = card.querySelector('.book-stats');
        
        card.addEventListener('mouseenter', () => {
            // Add subtle glow effect
            card.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.2)';
            
            // Animate stats
            if (stats) {
                stats.style.transform = 'translateY(-2px)';
                stats.style.transition = 'transform 0.2s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            if (stats) {
                stats.style.transform = 'translateY(0)';
            }
        });
        
        // Click interaction for demo
        card.addEventListener('click', () => {
            const bookName = card.querySelector('.book-name').textContent;
            showBookPreview(bookName);
        });
    });

    // Feature card enhanced interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');
        
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Download button click handlers
    const downloadButtons = document.querySelectorAll('.btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('iOS') || btn.textContent.includes('Android')) {
                e.preventDefault();
                showDownloadModal(btn.textContent.includes('iOS') ? 'iOS' : 'Android');
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroMockup = document.querySelector('.mockup-container');
    
    if (heroSection && heroMockup) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroMockup.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Dynamic stats counter animation
    const statsElements = document.querySelectorAll('.stat-number, .cta-stat-number');
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            let displayValue = Math.floor(current);
            if (target >= 1000) {
                displayValue = (Math.floor(current) / 1000).toFixed(1) + 'K';
            }
            if (element.textContent.includes('★')) {
                displayValue = (current / 1000).toFixed(1) + '★';
            }
            if (element.textContent.includes('+')) {
                displayValue += '+';
            }
            
            element.textContent = displayValue;
        }, 20);
    };

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                let targetValue = 0;
                if (text.includes('10K')) targetValue = 10000;
                else if (text.includes('500K')) targetValue = 500000;
                else if (text.includes('4.8')) targetValue = 4800;
                
                if (targetValue > 0) {
                    animateCounter(element, targetValue);
                    statsObserver.unobserve(element);
                }
            }
        });
    });

    statsElements.forEach(el => statsObserver.observe(el));

    // Social media click handlers
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = getSocialPlatform(link);
            showSocialModal(platform);
        });
    });

    // Function to show book preview modal
    function showBookPreview(bookName) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'book-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>📖 ${bookName}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>This is a preview of <strong>${bookName}</strong>. In the full app, you would see:</p>
                        <ul>
                            <li>📚 Full book content</li>
                            <li>🔖 Bookmarking features</li>
                            <li>🌙 Reading modes (day/night)</li>
                            <li>📊 Reading progress tracking</li>
                            <li>📝 Note-taking capabilities</li>
                        </ul>
                        <p style="margin-top: 1rem; color: var(--muted-foreground);">
                            Download our app to start reading this book for free!
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .book-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            .modal-content {
                background: var(--card);
                border-radius: var(--radius);
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-book);
                animation: fadeIn 0.3s ease 0.1s both;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border);
            }
            .modal-header h3 {
                margin: 0;
                color: var(--card-foreground);
                font-size: 1.25rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--muted-foreground);
                padding: 0;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .modal-close:hover {
                background: var(--muted);
                color: var(--foreground);
            }
            .modal-body {
                padding: 1.5rem;
                color: var(--card-foreground);
            }
            .modal-body ul {
                margin: 1rem 0;
                padding-left: 1rem;
            }
            .modal-body li {
                margin: 0.5rem 0;
                color: var(--muted-foreground);
            }
        `;
        
        // Add styles to head if not already added
        if (!document.querySelector('#modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'modal-styles';
            styleSheet.textContent = modalStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    // Function to show download modal
    function showDownloadModal(platform) {
        alert(`📱 Download for ${platform}\n\nThis would redirect to the ${platform === 'iOS' ? 'App Store' : 'Google Play Store'} in a real app!\n\nFor this demo, the app is coming soon. 🚀`);
    }

    // Function to show social modal
    function showSocialModal(platform) {
        alert(`🌟 Follow us on ${platform}!\n\nThis would open our ${platform} page in a real app.\n\nStay tuned for updates and book recommendations! 📚`);
    }

    // Helper function to determine social platform
    function getSocialPlatform(link) {
        const svg = link.querySelector('svg path').getAttribute('d');
        if (svg.includes('M23 3a10.9')) return 'Twitter';
        if (svg.includes('M9 19c-5')) return 'GitHub';
        if (svg.includes('M4 4h16c1.1')) return 'Email';
        return 'Social Media';
    }

    // Add fade-out animation keyframe
    const fadeOutKeyframe = `
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }
    `;
    
    const existingStyles = document.querySelector('#modal-styles');
    if (existingStyles) {
        existingStyles.textContent += fadeOutKeyframe;
    }

    // Loading effect for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    console.log('📚 BookReader website loaded successfully! Welcome to unlimited free reading.');
});