const cards = Array.from(document.querySelectorAll(".phone-card"));
const dotsWrap = document.getElementById("carouselDots");
const prevButton = document.getElementById("prevShot");
const nextButton = document.getElementById("nextShot");

let activeIndex = 0;

function renderSlides(index) {
  activeIndex = (index + cards.length) % cards.length;
  cards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeIndex);
  });

  if (dotsWrap) {
    Array.from(dotsWrap.children).forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }
}

if (dotsWrap) {
  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show screen ${index + 1}`);
    dot.addEventListener("click", () => renderSlides(index));
    dotsWrap.appendChild(dot);
  });
}

prevButton?.addEventListener("click", () => renderSlides(activeIndex - 1));
nextButton?.addEventListener("click", () => renderSlides(activeIndex + 1));

let startX = 0;
let moved = false;
const stage = document.querySelector(".carousel-stage");

stage?.addEventListener("touchstart", (event) => {
  startX = event.changedTouches[0].clientX;
  moved = false;
}, { passive: true });

stage?.addEventListener("touchmove", () => {
  moved = true;
}, { passive: true });

stage?.addEventListener("touchend", (event) => {
  if (!moved) return;
  const endX = event.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) < 40) return;
  renderSlides(activeIndex + (diff < 0 ? 1 : -1));
}, { passive: true });

renderSlides(0);
