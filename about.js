// About Page Enhancements
class AboutPage {
  constructor() {
    this.sections = [];
    this.init();
  }

  init() {
    this.cacheSections();
    this.addSectionInteractions();
    this.setupNavigation();
    this.enhanceAccessibility();
    this.addScrollAnimations();
    console.log('About page initialized for Atiyyatu Nur');
  }

  cacheSections() {
    this.sections = Array.from(document.querySelectorAll('.about-section'));
  }

  addSectionInteractions() {
    this.sections.forEach((section, index) => {
      // Add click to focus for better keyboard navigation
      section.setAttribute('tabindex', '0');
      section.setAttribute('role', 'region');

      // Add smooth scroll behavior when focused
      section.addEventListener('focus', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  setupNavigation() {
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

  addScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';
        }
      });
    }, observerOptions);

    // Set initial state and observe sections
    this.sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      observer.observe(section);
    });
  }

  enhanceAccessibility() {
    const main = document.querySelector('[data-testid="test-about-page"]');
    if (main) {
      main.setAttribute('role', 'main');
      main.setAttribute('aria-label', 'About me page content');
    }

    // Add ARIA labels and IDs to sections
    this.sections.forEach((section, index) => {
      const heading = section.querySelector('h2');
      if (heading && !heading.id) {
        const id = `about-section-${index + 1}`;
        heading.id = id;
        section.setAttribute('aria-labelledby', id);
      }

      // Add descriptive labels based on content
      const testId = section.getAttribute('data-testid');
      if (testId) {
        const labels = {
          'test-about-bio': 'Personal biography and background',
          'test-about-goals': 'Goals and aspirations in the program',
          'test-about-confidence': 'Areas of development and growth',
          'test-about-future-note': 'Inspirational note to future self',
          'test-about-extra': 'Additional thoughts and philosophy',
        };
        section.setAttribute('aria-label', labels[testId] || 'About section');
      }
    });

    // Enhance blockquote accessibility
    const blockquote = document.querySelector('blockquote');
    if (blockquote) {
      blockquote.setAttribute('role', 'contentinfo');
      blockquote.setAttribute('aria-label', 'Inspirational message');
    }
  }

  // Optional: Add section navigation
  addSectionNavigation() {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'About page sections');
    nav.className = 'section-nav';

    const ul = document.createElement('ul');

    this.sections.forEach((section, index) => {
      const heading = section.querySelector('h2');
      if (heading) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          section.scrollIntoView({ behavior: 'smooth' });
        });
        li.appendChild(a);
        ul.appendChild(li);
      }
    });

    nav.appendChild(ul);

    // Insert after the main header
    const header = document.querySelector('.about-header');
    if (header) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    }
  }
}

// Initialize about page
function initAboutPage() {
  console.log('Initializing about page for Atiyyatu Nur...');
  new AboutPage();
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}
