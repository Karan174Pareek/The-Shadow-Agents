const track = document.getElementById('testimonialTrack');
const buttons = document.querySelectorAll('.scroll-btn');
let currentIndex = 0;
const totalCards = track.children.length;
function moveToIndex(index) {
  if (index < 0) index = 0;
  if (index >= totalCards) index = totalCards - 1;
  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

buttons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    if (idx < totalCards - 1) {
      moveToIndex(currentIndex + 1);
    } else {
      const url = btn.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    }
  });
});

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50; 

track.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const distance = touchEndX - touchStartX;
  if (Math.abs(distance) < minSwipeDistance) return; 

  if (distance > 0) {
    moveToIndex(currentIndex - 1);
  } else {
    if (currentIndex < totalCards - 1) {
      moveToIndex(currentIndex + 1);
    } else {
      const lastBtn = buttons[buttons.length - 1];
      const url = lastBtn.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    }
  }
}

document.querySelectorAll('.feature').forEach(feature => {
    const arrow = feature.querySelector('.arrow-icon');
    const cardId = feature.getAttribute('data-target');
    const card = document.getElementById(cardId);

    arrow.style.cursor = 'pointer';

    arrow.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = card.style.display === 'block';
      document.querySelectorAll('.info-card').forEach(c => c.style.display = 'none');
      document.querySelectorAll('.feature').forEach(f => f.style.display = 'flex');

      if (!isVisible) {
        // Show the clicked card
        card.style.display = 'block';
        // Hide its associated feature bar
        feature.style.display = 'none';
        // Scroll into view
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('.info-card .arrow-icon').forEach(arrow => {
    arrow.style.cursor = 'pointer';
  
    arrow.addEventListener('click', () => {
      const card = arrow.closest('.info-card');
      const cardId = card.id;
      const feature = document.querySelector(`.feature.faq[data-target="${cardId}"]`);
  
      const isOpen = card.style.display === 'block';
  
      if (isOpen) {
        // Close card and show blue question row
        card.style.display = 'none';
        if (feature) feature.style.display = 'flex';
      } else {
        // Open card and hide question row
        card.style.display = 'block';
        if (feature) feature.style.display = 'none';
        card.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });