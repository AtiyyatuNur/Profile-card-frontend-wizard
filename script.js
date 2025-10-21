// Update time display
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Initial update
updateTime();

// Update every 100ms for reasonable accuracy without excessive updates
const timeInterval = setInterval(updateTime, 100);

// Navigation functionality
function setupNavigation() {
  const navToggle = document.querySelector('[data-testid="test-nav-toggle"]');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute(
      'aria-expanded',
      navToggle.classList.contains('active')
    );
  });

  // Close mobile menu when clicking on a link
  const navLinksList = navLinks.querySelectorAll('a');
  navLinksList.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.main-nav')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle keyboard navigation
  navToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navToggle.click();
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach((notification) => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'assertive');

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Add accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels where needed
  const socialNav = document.querySelector(
    '[data-testid="test-user-social-links"]'
  );
  if (socialNav) {
    socialNav.setAttribute('aria-label', 'Social media profiles');
  }

  // Add role to time container
  const timeContainer = document.querySelector('.time-container');
  if (timeContainer) {
    timeContainer.setAttribute('role', 'timer');
    timeContainer.setAttribute('aria-live', 'polite');
    timeContainer.setAttribute('aria-atomic', 'true');
    timeContainer.setAttribute('aria-label', 'Current time in milliseconds');
  }

  // Add ARIA labels to sections
  const hobbiesSection = document.querySelector(
    '[data-testid="test-user-hobbies"]'
  );
  const dislikesSection = document.querySelector(
    '[data-testid="test-user-dislikes"]'
  );

  if (hobbiesSection) {
    hobbiesSection
      .closest('section')
      ?.setAttribute('aria-label', 'Hobbies and interests');
  }

  if (dislikesSection) {
    dislikesSection
      .closest('section')
      ?.setAttribute('aria-label', 'Dislikes and pet peeves');
  }

  // Add keyboard navigation enhancements
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link, index) => {
    link.setAttribute('tabindex', '0');
  });
}

// Performance optimization for time updates
function optimizeTimeUpdates() {
  let lastUpdateTime = 0;
  const updateInterval = 100;

  function efficientUpdate() {
    const now = Date.now();
    if (now - lastUpdateTime >= updateInterval) {
      updateTime();
      lastUpdateTime = now;
    }
    requestAnimationFrame(efficientUpdate);
  }

  // Uncomment below to use requestAnimationFrame instead of setInterval
  // efficientUpdate();
}

// Initialize all functionality when DOM is loaded
function init() {
  console.log('Initializing Atiyyatu Nur profile page...');

  // Initialize avatar upload
  setupAvatarUpload();

  // Setup navigation
  setupNavigation();

  // Enhance accessibility
  enhanceAccessibility();

  // Optional: Use requestAnimationFrame for time updates
  // optimizeTimeUpdates();

  // Add page visibility awareness for performance
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      // Page is hidden, stop time updates to save resources
      clearInterval(timeInterval);
    } else {
      // Page is visible, resume time updates
      setInterval(updateTime, 100);
    }
  });

  console.log('Profile page initialized successfully!');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
