/* --------------------------------------------------------------------------
   MOHAN JEWELLERY - INTERACTIVE LOGIC & ENGINE (EST. 1890)
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initLiveTicker();
  initGoldCalculator();
  initProductCatalog();
  initVirtualMirror();
  initBespokeWizard();
  initSchemeCalculator();
  initModals();
});

/* --------------------------------------------------------------------------
   1. GOLD PARTICLE CANVAS (HERO BACKGROUND EFFECT)
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.3 ? '#d4af37' : '#fcf6ba',
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#d4af37';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(renderParticles);
  }
  renderParticles();
}

/* --------------------------------------------------------------------------
   2. LIVE GOLD RATE TICKER
   -------------------------------------------------------------------------- */
const currentRates = {
  gold24k: 7380, // per gram in INR
  gold22k: 6765,
  gold18k: 5535,
  silver: 89.50
};

function initLiveTicker() {
  const gold22El = document.getElementById('ticker-gold22');
  const gold24El = document.getElementById('ticker-gold24');
  const silverEl = document.getElementById('ticker-silver');

  if (gold22El) gold22El.textContent = `₹${currentRates.gold22k.toLocaleString('en-IN')}`;
  if (gold24El) gold24El.textContent = `₹${currentRates.gold24k.toLocaleString('en-IN')}`;
  if (silverEl) silverEl.textContent = `₹${currentRates.silver.toFixed(2)}`;

  // Subtle live rate pulse simulation
  setInterval(() => {
    const delta = (Math.random() - 0.48) * 2;
    currentRates.gold22k = Math.round(currentRates.gold22k + delta);
    currentRates.gold24k = Math.round(currentRates.gold22k * 1.0909);
    
    if (gold22El) gold22El.textContent = `₹${currentRates.gold22k.toLocaleString('en-IN')}`;
    if (gold24El) gold24El.textContent = `₹${currentRates.gold24k.toLocaleString('en-IN')}`;
    
    calculateGoldEstimate();
  }, 12000);
}

/* --------------------------------------------------------------------------
   3. GOLD VALUE ESTIMATOR
   -------------------------------------------------------------------------- */
function initGoldCalculator() {
  const metalSelect = document.getElementById('calc-metal');
  const weightInput = document.getElementById('calc-weight');
  const makingSelect = document.getElementById('calc-making');

  if (metalSelect) metalSelect.addEventListener('change', calculateGoldEstimate);
  if (weightInput) weightInput.addEventListener('input', calculateGoldEstimate);
  if (makingSelect) makingSelect.addEventListener('change', calculateGoldEstimate);

  calculateGoldEstimate();
}

function calculateGoldEstimate() {
  const metalSelect = document.getElementById('calc-metal');
  const weightInput = document.getElementById('calc-weight');
  const makingSelect = document.getElementById('calc-making');
  const priceDisplay = document.getElementById('calc-total-price');
  const baseRateDisplay = document.getElementById('calc-base-rate');
  const makingDisplay = document.getElementById('calc-making-charge');
  const gstDisplay = document.getElementById('calc-gst');

  if (!metalSelect || !weightInput || !priceDisplay) return;

  const metalType = metalSelect.value;
  const weightGrams = parseFloat(weightInput.value) || 0;
  const makingPercent = parseFloat(makingSelect ? makingSelect.value : 12) / 100;

  let ratePerGram = currentRates.gold22k;
  if (metalType === '24k') ratePerGram = currentRates.gold24k;
  if (metalType === '18k') ratePerGram = currentRates.gold18k;
  if (metalType === 'silver') ratePerGram = currentRates.silver;

  const rawMetalCost = ratePerGram * weightGrams;
  const makingCost = rawMetalCost * makingPercent;
  const subtotal = rawMetalCost + makingCost;
  const gstCost = subtotal * 0.03; // 3% GST on jewellery
  const grandTotal = Math.round(subtotal + gstCost);

  priceDisplay.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  if (baseRateDisplay) baseRateDisplay.textContent = `Rate: ₹${ratePerGram}/g`;
  if (makingDisplay) makingDisplay.textContent = `Making (${(makingPercent * 100).toFixed(0)}%): ₹${Math.round(makingCost).toLocaleString('en-IN')}`;
  if (gstDisplay) gstDisplay.textContent = `GST (3%): ₹${Math.round(gstCost).toLocaleString('en-IN')}`;
}

