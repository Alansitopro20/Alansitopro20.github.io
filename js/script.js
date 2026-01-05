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









const carousel = document.querySelector('.lego-carousel');
const items = Array.from(document.querySelectorAll('.lego-item'));
const gap = 40;

function updateActive() {
  const center = carousel.scrollLeft + carousel.offsetWidth / 2;
  items.forEach(item => {
    const c = item.offsetLeft + item.offsetWidth / 2;
    item.classList.toggle('active', Math.abs(center - c) < item.offsetWidth / 2);
  });
}

carousel.addEventListener('scroll', updateActive);
window.addEventListener('load', updateActive);

/* BOTONES */
document.querySelector('.nav.right').onclick = () => {
  const w = items[0].offsetWidth + gap;
  carousel.scrollBy({ left: w, behavior: 'smooth' });

  if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
    setTimeout(() => carousel.scrollTo({ left: 0, behavior: 'smooth' }), 300);
  }
};

document.querySelector('.nav.left').onclick = () => {
  const w = items[0].offsetWidth + gap;
  carousel.scrollBy({ left: -w, behavior: 'smooth' });

  if (carousel.scrollLeft <= 5) {
    setTimeout(() => carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' }), 300);
  }
};


