/**
 * Global JavaScript for the theme
 */

class ThemeGlobal {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
  }

  setupEventListeners() {
    // Handle mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('.mobile-menu-toggle')) {
        this.toggleMobileMenu();
      }
    });

    // Handle search overlay
    document.addEventListener('click', (e) => {
      if (e.target.matches('.search-toggle')) {
        this.toggleSearchOverlay();
      }
      if (e.target.matches('.search-close') || e.target.matches('.search-overlay')) {
        this.closeSearchOverlay();
      }
    });

    // Handle wishlist
    document.addEventListener('click', (e) => {
      if (e.target.closest('.wishlist-toggle')) {
        this.toggleWishlist(e.target.closest('.wishlist-toggle'));
      }
    });

    // Handle quick view
    document.addEventListener('click', (e) => {
      if (e.target.closest('.quick-view-toggle')) {
        this.openQuickView(e.target.closest('.quick-view-toggle'));
      }
    });

    // Handle add to cart
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn')) {
        this.addToCart(e.target.closest('.add-to-cart-btn'));
      }
    });

    // Handle filter toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('.filter-toggle')) {
        this.toggleFilters();
      }
    });

    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  initializeComponents() {
    this.initializeProductCards();
    this.initializeSearch();
    this.initializeCart();
  }

  // Mobile Menu
  toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    }
  }

  // Search Overlay
  toggleSearchOverlay() {
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input
      const searchInput = searchOverlay.querySelector('input[type="search"]');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }

  closeSearchOverlay() {
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Wishlist
  toggleWishlist(button) {
    const productId = button.dataset.productId;
    const isActive = button.classList.contains('active');
    
    button.classList.toggle('active');
    
    // Update wishlist count
    this.updateWishlistCount(!isActive ? 1 : -1);
    
    // Store in localStorage
    this.updateWishlistStorage(productId, !isActive);
    
    // Show notification
    this.showNotification(
      !isActive ? 'Ürün favorilere eklendi' : 'Ürün favorilerden çıkarıldı',
      !isActive ? 'success' : 'info'
    );
  }

  updateWishlistCount(change) {
    const countElement = document.querySelector('#wishlist-count');
    if (countElement) {
      const currentCount = parseInt(countElement.textContent) || 0;
      const newCount = Math.max(0, currentCount + change);
      countElement.textContent = newCount;
      countElement.style.display = newCount > 0 ? 'flex' : 'none';
    }
  }

  updateWishlistStorage(productId, add) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (add) {
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
      }
    } else {
      wishlist = wishlist.filter(id => id !== productId);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  // Quick View
  openQuickView(button) {
    const productId = button.dataset.productId;
    
    // Here you would typically fetch product data and open a modal
    console.log('Opening quick view for product:', productId);
    
    // For now, just redirect to product page
    const productUrl = button.dataset.productUrl;
    if (productUrl) {
      window.location.href = productUrl;
    }
  }

  // Add to Cart
  async addToCart(button) {
    if (button.disabled) return;
    
    const productId = button.dataset.productId;
    const variantId = button.dataset.variantId;
    const quantity = parseInt(button.dataset.quantity) || 1;
    
    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = 'Ekleniyor...';
    button.disabled = true;
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        this.updateCartCount(1);
        this.showNotification('Ürün sepete eklendi', 'success');
        
        // Update cart drawer if it exists
        this.updateCartDrawer();
      } else {
        throw new Error('Ürün sepete eklenemedi');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification('Ürün sepete eklenemedi', 'error');
    } finally {
      // Restore button state
      button.innerHTML = originalText;
      button.disabled = false;
    }
  }

  updateCartCount(change) {
    const countElement = document.querySelector('#cart-count');
    if (countElement) {
      const currentCount = parseInt(countElement.textContent) || 0;
      const newCount = Math.max(0, currentCount + change);
      countElement.textContent = newCount;
    }
  }

  async updateCartDrawer() {
    // Fetch updated cart and update drawer if it exists
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // Update cart drawer content
      const cartDrawer = document.querySelector('.cart-drawer');
      if (cartDrawer) {
        // Update cart drawer with new cart data
        console.log('Updated cart:', cart);
      }
    } catch (error) {
      console.error('Failed to update cart drawer:', error);
    }
  }

  // Filters
  toggleFilters() {
    const filterSidebar = document.querySelector('.filter-sidebar');
    if (filterSidebar) {
      filterSidebar.classList.toggle('active');
      document.body.classList.toggle('filters-open');
    }
  }

  // Product Cards
  initializeProductCards() {
    // Initialize image hover effects
    document.querySelectorAll('.product-card').forEach(card => {
      const images = card.querySelectorAll('.product-image img');
      if (images.length > 1) {
        let currentIndex = 0;
        
        card.addEventListener('mouseenter', () => {
          const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            images.forEach((img, index) => {
              img.style.opacity = index === currentIndex ? '1' : '0';
            });
          }, 1000);
          
          card.dataset.interval = interval;
        });
        
        card.addEventListener('mouseleave', () => {
          clearInterval(card.dataset.interval);
          images.forEach((img, index) => {
            img.style.opacity = index === 0 ? '1' : '0';
          });
        });
      }
    });
  }

  // Search
  initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
      let timeout;
      
      input.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.performSearch(e.target.value);
        }, 300);
      });
    });
  }

  async performSearch(query) {
    if (query.length < 2) return;
    
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
      const results = await response.json();
      
      this.displaySearchSuggestions(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displaySearchSuggestions(results) {
    // Display search suggestions in dropdown
    console.log('Search results:', results);
  }

  // Cart
  initializeCart() {
    // Load cart count on page load
    this.loadCartCount();
    
    // Load wishlist from localStorage
    this.loadWishlist();
  }

  async loadCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const countElement = document.querySelector('#cart-count');
      if (countElement) {
        countElement.textContent = cart.item_count;
      }
    } catch (error) {
      console.error('Failed to load cart count:', error);
    }
  }

  loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Update wishlist count
    const countElement = document.querySelector('#wishlist-count');
    if (countElement) {
      countElement.textContent = wishlist.length;
      countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
    
    // Mark wishlist items as active
    wishlist.forEach(productId => {
      const button = document.querySelector(`[data-product-id="${productId}"].wishlist-toggle`);
      if (button) {
        button.classList.add('active');
      }
    });
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${message}</span>
        <button class="notification__close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
    
    // Manual close
    notification.querySelector('.notification__close').addEventListener('click', () => {
      notification.remove();
    });
  }

  // Modals
  closeAllModals() {
    document.querySelectorAll('.modal.active, .overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeGlobal();
});

// Add notification styles
const notificationStyles = `
  .notification {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
  }

  .notification--success {
    border-left: 4px solid rgb(16, 185, 129);
  }

  .notification--error {
    border-left: 4px solid rgb(239, 68, 68);
  }

  .notification--info {
    border-left: 4px solid rgb(37, 99, 235);
  }

  .notification__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .notification__message {
    font-size: 0.875rem;
    color: rgb(17, 24, 39);
  }

  .notification__close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: rgba(17, 24, 39, 0.5);
    cursor: pointer;
    padding: 0;
    margin-left: 1rem;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);