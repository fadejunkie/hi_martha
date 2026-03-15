const TAGLINES = [
  'Aim True. Weld True.',
  'From San Miguel to the Shop Floor.',
  'Built for grinders, fitters, and welders.'
];

const PRODUCTS = [
  { id: 'tee-heritage', title: 'San Miguel Heritage Tee', category: 'Apparel', collection: 'San Miguel Heritage', price: 42, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80' },
  { id: 'tee-arc', title: 'Arc Line Heavyweight Tee', category: 'Apparel', collection: 'Core Apparel', price: 38, img: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=700&q=80' },
  { id: 'hoodie-smoke', title: 'Shop Smoke Work Hoodie', category: 'Apparel', collection: 'Work-Ready Gear', price: 68, img: 'https://images.unsplash.com/photo-1556821840-3a9fbc4f1471?auto=format&fit=crop&w=700&q=80' },
  { id: 'snapback-weld', title: 'Weld True Snapback', category: 'Headwear', collection: 'Core Apparel', price: 37, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80' },
  { id: 'bandana-fr', title: 'FR Bandana — Sparks', category: 'Work Gear', collection: 'Work-Ready Gear', price: 19, img: 'https://images.unsplash.com/photo-1618354691211-88d47f285158?auto=format&fit=crop&w=700&q=80' },
  { id: 'tool-roll', title: 'Tool Roll Pouch', category: 'Work Gear', collection: 'Work-Ready Gear', price: 34, img: 'https://images.unsplash.com/photo-1597710006406-7044e6e2c65f?auto=format&fit=crop&w=700&q=80' },
  { id: 'cap-liner', title: 'Welding Cap Liner (2-Pack)', category: 'Work Gear', collection: 'Identity Pieces', price: 18, img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=700&q=80' },
  { id: 'limited-crest', title: 'Limited Crest Hoodie', category: 'Limited Drops', collection: 'Identity Pieces', price: 59, img: 'https://images.unsplash.com/photo-1614251056216-f748f76cd228?auto=format&fit=crop&w=700&q=80' }
];

function money(v) { return `$${v.toFixed(2)}`; }
function getCart() { return JSON.parse(localStorage.getItem('arq_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('arq_cart', JSON.stringify(cart)); renderCart(); }

function addToCart(id, qty = 1, size = 'M') {
  const cart = getCart();
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty, size });
  saveCart(cart);
  openCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function cartDetails() {
  return getCart().map((item, i) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return { ...item, index: i, product: p, line: p ? p.price * item.qty : 0 };
  }).filter(x => x.product);
}

function renderCart() {
  const items = cartDetails();
  const wrap = document.querySelector('[data-cart-items]');
  const totalEl = document.querySelector('[data-cart-total]');
  const countEls = document.querySelectorAll('[data-cart-count]');
  if (!wrap || !totalEl) return;
  wrap.innerHTML = items.length ? '' : '<p>Your cart is empty. Add work-ready gear.</p>';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.product.img}" alt="${item.product.title}" loading="lazy" />
      <div>
        <strong>${item.product.title}</strong><br>
        <small>Size: ${item.size} · Qty: ${item.qty}</small><br>
        <small>${money(item.line)}</small>
      </div>
      <button class="icon-btn" aria-label="Remove item" data-remove-index="${item.index}">✕</button>
    `;
    wrap.appendChild(div);
  });
  const total = items.reduce((sum, i) => sum + i.line, 0);
  totalEl.textContent = money(total);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  countEls.forEach(el => el.textContent = count);
}

function openCart() { document.querySelector('[data-cart-drawer]')?.classList.add('open'); }
function closeCart() { document.querySelector('[data-cart-drawer]')?.classList.remove('open'); }

function setupCartUI() {
  document.querySelectorAll('[data-open-cart]').forEach(btn => btn.addEventListener('click', openCart));
  document.querySelector('[data-close-cart]')?.addEventListener('click', closeCart);
  document.querySelector('[data-cart-items]')?.addEventListener('click', (e) => {
    const i = e.target.getAttribute('data-remove-index');
    if (i !== null) removeFromCart(Number(i));
  });
  renderCart();
}

function renderProducts(targetSel, list) {
  const wrap = document.querySelector(targetSel);
  if (!wrap) return;
  wrap.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="product-meta">
        <small class="kicker">${p.category}</small>
        <h3>${p.title}</h3>
        <div class="price">${money(p.price)}</div>
        <div class="product-actions">
          <a class="btn btn-outline" href="product.html?id=${p.id}">View Product</a>
          <button class="btn btn-primary" data-add="${p.id}">Quick Add</button>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function setupTagline() {
  const el = document.querySelector('[data-rotator]');
  if (!el) return;
  let idx = 0;
  el.textContent = TAGLINES[idx];
  setInterval(() => {
    idx = (idx + 1) % TAGLINES.length;
    el.textContent = TAGLINES[idx];
  }, 2400);
}

function setupMenu() {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-nav-links]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

function setupGlobalAdd() {
  document.body.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-add');
    if (id) addToCart(id);
  });
}

function setupShopFilters() {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;
  const cat = document.querySelector('#filter-category');
  const sort = document.querySelector('#filter-sort');
  const apply = () => {
    let list = [...PRODUCTS];
    if (cat.value !== 'All') list = list.filter(p => p.category === cat.value);
    if (sort.value === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort.value === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    if (sort.value === 'Newest') list = list.reverse();
    renderProducts('[data-shop-grid]', list);
  };
  cat.addEventListener('change', apply);
  sort.addEventListener('change', apply);
  apply();
}

function setupProductPage() {
  const detail = document.querySelector('[data-product-page]');
  if (!detail) return;
  const id = new URLSearchParams(location.search).get('id');
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  detail.querySelector('[data-product-title]').textContent = product.title;
  detail.querySelector('[data-product-price]').textContent = money(product.price);
  detail.querySelector('[data-product-category]').textContent = product.category;
  detail.querySelector('[data-product-image-main]').src = product.img;
  detail.querySelector('[data-product-image-main]').alt = product.title;

  const gallery = [product.img,
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?auto=format&fit=crop&w=700&q=80'
  ];
  const thumbs = detail.querySelector('[data-product-thumbs]');
  thumbs.innerHTML = '';
  gallery.forEach((src, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    b.innerHTML = `<img src="${src}" alt="${product.title} preview ${i + 1}" loading="lazy"/>`;
    b.addEventListener('click', () => {
      detail.querySelector('[data-product-image-main]').src = src;
      [...thumbs.children].forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
    thumbs.appendChild(b);
  });

  const sizeWrap = detail.querySelector('[data-size-options]');
  let selected = 'M';
  sizeWrap.addEventListener('click', (e) => {
    const size = e.target.getAttribute('data-size');
    if (!size) return;
    selected = size;
    sizeWrap.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  });
  detail.querySelector('[data-add-detail]').addEventListener('click', () => addToCart(product.id, 1, selected));
  renderProducts('[data-related-grid]', PRODUCTS.filter(p => p.id !== product.id).slice(0, 4));
}

function setupNewsletter() {
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!email.includes('@')) return;
      localStorage.setItem('arq_newsletter_email', email);
      const msg = form.querySelector('[data-form-msg]');
      if (msg) msg.textContent = 'Thanks for joining the Arquero Co crew.';
      form.reset();
    });
  });
}

function setupWholesaleForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.querySelector('[data-contact-msg]');
    msg.textContent = 'Inquiry submitted. Our crew will respond within 1-2 business days.';
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupTagline();
  setupGlobalAdd();
  setupCartUI();
  setupShopFilters();
  setupProductPage();
  setupNewsletter();
  setupWholesaleForm();
  renderProducts('[data-featured-grid]', PRODUCTS.slice(0, 4));
});
