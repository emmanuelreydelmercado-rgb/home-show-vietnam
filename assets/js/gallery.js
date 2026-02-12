document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".gallery-slider-wrapper");
    const slides = document.querySelectorAll(".gallery-slide");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;

    function updateSlides() {
        slides.forEach((slide, index) => {
            let offset = index - currentIndex;

            if (offset > slides.length / 2) offset -= slides.length;
            if (offset < -slides.length / 2) offset += slides.length;

            const translateX = offset * 260;
            const scale = offset === 0 ? 1.2 : 0.85;
            const zIndex = offset === 0 ? 10 : 5 - Math.abs(offset);

            slide.style.transform = `translate3d(${translateX}px, 0, 0) scale(${scale})`;
            slide.style.zIndex = zIndex;

            // instead of opacity
            slide.style.filter = offset === 0 ? "brightness(1)" : "brightness(0.6)";

            slide.classList.toggle("active", offset === 0);
        });
    }


    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();

        setTimeout(() => {
            isAnimating = false;
        }, 650);
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();

        setTimeout(() => {
            isAnimating = false;
        }, 650);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    wrapper.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    wrapper.addEventListener("mouseleave", startAutoSlide);

    updateSlides();
    startAutoSlide();
});
