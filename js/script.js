(function(){
    const slideshow = document.getElementById('topSlideshow');
    const slides = [...slideshow.querySelectorAll('.slide')];
    if (slides.length <= 1) return;

    let idx = 0;
    setInterval(() => {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
    }, 3000);
})();

// =============== ANIMACION DE NIEVE ===================
const snowContainer = document.querySelector('.snow-container');
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 12 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
    snowflake.style.opacity = Math.random();

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 10000);
}
setInterval(createSnowflake, 200);



// =============== BOTON DE UBICAIONES ===================
function openInfoModal() {
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}
