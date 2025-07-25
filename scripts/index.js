document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.NavLinks');
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hamburger') && !e.target.closest('.NavLinks')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    let lastScroll = 0;
    const nav = document.querySelector('.FursNav');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('scroll-hide');
        } else {
            nav.classList.remove('scroll-hide');
        }
        lastScroll = currentScroll;
    });
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.preventDefault();
            const userSection = document.querySelector('#user');
            if (userSection) {
                userSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
});