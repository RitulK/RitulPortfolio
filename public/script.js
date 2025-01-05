const slider = document.querySelector('.certifications-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentScroll = 0;

// Calculate card width dynamically (includes margin)
const calculateCardWidth = () => {
  const card = document.querySelector('.certification-card');
  const cardStyles = window.getComputedStyle(card);
  const cardMargin = parseInt(cardStyles.marginRight) || 0;
  return card.offsetWidth + cardMargin;
};

prevBtn.addEventListener('click', () => {
  const cardWidth = calculateCardWidth(); // Adjust card width dynamically
  const visibleCards = window.innerWidth <= 768 ? 1 : 3; // 1 card for mobile, 3 for desktop
  currentScroll -= cardWidth * visibleCards; // Scroll by visible cards
  if (currentScroll < 0) {
    currentScroll = 0; // Prevent scrolling past the beginning
  }
  slider.style.transform = `translateX(-${currentScroll}px)`;
});

nextBtn.addEventListener('click', () => {
  const cardWidth = calculateCardWidth(); // Adjust card width dynamically
  const visibleCards = window.innerWidth <= 768 ? 1 : 3; // 1 card for mobile, 3 for desktop
  currentScroll += cardWidth * visibleCards; // Scroll by visible cards
  const maxScroll = slider.scrollWidth - slider.offsetWidth; // Max scrollable width
  if (currentScroll > maxScroll) {
    currentScroll = maxScroll; // Prevent scrolling past the end
  }
  slider.style.transform = `translateX(-${currentScroll}px)`;
});

// Handle dynamic card width on window resize
window.addEventListener('resize', () => {
  const cardWidth = calculateCardWidth();
  currentScroll = Math.min(currentScroll, slider.scrollWidth - slider.offsetWidth); // Adjust current scroll
  slider.style.transform = `translateX(-${currentScroll}px)`;
});
