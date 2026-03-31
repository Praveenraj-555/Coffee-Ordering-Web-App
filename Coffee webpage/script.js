// ─── MENU DATA ───
const menuItems = [
  { id: 1,  name: 'Espresso',            emoji: '☕', category: 'hot',       price: 3.50, tag: 'Fan Fave',   desc: 'A pure, intense shot of our signature dark-roast blend. Rich crema, bold and unapologetic.' },
  { id: 2,  name: 'Caramel Latte',       emoji: '🥛', category: 'hot',       price: 5.75, tag: 'Best Seller',desc: 'Silky steamed milk, double espresso, and housemade caramel syrup topped with sweet foam.' },
  { id: 3,  name: 'Cappuccino',          emoji: '🍵', category: 'hot',       price: 4.80, tag: null,         desc: 'One-third espresso, one-third steamed milk, one-third velvety microfoam — a timeless classic.' },
  { id: 4,  name: 'Cold Brew',           emoji: '🧋', category: 'cold',      price: 5.25, tag: 'Trending',   desc: 'Steeped 18 hours in cold water for smooth, low-acid coffee with a chocolatey finish.' },
  { id: 5,  name: 'Matcha Latte',        emoji: '🍵', category: 'specialty', price: 5.50, tag: null,         desc: 'Ceremonial-grade Japanese matcha whisked with oat milk and a touch of honey. Earthy & calming.' },
  { id: 6,  name: 'Iced Mocha',          emoji: '🍫', category: 'cold',      price: 6.00, tag: null,         desc: 'Espresso, house chocolate sauce, cold milk over ice — dessert in a cup, guilt-free.' },
  { id: 7,  name: 'Vanilla Flat White',  emoji: '☕', category: 'hot',       price: 5.20, tag: null,         desc: 'Microfoam milk poured over a double ristretto shot with a hint of Madagascar vanilla.' },
  { id: 8,  name: 'Lavender Honey Latte',emoji: '💜', category: 'specialty', price: 6.25, tag: 'New',        desc: 'House lavender syrup, local raw honey, and creamy oat milk make this a floral, dreamy sip.' },
  { id: 9,  name: 'Nitro Cold Brew',     emoji: '🫧', category: 'cold',      price: 6.50, tag: 'Trending',   desc: 'Cold brew infused with nitrogen on tap — cascading bubbles, silky mouthfeel, zero bitterness.' },
  { id: 10, name: 'Croissant',           emoji: '🥐', category: 'food',      price: 3.75, tag: null,         desc: 'Buttery, golden layers baked fresh each morning. Pair it perfectly with any hot drink.' },
  { id: 11, name: 'Avocado Toast',       emoji: '🥑', category: 'food',      price: 7.50, tag: null,         desc: 'Sourdough, smashed avo, chili flakes, lemon zest & a sprinkle of hemp seeds. A café staple.' },
  { id: 12, name: 'Chai Latte',          emoji: '🫖', category: 'specialty', price: 5.00, tag: null,         desc: 'Premium masala chai concentrate simmered with ginger, cardamom, and cinnamon, topped with steamed milk.' },
];

// ─── STATE ───
let cart = {};
let quantities = {};
menuItems.forEach(item => { quantities[item.id] = 1; });

// ─── RENDER MENU ───
const grid = document.getElementById('menu-grid');

function renderMenu(filter = 'all') {
  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
  grid.innerHTML = '';
  filtered.forEach(item => {
    const inCart = cart[item.id];
    const qty = quantities[item.id] || 1;
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="card-img">
        <span>${item.emoji}</span>
        ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <div class="card-price">$${item.price.toFixed(2)}</div>
          <div style="display:flex;align-items:center;gap:0.6rem">
            <div class="qty-controls">
              <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
              <span class="qty-display" id="qty-${item.id}">${qty}</span>
              <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
            </div>
            <button class="add-btn${inCart ? ' added' : ''}" data-id="${item.id}" id="add-btn-${item.id}">
              ${inCart ? '✓ Added' : 'Add'}
            </button>
          </div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Qty buttons
  grid.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { action, id } = btn.dataset;
      const itemId = parseInt(id);
      if (action === 'inc') quantities[itemId] = (quantities[itemId] || 1) + 1;
      if (action === 'dec') quantities[itemId] = Math.max(1, (quantities[itemId] || 1) - 1);
      const disp = document.getElementById(`qty-${itemId}`);
      if (disp) disp.textContent = quantities[itemId];
      if (cart[itemId]) { cart[itemId].qty = quantities[itemId]; updateCart(); }
    });
  });

  // Add buttons
  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = parseInt(btn.dataset.id);
      const item = menuItems.find(i => i.id === itemId);
      cart[itemId] = { ...item, qty: quantities[itemId] || 1 };
      btn.textContent = '✓ Added';
      btn.classList.add('added');
      updateCart();
      bumpCartBadge();
    });
  });
}

