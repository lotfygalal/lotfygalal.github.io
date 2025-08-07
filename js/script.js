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
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const sectionToShow = document.getElementById(targetSection);
            if (sectionToShow) {
                sectionToShow.classList.add('active');
                // Smooth scroll to section
                sectionToShow.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update active navigation link
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

                // Close mobile menu
                sidebar.classList.remove('open');
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            });
        });

        // Handle portfolio button in home section
        document.addEventListener('click', (e) => {
            if (e.target.closest('a[href="#portfolio"]')) {
                e.preventDefault();
                showSection('portfolio');
            }
        });

        // Typewriter effect
        const typewriter = document.getElementById('typewriter');
        const titles = [
            "Software Testing Engineer",
            "Manual Testing Specialist", 
            "Mobile App Tester",
            "API Testing Expert",
            "Quality Assurance Engineer"
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
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                let count = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count) + '+';
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }

        // Trigger counter animation when about section is shown
        const aboutLink = document.querySelector('[data-section="about"]');
        if (aboutLink) {
            aboutLink.addEventListener('click', () => {
                setTimeout(animateCounters, 300);
            });
        }

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

        // Smooth loading
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Initialize
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        // Show home section by default
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);