/* --------------------------------------------------------------------------
   4. PRODUCT CATALOG DATA & RENDERING
   -------------------------------------------------------------------------- */
const productsData = [
  {
    id: 1,
    title: "South Indian Temple Goddess Haram",
    category: "temple",
    purity: "22K BIS Hallmarked",
    weight: "48.50 grams",
    price: 368000,
    image: "assets/images/antique_temple.jpg",
    description: "Handcrafted 22K gold antique temple necklace depicting Goddess Lakshmi with ruby & emerald accents."
  },
  {
    id: 2,
    title: "Royal Certified Diamond Choker Set",
    category: "diamond",
    purity: "VVS-EF Certified Diamonds",
    weight: "32.20 grams (18K Gold)",
    price: 495000,
    image: "assets/images/diamond_collection.jpg",
    description: "High-sparkle conflict-free certified solitaire diamond choker with matching chandelier earrings."
  },
  {
    id: 3,
    title: "Zambia Emerald Royal Pearl Necklace",
    category: "gemstone",
    purity: "22K Gold & Natural Emerald",
    weight: "38.75 grams",
    price: 420000,
    image: "assets/images/emerald_necklace.jpg",
    description: "Deep green natural Zambian emeralds framed by brilliant brilliant-cut diamonds & South Sea pearls."
  },
  {
    id: 4,
    title: "Bridal Kasu Mala & Mango Necklace Set",
    category: "bridal",
    purity: "22K BIS 916 Hallmarked",
    weight: "72.00 grams",
    price: 545000,
    image: "assets/images/hero_banner.jpg",
    description: "Traditional Chennai grand bridal gold necklace ensemble featuring classic coins & mango motifs."
  },
  {
    id: 5,
    title: "Heritage Craftsman Signature Kangan",
    category: "gold",
    purity: "22K BIS Hallmarked",
    weight: "24.50 grams (Pair)",
    price: 188000,
    image: "assets/images/craftsman.jpg",
    description: "Sculpted solid gold bangles with intricate filigree embossing by Mohan Jewellery master craftsmen."
  },
  {
    id: 6,
    title: "Villivakkam Special Gold Lakshmi Coin (10g)",
    category: "gold",
    purity: "24K (999 Pure Gold)",
    weight: "10.00 grams",
    price: 74500,
    image: "assets/images/showroom.jpg",
    description: "24K 999 fine purity gold bullion coin with embossed Sri Lakshmi portrait. Perfect for gifting & investment."
  }
];

function initProductCatalog() {
  const grid = document.getElementById('product-grid');
  const tabs = document.querySelectorAll('.tab-btn');
  const searchInput = document.getElementById('catalog-search-input');

  if (!grid) return;

  function renderProducts(items) {
    grid.innerHTML = items.map(product => `
      <div class="product-card">
        <div class="product-thumb">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <span class="purity-badge">${product.purity}</span>
          <div class="quick-actions">
            <button class="btn btn-gold" onclick="openQuickView(${product.id})">Quick View</button>
            <button class="btn btn-outline-gold" onclick="tryOnProduct(${product.id})">Try Virtual</button>
          </div>
        </div>
        <div class="product-details">
          <div>
            <span class="product-category">${product.category} COLLECTION</span>
            <h3 class="product-title">${product.title}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${product.description}</p>
          </div>
          <div class="product-meta">
            <span class="product-weight"><i class="fas fa-weight-hanging" style="color:var(--gold-primary); margin-right:4px;"></i> ${product.weight}</span>
            <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          </div>
          <button class="btn btn-whatsapp" style="width:100%; margin-top:16px;" onclick="enquireWhatsApp('${encodeURIComponent(product.title)}', '₹${product.price.toLocaleString('en-IN')}')">
            <i class="fab fa-whatsapp"></i> Enquire on WhatsApp
          </button>
        </div>
      </div>
    `).join('');
  }

  renderProducts(productsData);

  // Tab Filtering
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.category;
      if (cat === 'all') {
        renderProducts(productsData);
      } else {
        const filtered = productsData.filter(p => p.category === cat);
        renderProducts(filtered);
      }
    });
  });

  // Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = productsData.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
      renderProducts(filtered);
    });
  }
}

