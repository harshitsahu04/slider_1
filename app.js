// Step 1: Get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Append first thumbnail

// Timing settings
let timeRunning = 3000; // Time for transition
let timeAutoNext = 7000; // Time between automatic slides

// Arrow click event listeners
nextDom.onclick = function() {
    showSlider('next');
}

prevDom.onclick = function() {
    showSlider('prev');
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if (type === 'next') {
        // Move first slider item and thumbnail to the end (next slide)
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        // Move last slider item and thumbnail to the beginning (prev slide)
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Fade out the current content
    SliderItemsDom[0].querySelector('.content').style.opacity = 0;

    // Clear any running timeout for the transition
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        // Remove classes after the animation completes
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Reset auto-slide timer to avoid immediate slide after manual action
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click(); // Trigger next slide automatically
    }, timeAutoNext);
}