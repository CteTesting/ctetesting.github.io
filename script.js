// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Move to the next slide
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  // Show the current slide
  slides[slideIndex - 1].classList.add("active");

  // Change slide every 5 seconds
  setTimeout(showSlides, 5000);
}

// Video overlay functionality with slide-up animation
function openVideo(videoUrl) {
  let overlay = document.getElementById("videoOverlay");
  let iframe = document.getElementById("overlayVideo");

  // Set the iframe source to the YouTube video URL
  iframe.src = videoUrl;

  // Show the overlay
  overlay.classList.add("active");
}

function closeVideo() {
  let overlay = document.getElementById("videoOverlay");
  let iframe = document.getElementById("overlayVideo");

  // Hide the overlay
  overlay.classList.remove("active");

  // Stop the video by removing the iframe source
  iframe.src = "";
}