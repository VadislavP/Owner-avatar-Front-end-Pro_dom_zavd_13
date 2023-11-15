function createSlider() {
    const ACTIVE_CLASS_NAME = 'active--li';
    let currentSlide = 0;

    const prevButton = document.querySelector('.js--slider__prev');
    const nextButton = document.querySelector('.js--slider__next');
    const listElement = document.querySelector('.js--slider__list');
    const dotsElement = document.querySelector('.js--slider__dots');

    function updateButtonsVisibility() {
        prevButton.style.display = currentSlide === 0 ? 'none' : 'flex';
        nextButton.style.display = currentSlide === listElement.children.length - 1 ? 'none' : 'flex';
    }

    function changeSlide(isPrev) {
        const activeElement = listElement.querySelector(`.${ACTIVE_CLASS_NAME}`);
        const prevOrNextElement = isPrev
            ? activeElement.previousElementSibling
            : activeElement.nextElementSibling;

        if (prevOrNextElement) {
            activeElement.classList.remove(ACTIVE_CLASS_NAME);
            prevOrNextElement.classList.add(ACTIVE_CLASS_NAME);
            currentSlide = Array.from(listElement.children).indexOf(prevOrNextElement);
            updateButtonsVisibility();

            // Обновленная часть для подсветки точек
            const dots = dotsElement.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active--dot');
                if (index === currentSlide) {
                    dot.classList.add('active--dot');
                    console.log('add dot');
                }
            });
        }
    }

    function handleDotClick(index) {
        const slides = listElement.children;
        const clickedSlide = slides[index];

        listElement.querySelector(`.${ACTIVE_CLASS_NAME}`).classList.remove(ACTIVE_CLASS_NAME);
        clickedSlide.classList.add(ACTIVE_CLASS_NAME);
        currentSlide = index;

        updateButtonsVisibility();

        const dots = dotsElement.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active--dot');
            if (i === currentSlide) {
                dot.classList.add('active--dot');
                console.log('add dot');
            }
        });
    }

    prevButton.addEventListener('click', () => changeSlide(true));
    nextButton.addEventListener('click', () => changeSlide(false));

    // Обработчики событий для каждой точки
    const dots = dotsElement.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => handleDotClick(index));
    });

    updateButtonsVisibility();
}

createSlider();
