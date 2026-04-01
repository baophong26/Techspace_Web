class WishlistManager {
  constructor() {
    this.key = 'fashion-cube-wishlist';
  }

  // Helper to ensure we run only on client
  isClient() {
    return typeof window !== 'undefined';
  }

  // Get all items
  getItems() {
    if (!this.isClient()) return [];
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch (e) {
      return [];
    }
  }

  // Save array to local storage and broadcast event
  saveItems(items) {
    if (!this.isClient()) return;
    localStorage.setItem(this.key, JSON.stringify(items));
    window.dispatchEvent(new Event('wishlistChanged'));
  }

  // Add a product item
  addItem(product) {
    const items = this.getItems();
    // Validate if already exists using _id or id
    const existing = items.find(item => (item._id || item.id) === (product._id || product.id));
    if (!existing) {
      items.push(product);
      this.saveItems(items);
    }
  }

  // Remove by ID
  removeItem(id) {
    const items = this.getItems();
    const updated = items.filter(item => (item._id || item.id) !== id);
    this.saveItems(updated);
  }

  // Toggle item
  toggleItem(product) {
    const id = product._id || product.id;
    if (this.isInWishlist(id)) {
      this.removeItem(id);
    } else {
      this.addItem(product);
    }
  }

  // Check if item is in wishlist
  isInWishlist(id) {
    return this.getItems().some(item => (item._id || item.id) === id);
  }
}

export default new WishlistManager();
