document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Update aria-expanded attribute
            const expanded = navMenu.classList.contains('show');
            mobileMenuButton.setAttribute('aria-expanded', expanded);
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't scroll if the target is just "#" (often used for buttons)
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Get the target's position and adjust for header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav items based on scroll position
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-menu a');
        
        // Get current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        // Check each section to see if it's in the viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current nav item
                const currentNavItem = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (currentNavItem) {
                    currentNavItem.classList.add('active');
                }
            }
        });
    }
    
    // Run setActiveNavItem on scroll
    window.addEventListener('scroll', setActiveNavItem);
    
    // Run once on page load
    setActiveNavItem();
    
    // Add CSS class when scrolling down (for sticky header effects)
    function handleScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Run once on page load
    handleScroll();
}); 