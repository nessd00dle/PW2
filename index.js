const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  coverflowEffect: {
    rotate: 25,    
    stretch: 0,
    depth: 120,     
    modifier: 1,
    slideShadows: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// giro de cartaas
document.querySelectorAll(".flip-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cardInner = btn.closest(".card-inner");
    cardInner.classList.toggle("flipped");
  });
});

