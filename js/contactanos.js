document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');
    const formWrapper = document.getElementById('contactFormWrapper');
    const successWrapper = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {

        e.preventDefault();

        formWrapper.style.opacity = '0';
        
        setTimeout(() => {
            formWrapper.style.display = 'none';  
            successWrapper.classList.remove('hidden'); 
            successWrapper.style.opacity = '0';
            setTimeout(() => {
                successWrapper.style.opacity = '1';
                successWrapper.style.transition = 'opacity 0.5s ease';
            }, 50);
        }, 300);
    });

    formWrapper.style.transition = 'opacity 0.3s ease';
});