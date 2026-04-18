// ===================================================================
// GlowBeauty - Multi-Page E-Commerce JavaScript
// Shared script for all pages with page-specific initialization
// ===================================================================

// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: 'Vitamin C Brightening Serum',
        price: 29.99,
        image: 'images/products/product1 (1).jpg',
        category: 'skincare',
        description: 'Brightening & Anti-aging Formula',
        fullDescription: 'Our best-selling Vitamin C serum delivers powerful brightening and anti-aging benefits. Formulated with 20% pure L-ascorbic acid, hyaluronic acid, and vitamin E to visibly reduce dark spots, fine lines, and uneven skin tone. Lightweight, fast-absorbing formula suitable for all skin types.',
        badge: 'Best Seller',
        features: ['20% Pure Vitamin C', 'Hyaluronic Acid Infused', 'Paraben-Free Formula', 'Suitable for All Skin Types']
    },
    {
        id: 2,
        name: 'Rose Hydration Cream',
        price: 34.99,
        image: 'images/products/product1 (2).jpg',
        category: 'skincare',
        description: '24-Hour Hydration & Soothing',
        fullDescription: 'Luxurious rose-infused moisturizer that delivers deep hydration for up to 24 hours. Enriched with damask rose extract, shea butter, and ceramides to lock in moisture and strengthen the skin barrier. Leaves skin feeling soft, supple, and beautifully radiant.',
        badge: 'New',
        features: ['24-Hour Hydration', 'Damask Rose Extract', 'Strengthens Skin Barrier', 'Dermatologist Tested']
    },
    {
        id: 3,
        name: 'Velvet Matte Lipstick Set',
        price: 24.99,
        image: 'images/products/product1 (3).jpg',
        category: 'makeup',
        description: '6-Color Velvet Matte Collection',
        fullDescription: 'A stunning collection of 6 velvet matte lipsticks in perfectly curated shades. Long-wearing formula that glides on smoothly and stays put for up to 12 hours without drying. Enriched with vitamin E and jojoba oil for comfortable all-day wear.',
        features: ['6 Curated Shades', '12-Hour Wear', 'Vitamin E Enriched', 'Cruelty-Free']
    },
    {
        id: 4,
        name: 'Hydrating Face Mask',
        price: 15.99,
        originalPrice: 19.99,
        image: 'images/products/product1 (4).jpg',
        category: 'skincare',
        description: 'Deep Moisture Treatment',
        fullDescription: 'An intensive hydrating face mask that replenishes moisture and revitalizes tired, dull skin in just 15 minutes. Infused with hyaluronic acid, aloe vera, and green tea extract for a spa-like treatment at home. Use weekly for best results.',
        badge: 'Sale',
        features: ['15-Minute Treatment', 'Hyaluronic Acid', 'Aloe Vera Extract', 'Eco-Friendly Packaging']
    },
    {
        id: 5,
        name: 'Retinol Night Cream',
        price: 39.99,
        image: 'images/products/product1 (5).jpg',
        category: 'skincare',
        description: 'Anti-aging Overnight Treatment',
        fullDescription: 'Transform your skin overnight with our advanced retinol night cream. Formulated with encapsulated retinol, peptides, and niacinamide to reduce wrinkles, improve skin texture, and boost cell renewal while you sleep.',
        features: ['Encapsulated Retinol', 'Peptide Complex', 'Niacinamide Enriched', 'Fragrance-Free']
    },
    {
        id: 6,
        name: 'Professional Foundation Set',
        price: 44.99,
        image: 'images/products/product1 (6).jpg',
        category: 'makeup',
        description: 'Full Coverage Collection',
        fullDescription: 'Achieve a flawless, airbrushed finish with our professional-grade foundation set. Includes foundation, concealer, and setting powder in perfectly matched shades. Buildable coverage from natural to full, lasting up to 16 hours.',
        features: ['16-Hour Wear', 'Buildable Coverage', 'SPF 25 Protection', 'Oil-Free Formula']
    },
    {
        id: 7,
        name: 'Under Eye Brightening Cream',
        price: 32.99,
        image: 'images/products/product1 (7).jpg',
        category: 'skincare',
        description: 'Dark Circle Treatment',
        fullDescription: 'Target dark circles, puffiness, and fine lines with our specialized under-eye brightening cream. Powered by caffeine, vitamin K, and peptides to visibly reduce tired-looking eyes. Gentle enough for the delicate eye area.',
        features: ['Caffeine Infused', 'Vitamin K Complex', 'Reduces Puffiness', 'Ophthalmologist Tested']
    }
];

