/**
 * FEEDPULSE - Modern Feedback Management System
 * Core Client Application Logic & State Engine
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. STORAGE KEYS & CONSTANTS
  // ==========================================================================
  const STORAGE_FEEDBACKS_KEY = 'fms_feedbacks_data';
  const STORAGE_USERS_KEY = 'fms_users_data';
  const STORAGE_SESSION_KEY = 'fms_current_user';
  const STORAGE_REMEMBER_KEY = 'fms_remembered_cred';

  const CATEGORIES = [
    'Product',
    'Service',
    'Website',
    'Customer Support',
    'Delivery',
    'Application',
    'Overall Experience',
    'Other'
  ];

  const CATEGORY_META = {
    'Product': {
      icon: 'fa-solid fa-box-open',
      bgClass: 'bg-blue-subtle',
      textClass: 'text-primary',
      desc: 'Quality, ergonomics, features, performance, and durability of tangible goods and software tools.'
    },
    'Service': {
      icon: 'fa-solid fa-bell-concierge',
      bgClass: 'bg-purple-subtle',
      textClass: 'text-purple',
      desc: 'Professionalism, speed of service delivery, adherence to agreements, and overall satisfaction.'
    },
    'Website': {
      icon: 'fa-solid fa-globe',
      bgClass: 'bg-green-subtle',
      textClass: 'text-success',
      desc: 'Website usability, navigation, visual layout, page load speeds, and mobile responsiveness.'
    },
    'Customer Support': {
      icon: 'fa-solid fa-headset',
      bgClass: 'bg-amber-subtle',
      textClass: 'text-warning',
      desc: 'Help desk helpfulness, ticket resolution time, friendliness, and empathy of support reps.'
    },
    'Delivery': {
      icon: 'fa-solid fa-truck-fast',
      bgClass: 'bg-blue-subtle',
      textClass: 'text-primary',
      desc: 'Shipping punctuality, parcel packaging safety, courier courtesy, and tracking precision.'
    },
    'Application': {
      icon: 'fa-solid fa-mobile-screen-button',
      bgClass: 'bg-purple-subtle',
      textClass: 'text-purple',
      desc: 'Mobile application stability, crash-free sessions, feature richness, and offline access.'
    },
    'Overall Experience': {
      icon: 'fa-solid fa-heart',
      bgClass: 'bg-red-subtle',
      textClass: 'text-danger',
      desc: 'Holistic brand impression, Net Promoter Score (NPS), and overall customer journey.'
    },
    'Other': {
      icon: 'fa-solid fa-ellipsis',
      bgClass: 'bg-green-subtle',
      textClass: 'text-success',
      desc: 'General thoughts, miscellaneous inquiries, recommendations, and unconventional feedback.'
    }
  };

  // ==========================================================================
  // 2. INITIAL SEED DATA
  // ==========================================================================
  const DEFAULT_USERS = [
    {
      id: 'user-admin',
      name: 'System Administrator',
      email: 'admin@fms.com',
      phone: '9876543210',
      password: 'admin123',
      role: 'Admin'
    },
    {
      id: 'user-john',
      name: 'Johnathan Doe',
      email: 'john.doe@gmail.com',
      phone: '9123456789',
      password: 'user123',
      role: 'User'
    }
  ];

  const SEED_FEEDBACKS = [
    {
      id: 'fb-101',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@gmail.com',
      category: 'Product',
      title: 'Incredible build quality and sleek design',
      description: 'The newly launched hardware module exceeded our expectations. Build finish is premium, battery life lasts over 18 hours, and setup was completely effortless.',
      rating: 5,
      createdAt: '2026-11-08T10:30:00.000Z'
    },
    {
      id: 'fb-102',
      name: 'David Miller',
      email: 'david.m@outlook.com',
      category: 'Customer Support',
      title: 'Support representative resolved ticket in 5 minutes',
      description: 'Called regarding billing discrepancy. Representative Alex was courteous, verified my credentials quickly, and processed a refund within 5 minutes. Outstanding service!',
      rating: 5,
      createdAt: '2026-11-05T14:15:00.000Z'
    },
    {
      id: 'fb-103',
      name: 'Sophia Patel',
      email: 'sophia.patel@techcorp.io',
      category: 'Website',
      title: 'Checkout page is occasionally slow on safari',
      description: 'The overall portal is very slick, but the payment gateway iframe took over 12 seconds to load on mobile Safari. Other than that, navigation is intuitive.',
      rating: 3,
      createdAt: '2026-10-28T09:40:00.000Z'
    },
    {
      id: 'fb-104',
      name: 'Marcus Brody',
      email: 'm.brody@gmail.com',
      category: 'Delivery',
      title: 'Package arrived early with eco-friendly packaging',
      description: 'Estimated delivery was Friday, but package arrived Wednesday afternoon. Outer box was recyclable cardboard with biodegradable cushion padding. Highly impressed.',
      rating: 5,
      createdAt: '2026-10-18T16:20:00.000Z'
    },
    {
      id: 'fb-105',
      name: 'Rachel Green',
      email: 'rachel.g@fashionlane.com',
      category: 'Application',
      title: 'Biometric fingerprint login fails after update',
      description: 'Since version 3.2.0 update, fingerprint authentication fails with error 401 on Android 14. I have to enter my password manually each time.',
      rating: 2,
      createdAt: '2026-10-10T11:00:00.000Z'
    },
    {
      id: 'fb-106',
      name: 'Liam Chen',
      email: 'chen.liam@innovate.co',
      category: 'Overall Experience',
      title: 'Unbeatable customer-centric ecosystem',
      description: 'From onboarding to daily workflows, the software ecosystem has cut down our team’s operational overhead by 30%. Would enthusiastically recommend to peers.',
      rating: 5,
      createdAt: '2026-09-24T13:45:00.000Z'
    },
    {
      id: 'fb-107',
      name: 'Olivia Martinez',
      email: 'olivia.m@creativehub.org',
      category: 'Service',
      title: 'Consultation session was insightful and thorough',
      description: 'Our designated account strategist spent 90 minutes auditing our pipeline and suggested 4 key optimizations that made an immediate difference.',
      rating: 4,
      createdAt: '2026-09-12T15:30:00.000Z'
    },
    {
      id: 'fb-108',
      name: 'Kevin Reynolds',
      email: 'kevin.rey@logistics.net',
      category: 'Delivery',
      title: 'Courier delivered parcel to wrong apartment unit',
      description: 'Package was left at Apartment 3B instead of 3F. Luckily neighbor was honest and brought it over, but delivery driver needs to verify door numbers carefully.',
      rating: 1,
      createdAt: '2026-08-30T17:10:00.000Z'
    },
    {
      id: 'fb-109',
      name: 'Aisha Al-Mansoor',
      email: 'aisha.m@gulftech.ae',
      category: 'Product',
      title: 'Solid feature set, would love dark mode support',
      description: 'Great feature set and robust analytics. The interface is clean, but a native dark mode toggle for nighttime auditing would make it 5 stars.',
      rating: 4,
      createdAt: '2026-08-14T08:25:00.000Z'
    },
    {
      id: 'fb-110',
      name: 'Ethan Hunt',
      email: 'ethan.h@apexsolutions.com',
      category: 'Website',
      title: 'Search filters are lightning fast and responsive',
      description: 'Filtering through thousands of records feels instant. Great keyboard navigation shortcuts and clean responsive design on iPad Pro.',
      rating: 5,
      createdAt: '2026-07-29T12:00:00.000Z'
    },
    {
      id: 'fb-111',
      name: 'Hannah Abbott',
      email: 'hannah.abbott@bloom.co',
      category: 'Customer Support',
      title: 'Long queue time on weekend live chat',
      description: 'Live chat support took 35 minutes to connect on a Saturday morning. Once connected the agent was helpful, but wait time was frustrating.',
      rating: 2,
      createdAt: '2026-07-15T10:15:00.000Z'
    },
    {
      id: 'fb-112',
      name: 'Carlos Santana',
      email: 'carlos.s@harmony.org',
      category: 'Other',
      title: 'Suggestion for automated weekly email digest',
      description: 'It would be convenient if department managers could opt-in to a weekly PDF summary of received reviews sent every Monday morning.',
      rating: 4,
      createdAt: '2026-06-20T14:50:00.000Z'
    }
  ];

  // ==========================================================================
  // 3. APPLICATION STATE
  // ==========================================================================
  let feedbacks = [];
  let users = [];
  let currentUser = null;

  // Chart instances
  let monthlyChartInstance = null;
  let categoryChartInstance = null;
  let ratingChartInstance = null;
  let sentimentChartInstance = null;

  // Filter & Pagination state for Feedback Management
  const tableState = {
    search: '',
    category: 'ALL',
    rating: 'ALL',
    sort: 'date-desc',
    currentPage: 1,
    pageSize: 6
  };

  // ==========================================================================
  // 4. INITIALIZATION ROUTINE
  // ==========================================================================
  function initApp() {
    loadDatabase();
    checkExistingSession();
    setupRouting();
    setupEventListeners();
    setupStarRatingInteractions();
    renderCategoriesExplorer();
    refreshAllViews();
  }

  function loadDatabase() {
    // Feedbacks
    const storedFeedbacks = localStorage.getItem(STORAGE_FEEDBACKS_KEY);
    if (!storedFeedbacks) {
      feedbacks = [...SEED_FEEDBACKS];
      saveFeedbacks();
    } else {
      try {
        feedbacks = JSON.parse(storedFeedbacks);
      } catch (err) {
        console.error('Failed to parse stored feedbacks, resetting to seed', err);
        feedbacks = [...SEED_FEEDBACKS];
        saveFeedbacks();
      }
    }

    // Users
    const storedUsers = localStorage.getItem(STORAGE_USERS_KEY);
    if (!storedUsers) {
      users = [...DEFAULT_USERS];
      saveUsers();
    } else {
      try {
        users = JSON.parse(storedUsers);
      } catch (err) {
        console.error('Failed to parse users, resetting to default', err);
        users = [...DEFAULT_USERS];
        saveUsers();
      }
    }
  }

  function saveFeedbacks() {
    localStorage.setItem(STORAGE_FEEDBACKS_KEY, JSON.stringify(feedbacks));
  }

  function saveUsers() {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }

  function checkExistingSession() {
    const sessionData = localStorage.getItem(STORAGE_SESSION_KEY);
    if (sessionData) {
      try {
        currentUser = JSON.parse(sessionData);
      } catch (e) {
        currentUser = null;
      }
    }

    // Pre-fill Remembered Email in login
    const remembered = localStorage.getItem(STORAGE_REMEMBER_KEY);
    if (remembered) {
      const emailInput = document.getElementById('login-email');
      const rememberCheckbox = document.getElementById('login-remember');
      if (emailInput) emailInput.value = remembered;
      if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    updateAuthUI();
  }

  // ==========================================================================
  // 5. CLIENT-SIDE ROUTER
  // ==========================================================================
  function setupRouting() {
    window.addEventListener('hashchange', handleRoute);
    if (!window.location.hash) {
      window.location.hash = '#home';
    } else {
      handleRoute();
    }
  }

  function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateToView(hash);
  }

  function navigateToView(viewId) {
    const validViews = ['home', 'dashboard', 'submit', 'feedbacks', 'categories', 'about', 'contact', 'login', 'signup'];
    const target = validViews.includes(viewId) ? viewId : 'home';

    // Toggle view visibility
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${target}`);
    if (activeView) {
      activeView.classList.add('active');
    }

    // Update active nav-link
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkView = link.getAttribute('data-view');
      if (linkView === target) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update top header title
    updateHeaderTitle(target);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Trigger specific view renders
    if (target === 'dashboard') {
      renderDashboard();
    } else if (target === 'feedbacks') {
      renderFeedbackTable();
    } else if (target === 'categories') {
      renderCategoriesExplorer();
    } else if (target === 'home') {
      updateHomeSummary();
    } else if (target === 'submit') {
      prefillSubmitForm();
    }
  }

  function updateHeaderTitle(view) {
    const titleEl = document.getElementById('page-title');
    const subtitleEl = document.getElementById('page-subtitle');
    if (!titleEl || !subtitleEl) return;

    const titles = {
      'home': { title: 'FeedPulse Portal', sub: 'Smart Feedback Collection & Sentiment Analytics' },
      'dashboard': { title: 'Analytics Dashboard', sub: 'Real-time KPIs, sentiment distribution & trends' },
      'submit': { title: 'Submit Feedback', sub: 'Share your ratings, experiences, and suggestions' },
      'feedbacks': { title: 'Feedback Management', sub: 'Search, filter, edit, or export customer feedback' },
      'categories': { title: 'Feedback Categories', sub: 'Performance breakdown across 8 specialized service sectors' },
      'about': { title: 'About FeedPulse', sub: 'System architecture, purpose, and project specifications' },
      'contact': { title: 'Contact Support', sub: 'Get in touch with our customer success & technical desk' },
      'login': { title: 'User Login', sub: 'Access your administrator or member portal' },
      'signup': { title: 'Create Account', sub: 'Join FeedPulse to track and analyze customer feedback' }
    };

    const info = titles[view] || titles['home'];
    titleEl.textContent = info.title;
    subtitleEl.textContent = info.sub;
  }

  // ==========================================================================
  // 6. AUTHENTICATION ENGINE (Login, Signup, Logout, Demo Logins)
  // ==========================================================================
  function updateAuthUI() {
    const loginNavItem = document.getElementById('nav-login-item');
    const signupNavItem = document.getElementById('nav-signup-item');
    const logoutNavItem = document.getElementById('nav-logout-item');

    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarUserRole = document.getElementById('sidebar-user-role');
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');

    const headerAvatar = document.getElementById('header-avatar');
    const headerUserName = document.getElementById('header-user-name');
    const headerUserStatus = document.getElementById('header-user-status');

    if (currentUser) {
      if (loginNavItem) loginNavItem.style.display = 'none';
      if (signupNavItem) signupNavItem.style.display = 'none';
      if (logoutNavItem) logoutNavItem.style.display = 'block';

      const initial = currentUser.name.charAt(0).toUpperCase();
      if (sidebarUserName) sidebarUserName.textContent = currentUser.name;
      if (sidebarUserRole) {
        sidebarUserRole.textContent = currentUser.role || 'Member';
        sidebarUserRole.className = currentUser.role === 'Admin' ? 'user-role-badge badge-purple' : 'user-role-badge';
      }
      if (sidebarAvatar) sidebarAvatar.textContent = initial;

      if (headerAvatar) headerAvatar.textContent = initial;
      if (headerUserName) headerUserName.textContent = currentUser.name;
      if (headerUserStatus) headerUserStatus.textContent = currentUser.role || 'Active';
    } else {
      if (loginNavItem) loginNavItem.style.display = 'block';
      if (signupNavItem) signupNavItem.style.display = 'block';
      if (logoutNavItem) logoutNavItem.style.display = 'none';

      if (sidebarUserName) sidebarUserName.textContent = 'Guest Visitor';
      if (sidebarUserRole) {
        sidebarUserRole.textContent = 'Not Logged In';
        sidebarUserRole.className = 'user-role-badge';
      }
      if (sidebarAvatar) sidebarAvatar.innerHTML = '<i class="fa-solid fa-user"></i>';

      if (headerAvatar) headerAvatar.innerHTML = '<i class="fa-solid fa-user"></i>';
      if (headerUserName) headerUserName.textContent = 'Guest';
      if (headerUserStatus) headerUserStatus.textContent = 'Sign in';
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    clearErrors('login');

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('login-remember').checked;

    let isValid = true;

    if (!email) {
      showFieldError('login-email-error', 'Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError('login-email-error', 'Please enter a valid email format');
      isValid = false;
    }

    if (!password) {
      showFieldError('login-password-error', 'Please enter your password');
      isValid = false;
    }

    if (!isValid) return;

    // Search user
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser || foundUser.password !== password) {
      showFieldError('login-password-error', 'Invalid email or password combination');
      showToast('Authentication failed. Check your credentials or use Quick Demo Login.', 'error');
      return;
    }

    // Success login
    currentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone || '',
      role: foundUser.role || 'User'
    };

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));

    if (rememberMe) {
      localStorage.setItem(STORAGE_REMEMBER_KEY, email);
    } else {
      localStorage.removeItem(STORAGE_REMEMBER_KEY);
    }

    updateAuthUI();
    showToast(`Welcome back, ${currentUser.name}! Logged in as ${currentUser.role}.`, 'success');
    window.location.hash = '#dashboard';
  }

  function handleSignup(e) {
    e.preventDefault();
    clearErrors('signup');

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const terms = document.getElementById('signup-terms').checked;

    let isValid = true;

    if (!name || name.length < 2) {
      showFieldError('signup-name-error', 'Full name must be at least 2 characters');
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      showFieldError('signup-email-error', 'Please provide a valid email address');
      isValid = false;
    } else {
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        showFieldError('signup-email-error', 'An account with this email already exists');
        isValid = false;
      }
    }

    if (!phone) {
      showFieldError('signup-phone-error', 'Phone number is required');
      isValid = false;
    } else if (!/^[0-9+()-\s]{7,15}$/.test(phone)) {
      showFieldError('signup-phone-error', 'Please enter a valid phone number (e.g. 9876543210)');
      isValid = false;
    }

    if (!password) {
      showFieldError('signup-password-error', 'Password is required');
      isValid = false;
    } else if (password.length < 6) {
      showFieldError('signup-password-error', 'Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      showFieldError('signup-confirm-error', 'Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      showFieldError('signup-confirm-error', 'Passwords do not match');
      isValid = false;
    }

    if (!terms) {
      showFieldError('signup-terms-error', 'You must agree to the terms to proceed');
      isValid = false;
    }

    if (!isValid) return;

    // Create user
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      password,
      role: 'User'
    };

    users.push(newUser);
    saveUsers();

    currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role
    };

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));
    updateAuthUI();

    document.getElementById('signup-form').reset();
    showToast(`Account created successfully! Welcome to FeedPulse, ${newUser.name}.`, 'success');
    window.location.hash = '#dashboard';
  }

  function handleLogout() {
    currentUser = null;
    localStorage.removeItem(STORAGE_SESSION_KEY);
    updateAuthUI();
    showToast('You have been signed out successfully.', 'info');
    window.location.hash = '#home';
  }

  function quickLogin(type) {
    if (type === 'admin') {
      const admin = users.find(u => u.role === 'Admin') || DEFAULT_USERS[0];
      currentUser = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone || '',
        role: admin.role
      };
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));
      updateAuthUI();
      showToast('Logged in as Administrator (Demo Account)', 'success');
      window.location.hash = '#dashboard';
    } else {
      const user = users.find(u => u.role === 'User') || DEFAULT_USERS[1];
      currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role
      };
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));
      updateAuthUI();
      showToast(`Logged in as ${user.name} (Demo User)`, 'success');
      window.location.hash = '#dashboard';
    }
  }

  // ==========================================================================
  // 7. INTERACTIVE STAR RATING COMPONENT
  // ==========================================================================
  function setupStarRatingInteractions() {
    const starContainer = document.getElementById('interactive-star-group');
    const ratingValueInput = document.getElementById('feedback-rating-value');
    const ratingLabel = document.getElementById('star-rating-label');

    if (!starContainer || !ratingValueInput || !ratingLabel) return;

    const stars = starContainer.querySelectorAll('.star-item');
    const labels = {
      1: '1 Star - Poor',
      2: '2 Stars - Fair',
      3: '3 Stars - Good',
      4: '4 Stars - Very Good',
      5: '5 Stars - Excellent'
    };

    stars.forEach(star => {
      // Hover event
      star.addEventListener('mouseenter', function () {
        const hoverVal = parseInt(this.getAttribute('data-value'), 10);
        stars.forEach(s => {
          const val = parseInt(s.getAttribute('data-value'), 10);
          if (val <= hoverVal) {
            s.classList.add('hovered');
          } else {
            s.classList.remove('hovered');
          }
        });
        ratingLabel.innerHTML = `<i class="fa-solid fa-star me-1 text-warning"></i> ${labels[hoverVal]}`;
      });

      // Mouseout event
      star.addEventListener('mouseleave', function () {
        stars.forEach(s => s.classList.remove('hovered'));
        const currentVal = parseInt(ratingValueInput.value, 10);
        if (currentVal > 0) {
          ratingLabel.innerHTML = `<i class="fa-solid fa-star me-1 text-warning"></i> Selected: <strong>${labels[currentVal]}</strong>`;
        } else {
          ratingLabel.innerHTML = '<i class="fa-regular fa-hand-pointer me-1"></i> Click a star to rate';
        }
      });

      // Click event
      star.addEventListener('click', function () {
        const selectedVal = parseInt(this.getAttribute('data-value'), 10);
        ratingValueInput.value = selectedVal;

        stars.forEach(s => {
          const val = parseInt(s.getAttribute('data-value'), 10);
          if (val <= selectedVal) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });

        ratingLabel.innerHTML = `<i class="fa-solid fa-star me-1 text-warning"></i> Selected: <strong>${labels[selectedVal]}</strong>`;
        clearFieldError('feedback-rating-error');
      });
    });

    // Setup Edit Modal Stars
    const editStarContainer = document.getElementById('edit-interactive-stars');
    const editRatingInput = document.getElementById('edit-feedback-rating');
    if (editStarContainer && editRatingInput) {
      const editStars = editStarContainer.querySelectorAll('.star-item');
      editStars.forEach(star => {
        star.addEventListener('click', function () {
          const val = parseInt(this.getAttribute('data-value'), 10);
          editRatingInput.value = val;
          editStars.forEach(s => {
            const sVal = parseInt(s.getAttribute('data-value'), 10);
            if (sVal <= val) {
              s.classList.add('active');
            } else {
              s.classList.remove('active');
            }
          });
        });
      });
    }
  }

  function setStarVisuals(containerId, rating) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const stars = container.querySelectorAll('.star-item');
    stars.forEach(s => {
      const val = parseInt(s.getAttribute('data-value'), 10);
      if (val <= rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  function resetSubmissionForm() {
    const form = document.getElementById('feedback-form');
    if (form) form.reset();

    const ratingInput = document.getElementById('feedback-rating-value');
    if (ratingInput) ratingInput.value = '0';

    const stars = document.querySelectorAll('#interactive-star-group .star-item');
    stars.forEach(s => {
      s.classList.remove('active');
      s.classList.remove('hovered');
    });

    const ratingLabel = document.getElementById('star-rating-label');
    if (ratingLabel) {
      ratingLabel.innerHTML = '<i class="fa-regular fa-hand-pointer me-1"></i> Click a star to rate';
    }

    const charCounter = document.getElementById('char-counter');
    if (charCounter) charCounter.textContent = '0 / 500 characters';

    clearErrors('feedback');
    prefillSubmitForm();
  }

  function prefillSubmitForm() {
    if (currentUser) {
      const nameInput = document.getElementById('feedback-name');
      const emailInput = document.getElementById('feedback-email');
      if (nameInput && !nameInput.value) nameInput.value = currentUser.name;
      if (emailInput && !emailInput.value) emailInput.value = currentUser.email;
    }
  }

  // ==========================================================================
  // 8. FEEDBACK SUBMISSION LOGIC
  // ==========================================================================
  function handleFeedbackSubmit(e) {
    e.preventDefault();
    clearErrors('feedback');

    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const category = document.getElementById('feedback-category').value;
    const title = document.getElementById('feedback-title').value.trim();
    const rating = parseInt(document.getElementById('feedback-rating-value').value, 10);
    const desc = document.getElementById('feedback-desc').value.trim();

    let isValid = true;

    if (!name || name.length < 2) {
      showFieldError('feedback-name-error', 'Please enter your full name');
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      showFieldError('feedback-email-error', 'Please enter a valid email address');
      isValid = false;
    }

    if (!category) {
      showFieldError('feedback-category-error', 'Please select a feedback category');
      isValid = false;
    }

    if (!title || title.length < 4) {
      showFieldError('feedback-title-error', 'Title must be at least 4 characters long');
      isValid = false;
    }

    if (!rating || rating < 1 || rating > 5) {
      showFieldError('feedback-rating-error', 'Please click on the stars to rate your experience (1 to 5)');
      isValid = false;
    }

    if (!desc || desc.length < 10) {
      showFieldError('feedback-desc-error', 'Please provide at least 10 characters describing your feedback');
      isValid = false;
    }

    if (!isValid) return;

    // Build feedback object
    const newFeedback = {
      id: 'fb-' + Date.now(),
      name,
      email,
      category,
      title,
      description: desc,
      rating,
      createdAt: new Date().toISOString()
    };

    // Prepend to array
    feedbacks.unshift(newFeedback);
    saveFeedbacks();

    // Trigger celebration effects
    fireConfetti();
    showThankYouModal(newFeedback);

    // Refresh UI
    refreshAllViews();
    resetSubmissionForm();
  }

  function fireConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }

  function showThankYouModal(feedback) {
    const modal = document.getElementById('thank-you-modal');
    const previewBox = document.getElementById('thankyou-card-preview');

    if (previewBox) {
      previewBox.innerHTML = `
        <div class="d-flex-between mb-2">
          <span class="badge-purple">${escapeHTML(feedback.category)}</span>
          <div class="text-warning">${getStarIconsHTML(feedback.rating)}</div>
        </div>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--slate-900);">${escapeHTML(feedback.title)}</h4>
        <p style="font-size: 0.8rem; color: var(--slate-600); margin-top: 0.25rem;">${escapeHTML(feedback.description)}</p>
        <div class="mt-2 text-secondary" style="font-size: 0.72rem;">
          Submitted by <strong>${escapeHTML(feedback.name)}</strong> on ${formatDate(feedback.createdAt)}
        </div>
      `;
    }

    openModal('thank-you-modal');
  }

  // ==========================================================================
  // 9. DASHBOARD ANALYTICS & CHART.JS ENGINE
  // ==========================================================================
  function renderDashboard() {
    const total = feedbacks.length;
    const positiveCount = feedbacks.filter(f => f.rating >= 4).length;
    const negativeCount = feedbacks.filter(f => f.rating <= 2).length;
    const neutralCount = feedbacks.filter(f => f.rating === 3).length;

    const positivePct = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
    const negativePct = total > 0 ? Math.round((negativeCount / total) * 100) : 0;

    let avgRating = 0;
    if (total > 0) {
      const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
      avgRating = (sum / total).toFixed(1);
    }

    // Update KPI Card numbers
    const kpiTotal = document.getElementById('kpi-total-feedbacks');
    const kpiPositive = document.getElementById('kpi-positive-feedbacks');
    const kpiPositivePct = document.getElementById('kpi-positive-pct');
    const kpiPositiveBar = document.getElementById('kpi-positive-bar');

    const kpiNegative = document.getElementById('kpi-negative-feedbacks');
    const kpiNegativePct = document.getElementById('kpi-negative-pct');
    const kpiNegativeBar = document.getElementById('kpi-negative-bar');

    const kpiAvg = document.getElementById('kpi-average-rating');
    const kpiStars = document.getElementById('kpi-stars-render');
    const kpiRatingBar = document.getElementById('kpi-rating-bar');

    if (kpiTotal) kpiTotal.textContent = total;
    if (kpiPositive) kpiPositive.textContent = positiveCount;
    if (kpiPositivePct) kpiPositivePct.textContent = `${positivePct}% of total`;
    if (kpiPositiveBar) kpiPositiveBar.style.width = `${positivePct}%`;

    if (kpiNegative) kpiNegative.textContent = negativeCount;
    if (kpiNegativePct) kpiNegativePct.textContent = `${negativePct}% of total`;
    if (kpiNegativeBar) kpiNegativeBar.style.width = `${negativePct}%`;

    if (kpiAvg) kpiAvg.textContent = avgRating;
    if (kpiStars) kpiStars.innerHTML = getStarIconsHTML(Math.round(avgRating));
    if (kpiRatingBar) kpiRatingBar.style.width = `${(avgRating / 5) * 100}%`;

    // Render Charts
    renderMonthlyTrendChart();
    renderCategoryDistributionChart();
    renderRatingBreakdownChart();
    renderSentimentChart(positiveCount, neutralCount, negativeCount);

    // Render Category summary table
    renderCategorySummaryTable();

    // Render Recent Feedbacks feed
    renderRecentFeedbacksList();

    // Update sidebar badge
    const sidebarBadge = document.getElementById('sidebar-total-badge');
    if (sidebarBadge) sidebarBadge.textContent = total;
  }

  function renderMonthlyTrendChart() {
    const canvas = document.getElementById('monthlyTrendChart');
    if (!canvas) return;

    if (monthlyChartInstance) {
      monthlyChartInstance.destroy();
    }

    // Generate last 6 calendar months
    const months = [];
    const monthCounts = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('default', { month: 'short' });
      months.push(monthLabel);

      const count = feedbacks.filter(f => {
        const fDate = new Date(f.createdAt);
        return fDate.getMonth() === d.getMonth() && fDate.getFullYear() === d.getFullYear();
      }).length;
      monthCounts.push(count);
    }

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.45)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.02)');

    monthlyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Feedbacks Received',
          data: monthCounts,
          borderColor: '#2563eb',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.38,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, color: '#64748b' },
            grid: { color: '#f1f5f9' }
          },
          x: {
            ticks: { color: '#64748b' },
            grid: { display: false }
          }
        }
      }
    });
  }

  function renderCategoryDistributionChart() {
    const canvas = document.getElementById('categoryDistributionChart');
    if (!canvas) return;

    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }

    const counts = CATEGORIES.map(cat => feedbacks.filter(f => f.category === cat).length);
    const colors = [
      '#2563eb', '#8b5cf6', '#10b981', '#f59e0b',
      '#ec4899', '#6366f1', '#14b8a6', '#94a3b8'
    ];

    categoryChartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: CATEGORIES,
        datasets: [{
          data: counts,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: 'Plus Jakarta Sans', size: 11 },
              padding: 10
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10
          }
        },
        cutout: '68%'
      }
    });
  }

  function renderRatingBreakdownChart() {
    const canvas = document.getElementById('ratingBreakdownChart');
    if (!canvas) return;

    if (ratingChartInstance) {
      ratingChartInstance.destroy();
    }

    const ratingCounts = [5, 4, 3, 2, 1].map(r => feedbacks.filter(f => f.rating === r).length);

    ratingChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
        datasets: [{
          label: 'Count',
          data: ratingCounts,
          backgroundColor: [
            '#10b981', // 5 star - Green
            '#60a5fa', // 4 star - Blue
            '#fbbf24', // 3 star - Yellow
            '#f97316', // 2 star - Orange
            '#ef4444'  // 1 star - Red
          ],
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { stepSize: 1, color: '#64748b' },
            grid: { color: '#f1f5f9' }
          },
          y: {
            ticks: { color: '#334155', font: { weight: '600' } },
            grid: { display: false }
          }
        }
      }
    });
  }

  function renderSentimentChart(pos, neu, neg) {
    const canvas = document.getElementById('sentimentChart');
    if (!canvas) return;

    if (sentimentChartInstance) {
      sentimentChartInstance.destroy();
    }

    sentimentChartInstance = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Positive (4-5★)', 'Neutral (3★)', 'Negative (1-2★)'],
        datasets: [{
          data: [pos, neu, neg],
          backgroundColor: ['#10b981', '#fbbf24', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: 'Plus Jakarta Sans', size: 11 },
              padding: 10
            }
          }
        }
      }
    });
  }

  function renderCategorySummaryTable() {
    const tbody = document.getElementById('category-summary-tbody');
    if (!tbody) return;

    let rowsHTML = '';

    CATEGORIES.forEach(cat => {
      const catFeedbacks = feedbacks.filter(f => f.category === cat);
      const total = catFeedbacks.length;

      let avg = 0;
      let positiveShare = 0;
      if (total > 0) {
        const sum = catFeedbacks.reduce((a, b) => a + b.rating, 0);
        avg = (sum / total).toFixed(1);
        const posCount = catFeedbacks.filter(f => f.rating >= 4).length;
        positiveShare = Math.round((posCount / total) * 100);
      }

      let statusBadge = '<span class="badge-blue">No Data</span>';
      if (total > 0) {
        if (avg >= 4.2) {
          statusBadge = '<span class="badge-green"><i class="fa-solid fa-circle-check me-1"></i> Top Performer</span>';
        } else if (avg >= 3.0) {
          statusBadge = '<span class="badge-amber"><i class="fa-solid fa-circle-dot me-1"></i> Moderate</span>';
        } else {
          statusBadge = '<span class="badge-red"><i class="fa-solid fa-triangle-exclamation me-1"></i> Needs Action</span>';
        }
      }

      const meta = CATEGORY_META[cat] || CATEGORY_META['Other'];

      rowsHTML += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <span class="category-icon-sm ${meta.bgClass} ${meta.textClass}">
                <i class="${meta.icon}"></i>
              </span>
              <strong>${escapeHTML(cat)}</strong>
            </div>
          </td>
          <td><strong>${total}</strong> reviews</td>
          <td>
            <div class="d-flex align-items-center gap-1">
              <span class="text-warning"><i class="fa-solid fa-star"></i></span>
              <strong>${avg}</strong> <span class="text-secondary" style="font-size:0.75rem;">/ 5.0</span>
            </div>
          </td>
          <td>
            <div style="min-width: 100px;">
              <small class="d-block mb-1 font-semibold">${positiveShare}% Positive</small>
              <div class="stat-footer-bar" style="height: 4px;">
                <div class="stat-progress-bar bg-success" style="width: ${positiveShare}%;"></div>
              </div>
            </div>
          </td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-outline btn-sm filter-by-cat-btn" data-cat="${escapeHTML(cat)}">
              <i class="fa-solid fa-filter me-1"></i> Filter
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHTML;

    // Attach click events
    tbody.querySelectorAll('.filter-by-cat-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const cat = this.getAttribute('data-cat');
        filterToCategory(cat);
      });
    });
  }

  function renderRecentFeedbacksList() {
    const container = document.getElementById('dashboard-recent-feedbacks');
    if (!container) return;

    const recent = feedbacks.slice(0, 5);
    if (recent.length === 0) {
      container.innerHTML = `
        <div class="text-center py-4 text-secondary">
          <i class="fa-regular fa-comment-dots fa-2x mb-2"></i>
          <p>No feedback entries submitted yet.</p>
        </div>
      `;
      return;
    }

    let html = '';
    recent.forEach(fb => {
      const initial = fb.name.charAt(0).toUpperCase();
      const meta = CATEGORY_META[fb.category] || CATEGORY_META['Other'];

      html += `
        <div class="recent-feedback-item">
          <div class="rf-avatar">${initial}</div>
          <div class="rf-content">
            <div class="rf-top-row">
              <div>
                <span class="rf-author">${escapeHTML(fb.name)}</span>
                <span class="rf-category-badge ${meta.bgClass} ${meta.textClass}">
                  <i class="${meta.icon} me-1"></i>${escapeHTML(fb.category)}
                </span>
              </div>
              <span class="rf-date">${formatDate(fb.createdAt)}</span>
            </div>
            <div class="rf-stars mb-1">
              ${getStarIconsHTML(fb.rating)}
              <span class="text-secondary ms-1" style="font-size:0.75rem;">(${fb.rating}/5)</span>
            </div>
            <h4 class="rf-title">${escapeHTML(fb.title)}</h4>
            <p class="rf-snippet">${escapeHTML(fb.description)}</p>
          </div>
          <button class="action-icon-btn view-details-quick-btn" data-id="${fb.id}" title="View Details">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.view-details-quick-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openViewFeedbackModal(id);
      });
    });
  }

  // ==========================================================================
  // 10. HOME VIEW LIVE STATS UPDATE
  // ==========================================================================
  function updateHomeSummary() {
    const totalEl = document.getElementById('home-total-count');
    const posPctEl = document.getElementById('home-positive-pct');
    const avgRatingEl = document.getElementById('home-avg-rating');

    const total = feedbacks.length;
    const posCount = feedbacks.filter(f => f.rating >= 4).length;
    const posPct = total > 0 ? Math.round((posCount / total) * 100) : 0;

    let avg = 0;
    if (total > 0) {
      const sum = feedbacks.reduce((acc, f) => acc + f.rating, 0);
      avg = (sum / total).toFixed(1);
    }

    if (totalEl) totalEl.textContent = total;
    if (posPctEl) posPctEl.textContent = `${posPct}%`;
    if (avgRatingEl) avgRatingEl.innerHTML = `${avg} <i class="fa-solid fa-star fa-2xs"></i>`;
  }

  // ==========================================================================
  // 11. CATEGORIES EXPLORER VIEW
  // ==========================================================================
  function renderCategoriesExplorer() {
    const container = document.getElementById('categories-grid-container');
    if (!container) return;

    let cardsHTML = '';

    CATEGORIES.forEach(cat => {
      const meta = CATEGORY_META[cat] || CATEGORY_META['Other'];
      const catFeedbacks = feedbacks.filter(f => f.category === cat);
      const total = catFeedbacks.length;

      let avg = 0;
      let positivePct = 0;
      if (total > 0) {
        const sum = catFeedbacks.reduce((a, b) => a + b.rating, 0);
        avg = (sum / total).toFixed(1);
        const posCount = catFeedbacks.filter(f => f.rating >= 4).length;
        positivePct = Math.round((posCount / total) * 100);
      }

      cardsHTML += `
        <div class="category-card">
          <div>
            <div class="category-icon-box ${meta.bgClass} ${meta.textClass}">
              <i class="${meta.icon}"></i>
            </div>
            <h3>${escapeHTML(cat)}</h3>
            <p>${meta.desc}</p>
          </div>

          <div>
            <div class="category-metrics-row">
              <div class="cat-metric-item">
                <span>Reviews</span>
                <strong>${total}</strong>
              </div>
              <div class="cat-metric-item">
                <span>Rating</span>
                <strong class="text-warning">${avg} ★</strong>
              </div>
              <div class="cat-metric-item">
                <span>Positive</span>
                <strong class="text-success">${positivePct}%</strong>
              </div>
            </div>

            <button class="btn btn-outline-purple btn-sm btn-block cat-explore-btn" data-cat="${escapeHTML(cat)}">
              <i class="fa-solid fa-list-check me-1"></i> View ${escapeHTML(cat)} Reviews
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = cardsHTML;

    container.querySelectorAll('.cat-explore-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const cat = this.getAttribute('data-cat');
        filterToCategory(cat);
      });
    });
  }

  function filterToCategory(cat) {
    tableState.category = cat;
    const catSelect = document.getElementById('filter-category');
    if (catSelect) catSelect.value = cat;
    tableState.currentPage = 1;
    window.location.hash = '#feedbacks';
    renderFeedbackTable();
    showToast(`Filtered records to category: ${cat}`, 'info');
  }

  // ==========================================================================
  // 12. FEEDBACK MANAGEMENT (Data Table, Search, Filter, Sort, Pagination)
  // ==========================================================================
  function renderFeedbackTable() {
    const tbody = document.getElementById('feedback-table-body');
    const emptyState = document.getElementById('no-feedbacks-empty-state');
    const shownCountEl = document.getElementById('filter-shown-count');
    const totalCountEl = document.getElementById('filter-total-count');
    const activeTagsEl = document.getElementById('active-tag-pills');

    if (!tbody) return;

    // Apply Filter & Search
    let filtered = [...feedbacks];

    // Search query
    if (tableState.search) {
      const q = tableState.search.toLowerCase();
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (tableState.category !== 'ALL') {
      filtered = filtered.filter(f => f.category === tableState.category);
    }

    // Rating Filter
    if (tableState.rating !== 'ALL') {
      if (tableState.rating === 'POSITIVE') {
        filtered = filtered.filter(f => f.rating >= 4);
      } else if (tableState.rating === 'NEGATIVE') {
        filtered = filtered.filter(f => f.rating <= 2);
      } else {
        const rVal = parseInt(tableState.rating, 10);
        filtered = filtered.filter(f => f.rating === rVal);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      if (tableState.sort === 'date-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (tableState.sort === 'date-asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (tableState.sort === 'rating-desc') {
        return b.rating - a.rating;
      } else if (tableState.sort === 'rating-asc') {
        return a.rating - b.rating;
      } else if (tableState.sort === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    // Counts & Active Filter Tag Pills
    if (shownCountEl) shownCountEl.textContent = filtered.length;
    if (totalCountEl) totalCountEl.textContent = feedbacks.length;

    renderActiveFilterPills(activeTagsEl);

    // Empty state check
    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      updatePaginationControls(0);
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / tableState.pageSize) || 1;
    if (tableState.currentPage > totalPages) {
      tableState.currentPage = totalPages;
    }

    const startIndex = (tableState.currentPage - 1) * tableState.pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + tableState.pageSize);

    let rowsHTML = '';
    paginatedItems.forEach(fb => {
      const initial = fb.name.charAt(0).toUpperCase();
      const meta = CATEGORY_META[fb.category] || CATEGORY_META['Other'];

      rowsHTML += `
        <tr>
          <td>
            <div class="user-td-wrap">
              <div class="td-avatar">${initial}</div>
              <div class="td-user-info">
                <strong>${escapeHTML(fb.name)}</strong>
                <small>${escapeHTML(fb.email)}</small>
              </div>
            </div>
          </td>
          <td>
            <span class="rf-category-badge ${meta.bgClass} ${meta.textClass}">
              <i class="${meta.icon} me-1"></i>${escapeHTML(fb.category)}
            </span>
          </td>
          <td>
            <span class="table-title">${escapeHTML(fb.title)}</span>
            <span class="table-desc-snippet">${escapeHTML(fb.description)}</span>
          </td>
          <td>
            <div class="text-warning">
              ${getStarIconsHTML(fb.rating)}
            </div>
            <small class="text-secondary font-semibold">${fb.rating} of 5 Stars</small>
          </td>
          <td>
            <span style="font-size: 0.82rem; color: var(--slate-600);">${formatDate(fb.createdAt)}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn tbl-view-btn" data-id="${fb.id}" title="View Details">
                <i class="fa-regular fa-eye"></i>
              </button>
              <button class="action-icon-btn tbl-edit-btn" data-id="${fb.id}" title="Edit Feedback">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button class="action-icon-btn danger-btn tbl-delete-btn" data-id="${fb.id}" title="Delete Feedback">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHTML;

    // Attach row events
    tbody.querySelectorAll('.tbl-view-btn').forEach(b => {
      b.addEventListener('click', function () {
        openViewFeedbackModal(this.getAttribute('data-id'));
      });
    });

    tbody.querySelectorAll('.tbl-edit-btn').forEach(b => {
      b.addEventListener('click', function () {
        openEditFeedbackModal(this.getAttribute('data-id'));
      });
    });

    tbody.querySelectorAll('.tbl-delete-btn').forEach(b => {
      b.addEventListener('click', function () {
        openDeleteModal(this.getAttribute('data-id'));
      });
    });

    updatePaginationControls(totalPages);
  }

  function renderActiveFilterPills(container) {
    if (!container) return;
    let pills = [];

    if (tableState.search) {
      pills.push(`<span class="filter-tag-pill">Search: "${escapeHTML(tableState.search)}" <i class="fa-solid fa-xmark remove-tag-search"></i></span>`);
    }
    if (tableState.category !== 'ALL') {
      pills.push(`<span class="filter-tag-pill">Category: ${escapeHTML(tableState.category)} <i class="fa-solid fa-xmark remove-tag-cat"></i></span>`);
    }
    if (tableState.rating !== 'ALL') {
      pills.push(`<span class="filter-tag-pill">Rating: ${escapeHTML(tableState.rating)} <i class="fa-solid fa-xmark remove-tag-rating"></i></span>`);
    }

    container.innerHTML = pills.join('');

    // Attach removals
    const rmSearch = container.querySelector('.remove-tag-search');
    if (rmSearch) {
      rmSearch.addEventListener('click', () => {
        tableState.search = '';
        const searchInput = document.getElementById('feedback-search-input');
        if (searchInput) searchInput.value = '';
        renderFeedbackTable();
      });
    }

    const rmCat = container.querySelector('.remove-tag-cat');
    if (rmCat) {
      rmCat.addEventListener('click', () => {
        tableState.category = 'ALL';
        const select = document.getElementById('filter-category');
        if (select) select.value = 'ALL';
        renderFeedbackTable();
      });
    }

    const rmRating = container.querySelector('.remove-tag-rating');
    if (rmRating) {
      rmRating.addEventListener('click', () => {
        tableState.rating = 'ALL';
        const select = document.getElementById('filter-rating');
        if (select) select.value = 'ALL';
        renderFeedbackTable();
      });
    }
  }

  function updatePaginationControls(totalPages) {
    const curEl = document.getElementById('current-page-num');
    const totEl = document.getElementById('total-pages-num');
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const pageNumWrap = document.getElementById('pagination-page-numbers');

    if (curEl) curEl.textContent = totalPages > 0 ? tableState.currentPage : 0;
    if (totEl) totEl.textContent = totalPages;

    if (prevBtn) prevBtn.disabled = tableState.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = tableState.currentPage >= totalPages || totalPages === 0;

    if (pageNumWrap) {
      let btns = '';
      for (let i = 1; i <= totalPages; i++) {
        btns += `
          <button class="page-num-btn ${i === tableState.currentPage ? 'active' : ''}" data-page="${i}">
            ${i}
          </button>
        `;
      }
      pageNumWrap.innerHTML = btns;

      pageNumWrap.querySelectorAll('.page-num-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          tableState.currentPage = parseInt(this.getAttribute('data-page'), 10);
          renderFeedbackTable();
        });
      });
    }
  }

  // ==========================================================================
  // 13. EDIT, VIEW & DELETE MODAL OPERATIONS
  // ==========================================================================
  function openViewFeedbackModal(id) {
    const fb = feedbacks.find(f => f.id === id);
    if (!fb) return;

    const contentBox = document.getElementById('view-details-content');
    if (!contentBox) return;

    const meta = CATEGORY_META[fb.category] || CATEGORY_META['Other'];
    let sentimentBadge = '<span class="badge-green">Positive Sentiment</span>';
    if (fb.rating === 3) sentimentBadge = '<span class="badge-amber">Neutral Sentiment</span>';
    if (fb.rating <= 2) sentimentBadge = '<span class="badge-red">Negative Sentiment</span>';

    contentBox.innerHTML = `
      <div class="user-td-wrap mb-3">
        <div class="td-avatar" style="width:48px;height:48px;font-size:1.15rem;">${fb.name.charAt(0).toUpperCase()}</div>
        <div class="td-user-info">
          <strong style="font-size:1.05rem;">${escapeHTML(fb.name)}</strong>
          <small style="font-size:0.82rem;"><i class="fa-regular fa-envelope me-1"></i>${escapeHTML(fb.email)}</small>
        </div>
      </div>

      <div class="d-flex-between mb-3 p-3" style="background:var(--slate-50);border-radius:var(--radius-md);border:1px solid var(--slate-200);">
        <div>
          <span class="rf-category-badge ${meta.bgClass} ${meta.textClass}">
            <i class="${meta.icon} me-1"></i>${escapeHTML(fb.category)}
          </span>
          <span class="ms-2">${sentimentBadge}</span>
        </div>
        <div class="text-warning" style="font-size:1.1rem;">
          ${getStarIconsHTML(fb.rating)}
          <strong class="ms-1" style="font-size:0.9rem;">${fb.rating} / 5.0</strong>
        </div>
      </div>

      <div class="mb-3">
        <h4 style="font-size:1.1rem;font-weight:700;color:var(--slate-900);margin-bottom:0.4rem;">${escapeHTML(fb.title)}</h4>
        <p style="font-size:0.9rem;color:var(--slate-700);line-height:1.6;white-space:pre-wrap;">${escapeHTML(fb.description)}</p>
      </div>

      <div class="d-flex-between pt-3" style="border-top:1px solid var(--slate-100);font-size:0.75rem;color:var(--slate-400);">
        <span>Feedback ID: <code>${fb.id}</code></span>
        <span>Submitted: <strong>${new Date(fb.createdAt).toLocaleString()}</strong></span>
      </div>
    `;

    openModal('view-feedback-modal');
  }

  function openEditFeedbackModal(id) {
    const fb = feedbacks.find(f => f.id === id);
    if (!fb) return;

    document.getElementById('edit-feedback-id').value = fb.id;
    document.getElementById('edit-feedback-name').value = fb.name;
    document.getElementById('edit-feedback-email').value = fb.email;
    document.getElementById('edit-feedback-category').value = fb.category;
    document.getElementById('edit-feedback-title').value = fb.title;
    document.getElementById('edit-feedback-desc').value = fb.description;
    document.getElementById('edit-feedback-rating').value = fb.rating;

    setStarVisuals('edit-interactive-stars', fb.rating);

    openModal('edit-feedback-modal');
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-feedback-id').value;
    const name = document.getElementById('edit-feedback-name').value.trim();
    const email = document.getElementById('edit-feedback-email').value.trim();
    const category = document.getElementById('edit-feedback-category').value;
    const title = document.getElementById('edit-feedback-title').value.trim();
    const description = document.getElementById('edit-feedback-desc').value.trim();
    const rating = parseInt(document.getElementById('edit-feedback-rating').value, 10);

    const index = feedbacks.findIndex(f => f.id === id);
    if (index === -1) return;

    feedbacks[index] = {
      ...feedbacks[index],
      name,
      email,
      category,
      title,
      description,
      rating
    };

    saveFeedbacks();
    closeModal('edit-feedback-modal');
    refreshAllViews();
    showToast('Feedback updated successfully!', 'success');
  }

  function openDeleteModal(id) {
    const targetInput = document.getElementById('delete-target-id');
    if (targetInput) targetInput.value = id;
    openModal('delete-confirm-modal');
  }

  function handleConfirmDelete() {
    const targetInput = document.getElementById('delete-target-id');
    if (!targetInput) return;
    const id = targetInput.value;

    feedbacks = feedbacks.filter(f => f.id !== id);
    saveFeedbacks();

    closeModal('delete-confirm-modal');
    refreshAllViews();
    showToast('Feedback record deleted permanently.', 'warning');
  }

  // ==========================================================================
  // 14. EXPORT TO CSV FEATURE
  // ==========================================================================
  function exportFeedbacksToCSV() {
    if (feedbacks.length === 0) {
      showToast('No feedback records available to export.', 'warning');
      return;
    }

    const headers = ['Feedback ID', 'Customer Name', 'Email', 'Category', 'Rating', 'Title', 'Description', 'Submitted Date'];
    const rows = feedbacks.map(f => [
      f.id,
      `"${f.name.replace(/"/g, '""')}"`,
      `"${f.email.replace(/"/g, '""')}"`,
      `"${f.category.replace(/"/g, '""')}"`,
      f.rating,
      `"${f.title.replace(/"/g, '""')}"`,
      `"${f.description.replace(/"/g, '""')}"`,
      `"${new Date(f.createdAt).toISOString()}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', `feedpulse_feedbacks_export_${Date.now()}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast(`Exported ${feedbacks.length} feedback records to CSV file.`, 'success');
  }

  // ==========================================================================
  // 15. CONTACT US FORM HANDLER
  // ==========================================================================
  function handleContactSubmit(e) {
    e.preventDefault();
    clearErrors('contact');

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let isValid = true;

    if (!name) {
      showFieldError('contact-name-error', 'Please enter your name');
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      showFieldError('contact-email-error', 'Please provide a valid email');
      isValid = false;
    }

    if (!subject) {
      showFieldError('contact-subject-error', 'Please provide a subject');
      isValid = false;
    }

    if (!message || message.length < 5) {
      showFieldError('contact-message-error', 'Please write a message with at least 5 characters');
      isValid = false;
    }

    if (!isValid) return;

    document.getElementById('contact-form').reset();
    showToast('Your message has been sent to our support desk. We will respond within 24 hours!', 'success');
  }

  // ==========================================================================
  // 16. FORGOT PASSWORD SIMULATOR
  // ==========================================================================
  function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();

    if (!email || !isValidEmail(email)) {
      showFieldError('forgot-email-error', 'Please provide a valid email address');
      return;
    }

    closeModal('forgot-password-modal');
    document.getElementById('forgot-password-form').reset();
    showToast(`Password reset link dispatched to ${email}. Check your inbox.`, 'info');
  }

  // ==========================================================================
  // 17. GLOBAL EVENT LISTENERS & SETUP
  // ==========================================================================
  function setupEventListeners() {
    // Mobile Drawer Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const overlay = document.getElementById('sidebar-overlay');

    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', openMobileSidebar);
    }
    if (closeSidebarBtn) {
      closeSidebarBtn.addEventListener('click', closeMobileSidebar);
    }
    if (overlay) {
      overlay.addEventListener('click', closeMobileSidebar);
    }

    // Forms
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const signupForm = document.getElementById('signup-form');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) feedbackForm.addEventListener('submit', handleFeedbackSubmit);

    const resetFeedbackBtn = document.getElementById('reset-feedback-btn');
    if (resetFeedbackBtn) resetFeedbackBtn.addEventListener('click', resetSubmissionForm);

    const editForm = document.getElementById('edit-feedback-form');
    if (editForm) editForm.addEventListener('submit', handleSaveEdit);

    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

    const contactForm = document.getElementById('contact-form');
    if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

    const forgotForm = document.getElementById('forgot-password-form');
    if (forgotForm) forgotForm.addEventListener('submit', handleForgotPassword);

    const forgotLink = document.getElementById('forgot-password-link');
    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('forgot-password-modal');
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
      });
    }

    // Demo Helpers in Login View
    const fillAdminBtn = document.getElementById('fill-admin-login');
    const fillUserBtn = document.getElementById('fill-user-login');

    if (fillAdminBtn) {
      fillAdminBtn.addEventListener('click', () => {
        document.getElementById('login-email').value = 'admin@fms.com';
        document.getElementById('login-password').value = 'admin123';
      });
    }

    if (fillUserBtn) {
      fillUserBtn.addEventListener('click', () => {
        document.getElementById('login-email').value = 'john.doe@gmail.com';
        document.getElementById('login-password').value = 'user123';
      });
    }

    // Header Quick Demo Switcher
    const demoMenuBtn = document.getElementById('demo-menu-btn');
    const demoDropdown = document.getElementById('demo-dropdown');
    if (demoMenuBtn && demoDropdown) {
      demoMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        demoDropdown.classList.toggle('show');
      });
    }

    const quickAdmin = document.getElementById('quick-demo-admin');
    if (quickAdmin) {
      quickAdmin.addEventListener('click', () => {
        quickLogin('admin');
        if (demoDropdown) demoDropdown.classList.remove('show');
      });
    }

    const quickUser = document.getElementById('quick-demo-user');
    if (quickUser) {
      quickUser.addEventListener('click', () => {
        quickLogin('user');
        if (demoDropdown) demoDropdown.classList.remove('show');
      });
    }

    // Notifications dropdown
    const notifBtn = document.getElementById('notification-btn');
    const notifMenu = document.getElementById('notification-menu');
    if (notifBtn && notifMenu) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('show');
      });
    }

    // Header Profile Click
    const headerProfile = document.getElementById('header-profile-btn');
    const sidebarAuthBtn = document.getElementById('sidebar-auth-quick-btn');
    const handleAuthSwitch = () => {
      if (currentUser) {
        handleLogout();
      } else {
        window.location.hash = '#login';
      }
    };
    if (headerProfile) headerProfile.addEventListener('click', handleAuthSwitch);
    if (sidebarAuthBtn) sidebarAuthBtn.addEventListener('click', handleAuthSwitch);

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      if (demoDropdown) demoDropdown.classList.remove('show');
      if (notifMenu) notifMenu.classList.remove('show');
    });

    // Password Eye Toggles
    document.querySelectorAll('.toggle-password-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'fa-regular fa-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'fa-regular fa-eye';
        }
      });
    });

    // Real-time password match in signup
    const signupPass = document.getElementById('signup-password');
    const signupConfirm = document.getElementById('signup-confirm-password');
    const matchIndicator = document.getElementById('password-match-indicator');

    function checkPasswordMatch() {
      if (!signupPass || !signupConfirm || !matchIndicator) return;
      const p1 = signupPass.value;
      const p2 = signupConfirm.value;

      if (!p2) {
        matchIndicator.textContent = '';
        return;
      }

      if (p1 === p2) {
        matchIndicator.innerHTML = '<span class="text-success"><i class="fa-solid fa-check-circle me-1"></i> Passwords match</span>';
      } else {
        matchIndicator.innerHTML = '<span class="text-danger"><i class="fa-solid fa-circle-xmark me-1"></i> Passwords do not match</span>';
      }
    }

    if (signupPass) signupPass.addEventListener('input', checkPasswordMatch);
    if (signupConfirm) signupConfirm.addEventListener('input', checkPasswordMatch);

    // Description Character Counter
    const descInput = document.getElementById('feedback-desc');
    const counterEl = document.getElementById('char-counter');
    if (descInput && counterEl) {
      descInput.addEventListener('input', function () {
        counterEl.textContent = `${this.value.length} / 500 characters`;
      });
    }

    // Modal Close Buttons (data-close-modal)
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Table Search & Filter Controls
    const searchInput = document.getElementById('feedback-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        tableState.search = this.value.trim();
        tableState.currentPage = 1;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = this.value ? 'block' : 'none';
        }
        renderFeedbackTable();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        tableState.search = '';
        clearSearchBtn.style.display = 'none';
        tableState.currentPage = 1;
        renderFeedbackTable();
      });
    }

    const catFilter = document.getElementById('filter-category');
    if (catFilter) {
      catFilter.addEventListener('change', function () {
        tableState.category = this.value;
        tableState.currentPage = 1;
        renderFeedbackTable();
      });
    }

    const ratingFilter = document.getElementById('filter-rating');
    if (ratingFilter) {
      ratingFilter.addEventListener('change', function () {
        tableState.rating = this.value;
        tableState.currentPage = 1;
        renderFeedbackTable();
      });
    }

    const sortFilter = document.getElementById('filter-sort');
    if (sortFilter) {
      sortFilter.addEventListener('change', function () {
        tableState.sort = this.value;
        renderFeedbackTable();
      });
    }

    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const emptyResetBtn = document.getElementById('empty-reset-btn');
    const resetFiltersRoutine = () => {
      tableState.search = '';
      tableState.category = 'ALL';
      tableState.rating = 'ALL';
      tableState.sort = 'date-desc';
      tableState.currentPage = 1;

      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      if (catFilter) catFilter.value = 'ALL';
      if (ratingFilter) ratingFilter.value = 'ALL';
      if (sortFilter) sortFilter.value = 'date-desc';

      renderFeedbackTable();
      showToast('Filters have been reset', 'info');
    };

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFiltersRoutine);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetFiltersRoutine);

    // Prev / Next Pagination
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (tableState.currentPage > 1) {
          tableState.currentPage--;
          renderFeedbackTable();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        tableState.currentPage++;
        renderFeedbackTable();
      });
    }

    // CSV Export Button
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportFeedbacksToCSV);
    }
  }

  function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  function refreshAllViews() {
    updateHomeSummary();
    renderDashboard();
    renderFeedbackTable();
    renderCategoriesExplorer();
  }

  // ==========================================================================
  // 18. MODAL CONTROLS & TOAST SYSTEM
  // ==========================================================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <span class="toast-message">${escapeHTML(message)}</span>
      <button class="toast-close" aria-label="Close notification"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);

    // Trigger entrance animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    const closeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', closeToast);

    setTimeout(closeToast, duration);
  }

  // ==========================================================================
  // 19. VALIDATION & FORMATTING UTILITIES
  // ==========================================================================
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showFieldError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = msg;
    const input = el ? el.previousElementSibling : null;
    if (input && input.classList.contains('form-control')) {
      input.classList.add('is-invalid');
    }
  }

  function clearFieldError(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = '';
  }

  function clearErrors(prefix) {
    document.querySelectorAll(`[id^="${prefix}"][id$="-error"]`).forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getStarIconsHTML(count) {
    let html = '';
    const num = Math.min(Math.max(count || 0, 0), 5);
    for (let i = 1; i <= 5; i++) {
      if (i <= num) {
        html += '<i class="fa-solid fa-star"></i>';
      } else {
        html += '<i class="fa-regular fa-star" style="color:var(--slate-300);"></i>';
      }
    }
    return html;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Self-booting on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
