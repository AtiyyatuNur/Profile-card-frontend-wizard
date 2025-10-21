// Contact Form Validation
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.successMessage = document.getElementById('success-message');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.setupRealTimeValidation();
    this.enhanceFormAccessibility();
  }

  setupRealTimeValidation() {
    const fields = ['fullName', 'email', 'subject', 'message'];

    fields.forEach((fieldName) => {
      const field = document.getElementById(fieldName);
      if (field) {
        field.addEventListener('blur', this.validateField.bind(this));
        field.addEventListener('input', this.clearFieldError.bind(this));
        field.addEventListener('focus', this.clearFieldError.bind(this));
      }
    });
  }

  validateField(event) {
    const field = event.target;
    this.validateSingleField(field);
  }

  clearFieldError(event) {
    const field = event.target;
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('error');
    }
  }

  validateSingleField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}-error`);

    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = '';

    switch (field.id) {
      case 'fullName':
        if (!value) {
          isValid = false;
          errorMessage = 'Full name is required';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          isValid = false;
          errorMessage = 'Name can only contain letters and spaces';
        }
        break;

      case 'email':
        if (!value) {
          isValid = false;
          errorMessage = 'Email is required';
        } else if (!this.isValidEmail(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;

      case 'subject':
        if (!value) {
          isValid = false;
          errorMessage = 'Please select a subject';
        }
        break;

      case 'message':
        if (!value) {
          isValid = false;
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters';
        } else if (value.length > 1000) {
          isValid = false;
          errorMessage = 'Message must be less than 1000 characters';
        }
        break;
    }

    if (!isValid) {
      errorElement.textContent = errorMessage;
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('error');
    } else {
      errorElement.textContent = '';
      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('error');
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleSubmit(event) {
    event.preventDefault();

    const fields = ['fullName', 'email', 'subject', 'message'];
    let isFormValid = true;

    // Validate all fields
    fields.forEach((fieldName) => {
      const field = document.getElementById(fieldName);
      if (field && !this.validateSingleField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      this.submitForm();
    } else {
      // Focus on first invalid field
      const firstInvalidField = document.querySelector('[aria-invalid="true"]');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      // Show error notification
      this.showNotification('Kindly correct the errors in the form', 'error');
    }
  }

  submitForm() {
    const submitButton = this.form.querySelector(
      '[data-testid="test-contact-submit"]'
    );
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
      };

      console.log('Contact form submitted:', formData);

      // Show success message
      this.showSuccessMessage();

      // Reset form
      this.form.reset();

      // Clear all error messages
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach((element) => {
        element.textContent = '';
      });

      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Store form data in localStorage (for demo purposes)
      try {
        const submissions = JSON.parse(
          localStorage.getItem('contactSubmissions') || '[]'
        );
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      } catch (error) {
        console.warn('Could not save submission to localStorage:', error);
      }
    }, 1500);
  }

  showSuccessMessage() {
    if (this.successMessage) {
      this.successMessage.hidden = false;
      this.successMessage.setAttribute('aria-live', 'assertive');

      // Scroll to success message
      this.successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.successMessage.hidden = true;
      }, 5000);
    }
  }

  showNotification(message, type = 'info') {
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

  enhanceFormAccessibility() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.setAttribute('aria-label', 'Contact form');
    }

    // Add required asterisk to labels
    const labels = document.querySelectorAll('.form-label');
    labels.forEach((label) => {
      const text = label.textContent;
      if (text.includes('*')) {
        const asterisk =
          label.querySelector('.required-asterisk') ||
          document.createElement('span');
        asterisk.className = 'required-asterisk';
        asterisk.textContent = ' *';
        asterisk.style.color = '#e74c3c';
        label.appendChild(asterisk);
      }
    });
  }
}

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

  const navLinksList = navLinks.querySelectorAll('a');
  navLinksList.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.main-nav')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  navToggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navToggle.click();
    }
  });
}

// Initialize contact page
function initContactPage() {
  console.log('Initializing contact page for Atiyyatu Nur...');

  // Initialize contact form
  new ContactForm();

  // Setup navigation
  setupNavigation();

  console.log('Contact page initialized successfully!');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactPage);
} else {
  initContactPage();
}
