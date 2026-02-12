// Scroll-triggered Arrow Animation for Exhibit Button
document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector('.exhibit-button-container');
    const leftArrows = document.querySelector('.left-arrows');
    const rightArrows = document.querySelector('.right-arrows');

    if (!buttonContainer || !leftArrows || !rightArrows) return;

    // Create Intersection Observer to detect when button enters viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of button is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Button is in viewport - trigger animation
                leftArrows.classList.add('animate');
                rightArrows.classList.add('animate');

                // Unobserve after first trigger (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(buttonContainer);
});