/* --------------------------------------------------------------------------
   5. VIRTUAL JEWELLERY MIRROR / SIMULATOR
   -------------------------------------------------------------------------- */
let selectedTryOnImage = 'assets/images/antique_temple.jpg';

function initVirtualMirror() {
  const canvas = document.getElementById('mirror-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const modelImg = new Image();
  const jewelleryImg = new Image();

  modelImg.src = 'assets/images/hero_banner.jpg';
  jewelleryImg.src = selectedTryOnImage;

  function drawMirror() {
    canvas.width = canvas.offsetWidth || 500;
    canvas.height = canvas.offsetHeight || 480;

    // Draw base background/model
    ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);

    // Overlay soft vignette
    const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width/1.2);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(3,23,18,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Overlay Jewellery Preview
    const jWidth = canvas.width * 0.45;
    const jHeight = canvas.height * 0.45;
    const jX = (canvas.width - jWidth) / 2;
    const jY = canvas.height * 0.35;

    ctx.save();
    ctx.shadowColor = 'rgba(212,175,55,0.6)';
    ctx.shadowBlur = 20;
    ctx.drawImage(jewelleryImg, jX, jY, jWidth, jHeight);
    ctx.restore();
  }

  modelImg.onload = drawMirror;
  jewelleryImg.onload = drawMirror;
  window.addEventListener('resize', drawMirror);

  window.changeMirrorItem = function(imgSrc, title) {
    selectedTryOnImage = imgSrc;
    jewelleryImg.src = imgSrc;
    const label = document.getElementById('mirror-current-label');
    if (label) label.textContent = title;
  };
}

function tryOnProduct(id) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;
  
  const fittingSection = document.getElementById('virtual-tryon');
  if (fittingSection) {
    fittingSection.scrollIntoView({ behavior: 'smooth' });
    window.changeMirrorItem(product.image, product.title);
  }
}

/* --------------------------------------------------------------------------
   6. BESPOKE DESIGN STUDIO WIZARD
   -------------------------------------------------------------------------- */
const bespokeState = {
  metal: '22K Gold',
  stone: 'Uncut Diamonds & Rubies',
  style: 'Traditional South Indian Temple',
  budget: '₹2.5 Lakhs - ₹5 Lakhs'
};

