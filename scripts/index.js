const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

// Track whether the navbar is open
let isNavOpen = false;

// Function to toggle the navbar
function toggleNav(event) {
  // Prevent the click event from firing after touchstart on mobile
  if (event.type === 'touchstart') {
    event.preventDefault();
  }

  // Toggle the navbar and hamburger
  isNavOpen = !isNavOpen;
  navbar.classList.toggle('active', isNavOpen);
  hamburger.classList.toggle('active', isNavOpen);
}

// Add event listeners for both click and touchstart
hamburger.addEventListener('click', toggleNav);
hamburger.addEventListener('touchstart', toggleNav);

// Close the navbar when clicking/touching outside
document.addEventListener('click', (event) => {
  if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
    isNavOpen = false;
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

document.addEventListener('touchstart', (event) => {
  if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
    isNavOpen = false;
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Slideshow functionality
let slideIndex = 0;
showSlides();

// Function to show the current slide
function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex].classList.add("active");
}

// Function to move to the next slide
function nextSlide() {
  let slides = document.getElementsByClassName("slide");
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0; // Loop back to the first slide
  }
  showSlides();
}

// Function to move to the previous slide
function prevSlide() {
  let slides = document.getElementsByClassName("slide");
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1; // Loop to the last slide
  }
  showSlides();
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Function to handle slide button clicks
function handleSlideButtonClick() {
  const activeSlide = document.querySelector('.slide.active');
  const button = activeSlide.querySelector('button');

  const action = button.getAttribute('data-action');

  if (action === 'video') {
    // Open video overlay
    const videoUrl = button.getAttribute('data-video-url');
    openVideo(videoUrl);
  } else if (action === 'website') {
    // Redirect to the website
    const websiteUrl = button.getAttribute('data-url');
    window.open(websiteUrl, '_blank'); // Open in a new tab
  }
}

// Function to open the video overlay
function openVideo(videoUrl) {
  const overlay = document.getElementById('videoOverlay');
  const iframe = document.getElementById('overlayVideo');

  // Set the iframe source to the video URL
  iframe.src = videoUrl;

  // Show the overlay
  overlay.classList.add('active');
}

// Function to close the video overlay
function closeVideo() {
  const overlay = document.getElementById('videoOverlay');
  const iframe = document.getElementById('overlayVideo');

  // Hide the overlay
  overlay.classList.remove('active');

  // Stop the video by removing the iframe source
  iframe.src = '';
}

// Dropdown functionality
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', () => {
      const dropdown = button.parentElement;
      dropdown.classList.toggle('active');
    });
  });


  // Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navbarLinks = document.querySelector('.navbar-links');

mobileMenu.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Dropdown functionality for mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const dropdownBtn = dropdown.querySelector('.dropdown-btn');
  dropdownBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Prevent link navigation on mobile
      dropdown.classList.toggle('active');
    }
  });
});

