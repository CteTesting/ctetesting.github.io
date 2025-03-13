// Navbar Toggle Functionality
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

// Track whether the navbar is open
let isNavOpen = false;

// Function to toggle the navbar
function toggleNav() {
  isNavOpen = !isNavOpen;
  navbar.classList.toggle('active', isNavOpen);
  hamburger.classList.toggle('active', isNavOpen);
}

// Handle click event for hamburger button
hamburger.addEventListener('click', () => {
  toggleNav();
});

// Close the navbar when clicking outside
document.addEventListener('click', (event) => {
  if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
    isNavOpen = false;
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Overlay Functionality
const openBuilderButton = document.getElementById('open-builder');
const closeBuilderButton = document.getElementById('close-builder');
const builderOverlay = document.getElementById('builder-overlay');

// Open the overlay
openBuilderButton.addEventListener('click', () => {
  builderOverlay.classList.add('active');
});

// Close the overlay
closeBuilderButton.addEventListener('click', () => {
  builderOverlay.classList.remove('active');
});

// Class Builder Functionality

// Toggle Dropdown Function
function toggleDropdown(header) {
  const content = header.nextElementSibling;
  content.classList.toggle('show');
}

// Close Dropdowns When Clicking Outside
document.addEventListener('click', (e) => {
  if (!e.target.matches('.dropdown-header')) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

// Drag-and-Drop Functionality
document.addEventListener('DOMContentLoaded', () => {
  const draggableOptions = document.querySelectorAll('.draggable-option');
  const droppables = document.querySelectorAll('.droppable');
  const ghost = document.createElement('div');
  ghost.classList.add('ghost');
  document.body.appendChild(ghost);

  let draggedItem = null;

  // Add dragstart event to draggable options
  draggableOptions.forEach(option => {
    option.addEventListener('dragstart', (e) => {
      draggedItem = option;
      ghost.textContent = option.textContent;
      ghost.style.display = 'block';
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      option.classList.add('dragging');
      e.dataTransfer.setData('text/plain', option.textContent);
    });

    option.addEventListener('drag', (e) => {
      ghost.style.left = `${e.clientX + 10}px`;
      ghost.style.top = `${e.clientY + 10}px`;
    });

    option.addEventListener('dragend', () => {
      ghost.style.display = 'none';
      draggedItem = null;
      option.classList.remove('dragging');
    });
  });

  // Add dragover and drop events to droppable cells
  droppables.forEach(droppable => {
    droppable.addEventListener('dragover', (e) => {
      e.preventDefault();
      droppable.classList.add('drag-over');
    });

    droppable.addEventListener('dragleave', () => {
      droppable.classList.remove('drag-over');
    });

    droppable.addEventListener('drop', (e) => {
      e.preventDefault();
      droppable.classList.remove('drag-over');
      if (draggedItem) {
        droppable.textContent = draggedItem.textContent;
      }
    });
  });
});

// Reset Button Functionality
document.getElementById('reset-button').addEventListener('click', () => {
  const droppables = document.querySelectorAll('.droppable');
  droppables.forEach(droppable => {
    droppable.textContent = '[Blank]';
  });
});

// Mobile Dropdown Functionality
document.querySelectorAll('.navbar .dropdown-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const dropdown = button.closest('.dropdown');
    dropdown.classList.toggle('active');

    // Close other dropdowns when one is opened
    document.querySelectorAll('.navbar .dropdown').forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove('active');
      }
    });
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.navbar .dropdown')) {
    document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// Show the school popup when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const schoolPopup = document.getElementById('school-popup-overlay');
  schoolPopup.classList.add('active');
});

// Close the popup when a school is selected
document.querySelectorAll('.school-button').forEach(button => {
  button.addEventListener('click', () => {
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.remove('active');
    // You can save the selected school to localStorage or a variable here
    const selectedSchool = button.textContent.trim();
    console.log(`Selected School: ${selectedSchool}`);
    // Optionally, you can update the UI or perform other actions
  });
});

