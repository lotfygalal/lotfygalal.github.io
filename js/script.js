document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        icon.className = sidebar.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Navigation and section switching
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Function to show specific section
    function showSection(targetSection) {
        sections.forEach(section => section.classList.remove('active'));
        const sectionToShow = document.getElementById(targetSection);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
            sectionToShow.scrollIntoView({ behavior: 'smooth' });
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });
    }

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            showSection(targetSection);
            sidebar.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Handle portfolio button in home section
    document.addEventListener('click', (e) => {
        if (e.target.closest('a[href="#portfolio"]')) {
            e.preventDefault();
            showSection('projects');
        }
    });

    // Typewriter effect
    const typewriter = document.getElementById('typewriter');
    const titles = [
        "Software Testing Engineer",
        "Freelancer"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typewriter.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriter.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
        setTimeout(type, typingSpeed);
    }

    // Start typewriter effect
    setTimeout(type, 1000);

    // Animated counters
    const counters = document.querySelectorAll(".stat-number");
    const values = [200, 150, 80, 110, 25]; // Removed Paid Projects value

    counters.forEach((counter, i) => {
        counter.setAttribute("data-target", values[i]);
        counter.setAttribute("data-counted", "false");
    });

    function animateCounter(el, target) {
        let count = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
            count += step;
            if (count >= target) {
                el.textContent = target + "+";
                clearInterval(interval);
                el.setAttribute("data-counted", "true");
            } else {
                el.textContent = count + "+";
            }
        }, 20);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.getAttribute("data-counted") === "false") {
                        const target = parseInt(el.getAttribute("data-target"));
                        animateCounter(el, target);
                    }
                }
            });
        },
        { threshold: 0.6 }
    );

    counters.forEach((counter) => observer.observe(counter));

    // Skills card interactions
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.hasAttribute('onclick')) {
                card.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (!card.hasAttribute('onclick')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Project Modal
const modal = document.getElementById('projectModal');
const modalImage = modal.querySelector('.modal-image');
const modalClose = modal.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const openModalLink = card.querySelector('.open-modal');
    openModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        const projectImage = card.querySelector('.project-image');
        modalImage.src = projectImage.src;
        modalImage.alt = projectImage.alt;
        modal.style.display = 'block';
        modal.classList.add('open');
    });
});
modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    modal.style.display = 'none';
    modal.classList.remove('open');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.classList.remove('open');
    }
});

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Smooth loading
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Show home section by default
    showSection('home');
});
