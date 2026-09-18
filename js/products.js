const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 1499, rating: 4.7, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 2999, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Laptop Air X', category: 'Electronics', price: 78999, rating: 4.9, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Classic Linen Shirt', category: 'Clothing', price: 1299, rating: 4.4, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Velocity Runner', category: 'Clothing', price: 2599, rating: 4.6, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'JavaScript Toolkit', category: 'Books', price: 699, rating: 4.7, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80' },
  { id: 7, name: 'Design System Guide', category: 'Books', price: 899, rating: 4.8, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80' },
  { id: 8, name: 'Urban Travel Backpack', category: 'Accessories', price: 1999, rating: 4.5, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80' },
  { id: 9, name: 'Wireless Charger', category: 'Accessories', price: 1499, rating: 4.3, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80' },
  { id: 10, name: 'Mini Bluetooth Speaker', category: 'Electronics', price: 3499, rating: 4.6, image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80' },
  { id: 11, name: 'Comfort Hoodie', category: 'Clothing', price: 1899, rating: 4.5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80' },
  { id: 12, name: 'Desk Lamp Glow', category: 'Accessories', price: 999, rating: 4.4, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' },
];

const state = {
  category: 'All',
  price: 'all',
  sort: 'featured',
};

const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.getElementById('productGrid');
const visibleCount = document.getElementById('visibleCount');

function parsePriceRange(value) {
  switch (value) {
    case 'under-500':
      return { max: 500 };
    case '500-1000':
      return { min: 500, max: 1000 };
    case '1000-2000':
      return { min: 1000, max: 2000 };
    case 'above-2000':
      return { min: 2000 };
    default:
      return {};
  }
}

function getVisibleProducts() {
  let filtered = [...products];

  if (state.category !== 'All') {
    filtered = filtered.filter((product) => product.category === state.category);
  }

  const range = parsePriceRange(state.price);
  if (range.min !== undefined || range.max !== undefined) {
    filtered = filtered.filter((product) => {
      let passes = true;
      if (range.min !== undefined) passes = passes && product.price >= range.min;
      if (range.max !== undefined) passes = passes && product.price <= range.max;
      return passes;
    });
  }

  switch (state.sort) {
    case 'price-low-high':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-high-low':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-a-z':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-z-a':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      filtered = filtered;
  }

  return filtered;
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();

  if (visibleCount) {
    visibleCount.textContent = `Showing ${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'}`;
  }

  if (!productGrid) return;

  if (visibleProducts.length === 0) {
    productGrid.innerHTML = '<div class="empty-state">No products match your current selection.</div>';
    return;
  }

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-card-content">
            <div class="product-meta">
              <span>${product.category}</span>
              <span class="rating">★ ${product.rating}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <div class="product-actions">
              <button type="button" class="btn btn-outline">View Details</button>
              <button type="button" class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
}

if (categoryFilter) {
  categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    renderProducts();
  });
}

if (priceFilter) {
  priceFilter.addEventListener('change', (event) => {
    state.price = event.target.value;
    renderProducts();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderProducts();
  });
}

renderProducts();