// ===== CART & WISHLIST STATE =====
let cart = JSON.parse(localStorage.getItem('glowbeauty-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('glowbeauty-wishlist')) || [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Global init for all pages
    updateCartCount();
    setupGlobalEventListeners();
    initializeAnimations();

    // Page-specific initialization
    const page = detectCurrentPage();

    switch (page) {
        case 'index':
            initHomePage();
            break;
        case 'products':
            initProductsPage();
            break;
        case 'categories':
            initCategoriesPage();
            break;
        case 'product-details':
            initProductDetailsPage();
            break;
        case 'cart':
            initCartPage();
            break;
        case 'checkout':
            initCheckoutPage();
            break;
    }
});

// Detect which page we're on
function detectCurrentPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('product-details')) return 'product-details';
    if (path.includes('products')) return 'products';
    if (path.includes('categories')) return 'categories';
    if (path.includes('cart')) return 'cart';
    if (path.includes('checkout')) return 'checkout';
    return 'index';
}

// ===== GLOBAL EVENT LISTENERS =====
function setupGlobalEventListeners() {
    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function () {
            performGlobalSearch();
        });
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performGlobalSearch();
            }
        });
    }
}

function performGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
        showNotification('Please enter a search term');
        return;
    }
    // Navigate to products page with search query
    window.location.href = 'products.html?search=' + encodeURIComponent(searchTerm);
}

// ===== CART FUNCTIONS =====
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    animateCartIcon();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();

    // Re-render if on cart page
    if (detectCurrentPage() === 'cart') {
        renderCartPage();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            if (detectCurrentPage() === 'cart') {
                renderCartPage();
            }
        }
    }
}

function saveCart() {
    localStorage.setItem('glowbeauty-cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        // Bounce animation
        el.style.transform = 'scale(1.3)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ===== WISHLIST FUNCTIONS =====
function toggleWishlist(productId, button) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        if (button) {
            button.textContent = '🤍';
        }
        showNotification(`${product.name} removed from wishlist`);
    } else {
        wishlist.push({ id: product.id, name: product.name });
        if (button) {
            button.textContent = '❤️';
        }
        showNotification(`${product.name} added to wishlist!`);
    }

    localStorage.setItem('glowbeauty-wishlist', JSON.stringify(wishlist));
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #e91e63, #9c27b0);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
    `;

    // Ensure animation keyframes exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== ANIMATION HELPERS =====
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards after a short delay to allow rendering
    setTimeout(() => {
        document.querySelectorAll('.product-card, .category-card, .showcase-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// ===== SCROLL TO TOP =====
(function () {
    let scrollBtnCreated = false;
    window.addEventListener('scroll', function () {
        if (!scrollBtnCreated) {
            const scrollBtn = document.createElement('button');
            scrollBtn.innerHTML = '↑';
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #e91e63, #9c27b0);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
            `;
            scrollBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            document.body.appendChild(scrollBtn);
            scrollBtnCreated = true;
        }

        const existingBtn = document.querySelector('.scroll-to-top');
        if (existingBtn) {
            if (window.pageYOffset > 300) {
                existingBtn.style.opacity = '1';
                existingBtn.style.visibility = 'visible';
            } else {
                existingBtn.style.opacity = '0';
                existingBtn.style.visibility = 'hidden';
            }
        }
    });
})();

// ===== PRODUCT CARD RENDER HELPER =====
function renderProductCard(product, linkToDetails = true) {
    const inWishlist = isInWishlist(product.id);
    const badgeHtml = product.badge ? `<div class="product-badge ${product.badge.toLowerCase().replace(' ', '-')}">${product.badge}</div>` : '';
    const originalPriceHtml = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
    const nameHtml = linkToDetails
        ? `<a href="product-details.html?id=${product.id}">${product.name}</a>`
        : product.name;

    return `
        <div class="product-card">
            ${badgeHtml}
            <div class="product-image">
                ${linkToDetails ? `<a href="product-details.html?id=${product.id}">` : ''}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${linkToDetails ? `</a>` : ''}
                <div class="wishlist-btn" onclick="toggleWishlist(${product.id}, this)">${inWishlist ? '❤️' : '🤍'}</div>
            </div>
            <div class="product-info">
                <h3>${nameHtml}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    ${originalPriceHtml}
                    $${product.price.toFixed(2)}
                </div>
                <button class="add-to-cart" onclick="addToCart(products.find(p => p.id === ${product.id}))">Add to Cart</button>
            </div>
        </div>
    `;
}


