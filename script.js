document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

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

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  const sections = document.querySelectorAll('section');

  const activeLinkOnScroll = () => {
    let scrollPos = window.scrollY + 150;

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
  activeLinkOnScroll();

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {

      filterButtons.forEach(button => button.classList.remove('active'));
      e.target.classList.add('active');

      const filterValue = e.target.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.classList.remove('hide');

          card.classList.add('reveal');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal-item');
  const skillsCards = document.querySelectorAll('.skills-card');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');

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

  const contactForm = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('btn-submit');
  const successOverlay = document.getElementById('form-success-overlay');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all form fields.');
      return;
    }

    btnSubmit.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin icon-right"></i>';
    btnSubmit.disabled = true;

    setTimeout(() => {

      successOverlay.classList.add('active');

      contactForm.reset();

      btnSubmit.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane icon-right"></i>';
      btnSubmit.disabled = false;
    }, 1500);
  });

  btnCloseSuccess.addEventListener('click', () => {
    successOverlay.classList.remove('active');
  });

});