function initBespokeWizard() {
  window.setWizardOption = function(step, key, val, element) {
    bespokeState[key] = val;
    const parent = element.parentElement;
    parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
  };

  window.nextWizardStep = function(currentStep) {
    const currentEl = document.getElementById(`step-${currentStep}`);
    const nextEl = document.getElementById(`step-${currentStep + 1}`);
    const currentIndicator = document.getElementById(`ind-${currentStep}`);
    const nextIndicator = document.getElementById(`ind-${currentStep + 1}`);

    if (currentEl && nextEl) {
      currentEl.classList.remove('active');
      nextEl.classList.active ? null : nextEl.classList.add('active');
      if (currentIndicator) currentIndicator.classList.remove('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }

    if (currentStep === 3) {
      // Summary update
      const summaryEl = document.getElementById('bespoke-summary-text');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <strong>Metal Purity:</strong> ${bespokeState.metal}<br>
          <strong>Gemstone Preference:</strong> ${bespokeState.stone}<br>
          <strong>Design Style:</strong> ${bespokeState.style}<br>
          <strong>Estimated Budget:</strong> ${bespokeState.budget}
        `;
      }
    }
  };

  window.prevWizardStep = function(currentStep) {
    const currentEl = document.getElementById(`step-${currentStep}`);
    const prevEl = document.getElementById(`step-${currentStep - 1}`);
    const currentIndicator = document.getElementById(`ind-${currentStep}`);
    const prevIndicator = document.getElementById(`ind-${currentStep - 1}`);

    if (currentEl && prevEl) {
      currentEl.classList.remove('active');
      prevEl.classList.add('active');
      if (currentIndicator) currentIndicator.classList.remove('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  };

  window.submitBespokeWhatsApp = function() {
    const notes = document.getElementById('bespoke-notes')?.value || 'No special notes';
    const message = `Hello Mohan Jewellery! I would like a Bespoke Custom Jewellery Consultation.\n\n` +
      `📌 Metal: ${bespokeState.metal}\n` +
      `📌 Gemstone: ${bespokeState.stone}\n` +
      `📌 Style: ${bespokeState.style}\n` +
      `📌 Budget: ${bespokeState.budget}\n` +
      `📌 Additional Notes: ${notes}`;

    window.open(`https://wa.me/919444026171?text=${encodeURIComponent(message)}`, '_blank');
  };
}

/* --------------------------------------------------------------------------
   7. SWARNA VARSH GOLD SCHEME CALCULATOR
   -------------------------------------------------------------------------- */
function initSchemeCalculator() {
  const schemeSlider = document.getElementById('scheme-amount');
  const monthlyDisp = document.getElementById('scheme-monthly-val');
  const totalPaidDisp = document.getElementById('scheme-total-paid');
  const bonusDisp = document.getElementById('scheme-bonus');
  const totalMaturityDisp = document.getElementById('scheme-maturity');

  if (!schemeSlider) return;

  function updateSchemeMath() {
    const monthlyAmount = parseInt(schemeSlider.value);
    const monthsPaid = 11;
    const totalPaid = monthlyAmount * monthsPaid;
    const bonusAmount = monthlyAmount; // 1 month bonus paid by Mohan Jewellery
    const totalValue = totalPaid + bonusAmount;

    if (monthlyDisp) monthlyDisp.textContent = `₹${monthlyAmount.toLocaleString('en-IN')}`;
    if (totalPaidDisp) totalPaidDisp.textContent = `₹${totalPaid.toLocaleString('en-IN')}`;
    if (bonusDisp) bonusDisp.textContent = `₹${bonusAmount.toLocaleString('en-IN')}`;
    if (totalMaturityDisp) totalMaturityDisp.textContent = `₹${totalValue.toLocaleString('en-IN')}`;
  }

  schemeSlider.addEventListener('input', updateSchemeMath);
  updateSchemeMath();
}

/* --------------------------------------------------------------------------
   8. MODALS & APPOINTMENT BOOKING
   -------------------------------------------------------------------------- */
function initModals() {
  window.openBookingModal = function() {
    const backdrop = document.getElementById('booking-modal');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeBookingModal = function() {
    const backdrop = document.getElementById('booking-modal');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.openQuickView = function(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('quickview-modal');
    const body = document.getElementById('quickview-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:center;">
        <img src="${product.image}" alt="${product.title}" style="width:100%; border-radius:12px; border:1px solid var(--border-gold);">
        <div>
          <span style="color:var(--gold-primary); font-size:0.85rem; font-weight:700; text-transform:uppercase;">${product.category} COLLECTION</span>
          <h2 style="font-size:1.8rem; margin:10px 0;">${product.title}</h2>
          <p style="color:var(--text-muted); margin-bottom:16px;">${product.description}</p>
          <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border-gold); padding:12px 16px; border-radius:8px; margin-bottom:20px;">
            <p><strong>Purity Certification:</strong> ${product.purity}</p>
            <p><strong>Estimated Weight:</strong> ${product.weight}</p>
            <p style="font-family:var(--font-cinzel); font-size:1.5rem; color:var(--gold-light); margin-top:8px;">Price: ₹${product.price.toLocaleString('en-IN')}</p>
          </div>
          <button class="btn btn-whatsapp" style="width:100%;" onclick="enquireWhatsApp('${encodeURIComponent(product.title)}', '₹${product.price.toLocaleString('en-IN')}')">
            <i class="fab fa-whatsapp"></i> Instant WhatsApp Consultation
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
  };

  window.closeQuickView = function() {
    const modal = document.getElementById('quickview-modal');
    if (modal) modal.classList.remove('open');
  };

  window.handleBookingSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const date = document.getElementById('book-date').value;
    const service = document.getElementById('book-service').value;

    alert(`Thank you ${name}! Your VIP Private Consultation has been scheduled for ${date}.\n\nOur Senior Jewellery Advisor will call you at ${phone} to confirm your appointment.`);
    closeBookingModal();
  };

  window.enquireWhatsApp = function(itemTitle, price) {
    const text = `Hello Mohan Jewellery! I am interested in exploring '${decodeURIComponent(itemTitle)}' (Price approx: ${price}). Please share more details and store availability in Villivakkam.`;
    window.open(`https://wa.me/919444026171?text=${encodeURIComponent(text)}`, '_blank');
  };
}
