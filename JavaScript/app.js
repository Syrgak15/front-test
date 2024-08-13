// SLIDER

const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.left__arrow');
const nextButton = document.querySelector('.right__arrow');

let currentIndex = 0;

function updateSlider() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    updateSlider();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    updateSlider();
});

//MODAL WINDOW

const layout = document.querySelector('.build__layout');
const modalWindow = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__btn');

const showModal = () => {
    modalWindow.style.display = 'block';
}
const closeModal = () => {
    modalWindow.style.display = 'none';
}
layout.addEventListener('click', (e) => {
    showModal();
});
closeButton.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev.at(-1) : back ? prev[i-1] || first : i;
                });
                el.value = clean(el.value).join("");
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});




