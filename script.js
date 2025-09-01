// ====================================
// Mobile Menu Toggle
// ====================================
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');

mobileToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
  mobileToggle.classList.toggle('open');

  // Change the icon
  if (mobileToggle.classList.contains('open')) {
    mobileToggle.textContent = '×'; // X when open
  } else {
    mobileToggle.textContent = '☰'; // Hamburger when closed
  }
});


// ====================================
// Dropdown Menu Keyboard Accessibility
// ====================================
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

dropdownItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.dropdown-menu');

  // Show submenu on focus
  link.addEventListener('focus', () => {
    submenu.style.display = 'flex';
  });

  // Hide submenu on blur
  link.addEventListener('blur', () => {
    setTimeout(() => { // Delay to allow clicking submenu items
      submenu.style.display = 'none';
    }, 200);
  });
});

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after click
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
      }
    }
  });
});

// ====================================
// Login/Register Form Validation
// ====================================
const authForm = document.getElementById('auth-form');

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  // Clear previous error messages
  authForm.querySelectorAll('.error-message').forEach(el => el.remove());

  const inputs = authForm.querySelectorAll('input[required]');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      showError(input, 'This field is required');
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      valid = false;
      showError(input, 'Please enter a valid email');
    }
  });

  if (valid) {
    alert('Form submitted successfully!');
    authForm.reset();
  }
});

function showError(input, message) {
  const error = document.createElement('div');
  error.classList.add('error-message');
  error.style.color = '#D4AF37';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.25rem';
  error.textContent = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// ====================================
// Newsletter Form Validation
// ====================================
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input[type="email"]');
  newsletterForm.querySelectorAll('.error-message').forEach(el => el.remove());

  if (!input.value.trim()) {
    showError(input, 'Email is required');
  } else if (!validateEmail(input.value)) {
    showError(input, 'Enter a valid email');
  } else {
    alert('Subscribed successfully!');
    newsletterForm.reset();
  }
});

// ====================================
// Section Fade-In Animation
// ====================================
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => {
  section.classList.add('fade-section');
  observer.observe(section);
});
