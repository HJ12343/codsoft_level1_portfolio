document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // Header / Sticky Navbar & Scroll Effects
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    // Toggle sticky navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back-To-Top button visibility
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll back to top when button clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================================================
  // Mobile Hamburger Toggle Menu
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  const closeMenu = () => {
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ==========================================================================
  // Active Navigation Link Highlighting on Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section');

  const activeLinkOnScroll = () => {
    let scrollPos = window.scrollY + 150; // offset for nav header height

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activeLinkOnScroll);
  activeLinkOnScroll(); // Trigger initially on page load

  // ==========================================================================
  // Projects Category Filter Implementation
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle active state on buttons
      filterButtons.forEach(button => button.classList.remove('active'));
      e.target.classList.add('active');

      const filterValue = e.target.getAttribute('data-filter');

      // Filter project cards using CSS display hide utility
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.classList.remove('hide');
          // Restart entrance animations if visible
          card.classList.add('reveal');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ==========================================================================
  // Entrance Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealItems = document.querySelectorAll('.reveal-item');
  const skillsCards = document.querySelectorAll('.skills-card');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        // Unobserve after showing item once to preserve scroll status
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });

  // Skills progressive bars visual loading animation trigger
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  skillsCards.forEach(card => {
    skillsObserver.observe(card);
  });

  // ==========================================================================
  // Contact Form Mock Submission & Validations
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('btn-submit');
  const successOverlay = document.getElementById('form-success-overlay');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger basic validation checks
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all form fields.');
      return;
    }

    // Set submit button loading state
    btnSubmit.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin icon-right"></i>';
    btnSubmit.disabled = true;

    // Simulate Server API Delay
    setTimeout(() => {
      // Toggle submission visual overlay feedback card
      successOverlay.classList.add('active');
      
      // Reset form variables
      contactForm.reset();
      
      // Revert submit button back to original state
      btnSubmit.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane icon-right"></i>';
      btnSubmit.disabled = false;
    }, 1500);
  });

  btnCloseSuccess.addEventListener('click', () => {
    successOverlay.classList.remove('active');
  });

});
