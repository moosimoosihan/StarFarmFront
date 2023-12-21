let currentIndex = 0;

function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  const slideWidth = slides[currentIndex].clientWidth;
  document.querySelector('.slide-wrapper').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slides.length - 1;
  }
  const slideWidth = slides[currentIndex].clientWidth;
  document.querySelector('.slide-wrapper').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}