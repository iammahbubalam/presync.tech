// Presync.tech JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-300');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('text-blue-300');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize hero section animations immediately
    document.querySelectorAll('#home .animate-on-scroll').forEach(element => {
        element.classList.add('animated');
    });
    
    // Animate counter numbers
    function animateCounters() {
        const counterElements = document.querySelectorAll('.counter-value');
        const speed = 200; // The lower the faster
        
        counterElements.forEach(counter => {
            const targetNumber = +counter.dataset.count;
            const initialValue = 0;
            const increment = targetNumber / speed;
            let currentValue = initialValue;
            
            const updateCounter = () => {
                if (currentValue < targetNumber) {
                    currentValue += increment;
                    counter.textContent = Math.ceil(currentValue);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.textContent = targetNumber;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when in view
    const statsSection = document.querySelector('.counter-value').closest('div').parentElement;
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Form submission handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // Send form data handling would go here
            console.log('Form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(#home *)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            
            if (elementPosition < viewportHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('#portfolio .rounded-lg').forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'portfolio-item');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('#team .rounded-lg').forEach((member, index) => {
        member.classList.add('animate-on-scroll');
        member.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Mouse move effect for hero cards
    const heroSection = document.getElementById('home');
    const heroCards = document.querySelectorAll('.hero-card');
    
    if (heroSection && heroCards.length) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = heroSection.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            heroCards.forEach(card => {
                const cardIndex = Array.from(heroCards).indexOf(card);
                const factor = (cardIndex + 1) * 10;
                card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroCards.forEach(card => {
                card.style.transform = 'translate(0, 0)';
            });
        });
    }
});

// Portfolio filtering functionality
function filterProjects(category) {
    const projects = document.querySelectorAll('.portfolio-item');
    
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
    } else {
        projects.forEach(project => {
            if (project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
}