// ─── FILTERS ───
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

// ─── CART LOGIC ───
function updateCart() {
  const itemsEl = document.getElementById('cart-items');
  const keys = Object.keys(cart).filter(k => cart[k]);
  if (keys.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><span class="cart-empty-icon">☕</span><p>Your cart is empty.<br/>Add something delicious!</p></div>';
    document.getElementById('subtotal').textContent = '$0.00';
    document.getElementById('grand-total').textContent = '$1.50';
    document.getElementById('checkout-btn').disabled = true;
    return;
  }
  document.getElementById('checkout-btn').disabled = false;
  itemsEl.innerHTML = '';
  let subtotal = 0;
  keys.forEach(k => {
    const c = cart[k];
    if (!c) return;
    subtotal += c.price * c.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="ci-icon">${c.emoji}</span>
      <div class="ci-info">
        <div class="ci-name">${c.name}</div>
        <div class="ci-price">$${c.price.toFixed(2)} each</div>
      </div>
      <div class="ci-controls">
        <button class="ci-qty-btn" data-id="${c.id}" data-act="dec">−</button>
        <span class="ci-qty" id="ci-qty-${c.id}">${c.qty}</span>
        <button class="ci-qty-btn" data-id="${c.id}" data-act="inc">+</button>
        <button class="ci-delete" data-id="${c.id}" title="Remove">🗑</button>
      </div>`;
    itemsEl.appendChild(div);
  });

  itemsEl.querySelectorAll('.ci-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (btn.dataset.act === 'inc') { cart[id].qty++; quantities[id] = cart[id].qty; }
      else { cart[id].qty--; quantities[id] = cart[id].qty; if (cart[id].qty <= 0) delete cart[id]; }
      if (!cart[id]) syncAddBtn(id, false);
      updateCart();
      bumpCartBadge();
    });
  });

  itemsEl.querySelectorAll('.ci-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      delete cart[id];
      quantities[id] = 1;
      syncAddBtn(id, false);
      updateCart();
      bumpCartBadge();
    });
  });

  const total = subtotal + 1.5;
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('grand-total').textContent = `$${total.toFixed(2)}`;
}

function syncAddBtn(id, added) {
  const btn = document.getElementById(`add-btn-${id}`);
  if (btn) { btn.textContent = added ? '✓ Added' : 'Add'; btn.classList.toggle('added', added); }
  const disp = document.getElementById(`qty-${id}`);
  if (disp) disp.textContent = quantities[id] || 1;
}

function bumpCartBadge() {
  const count = Object.values(cart).reduce((s, c) => s + (c ? c.qty : 0), 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);
}

// ─── CART OPEN/CLOSE ───
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-panel').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// ─── CHECKOUT ───
document.getElementById('checkout-btn').addEventListener('click', () => {
  const keys = Object.keys(cart).filter(k => cart[k]);
  if (!keys.length) return;
  let subtotal = 0;
  let summaryHTML = '<div class="order-summary-title">Order Summary</div>';
  keys.forEach(k => {
    const c = cart[k];
    const lineTotal = c.price * c.qty;
    subtotal += lineTotal;
    summaryHTML += `<div class="order-summary-item"><span>${c.emoji} ${c.name} ×${c.qty}</span><span>$${lineTotal.toFixed(2)}</span></div>`;
  });
  const total = subtotal + 1.5;
  summaryHTML += `<div class="order-summary-total"><span>Grand Total</span><span>$${total.toFixed(2)}</span></div>`;
  document.getElementById('order-summary').innerHTML = summaryHTML;
  closeCart();
  document.getElementById('order-overlay').classList.add('open');
});

document.getElementById('new-order-btn').addEventListener('click', () => {
  cart = {};
  menuItems.forEach(item => { quantities[item.id] = 1; });
  document.getElementById('order-overlay').classList.remove('open');
  updateCart();
  bumpCartBadge();
  renderMenu('all');
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
});

// ─── INIT ───
renderMenu();

// ─── SIMPLE CURSOR ───
const cursorDot  = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
const cursorRing = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
document.body.append(cursorDot, cursorRing);

let mx = 0, my = 0;
let rx = 0, ry = 0;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursorDot.style.left  = mx + 'px';
  cursorDot.style.top   = my + 'px';
  cursorDot.style.opacity  = 1;
  cursorRing.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = 0;
  cursorRing.style.opacity = 0;
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = 1;
  cursorRing.style.opacity = 1;
});

// Ring follows with smooth lag
(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// Hover state
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('a, button')) {
    cursorDot.classList.add('hover');
    cursorRing.classList.add('hover');
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('a, button')) {
    cursorDot.classList.remove('hover');
    cursorRing.classList.remove('hover');
  }
});

