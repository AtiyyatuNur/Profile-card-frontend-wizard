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
setInterval(updateTime, 100);

// Avatar upload functionality (optional enhancement)
function setupAvatarUpload() {
  const avatarElement = document.querySelector(
    '[data-testid="test-user-avatar"]'
  );

  // Create file input for avatar upload
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Add click event to avatar for upload
  avatarElement.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file selection
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Add upload hint to avatar
  avatarElement.style.cursor = 'pointer';
  avatarElement.title = 'Click to upload new avatar';
}

// Initialize avatar upload functionality (optional)
// Uncomment the line below if you want to enable avatar upload
// setupAvatarUpload();

// Add accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels where needed
  const socialNav = document.querySelector(
    '[data-testid="test-user-social-links"]'
  );
  if (socialNav) {
    socialNav.setAttribute('aria-label', 'Social media links');
  }

  // Add role to time container
  const timeContainer = document.querySelector('.time-container');
  if (timeContainer) {
    timeContainer.setAttribute('role', 'timer');
    timeContainer.setAttribute('aria-live', 'polite');
  }
}

// Initialize accessibility enhancements
enhanceAccessibility();
