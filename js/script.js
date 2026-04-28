document.addEventListener('DOMContentLoaded', () => {
    const pageProgress = document.getElementById('pageProgress');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBar = document.querySelector('.top-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const typewriter = document.getElementById('typewriter');
    const sectionTriggers = document.querySelectorAll('[data-go-section]');
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const profileImage = document.getElementById('profileImage');
    const animatedOrbs = document.querySelectorAll('.site-orb');
    const sectionOrder = Array.from(sections).map((section) => section.id);

    let currentImages = [];
    let currentIndex = 0;
    let sectionScrollLocked = false;
    let touchStartY = null;
    let wheelIntent = 0;
    let lastWheelDirection = 0;
    let lastScrollTop = 0;
    let suppressScrollNavigationUntil = 0;

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.glass-card, .project-card'), {
            max: 8,
            speed: 350,
            glare: true,
            'max-glare': 0.12,
            scale: 1.01
        });
    }

    function updatePageProgress() {
        if (!pageProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        pageProgress.style.width = `${Math.min(width, 100)}%`;
    }

    function updateNavState() {
        if (!navBar) return;
        navBar.classList.toggle('nav-scrolled', window.scrollY > 20);
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                // Add active class to section for CSS animations to trigger
                document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
                entry.target.classList.add('active');

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(sec => sectionObserver.observe(sec));

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = link.getAttribute('data-section');
            const targetEl = document.getElementById(targetSection);
            if(targetEl) {
                if (window.lenis) {
                    window.lenis.scrollTo(targetEl, { offset: 0, duration: 0.7 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }

            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
    });

    sectionTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = trigger.getAttribute('data-go-section');
            const targetEl = document.getElementById(targetSection);
            if(targetEl) {
                if (window.lenis) {
                    window.lenis.scrollTo(targetEl, { offset: 0, duration: 0.7 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    document.addEventListener('click', (event) => {
        const projectLink = event.target.closest('a[href="#projects"]');
        if (projectLink && !projectLink.classList.contains('nav-link')) {
            event.preventDefault();
            const targetEl = document.getElementById('projects');
            if(targetEl) {
                if (window.lenis) {
                    window.lenis.scrollTo(targetEl, { offset: 0, duration: 0.7 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    window.addEventListener('scroll', () => {
        updatePageProgress();
        updateNavState();
    }, { passive: true });

    if (typewriter) {
        const titles = [
            'QA Testing Engineer',
            'Mechatronics Engineer',
            'Automation Testing Engineer',
            'Web, Mobile, and API Specialist'
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentTitle = titles[titleIndex];
            typewriter.textContent = currentTitle.substring(0, charIndex);

            if (!isDeleting && charIndex < currentTitle.length) {
                charIndex += 1;
                setTimeout(type, 85);
                return;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 1800);
                return;
            }

            if (isDeleting && charIndex > 0) {
                charIndex -= 1;
                setTimeout(type, 40);
                return;
            }

            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(type, 350);
        }

        setTimeout(type, 700);
    }

    const counters = document.querySelectorAll('.stat-number');
    const values = [200, 150, 80, 110, 25];

    counters.forEach((counter, index) => {
        counter.dataset.target = values[index];
        counter.dataset.counted = 'false';
    });

    function animateCounter(element, target) {
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 38));
        const interval = setInterval(() => {
            count += step;
            if (count >= target) {
                element.textContent = `${target}+`;
                element.dataset.counted = 'true';
                clearInterval(interval);
                return;
            }
            element.textContent = `${count}+`;
        }, 28);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            if (element.dataset.counted === 'false') {
                animateCounter(element, Number(element.dataset.target));
            }
        });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));

    document.querySelectorAll('.open-modal').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentImages = link.getAttribute('data-images').split(',');
            currentIndex = 0;
            modalImage.src = currentImages[currentIndex];
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateModalImage(step) {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + step + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => updateModalImage(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => updateModalImage(1));
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (!modal || !modal.classList.contains('open')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft') updateModalImage(-1);
        if (event.key === 'ArrowRight') updateModalImage(1);
    });

    if (profileImage) {
        profileImage.addEventListener('mousemove', (event) => {
            const rect = profileImage.getBoundingClientRect();
            const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
            const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
            profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = '';
        });
    }

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.classList.add('loaded');
        
        // Fix for the skills rotating bug on first load by forcing animation restart
        setTimeout(() => {
            document.querySelectorAll('.skill-orbit, .skill-badge').forEach(el => {
                const anim = el.style.animation;
                el.style.animation = 'none';
                void el.offsetWidth; // Force a DOM reflow
                el.style.animation = anim; 
            });
        }, 100);
    }, 100);

    updatePageProgress();
    updateNavState();

    // Initialize Lenis smooth scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 0.7,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
});
