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

document.querySelectorAll('.info-card .card-header').forEach(header => {
  const cardBody = header.nextElementSibling;

  header.style.cursor = 'pointer';

  header.addEventListener('click', () => {
    const isOpen = cardBody.style.display === 'block';

    // Toggle visibility of the card body
    cardBody.style.display = isOpen ? 'none' : 'block';
  });
});


  function animateCount(el, target, duration = 2000) {
  let start = 1;
  const stepTime = Math.max(Math.floor(duration / (target - start)), 20);

  const counter = setInterval(() => {
    el.textContent = start;
    start++;

    if (start > target) {
      clearInterval(counter);
    }
  }, stepTime);
}

function animateCount(el, target, duration = 2000) {
  let start = 1;
  let current = start;

  // Adjust increment based on target size
  const increment = target > 500 ? Math.ceil(target / (duration / 30)) : 1;
  const intervalTime = 30;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString(); // Add commas if needed
      clearInterval(counter);
    } else {
      el.textContent = current.toLocaleString();
    }
  }, intervalTime);
}


const animatedElements = document.querySelectorAll('.sm-boxes p');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent.replace(/,/g, '').trim());

      if (!el.dataset.animated) {
        animateCount(el, target);
        el.dataset.animated = "true";
      }

      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

animatedElements.forEach(p => {
  observer.observe(p);
});
function showContent(el) {
      const content = el.nextElementSibling;
      if (content && content.classList.contains('content-box')) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    }

const boxes = document.querySelectorAll('.box');
const tooltip = document.getElementById('tooltip');

boxes.forEach(box => {
box.addEventListener('click', function(e) {
const info = this.dataset.info;
tooltip.innerText = info || '[Add content here]';
tooltip.style.top = this.offsetTop + this.offsetHeight + 5 + 'px';
tooltip.style.left = '184px'; 
tooltip.style.width = '249px'; 
tooltip.style.display = 'block';
});
});


document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('box')) {
    tooltip.style.display = 'none';
  }
});