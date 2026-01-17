/**
 * Patricia Prial Portfolio - Main JavaScript
 */

(function() {
  'use strict';

  // DOM Elements
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  // Mobile Navigation Toggle
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute(
      'aria-expanded',
      navToggle.classList.contains('active')
    );
  }

  // Close mobile menu when clicking a link
  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Smooth scroll for anchor links (fallback for older browsers)
  function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const headerHeight = header.offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Handle navigation link clicks
  function handleNavClick(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      closeMobileMenu();
    }
  }

  // Initialize
  function init() {
    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Scroll effects
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
