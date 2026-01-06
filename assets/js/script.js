// Seoul 4D - Modal Interaction

document.addEventListener('DOMContentLoaded', function () {

    // Modal Logic
    const modal = document.getElementById('chapter-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close');
    const body = document.body;

    // Open Modal
    document.querySelectorAll('.toc-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // remove #
            const contentSource = document.getElementById(targetId + '-content');

            if (contentSource) {
                // Clone content to modal
                modalContent.innerHTML = contentSource.innerHTML;

                // Show modal
                modal.classList.add('active');
                body.classList.add('modal-open');

                // Reset scroll
                modal.scrollTop = 0;
            }
        });
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
        setTimeout(() => {
            modalContent.innerHTML = ''; // Clear content after animation
        }, 400);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Scroll Animation (Fade In) for TOC
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.toc-card').forEach(el => {
        el.classList.add('fade-in'); // Add class initially
        fadeObserver.observe(el);
    });
});
