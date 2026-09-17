document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Hamburger Menu
    ========================================= */
    const hamburger = document.getElementById('hamburger');
    const spNav = document.getElementById('sp-nav');
    const spNavLinks = spNav.querySelectorAll('a');

    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        spNav.classList.toggle('is-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // SPナビのリンクをクリックしたら閉じる
    spNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (spNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    /* =========================================
       Smooth Scroll (for older browsers & adjustment)
    ========================================= */
    const header = document.querySelector('.header');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // #のみのリンクは無視
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       Fade Up Animation (Intersection Observer)
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-up');

    // prefer-reduced-motion設定を考慮
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    } else {
        // アニメーションを好まないユーザーには最初から表示
        fadeElements.forEach(el => el.classList.add('is-visible'));
    }
});
