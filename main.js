// ye text animation hai
const texts = ["more than?", "Yes, more than.", "Keep scrolling"];
let i = 0; // kaunsa text
let j = 0; // kaunsa character
const typedText = document.getElementById("typed-text");

// ye carousel image hai
const carouselImages = ["carousel1.jpeg", "carousel3.jpeg"];

// ye buttons ka drag hai
const buttons = document.querySelectorAll("#mybutton button");

function type() {
  const current = texts[i];
  typedText.textContent = current.substring(0, j + 1);
  j++;

  if (j < current.length) {
    setTimeout(type, 150); // next character type after 150ms
  } else {
    // poora text type ho gaya, 1 second pause aur next text
    setTimeout(() => {
      j = 0;
      i = (i + 1) % texts.length;
      typedText.textContent = ""; // previous text clear
      type();
    }, 1000);
  }
}

// Start typing
type();

// carousel program
let carouselIndex = 0;
const carouselImg = document.querySelector(".carousel img");

function showNextImage() {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  carouselImg.src = carouselImages[carouselIndex];
}

// Change image every 3 seconds
setInterval(showNextImage, 3000);

// this is for playing with buttons
buttons.forEach((button) => {
  let isDragging = false;
  let startX, startY;
  let currentX = 0,
    currentY = 0;
  const path = [];

  button.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    path.length = 0;
    path.push({ x: currentX, y: currentY });
    button.style.transition = "none";
    button.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newX = currentX + dx;
    const newY = currentY + dy;
    button.style.transform = `translate(${newX}px, ${newY}px)`;
    path.push({ x: newX, y: newY });
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    // Animate back along reverse path
    let i = path.length - 1;
    function animateBack() {
      if (i < 0) {
        button.style.zIndex = "";
        currentX = 0;
        currentY = 0;
        button.style.transition = "";
        button.style.transform = `translate(0px, 0px)`;
        return;
      }
      const pos = path[i];
      button.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      i--;
      requestAnimationFrame(animateBack);
    }
    animateBack();
  });

  // Update currentX/Y when animation finishes
  button.addEventListener("transitionend", () => {
    currentX = 0;
    currentY = 0;
  });
});