// Function to darken a color (hex format)
function darkenColor(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Function to check if a color is too bright
function isColorBright(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128; // Brightness threshold
}

// Update the theme based on the selected school
document.querySelectorAll('.school-button').forEach(button => {
  button.addEventListener('click', () => {
    const primaryColor = button.getAttribute('data-primary');
    const secondaryColor = button.getAttribute('data-secondary');

    // Darken the primary color if it's too bright
    const adjustedPrimary = isColorBright(primaryColor) ? darkenColor(primaryColor, 20) : primaryColor;

    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', adjustedPrimary);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);

    // Close the popup
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.remove('active');

    // Save the selected school to localStorage
    const selectedSchool = button.textContent.trim();
    localStorage.setItem('selectedSchool', selectedSchool);
    localStorage.setItem('primaryColor', adjustedPrimary);
    localStorage.setItem('secondaryColor', secondaryColor);
  });
});

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedSchool = localStorage.getItem('selectedSchool');
  const savedPrimary = localStorage.getItem('primaryColor');
  const savedSecondary = localStorage.getItem('secondaryColor');

  if (savedSchool && savedPrimary && savedSecondary) {
    document.documentElement.style.setProperty('--primary-color', savedPrimary);
    document.documentElement.style.setProperty('--secondary-color', savedSecondary);
  } else {
    // Show the school popup if no school is selected
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.add('active');
  }
});

// Show the academy popup when Weber is selected
document.querySelectorAll('.school-button').forEach(button => {
  button.addEventListener('click', () => {
    const selectedSchool = button.textContent.trim();

    if (selectedSchool === 'Weber Institute') {
      // Show the academy popup
      const academyPopup = document.getElementById('academy-popup-overlay');
      academyPopup.classList.add('active');
    } else {
      // For other schools, update the theme directly
      const primaryColor = button.getAttribute('data-primary');
      const secondaryColor = button.getAttribute('data-secondary');
      updateTheme(primaryColor, secondaryColor);

      // Close the school popup
      const schoolPopup = document.getElementById('school-popup-overlay');
      schoolPopup.classList.remove('active');
    }
  });
});

// Update the theme based on the selected academy
document.querySelectorAll('.academy-button').forEach(button => {
  button.addEventListener('click', () => {
    const primaryColor = button.getAttribute('data-primary');
    const secondaryColor = button.getAttribute('data-secondary');
    const logo = button.getAttribute('data-logo');
    const textColor = button.getAttribute('data-text-color');

    // Update the theme
    updateTheme(primaryColor, secondaryColor);

    // Update the header logo
    const headerLogo = document.getElementById('header-logo');
    headerLogo.src = logo;

    // Close the academy popup
    const academyPopup = document.getElementById('academy-popup-overlay');
    academyPopup.classList.remove('active');

    // Close the school popup
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.remove('active');

    // Save the selected academy to localStorage
    localStorage.setItem('selectedAcademy', button.textContent.trim());
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    localStorage.setItem('academyLogo', logo);
  });
});

// Function to update the theme colors and text color
function updateTheme(primaryColor, secondaryColor, textColor) {
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  document.documentElement.style.setProperty('--text-color', textColor || '#ffffff'); // Default text color if not provided
}

// Update the theme based on the selected academy
document.querySelectorAll('.academy-button').forEach(button => {
  button.addEventListener('click', () => {
    const primaryColor = button.getAttribute('data-primary');
    const secondaryColor = button.getAttribute('data-secondary');
    const logo = button.getAttribute('data-logo');
    const textColor = button.getAttribute('data-text-color');

    // Update the theme
    updateTheme(primaryColor, secondaryColor, textColor);

    // Update the academy logo in the header
    const academyLogo = document.getElementById('academy-logo');
    academyLogo.src = logo;

    // Close the academy popup
    const academyPopup = document.getElementById('academy-popup-overlay');
    academyPopup.classList.remove('active');

    // Close the school popup
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.remove('active');

    // Save the selected academy to localStorage
    localStorage.setItem('selectedAcademy', button.textContent.trim());
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    localStorage.setItem('academyLogo', logo);
  });
});

// Apply saved theme and logo on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedSchool = localStorage.getItem('selectedSchool');
  const savedAcademy = localStorage.getItem('selectedAcademy');
  const savedPrimary = localStorage.getItem('primaryColor');
  const savedSecondary = localStorage.getItem('secondaryColor');
  const savedLogo = localStorage.getItem('academyLogo');

  if (savedSchool && savedPrimary && savedSecondary) {
    updateTheme(savedPrimary, savedSecondary);

    if (savedLogo) {
      const academyLogo = document.getElementById('academy-logo');
      academyLogo.src = savedLogo;
    }
  } else {
    // Show the school popup if no school is selected
    const schoolPopup = document.getElementById('school-popup-overlay');
    schoolPopup.classList.add('active');
  }
});