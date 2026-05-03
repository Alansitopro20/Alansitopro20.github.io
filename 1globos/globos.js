function scrollCarousel(btn, direction) {
  const wrapper = btn.parentElement;
  const carousel = wrapper.querySelector('.carousel');
  const card = carousel.querySelector('.card');
  const cardWidth = card.offsetWidth + 20;

  carousel.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

function openModal(type) {
  const modal = document.getElementById('detailsModal');
  const title = document.getElementById('modalTitle');

  title.innerText = type === 'galaxy'
    ? 'Detalles: Galaxy Spark'
    : 'Detalles: Diseño Especial';

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('detailsModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.onclick = function(e) {
  const modal = document.getElementById('detailsModal');
  if (e.target === modal) closeModal();
}


<script>
function scrollCarousel(id,dir){
  const track=document.getElementById(id);
  track.scrollBy({left: dir*300, behavior:'smooth'});
}

