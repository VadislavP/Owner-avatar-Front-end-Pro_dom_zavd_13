class Slider {
    constructor(prevButton, nextButton, listElement, dotsElement) {
        this.ACTIVE_CLASS_NAME = 'active--li';
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.listElement = listElement;
        this.dotsElement = dotsElement;
        this.currentSlide = 0;

        this.prevButton.addEventListener('click', () => this.changeSlide(true));
        this.nextButton.addEventListener('click', () => this.changeSlide(false));

        this.dotsElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('dot')) {
                const dotIndex = Array.from(this.dotsElement.querySelectorAll('.dot')).indexOf(event.target);
                this.handleDotClick(dotIndex);
            }
        });

        this.updateButtonsVisibility();
    }

    updateButtonsVisibility() {
        this.prevButton.style.display = this.currentSlide === 0 ? 'none' : 'flex';
        this.nextButton.style.display = this.currentSlide === this.listElement.children.length - 1 ? 'none' : 'flex';
    }

    changeSlide(isPrev) {
        const activeElement = this.listElement.querySelector(`.${this.ACTIVE_CLASS_NAME}`);
        const prevOrNextElement = isPrev
            ? activeElement.previousElementSibling
            : activeElement.nextElementSibling;

        if (prevOrNextElement) {
            activeElement.classList.remove(this.ACTIVE_CLASS_NAME);
            prevOrNextElement.classList.add(this.ACTIVE_CLASS_NAME);
            this.currentSlide = Array.from(this.listElement.children).indexOf(prevOrNextElement);
            this.updateButtonsVisibility();
            this.updateDots();
        }
    }

    updateDots() {
        const dots = this.dotsElement.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active--dot');
            if (index === this.currentSlide) {
                dot.classList.add('active--dot');
            }
        });
    }

    handleDotClick(index) {
        this.listElement.querySelectorAll('li').forEach((li, i) => {
            li.classList.remove(this.ACTIVE_CLASS_NAME);
            if (i === index) {
                li.classList.add(this.ACTIVE_CLASS_NAME);
                this.currentSlide = index;
                this.updateButtonsVisibility();
                this.updateDots();
            }
        });
    }
}

const prevButton = document.querySelector('.js--slider__prev');
const nextButton = document.querySelector('.js--slider__next');
const listElement = document.querySelector('.js--slider__list');
const dotsElement = document.querySelector('.js--slider__dots');

new Slider(prevButton, nextButton, listElement, dotsElement);
