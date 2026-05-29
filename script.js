/* ==========================================================================
   ADARSH YADAV - PORTFOLIO INTERACTIVE ENGINE (SIMPLIFIED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation behavior
  initNavbar();
  
  // Initialize portfolio filtering and modal details
  initPortfolio();
  
  // Initialize theme toggler
  initThemeToggle();
  
  // Initialize contact form handler & copy email utility
  initContactHub();
});

/* ==========================================================================
   1. NAVIGATION SYSTEM
   ========================================================================== */
function initNavbar() {
  const burger = document.querySelector('.nav-burger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.glass-nav');

  // Toggle mobile navigation
  if (burger && navLinksContainer) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('nav-active') && !navLinksContainer.contains(e.target) && !burger.contains(e.target)) {
        navLinksContainer.classList.remove('nav-active');
        burger.classList.remove('toggle');
      }
    });
  }

  // Close mobile navigation drawer when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer && navLinksContainer.classList.contains('nav-active')) {
        navLinksContainer.classList.remove('nav-active');
        burger.classList.remove('toggle');
      }
    });
  });

  // Change navbar appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
    
    // Scrollspy: highlight active link
    highlightActiveLink();
  });

  function highlightActiveLink() {
    let fromTop = window.scrollY + 120;
    let currentSection = '';

    const sections = document.querySelectorAll('section, header');
    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if (id && sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop) {
        currentSection = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentSection || (currentSection === '' && href === '')) {
        link.classList.add('active');
      }
    });
  }
  
  // Run on initial load
  highlightActiveLink();
}


/* ==========================================================================
   3. PORTFOLIO & MODAL DETAILED SYSTEM
   ========================================================================== */
// Detailed Project Data Store for Adarsh Yadav (Three primary projects only)
const projectData = {
  'udhyog-invoice': {
    title: 'Udhyog Invoice (Smart Billing & Inventory)',
    category: 'Full-Stack',
    desc: 'Udhyog Invoice is a comprehensive business utility built to streamline retail operations. It combines a robust Spring Boot REST API backend with a clean React.js web dashboard. The system enables store owners to issue electronic bills, calculate complex tax items automatically, monitor stock levels, and sync inventory data seamlessly.',
    highlights: [
      'Automated GST/Tax calculation and dynamic PDF invoice generation.',
      'Real-time inventory levels tracking with visual low-stock warning indicators.',
      'Secured backend endpoints utilizing JSON Web Tokens (JWT) for staff/admin tiers.',
      'Relational database integration with MySQL for reliable data storage and consistency.'
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'JWT', 'REST APIs', 'HTML5/CSS3'],
    github: 'https://github.com/adarsh-yadav05/Movie-Recommender-System', // Base github code link
    demo: null
  },
  'movie-system': {
    title: 'Movie Recommendation System',
    category: 'Frontend & APIs',
    desc: 'An entertainment web platform integrated with external TMDB APIs to retrieve real-time movie indices. The app features customizable keyword filtering, categories sorting, YouTube video embedding for theatrical trailers, and dynamic watchlist portfolios.',
    highlights: [
      'Async API fetch engines using TMDB endpoints for trending items.',
      'Personalized Watchlists and Favorites tabs preserved locally via browser Local Storage.',
      'Custom HTML5 video wrapper for rendering trailers directly in popup grids.',
      'Fluid layout scaling that matches screen ratios seamlessly.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'TMDB API', 'Local Storage', 'Responsive Design'],
    github: 'https://github.com/adarsh-yadav05/Movie-Recommender-System',
    demo: null
  },
  'myntra-clone': {
    title: 'Myntra Clone E-Commerce Portal',
    category: 'Frontend',
    desc: 'A frontend design reproduction of the popular fashion shopping website. The project showcases intricate layout details such as multi-dimensional grid filters, floating checkout panels, item wishlist triggers, and responsive shopping cart calculators.',
    highlights: [
      'Modern, highly polished layout constructed utilizing CSS Flexbox and Grid matrices.',
      'Simulated purchase validation calculating price drops, shipping margins, and final pricing.',
      'Interactive cart drawer backed by Local Storage variables to hold user sessions.',
      'Fully responsive UI matching strict desktop and mobile wireframes.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox/Grid', 'Local Storage'],
    github: 'https://github.com/adarsh-yadav05/Myntra-Clone-Fashion',
    demo: null
  }
};

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close-btn');

  // 1. FILTERING SYSTEM
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Remove active class from other buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 2. MODAL SYSTEM
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking inside project links, don't open modal
      if (e.target.closest('.project-footer')) {
        return;
      }
      
      const projectId = card.getAttribute('data-id');
      const data = projectData[projectId];

      if (data) {
        populateModal(data);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  function populateModal(data) {
    const title = modal.querySelector('.modal-title');
    const category = modal.querySelector('.modal-category');
    const desc = modal.querySelector('.modal-desc');
    const highlightsList = modal.querySelector('.modal-highlights');
    const tagsContainer = modal.querySelector('.modal-tags');
    const githubLink = modal.querySelector('.modal-github');
    const demoLink = modal.querySelector('.modal-demo');

    // Title & Category
    title.textContent = data.title;
    category.textContent = data.category;
    desc.textContent = data.desc;

    // Highlights
    highlightsList.innerHTML = '';
    data.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      highlightsList.appendChild(li);
    });

    // Tech Tags
    tagsContainer.innerHTML = '';
    data.tech.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'proj-tag';
      span.textContent = tech;
      tagsContainer.appendChild(span);
    });

    // Links
    githubLink.href = data.github;
    if (data.demo) {
      demoLink.style.display = 'inline-flex';
      demoLink.href = data.demo;
    } else {
      demoLink.style.display = 'none';
    }
  }

  // Close modal logic
  if (modalClose && modal) {
    const closeModalFunc = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock background scroll
    };

    modalClose.addEventListener('click', closeModalFunc);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
      }
    });
  }
}

/* ==========================================================================
   5. LIGHT / DARK CYBERPUNK THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle-btn');
  if (!toggleBtn) return;

  const toggleIcon = toggleBtn.querySelector('i');
  
  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateToggleIcon(newTheme);
  });

  function updateToggleIcon(theme) {
    if (theme === 'dark') {
      toggleIcon.className = 'fa-solid fa-sun';
      toggleBtn.setAttribute('title', 'Switch to Light Cyberpunk Mode');
    } else {
      toggleIcon.className = 'fa-solid fa-moon';
      toggleBtn.setAttribute('title', 'Switch to Dark Cyberpunk Mode');
    }
  }
}

/* ==========================================================================
   6. CONTACT HUB (FORM VALIDATION & COPY EMAIL UTILITY)
   ========================================================================== */
function initContactHub() {
  // 1. COPY TO CLIPBOARD
  const copyBtn = document.querySelector('.copy-email-btn');
  const emailText = document.getElementById('email-address');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        // Show tooltip success
        const tooltip = copyBtn.querySelector('.tooltip');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          tooltip.classList.add('show');
          
          // Hide tooltip after 2 seconds
          setTimeout(() => {
            tooltip.classList.remove('show');
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }


}
