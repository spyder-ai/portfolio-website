const texts = ["more than?", "Yes, more than.", "Keep scrolling"];
let currentText = "";
let i = 0; // index for texts array
let j = 0; // index for characters
let isDeleting = false;
const typedText = document.getElementById("typed-text");
const carouselImages = [
  "carousel1.jpeg",
  "carousel2.jpg",
  "carousel3.jpeg"
];

function type() {
  const fullText = texts[i];

  if (!isDeleting) {
    currentText = fullText.substring(0, j + 1);
    j++;
  } else {
    currentText = fullText.substring(0, j - 1);
    j--;
  }

  typedText.textContent = currentText;

  if (!isDeleting && j === fullText.length) {
    isDeleting = true;
    setTimeout(type, 1000); // wait 1s at full text
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % texts.length; // move to next text
    setTimeout(type, 500); // wait before typing next text
  } else {
    setTimeout(type, isDeleting ? 50 : 100); // speed
  }
}

// Start typing effect
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