// =====================================================================
// PAGE-SPECIFIC INITIALIZERS
// =====================================================================

// ===== HOME PAGE =====
function initHomePage() {
    renderFeaturedProducts();
    renderShowcaseProducts();
}

function renderFeaturedProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    // Show first 6 featured products
    const featured = products.slice(0, 6);
    productGrid.innerHTML = featured.map(p => renderProductCard(p)).join('');
    initializeAnimations();
}

function renderShowcaseProducts() {
    const showcaseGrid = document.getElementById('showcaseGrid');
    if (!showcaseGrid) return;

    const showcaseProducts = products.slice(0, 8);
    let html = '';
    showcaseProducts.forEach(product => {
        html += `
            <div class="showcase-card" onclick="window.location.href='product-details.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;
    });

    showcaseGrid.innerHTML = html;
}


// ===== PRODUCTS PAGE =====
function initProductsPage() {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    // Set initial filter from URL
    if (categoryParam) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryParam) {
                btn.classList.add('active');
            }
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProductsPage();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', renderProductsPage);
    }

    // If search param, prefill and override
    if (searchParam) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = searchParam;
    }

    renderProductsPage();
}

function renderProductsPage() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');

    // Get active filter
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.dataset.category : 'all';

    // Filter products
    let filtered = [...products];

    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Search filter
    if (searchParam) {
        const term = searchParam.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect ? sortSelect.value : 'default';

    switch (sortValue) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-az':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-za':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }

    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    }

    // Render
    if (filtered.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-icon">🔍</div>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search term.</p>
            </div>
        `;
    } else {
        productGrid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
    }

    initializeAnimations();
}


// ===== CATEGORIES PAGE =====
function initCategoriesPage() {
    // Categories are static HTML, nothing dynamic needed
    initializeAnimations();
}


// ===== PRODUCT DETAILS PAGE =====
function initProductDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    const product = products.find(p => p.id === productId);
    if (!product) {
        // Redirect to products page if product not found
        const grid = document.getElementById('productDetailsGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; padding: 4rem;">
                    <div class="empty-icon">😕</div>
                    <h3>Product Not Found</h3>
                    <p>The product you're looking for doesn't exist.</p>
                    <a href="products.html" class="cta-button" style="margin-top:1rem;">Browse Products</a>
                </div>
            `;
        }
        return;
    }

    // Update page title and breadcrumb
    document.title = `${product.name} - GlowBeauty`;
    const pageTitle = document.getElementById('detailPageTitle');
    if (pageTitle) pageTitle.textContent = product.name;
    const breadcrumbName = document.getElementById('breadcrumbProductName');
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    // Render product details
    const grid = document.getElementById('productDetailsGrid');
    if (grid) {
        const badgeHtml = product.badge ? `<div class="product-badge ${product.badge.toLowerCase().replace(' ', '-')}" style="position:absolute;top:20px;left:20px;z-index:2;">${product.badge}</div>` : '';
        const originalPriceHtml = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';
        const featuresHtml = product.features ? product.features.map(f => `<li>${f}</li>`).join('') : '';
        const fullDesc = product.fullDescription || product.description;
        const inWishlist = isInWishlist(product.id);

        grid.innerHTML = `
            <div class="product-details-image">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details-info">
                <span class="product-category">${product.category}</span>
                <h1>${product.name}</h1>
                <div class="detail-price">
                    ${originalPriceHtml}
                    $${product.price.toFixed(2)}
                </div>
                <p class="detail-description">${fullDesc}</p>
                ${featuresHtml ? `<ul class="detail-features">${featuresHtml}</ul>` : ''}
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="qty-controls">
                        <button class="qty-btn" id="qtyMinus">−</button>
                        <input type="number" class="qty-value" id="qtyValue" value="1" min="1" max="10">
                        <button class="qty-btn" id="qtyPlus">+</button>
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="add-to-cart" id="detailAddToCart">Add to Cart</button>
                    <button class="wishlist-detail-btn" id="detailWishlistBtn">${inWishlist ? '❤️' : '🤍'}</button>
                </div>
            </div>
        `;

        // Quantity controls
        const qtyMinus = document.getElementById('qtyMinus');
        const qtyPlus = document.getElementById('qtyPlus');
        const qtyValue = document.getElementById('qtyValue');

        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyValue.value);
            if (val > 1) qtyValue.value = val - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyValue.value);
            if (val < 10) qtyValue.value = val + 1;
        });

        // Add to cart
        document.getElementById('detailAddToCart').addEventListener('click', () => {
            const qty = parseInt(qtyValue.value);
            for (let i = 0; i < qty; i++) {
                addToCart(product);
            }
        });

        // Wishlist
        document.getElementById('detailWishlistBtn').addEventListener('click', function () {
            toggleWishlist(product.id, this);
        });
    }

    // Render related products
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (relatedGrid) {
        const related = products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 3);

        // If not enough related, add from other categories
        if (related.length < 3) {
            const others = products
                .filter(p => p.id !== product.id && !related.some(r => r.id === p.id))
                .slice(0, 3 - related.length);
            related.push(...others);
        }

        relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join('');
        initializeAnimations();
    }
}


// ===== CART PAGE =====
function initCartPage() {
    renderCartPage();
}

function renderCartPage() {
    const layout = document.getElementById('cartPageLayout');
    if (!layout) return;

    if (cart.length === 0) {
        layout.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-icon">🛒</div>
                <h3>Your Cart is Empty</h3>
                <p>Looks like you haven't added any products yet. Start shopping to fill your cart with beautiful cosmetics!</p>
                <a href="products.html" class="cta-button">Start Shopping</a>
            </div>
        `;
        return;
    }

    const total = getCartTotal();
    const shipping = total > 50 ? 0 : 5.99;
    const grandTotal = total + shipping;

    let itemsHtml = '';
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        itemsHtml += `
            <div class="cart-page-item">
                <div class="cart-item-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>${item.description || ''}</p>
                    </div>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn-small" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn-small" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-subtotal">$${subtotal.toFixed(2)}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
    });

    layout.innerHTML = `
        <div class="cart-items-list">
            <div class="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span></span>
            </div>
            ${itemsHtml}
        </div>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal (${cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            ${total < 50 ? '<div class="summary-row" style="color:#4caf50;font-size:0.85rem;border:none;padding:0.3rem 0;"><span>Free shipping on orders over $50!</span><span></span></div>' : ''}
            <div class="summary-row total">
                <span>Total</span>
                <span>$${grandTotal.toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
            <a href="products.html" class="continue-shopping">← Continue Shopping</a>
        </div>
    `;
}


// ===== CHECKOUT PAGE =====
function initCheckoutPage() {
    renderCheckoutSummary();

    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            processOrder();
        });
    }

    // Redirect if cart is empty
    if (cart.length === 0) {
        const layout = document.getElementById('checkoutLayout');
        if (layout) {
            layout.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-icon">🛒</div>
                    <h3>Your Cart is Empty</h3>
                    <p>Add some products to your cart before checking out.</p>
                    <a href="products.html" class="cta-button">Browse Products</a>
                </div>
            `;
        }
    }
}

function renderCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (!checkoutItems) return;

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-item-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    checkoutItems.innerHTML = html;

    const total = getCartTotal();
    const shipping = total > 50 ? 0 : 5.99;
    const grandTotal = total + shipping;

    if (checkoutSubtotal) checkoutSubtotal.textContent = '$' + total.toFixed(2);
    if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
    if (checkoutTotal) checkoutTotal.textContent = '$' + grandTotal.toFixed(2);
}

function processOrder() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    // Basic validation
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const phone = formData.get('phone');
    const address = formData.get('address');

    if (!firstName || !lastName || !phone || !address) {
        showNotification('Please fill in all required fields.');
        return;
    }

    // Disable button
    const btn = document.getElementById('placeOrderBtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    // Simulate processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();

        // Show success message
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-message">
                <div class="success-icon">🎉</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you, ${firstName}! Your order has been placed successfully. You will receive a confirmation email shortly.</p>
                <a href="index.html" class="cta-button">Continue Shopping</a>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                window.location.href = 'index.html';
            }
        });
    }, 1500);
}
