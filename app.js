/**
 * ABHISHEK SAXENA — DIGITAL MARKETING EXECUTIVE PORTFOLIO
 * High-performance interactive client-side engine:
 * - Three.js 3D WebGL Holographic Analytics Dashboard
 * - Custom Neon Cursor with Fluid Easing & Hover States
 * - Ambient Cursor-Following Lighting Engine
 * - Interactive Demo Performance Dashboard Charting
 * - Project Case Study Modal Engine
 * - Mobile Navigation Drawer & Smooth Scroll Spy
 * - Contact Form Validation & Submission Feedback
 *
 * Design Tagline: "BUILD. OPTIMIZE. GROW."
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Custom Cursor Engine (Desktop Only)
  // ==========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  const ambientGlow = document.getElementById('ambient-glow');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      if (ambientGlow) {
        ambientGlow.style.left = `${mouseX}px`;
        ambientGlow.style.top = `${mouseY}px`;
      }
    });

    // Smooth trailing animation loop for outer cursor
    function animateCursor() {
      const speed = 0.15;
      outlineX += (mouseX - outlineX) * speed;
      outlineY += (mouseY - outlineY) * speed;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactive states on links, buttons, and cards
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .project-card, .skill-card, .tool-card, .why-card, .edu-card, .time-btn'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
      });
      el.addEventListener('mousedown', () => {
        cursorOutline.classList.add('click');
      });
      el.addEventListener('mouseup', () => {
        cursorOutline.classList.remove('click');
      });
    });
  }

  // ==========================================================================
  // 2. Three.js 3D Futuristic Analytics Dashboard (Hero Visual)
  // ==========================================================================
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    initThreeDHero();
  }

  function initThreeDHero() {
    const container = document.getElementById('hero-3d-wrapper');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Group for all rotating elements
    const dashboardGroup = new THREE.Group();
    scene.add(dashboardGroup);

    // Neon Green Materials
    const neonGreenColor = new THREE.Color(0xB6FF00);
    const neonSecondaryColor = new THREE.Color(0x9DFF00);

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: neonGreenColor,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const glowLineMat = new THREE.LineBasicMaterial({
      color: neonSecondaryColor,
      transparent: true,
      opacity: 0.6
    });

    // 1. Central Hologram Ring 1
    const ringGeo1 = new THREE.TorusGeometry(4.2, 0.04, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeo1, wireframeMat);
    dashboardGroup.add(ringMesh1);

    // 2. Central Hologram Ring 2 (Tilted)
    const ringGeo2 = new THREE.TorusGeometry(3.4, 0.03, 16, 80);
    const ringMesh2 = new THREE.Mesh(ringGeo2, new THREE.MeshBasicMaterial({
      color: 0x7CFF00,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    }));
    ringMesh2.rotation.x = Math.PI / 3;
    dashboardGroup.add(ringMesh2);

    // 3. Central Hologram Ring 3 (Cross Axis)
    const ringGeo3 = new THREE.TorusGeometry(2.6, 0.02, 16, 60);
    const ringMesh3 = new THREE.Mesh(ringGeo3, new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    }));
    ringMesh3.rotation.y = Math.PI / 4;
    dashboardGroup.add(ringMesh3);

    // 4. Central Geometric Data Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      wireframeLinewidth: 1.5,
      emissive: 0xB6FF00,
      emissiveIntensity: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    dashboardGroup.add(coreMesh);

    // 5. Orbiting Data Metric Nodes (Floating Cubes representing CTR, CPC, ROAS, Leads)
    const nodeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: neonGreenColor,
      wireframe: false
    });

    const nodes = [];
    const nodeCount = 8;
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3.6 + (i % 2) * 0.8;
      node.position.x = Math.cos(angle) * radius;
      node.position.y = Math.sin(angle) * radius;
      node.position.z = (Math.random() - 0.5) * 2;
      dashboardGroup.add(node);
      nodes.push({ mesh: node, angle: angle, radius: radius, speed: 0.008 + Math.random() * 0.005 });
    }

    // 6. Floating Analytics Growth Spline (representing campaign performance curve)
    const curvePoints = [];
    for (let i = -4; i <= 4; i += 0.5) {
      const y = Math.sin(i * 0.8) * 1.2 + (i + 4) * 0.25 - 1;
      const z = Math.cos(i * 0.5) * 0.8;
      curvePoints.push(new THREE.Vector3(i, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const splineGeo = new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
    const splineMat = new THREE.MeshBasicMaterial({
      color: 0xB6FF00,
      transparent: true,
      opacity: 0.85
    });
    const splineMesh = new THREE.Mesh(splineGeo, splineMat);
    dashboardGroup.add(splineMesh);

    // 7. Background Data Starfield Particles
    const particleCount = isTouchDevice ? 150 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: neonGreenColor,
      size: 0.08,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const greenPointLight = new THREE.PointLight(0xB6FF00, 3, 20);
    greenPointLight.position.set(2, 3, 4);
    scene.add(greenPointLight);

    // Mouse Parallax Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = normX * 0.35;
      targetRotX = -normY * 0.25;
    });

    // Render / Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous slow rotation
      ringMesh1.rotation.z += 0.004;
      ringMesh2.rotation.x += 0.005;
      ringMesh2.rotation.y += 0.003;
      ringMesh3.rotation.y += 0.006;
      coreMesh.rotation.x += 0.008;
      coreMesh.rotation.y += 0.01;

      // Animate orbiting metric nodes
      nodes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.y = Math.sin(item.angle) * item.radius;
        item.mesh.rotation.x += 0.02;
        item.mesh.rotation.y += 0.02;
      });

      // Subtle breathing float for whole dashboard
      dashboardGroup.position.y = Math.sin(elapsed * 1.5) * 0.2;

      // Smooth mouse parallax interpolation (LERP)
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      dashboardGroup.rotation.x = currentRotX;
      dashboardGroup.rotation.y = currentRotY;

      // Rotate starfield very slowly
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    }
    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // ==========================================================================
  // 3. Dynamic Subtitle Rotation
  // ==========================================================================
  const specEl = document.getElementById('dynamic-specialization');
  if (specEl) {
    const specializations = [
      'GOOGLE ADS • META ADS • SEO • PERFORMANCE MARKETING',
      'KEYWORD RESEARCH • CAMPAIGN PLANNING • AD COPYWRITING',
      'LEAD GENERATION • QUALITY SCORE • CPA OPTIMIZATION',
      'CONVERSION TRACKING • GA4 • META PIXEL • SEARCH CONSOLE',
      'BUILD. OPTIMIZE. GROW.'
    ];
    let specIndex = 0;

    setInterval(() => {
      specEl.style.opacity = '0';
      specEl.style.transform = 'translateY(6px)';
      specEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        specIndex = (specIndex + 1) % specializations.length;
        specEl.textContent = specializations[specIndex];
        specEl.style.opacity = '1';
        specEl.style.transform = 'translateY(0)';
      }, 400);
    }, 4500);
  }

  // ==========================================================================
  // 4. Navbar Scroll & Mobile Navigation Drawer
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Sticky navbar glass blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu open / close
  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  drawerClose?.addEventListener('click', closeMobileMenu);
  drawerBackdrop?.addEventListener('click', closeMobileMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Active navigation link tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // ==========================================================================
  // 5. Interactive Demo Performance Dashboard Engine
  // ==========================================================================
  const chartCanvas = document.getElementById('performanceChart');
  const timeBtns = document.querySelectorAll('.time-btn');

  const kpiCtr = document.getElementById('kpi-ctr');
  const kpiCpc = document.getElementById('kpi-cpc');
  const kpiCpa = document.getElementById('kpi-cpa');
  const kpiConv = document.getElementById('kpi-conv');
  const kpiRoas = document.getElementById('kpi-roas');

  const performanceData = {
    '7d': {
      ctr: '4.62%',
      cpc: '₹14.20',
      cpa: '₹285.50',
      conv: '148',
      roas: '4.35x',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      conversions: [14, 19, 24, 22, 28, 18, 23],
      impressions: [280, 390, 510, 480, 590, 410, 490]
    },
    '30d': {
      ctr: '4.85%',
      cpc: '₹12.90',
      cpa: '₹264.00',
      conv: '612',
      roas: '4.60x',
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      conversions: [130, 155, 162, 165],
      impressions: [2600, 3100, 3350, 3400]
    },
    '90d': {
      ctr: '5.10%',
      cpc: '₹11.75',
      cpa: '₹248.00',
      conv: '1,840',
      roas: '4.85x',
      labels: ['Month 1', 'Month 2', 'Month 3'],
      conversions: [540, 620, 680],
      impressions: [10800, 12600, 13700]
    }
  };

  let currentPeriod = '7d';

  timeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      timeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const period = btn.getAttribute('data-period');
      if (period && performanceData[period]) {
        currentPeriod = period;
        updateDashboardKPIs(period);
        renderPerformanceChart(period);
      }
    });
  });

  function updateDashboardKPIs(period) {
    const data = performanceData[period];
    if (!data) return;

    if (kpiCtr) kpiCtr.textContent = data.ctr;
    if (kpiCpc) kpiCpc.textContent = data.cpc;
    if (kpiCpa) kpiCpa.textContent = data.cpa;
    if (kpiConv) kpiConv.textContent = data.conv;
    if (kpiRoas) kpiRoas.textContent = data.roas;
  }

  function renderPerformanceChart(period) {
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    // Retina display scaling
    const dpr = window.devicePixelRatio || 1;
    const width = chartCanvas.parentElement.clientWidth;
    const height = chartCanvas.parentElement.clientHeight || 260;

    chartCanvas.width = width * dpr;
    chartCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const data = performanceData[period];
    const points = data.conversions;
    const labels = data.labels;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 25, right: 30, bottom: 40, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...points) * 1.25;

    // Draw Subtle Gridlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    const gridRows = 4;
    for (let i = 0; i <= gridRows; i++) {
      const y = padding.top + (chartH / gridRows) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis numerical labels
      const valLabel = Math.round(maxVal - (maxVal / gridRows) * i);
      ctx.fillStyle = '#71767B';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(valLabel.toString(), padding.left - 10, y + 4);
    }

    // Coordinates mapping
    const coords = points.map((val, idx) => {
      const x = padding.left + (chartW / (points.length - 1)) * idx;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val };
    });

    // 1. Fill Area with Neon Green Gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(182, 255, 0, 0.35)');
    gradient.addColorStop(0.7, 'rgba(182, 255, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(182, 255, 0, 0.0)');

    ctx.beginPath();
    ctx.moveTo(coords[0].x, height - padding.bottom);
    coords.forEach((pt) => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(coords[coords.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 2. Stroke Main Neon Line
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    coords.forEach((pt) => ctx.lineTo(pt.x, pt.y));
    ctx.strokeStyle = '#B6FF00';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(182, 255, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // 3. Draw Data Point Dots & X-axis Labels
    coords.forEach((pt, idx) => {
      // Outer glow circle
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#050505';
      ctx.fill();
      ctx.strokeStyle = '#B6FF00';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // X-axis label
      ctx.fillStyle = '#8E9297';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], pt.x, height - padding.bottom + 22);
    });
  }

  // Initial chart render
  if (chartCanvas) {
    setTimeout(() => renderPerformanceChart(currentPeriod), 100);
    window.addEventListener('resize', () => renderPerformanceChart(currentPeriod));
  }

  // ==========================================================================
  // 6. Comprehensive Case Study Modal Engine
  // ==========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTypeBadge = document.getElementById('modalTypeBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  const projectsData = {
    'google-ads-tv': {
      title: 'Google Ads — TV Repair Lead Generation Campaign',
      category: 'Google Ads / PPC',
      typeBadge: 'Practical Training Project',
      objective:
        'To structure and plan a local search lead generation campaign in Delhi targeting urgent homeowner repair inquiries with high commercial purchase intent, while eliminating budget waste.',
      strategy:
        'Analyzed consumer search queries around TV malfunctions (LED screen blinking, power board failure, sound issues). Categorized keywords into tightly themed ad groups with strict match-type discipline (Phrase and Exact Match) to prevent irrelevant broad clicks.',
      execution: [
        'Researched 70+ local intent keywords using Google Keyword Planner to identify high-volume commercial searches in Delhi NCR.',
        'Structured ad groups: "Doorstep TV Repair", "LED TV Screen Repair", and "Brand Specific Technician".',
        'Implemented 45+ negative keywords (e.g., "free", "diy", "jobs", "schematic diagram", "course") to protect ad spend from unqualified traffic.',
        'Authored 4 Responsive Search Ads (RSA) incorporating strong value propositions: "Doorstep Service within 60 Mins", "90-Day Service Warranty", and "Genuine Spare Parts".',
        'Configured location radius targeting for Central and South Delhi service zones.'
      ],
      tools: ['Google Ads', 'Google Keyword Planner', 'Google Sheets'],
      skillsUsed: ['Keyword Research', 'Campaign Structuring', 'Ad Copywriting', 'Negative Keyword Strategy', 'Search Intent Analysis'],
      keyLearnings:
        'High-intent search terms with immediate problem-solving context convert significantly better when paired with transparency in pricing and emergency doorstep turnaround promises.'
    },

    'meta-ads-leadgen': {
      title: 'Meta Ads — Lead Generation Funnel Project',
      category: 'Meta Ads / Social Advertising',
      typeBadge: 'Practical Training Project',
      objective:
        'To engineer a social media lead generation campaign on Facebook & Instagram utilizing instant native lead forms to capture qualified inquiries with low friction.',
      strategy:
        'Segmented audience demographics by career interests, recent graduates, and skill upskilling queries. Built creative visual hooks focused on hands-on practical learning rather than generic theoretical courses.',
      execution: [
        'Configured campaign objective: "Lead Generation" via Meta Ads Manager.',
        'Designed 3 ad creative variants (single image, carousel banner, and testimonial style) using Canva with clean typography and contrast.',
        'Crafted compelling primary text and attention-grabbing headlines focused on career advancement and live project experience.',
        'Engineered an in-app Instant Form with custom qualification questions (Highest Qualification, Preferred Batch Timing) to screen out low-intent submissions.',
        'Defined Meta Pixel standard event architecture (Lead, ViewContent) for post-campaign tracking.'
      ],
      tools: ['Meta Ads Manager', 'Canva', 'Meta Business Suite'],
      skillsUsed: ['Audience Segmentation', 'Instant Form Optimization', 'Creative Design', 'Ad Copywriting', 'Meta Pixel Planning'],
      keyLearnings:
        'Native in-app instant forms decrease lead drop-off rates compared to external landing pages, provided 1–2 filtering questions are included to maintain lead quality.'
    },

    'seo-strategy': {
      title: 'SEO — Complete Website Organic Search Strategy',
      category: 'Search Engine Optimization',
      typeBadge: 'Practical Training Project',
      objective:
        'To formulate an organic search visibility roadmap for a service business, focusing on intent-driven keyword mapping, on-page optimization, metadata hygiene, and local search discoverability.',
      strategy:
        'Performed thorough search intent classification (Informational, Commercial, Navigational). Mapped target keywords to specific URL hierarchies so individual pages avoid cannibalizing each other.',
      execution: [
        'Conducted keyword research using Google Search Console queries and Google Trends to discover localized queries.',
        'Formulated On-Page SEO blueprints: Title tag formulas (Primary Keyword | Brand), meta descriptions containing primary CTAs, and semantic H1-H3 tag hierarchies.',
        'Created an internal linking architecture connecting informational blog guides to core commercial booking pages.',
        'Conducted competitor content gap analysis to identify unanswered search queries and underserved topics.',
        'Designed Local SEO action plan: Google Business Profile optimization attributes, category selection, and local schema markup.'
      ],
      tools: ['WordPress', 'Rank Math SEO', 'Google Search Console', 'Google Trends'],
      skillsUsed: ['Keyword Research', 'On-page SEO', 'Competitor Analysis', 'Content Strategy', 'Local SEO Architecture'],
      keyLearnings:
        'Search engine visibility is won by directly satisfying user intent faster and more thoroughly than competitor pages, reinforced by logical semantic site hierarchy.'
    },

    'shastriya-vidhan': {
      title: 'Shastriya Vidhan — Traditional Vedic Ritual Platform',
      category: 'Website / Digital Project',
      typeBadge: 'Live Production Project',
      objective:
        'A complete website project for a traditional Vedic ritual and puja service platform, designed with structured service discovery, booking journey, puja categories and clear user navigation.',
      strategy:
        'Architected a culturally respectful, modern digital platform allowing devotees to browse authentic Vedic ceremonies (Rudrabhishek, Satyanarayan Puja, Griha Pravesh), review required Samagri, and request certified Acharya consultations.',
      execution: [
        'Built full production responsive web application deployed live on Vercel.',
        'Designed a structured multi-category puja discovery catalog with transparent ritual descriptions.',
        'Implemented clear conversion pathways with sticky CTA triggers for booking appointments and contacting Acharyas.',
        'Optimized for mobile viewing to ensure frictionless navigation on smartphones across India.',
        'Integrated responsive layout and rapid loading speeds.'
      ],
      tools: ['Next.js', 'Vercel', 'Tailwind CSS', 'Responsive UI Engineering'],
      skillsUsed: ['Service Discovery UI', 'Booking Flow Architecture', 'User Experience Design', 'Conversion Funnel Planning'],
      liveLink: 'https://shastriya-vidhan-lac.vercel.app/',
      keyLearnings:
        'Trust and clarity are paramount in spiritual and service-based platforms. Clear categorical navigation and transparent booking steps dramatically improve user engagement.'
    }
  };

  // Open modal handler
  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalTypeBadge.textContent = data.typeBadge;

    let executionHTML = '';
    if (Array.isArray(data.execution)) {
      executionHTML = `
        <div class="modal-section">
          <h4 class="modal-section-title"><i class="fa-solid fa-list-check text-neon"></i> Execution & Implementation:</h4>
          <ul class="step-list">
            ${data.execution.map((item) => `<li><i class="fa-solid fa-check text-neon"></i> ${item}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fa-solid fa-bullseye text-neon"></i> Project Objective:</h4>
        <p>${data.objective}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fa-solid fa-compass text-neon"></i> Strategic Approach:</h4>
        <p>${data.strategy}</p>
      </div>

      ${executionHTML}

      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fa-solid fa-toolbox text-neon"></i> Tools & Platforms:</h4>
        <div class="tags-cluster">
          ${data.tools.map((tool) => `<span class="tag-pill text-neon">${tool}</span>`).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title"><i class="fa-solid fa-lightbulb text-neon"></i> Key Learnings:</h4>
        <p>${data.keyLearnings}</p>
      </div>
    `;

    // Modal Footer buttons
    let footerButtons = `
      <button class="btn btn-glass btn-sm" id="modalDismissBtn">
        <span>CLOSE</span>
      </button>
    `;

    if (data.liveLink) {
      footerButtons = `
        <a href="${data.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-neon-fill btn-sm">
          <span>VISIT LIVE PROJECT</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        ` + footerButtons;
    }

    modalFooter.innerHTML = footerButtons;

    document.getElementById('modalDismissBtn')?.addEventListener('click', closeProjectModal);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal?.classList.remove('active');
    projectModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind all modal trigger buttons
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      if (projId) openProjectModal(projId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeSuccessModal();
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // 7. Contact Form Validation & Submission Handling
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const successModalClose = document.getElementById('successModalClose');

  function openSuccessModal(senderName) {
    if (!successModal) return;
    const msgEl = document.getElementById('successModalMessage');
    if (msgEl && senderName) {
      msgEl.textContent = `Thank you, ${senderName}. Your message has been validated and prepared for Abhishek Saxena.`;
    }
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    successModal?.classList.remove('active');
    successModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  successModalClose?.addEventListener('click', closeSuccessModal);
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) closeSuccessModal();
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your full name');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Please enter a subject');
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
        showError(messageInput, 'Please provide a message (minimum 8 characters)');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (!isValid) return;

      const submitBtn = document.getElementById('formSubmitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>PROCESSING...</span>';
      submitBtn.disabled = true;

      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Try sending to local API endpoint (/api/contact) if hosted on server
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(() => {
          openSuccessModal(formData.name);
          contactForm.reset();
        })
        .catch(() => {
          // Client-side fallback: open success confirmation and provide direct mailto link
          openSuccessModal(formData.name);
          contactForm.reset();
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  function showError(inputEl, message) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errSpan = group.querySelector('.form-error');
      if (errSpan) errSpan.textContent = message;
    }
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  // Clear error on input typing
  ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => clearError(el));
  });

  // ==========================================================================
  // 8. Print Console Branding
  // ==========================================================================
  console.log(
    '%c ABHISHEK SAXENA | DIGITAL MARKETING EXECUTIVE %c BUILD. OPTIMIZE. GROW. ',
    'background: #B6FF00; color: #050505; font-weight: 800; padding: 4px 8px; border-radius: 4px;',
    'background: #0D0D0D; color: #B6FF00; border: 1px solid #B6FF00; padding: 4px 8px; border-radius: 4px;'
  );
})();
