// Global state
let products = [];
let currentProducts = [];
let adminProducts = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProducts();
    setupEventListeners();
    setupAdminEventListeners();
});

// Initialize Application
function initializeApp() {
    // Check URL for admin access
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        showAdminSection();
    }
}

// Load Products from JSON
async function loadProducts() {
    try {
        const response = await fetch('products/products.json');
        products = await response.json();
        currentProducts = [...products];
        displayProducts(currentProducts);
        updateAdminProductsList();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to default products
        products = getDefaultProducts();
        currentProducts = [...products];
        displayProducts(currentProducts);
        updateAdminProductsList();
    }
}

// Default Products (fallback)
function getDefaultProducts() {
    return [
        {
            "id": "dt-300",
            "model": "DT-300",
            "title": "DEETREM DT-300 Power Station",
            "priceNGN": 85000,
            "currency": "NGN",
            "stockCount": 25,
            "status": "in_stock",
            "shortDescription": "Compact 300Wh power station for mobile devices and small appliances",
            "specs": {
                "batteryCapacityWh": 300,
                "acOutputWatts": 300,
                "outputVoltage": "220V",
                "inverterType": "Modified sine wave",
                "ports": ["AC", "USB-A", "12V DC"],
                "weightKg": 3.5,
                "dimensionsCm": "20x15x15",
                "solarPanelCount": 0,
                "eachPanelWatt": 0,
                "chargeController": null,
                "notes": "Perfect for camping and emergency power"
            },
            "deliveryOptions": {
                "payOnDelivery": true,
                "payBeforeDelivery": true,
                "deposit50": true
            },
            "images": ["assets/products/dt300-1.webp", "assets/products/dt300-2.webp"],
            "createdAt": "2025-01-15T00:00:00Z"
        },
        {
            "id": "dt-500",
            "model": "DT-500",
            "title": "DEETREM DT-500 Power Station",
            "priceNGN": 120000,
            "currency": "NGN",
            "stockCount": 18,
            "status": "in_stock",
            "shortDescription": "Portable 500Wh power station with pure sine wave inverter",
            "specs": {
                "batteryCapacityWh": 500,
                "acOutputWatts": 500,
                "outputVoltage": "220-240V",
                "inverterType": "Pure sine wave",
                "ports": ["AC", "USB-C", "USB-A", "12V DC"],
                "weightKg": 6.2,
                "dimensionsCm": "25x18x18",
                "solarPanelCount": 1,
                "eachPanelWatt": 200,
                "chargeController": "40A",
                "notes": "Includes 1x200W solar panel, ideal for home backup"
            },
            "deliveryOptions": {
                "payOnDelivery": true,
                "payBeforeDelivery": true,
                "deposit50": true
            },
            "images": ["assets/products/dt500-1.webp", "assets/products/dt500-2.webp"],
            "createdAt": "2025-01-20T00:00:00Z"
        },
        {
            "id": "dt-700",
            "model": "DT-700",
            "title": "DEETREM DT-700 Power Station",
            "priceNGN": 185000,
            "currency": "NGN",
            "stockCount": 12,
            "status": "in_stock",
            "shortDescription": "700Wh power station with solar charging capability",
            "specs": {
                "batteryCapacityWh": 700,
                "acOutputWatts": 700,
                "outputVoltage": "220-240V",
                "inverterType": "Pure sine wave",
                "ports": ["AC", "USB-C PD", "USB-A", "12V DC"],
                "weightKg": 8.5,
                "dimensionsCm": "28x20x20",
                "solarPanelCount": 1,
                "eachPanelWatt": 200,
                "chargeController": "40A",
                "notes": "Fast charging with USB-C Power Delivery"
            },
            "deliveryOptions": {
                "payOnDelivery": true,
                "payBeforeDelivery": true,
                "deposit50": true
            },
            "images": ["assets/products/dt700-1.webp", "assets/products/dt700-2.webp"],
            "createdAt": "2025-02-10T00:00:00Z"
        },
        {
            "id": "dt-1000",
            "model": "DT-1000",
            "title": "DEETREM DT-1000 Power Station",
            "priceNGN": 280000,
            "currency": "NGN",
            "stockCount": 8,
            "status": "low_stock",
            "shortDescription": "High-capacity 1000Wh power station with dual solar input",
            "specs": {
                "batteryCapacityWh": 1000,
                "acOutputWatts": 1000,
                "outputVoltage": "220-240V",
                "inverterType": "Pure sine wave",
                "ports": ["AC x2", "USB-C PD", "USB-A x2", "12V DC"],
                "weightKg": 12.5,
                "dimensionsCm": "32x22x22",
                "solarPanelCount": 2,
                "eachPanelWatt": 200,
                "chargeController": "50A",
                "notes": "Supports dual solar panel input for faster charging"
            },
            "deliveryOptions": {
                "payOnDelivery": true,
                "payBeforeDelivery": true,
                "deposit50": true
            },
            "images": ["assets/products/dt1000-1.webp", "assets/products/dt1000-2.webp"],
            "createdAt": "2025-02-15T00:00:00Z"
        },
        {
            "id": "dt-2000",
            "model": "DT-2000",
            "title": "DEETREM DT-2000 Power Station",
            "priceNGN": 450000,
            "currency": "NGN",
            "stockCount": 0,
            "status": "out_of_stock",
            "shortDescription": "Professional 2000Wh power station for home and business use",
            "specs": {
                "batteryCapacityWh": 2000,
                "acOutputWatts": 2000,
                "outputVoltage": "220-240V",
                "inverterType": "Pure sine wave",
                "ports": ["AC x4", "USB-C PD", "USB-A x3", "12V DC", "Anderson"],
                "weightKg": 22.0,
                "dimensionsCm": "40x28x28",
                "solarPanelCount": 2,
                "eachPanelWatt": 200,
                "chargeController": "50A",
                "notes": "Professional grade with expandable battery options"
            },
            "deliveryOptions": {
                "payOnDelivery": false,
                "payBeforeDelivery": true,
                "deposit50": true
            },
            "images": ["assets/products/dt2000-1.webp", "assets/products/dt2000-2.webp"],
            "createdAt": "2025-03-01T00:00:00Z"
        }
    ];
}

// Display Products in Grid
function displayProducts(productsToShow) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.images[0] || 'assets/products/placeholder.webp'}" 
                 alt="${product.title}" 
                 class="product-image"
                 loading="lazy"
                 onerror="this.src='assets/products/placeholder.webp'">
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-title">${product.title}</h3>
                    <div>
                        <span class="stock-badge stock-${product.status}">
                            ${getStockText(product.status)}
                        </span>
                        ${product.specs.solarPanelCount > 0 ? 
                            `<span class="stock-badge solar-badge">${product.specs.solarPanelCount} Solar</span>` : ''}
                    </div>
                </div>
                <div class="product-price">₦${product.priceNGN.toLocaleString()}</div>
                <p class="product-description">${product.shortDescription}</p>
                <div class="product-specs">
                    <div class="spec-item">
                        <span>Capacity:</span>
                        <span>${product.specs.batteryCapacityWh}Wh</span>
                    </div>
                    <div class="spec-item">
                        <span>AC Output:</span>
                        <span>${product.specs.acOutputWatts}W</span>
                    </div>
                    <div class="spec-item">
                        <span>Solar Panels:</span>
                        <span>${product.specs.solarPanelCount || 0} x ${product.specs.eachPanelWatt || 0}W</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary view-details" data-product="${product.id}">
                        View Details
                    </button>
                    <button class="btn btn-secondary quick-request" data-product="${product.id}">
                        Quick Request
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.product;
            showProductDetails(productId);
        });
    });

    document.querySelectorAll('.quick-request').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.product;
            quickRequestProduct(productId);
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const productId = card.dataset.productId;
                showProductDetails(productId);
            }
        });
    });
}

// Get Stock Status Text
function getStockText(status) {
    const statusMap = {
        'in_stock': 'In Stock',
        'low_stock': 'Low Stock',
        'out_of_stock': 'Out of Stock'
    };
    return statusMap[status] || status;
}

// Show Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content');
    
    const deliveryOptions = [];
    if (product.deliveryOptions.payOnDelivery) deliveryOptions.push('Pay on Delivery');
    if (product.deliveryOptions.payBeforeDelivery) deliveryOptions.push('Full Prepayment');
    if (product.deliveryOptions.deposit50) deliveryOptions.push('50% Deposit');
    
    content.innerHTML = `
        <div class="product-detail">
            <div class="product-gallery">
                <img src="${product.images[0] || 'assets/products/placeholder.webp'}" 
                     alt="${product.title}" 
                     class="main-product-image"
                     onerror="this.src='assets/products/placeholder.webp'">
            </div>
            <div class="product-detail-info">
                <h2>${product.title}</h2>
                <div class="product-price-large">₦${product.priceNGN.toLocaleString()}</div>
                <div class="stock-status">
                    <span class="stock-badge stock-${product.status}">
                        ${getStockText(product.status)}
                    </span>
                    <span class="stock-count">${product.stockCount} units available</span>
                </div>
                <p>${product.shortDescription}</p>
                
                <div class="specs-detailed">
                    <h4>Specifications</h4>
                    <div class="specs-grid">
                        <div class="spec-item-detailed">
                            <strong>Battery Capacity</strong>
                            <span>${product.specs.batteryCapacityWh}Wh</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>AC Output</strong>
                            <span>${product.specs.acOutputWatts}W</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Output Voltage</strong>
                            <span>${product.specs.outputVoltage}</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Inverter Type</strong>
                            <span>${product.specs.inverterType}</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Solar Panels</strong>
                            <span>${product.specs.solarPanelCount || 0} x ${product.specs.eachPanelWatt || 0}W</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Charge Controller</strong>
                            <span>${product.specs.chargeController || 'N/A'}</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Weight</strong>
                            <span>${product.specs.weightKg}kg</span>
                        </div>
                        <div class="spec-item-detailed">
                            <strong>Dimensions</strong>
                            <span>${product.specs.dimensionsCm}</span>
                        </div>
                    </div>
                </div>

                <div class="delivery-options">
                    <h4>Delivery & Payment Options</h4>
                    <p>Available options: ${deliveryOptions.join(', ')}</p>
                </div>

                <div class="message-templates">
                    <h4>Quick Message Templates</h4>
                    <button class="template-btn" data-template="1">
                        Hi, I'm interested in the DEETREM ${product.model}. Is it available? Price and delivery time?
                    </button>
                    <button class="template-btn" data-template="2">
                        Hello, I want the DEETREM ${product.model} with ${product.specs.solarPanelCount}x${product.specs.eachPanelWatt} panels. What are the payment options?
                    </button>
                    <button class="template-btn" data-template="3">
                        Hi, I'd like to buy 1 × ${product.model}. My delivery address: [Your Address]. How do I pay?
                    </button>
                </div>

                <div class="custom-message">
                    <h4>Custom Message</h4>
                    <input type="text" id="customer-name" placeholder="Your Name">
                    <input type="tel" id="customer-phone" placeholder="Your Phone">
                    <textarea id="custom-message-text" placeholder="Your custom message..."></textarea>
                    <button class="btn btn-primary" id="send-custom-message" data-product="${product.id}">
                        Send via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for template buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const templateNum = e.target.dataset.template;
            const name = document.getElementById('customer-name').value || 'Customer';
            const phone = document.getElementById('customer-phone').value || '';
            sendTemplateMessage(product, templateNum, name, phone);
        });
    });

    // Add event listener for custom message
    document.getElementById('send-custom-message').addEventListener('click', () => {
        const name = document.getElementById('customer-name').value || 'Customer';
        const phone = document.getElementById('customer-phone').value || '';
        const customMessage = document.getElementById('custom-message-text').value;
        if (customMessage.trim()) {
            sendCustomMessage(product, customMessage, name, phone);
        } else {
            alert('Please enter a message or use a template.');
        }
    });

    modal.style.display = 'block';
}

// Quick Request Product (opens WhatsApp directly)
function quickRequestProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const message = `Hi, I'm interested in the DEETREM ${product.model}. Is it available? Price: NGN ${product.priceNGN.toLocaleString()}.`;
    sendWhatsAppMessage(message);
}

// Send Template Message
function sendTemplateMessage(product, templateNum, name, phone) {
    let message = '';
    
    switch(templateNum) {
        case '1':
            message = `Hi, I'm interested in the DEETREM ${product.model}. Is it available? Price and delivery time?`;
            break;
        case '2':
            message = `Hello, I want the DEETREM ${product.model} with ${product.specs.solarPanelCount}x${product.specs.eachPanelWatt} panels. What are the payment options?`;
            break;
        case '3':
            message = `Hi, I'd like to buy 1 × ${product.model}. My delivery address: [Your Address]. How do I pay?`;
            break;
    }

    if (name && name !== 'Customer') {
        message += ` Name: ${name}`;
    }
    if (phone) {
        message += ` Phone: ${phone}`;
    }

    sendWhatsAppMessage(message);
}

// Send Custom Message
function sendCustomMessage(product, customMessage, name, phone) {
    let message = `Regarding DEETREM ${product.model}: ${customMessage}`;
    
    if (name && name !== 'Customer') {
        message += ` Name: ${name}`;
    }
    if (phone) {
        message += ` Phone: ${phone}`;
    }

    sendWhatsAppMessage(message);
}

// Send WhatsApp Message (main function)
function sendWhatsAppMessage(message) {
    // Sanitize and truncate message
    const sanitizedMessage = sanitizeMessage(message);
    
    // URL encode the message
    const encodedMessage = encodeURIComponent(sanitizedMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/2348112023440?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show notification
    showNotification();
}

// Sanitize Message
function sanitizeMessage(message) {
    // Strip HTML tags
    let sanitized = message.replace(/<[^>]*>/g, '');
    
    // Limit to 600 characters
    if (sanitized.length > 600) {
        sanitized = sanitized.substring(0, 597) + '...';
        showNotification('Message was truncated to 600 characters.');
    }
    
    return sanitized;
}

// Show Notification
function showNotification(customMessage) {
    const notification = document.getElementById('message-sent');
    if (customMessage) {
        notification.innerHTML = `<p>${customMessage}</p>`;
    }
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('product-modal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Filters
    document.getElementById('capacity-filter').addEventListener('change', filterProducts);
    document.getElementById('solar-filter').addEventListener('change', filterProducts);
    document.getElementById('stock-filter').addEventListener('change', filterProducts);

    // General inquiry form
    document.getElementById('general-inquiry-form').addEventListener('submit', handleGeneralInquiry);

    // Floating WhatsApp button
    document.getElementById('whatsapp-general').addEventListener('click', (e) => {
        e.preventDefault();
        sendWhatsAppMessage('Hello, I want to learn about DEETREM Power Stations.');
    });

    // Show admin section
    document.getElementById('show-admin').addEventListener('click', (e) => {
        e.preventDefault();
        showAdminSection();
    });

    // Close admin when clicking nav links (except admin)
    document.querySelectorAll('.nav-link:not(.admin-btn)').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('admin').style.display = 'none';
        });
    });

    // Admin button in nav
    document.querySelector('.admin-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showAdminSection();
    });
}

// Close Modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Filter Products
function filterProducts() {
    const capacityValue = document.getElementById('capacity-filter').value;
    const solarValue = document.getElementById('solar-filter').value;
    const stockValue = document.getElementById('stock-filter').value;

    let filteredProducts = products;

    if (capacityValue !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.model.includes(`DT-${capacityValue}`)
        );
    }

    if (solarValue !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.specs.solarPanelCount == solarValue
        );
    }

    if (stockValue !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.status === stockValue
        );
    }

    currentProducts = filteredProducts;
    displayProducts(filteredProducts);
}

// Handle General Inquiry Form
function handleGeneralInquiry(e) {
    e.preventDefault();
    
    const name = document.getElementById('inquiry-name').value;
    const phone = document.getElementById('inquiry-phone').value;
    const product = document.getElementById('inquiry-product').value;
    const message = document.getElementById('inquiry-message').value;
    
    let whatsappMessage = `New Inquiry: ${message}`;
    if (product) {
        whatsappMessage += ` (Product: ${product})`;
    }
    if (name) {
        whatsappMessage += ` - Name: ${name}`;
    }
    if (phone) {
        whatsappMessage += ` - Phone: ${phone}`;
    }
    
    sendWhatsAppMessage(whatsappMessage);
    e.target.reset();
}

// Show Admin Section
function showAdminSection() {
    document.getElementById('admin').style.display = 'block';
    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
    showAdminTab('upload');
}

// ADMIN FUNCTIONALITY

// Setup Admin Event Listeners
function setupAdminEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            showAdminTab(tab);
        });
    });

    // Image upload
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('product-images');
    const selectBtn = document.getElementById('select-images-btn');

    selectBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', handleImageUpload);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleImageUpload({ target: { files: e.dataTransfer.files } });
    });

    // Product form submission
    document.getElementById('product-form').addEventListener('submit', handleProductFormSubmit);

    // Export JSON
    document.getElementById('export-json').addEventListener('click', exportProductsJSON);

    // Import JSON
    document.getElementById('import-json').addEventListener('click', () => {
        document.getElementById('json-file').click();
    });

    document.getElementById('json-file').addEventListener('change', handleJSONImport);
}

// Show Admin Tab
function showAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Handle Image Upload for OCR
async function handleImageUpload(e) {
    const files = e.target.files;
    if (!files.length) return;

    const file = files[0];
    const uploadArea = document.getElementById('upload-area');
    
    // Show processing state
    uploadArea.innerHTML = '<p>Processing image with OCR... <span class="spinner"></span></p>';

    try {
        // Create image preview
        const imageUrl = URL.createObjectURL(file);
        document.getElementById('preview-image').src = imageUrl;

        // Initialize Tesseract
        const worker = await Tesseract.createWorker('eng');
        
        // Process image
        const { data: { text, words } } = await worker.recognize(file);
        
        // Parse specs from OCR text
        const specs = parseSpecsFromOCR(text, words);
        
        // Show OCR results
        showOCRResults(text, words, specs);
        
        await worker.terminate();
        
    } catch (error) {
        console.error('OCR Error:', error);
        uploadArea.innerHTML = `
            <p>Error processing image: ${error.message}</p>
            <button class="btn btn-primary" onclick="resetUploadArea()">Try Again</button>
        `;
    }
}

// Parse Specs from OCR Text
function parseSpecsFromOCR(text, words) {
    const specs = {
        batteryCapacityWh: 0,
        acOutputWatts: 0,
        solarPanelCount: 0,
        eachPanelWatt: 0,
        chargeController: null
    };

    // Convert text to lowercase for easier matching
    const lowerText = text.toLowerCase();

    // Battery capacity (Wh)
    const batteryMatch = text.match(/(\d+)\s*(Wh|Whr|W•h)/i);
    if (batteryMatch) {
        specs.batteryCapacityWh = parseInt(batteryMatch[1]);
    }

    // AC Output (W)
    const outputMatch = text.match(/(\d+)\s*(W|Watt|Watts)(?:\s*AC|\s*output)?/i);
    if (outputMatch) {
        specs.acOutputWatts = parseInt(outputMatch[1]);
    }

    // Solar panel detection
    const solarMatch = text.match(/(\d+)\s*x\s*(\d+)\s*W/i);
    if (solarMatch) {
        specs.solarPanelCount = parseInt(solarMatch[1]);
        specs.eachPanelWatt = parseInt(solarMatch[2]);
    } else {
        // Alternative patterns for solar panels
        if (lowerText.includes('2 solar') || lowerText.includes('2 panels') || lowerText.includes('two panels')) {
            specs.solarPanelCount = 2;
            specs.eachPanelWatt = 200;
        } else if (lowerText.includes('1 solar') || lowerText.includes('1 panel') || lowerText.includes('one panel')) {
            specs.solarPanelCount = 1;
            specs.eachPanelWatt = 200;
        }
    }

    // Charge controller assignment based on solar panel count
    if (specs.solarPanelCount === 2) {
        specs.chargeController = "50A";
    } else if (specs.solarPanelCount === 1) {
        specs.chargeController = "40A";
    }

    // Ah to Wh conversion if needed
    const ahMatch = text.match(/(\d+)\s*Ah/i);
    const voltageMatch = text.match(/(\d+)\s*V/i);
    if (ahMatch && voltageMatch && !batteryMatch) {
        const ah = parseInt(ahMatch[1]);
        const voltage = parseInt(voltageMatch[1]);
        specs.batteryCapacityWh = ah * voltage;
    }

    return specs;
}

// Show OCR Results
function showOCRResults(text, words, specs) {
    const ocrResults = document.getElementById('ocr-results');
    const uploadArea = document.getElementById('upload-area');
    
    // Update form with parsed values
    document.getElementById('battery-capacity').value = specs.batteryCapacityWh || '';
    document.getElementById('ac-output').value = specs.acOutputWatts || '';
    document.getElementById('solar-count').value = specs.solarPanelCount || '';
    document.getElementById('panel-wattage').value = specs.eachPanelWatt || '';
    document.getElementById('charge-controller').value = specs.chargeController || '';

    // Show OCR results section
    uploadArea.style.display = 'none';
    ocrResults.style.display = 'block';

    // Create OCR highlights on image
    createOCRHighlights(words);
}

// Create OCR Highlights
function createOCRHighlights(words) {
    const overlay = document.getElementById('ocr-overlay');
    overlay.innerHTML = '';

    words.forEach(word => {
        const bbox = word.bbox;
        const highlight = document.createElement('div');
        highlight.className = 'ocr-highlight';
        highlight.style.left = `${bbox.x0}%`;
        highlight.style.top = `${bbox.y0}%`;
        highlight.style.width = `${bbox.x1 - bbox.x0}%`;
        highlight.style.height = `${bbox.y1 - bbox.y0}%`;
        overlay.appendChild(highlight);
    });
}

// Handle Product Form Submission
function handleProductFormSubmit(e) {
    e.preventDefault();
    
    const product = {
        id: 'dt-' + Date.now(),
        model: document.getElementById('product-model').value,
        title: document.getElementById('product-title').value,
        priceNGN: parseInt(document.getElementById('product-price').value),
        currency: "NGN",
        stockCount: 0,
        status: document.getElementById('stock-status').value,
        shortDescription: "Power station with solar compatibility",
        specs: {
            batteryCapacityWh: parseInt(document.getElementById('battery-capacity').value) || 0,
            acOutputWatts: parseInt(document.getElementById('ac-output').value) || 0,
            outputVoltage: "220-240V",
            inverterType: "Pure sine wave",
            ports: ["AC", "USB-C", "USB-A", "12V DC"],
            weightKg: 0,
            dimensionsCm: "",
            solarPanelCount: parseInt(document.getElementById('solar-count').value) || 0,
            eachPanelWatt: parseInt(document.getElementById('panel-wattage').value) || 0,
            chargeController: document.getElementById('charge-controller').value,
            notes: ""
        },
        deliveryOptions: {
            payOnDelivery: true,
            payBeforeDelivery: true,
            deposit50: true
        },
        images: ["assets/products/placeholder.webp"],
        createdAt: new Date().toISOString()
    };

    // Add to products array
    products.push(product);
    currentProducts = [...products];
    
    // Update display
    updateAdminProductsList();
    displayProducts(currentProducts);
    
    // Reset form and show manage tab
    e.target.reset();
    showAdminTab('manage');
    showNotification('Product added successfully!');
}

// Update Admin Products List
function updateAdminProductsList() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;

    list.innerHTML = products.map(product => `
        <div class="admin-product-item">
            <div class="product-info">
                <h4>${product.title}</h4>
                <p>₦${product.priceNGN.toLocaleString()} • ${getStockText(product.status)}</p>
                <p>Battery: ${product.specs.batteryCapacityWh}Wh • Solar: ${product.specs.solarPanelCount}x${product.specs.eachPanelWatt}W</p>
            </div>
            <div class="product-actions">
                <button class="btn btn-secondary" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn btn-error" onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Populate form with product data
    document.getElementById('product-model').value = product.model;
    document.getElementById('product-title').value = product.title;
    document.getElementById('product-price').value = product.priceNGN;
    document.getElementById('battery-capacity').value = product.specs.batteryCapacityWh;
    document.getElementById('ac-output').value = product.specs.acOutputWatts;
    document.getElementById('solar-count').value = product.specs.solarPanelCount;
    document.getElementById('panel-wattage').value = product.specs.eachPanelWatt;
    document.getElementById('charge-controller').value = product.specs.chargeController || '';
    document.getElementById('stock-status').value = product.status;

    // Show upload tab
    showAdminTab('upload');
    
    // Remove product from list (will be re-added when form is submitted)
    products = products.filter(p => p.id !== productId);
    currentProducts = [...products];
    updateAdminProductsList();
}

// Delete Product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        currentProducts = [...products];
        updateAdminProductsList();
        displayProducts(currentProducts);
        showNotification('Product deleted successfully!');
    }
}

// Export Products JSON
function exportProductsJSON() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'products.json';
    link.click();
    
    showNotification('products.json downloaded successfully!');
}

// Handle JSON Import
function handleJSONImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedProducts = JSON.parse(e.target.result);
            products = importedProducts;
            currentProducts = [...products];
            displayProducts(currentProducts);
            updateAdminProductsList();
            showNotification('Products imported successfully!');
        } catch (error) {
            alert('Error importing JSON file: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    e.target.value = '';
}

// Reset Upload Area
function resetUploadArea() {
    const uploadArea = document.getElementById('upload-area');
    const ocrResults = document.getElementById('ocr-results');
    
    uploadArea.innerHTML = `
        <div class="upload-placeholder">
            <span class="upload-icon">📁</span>
            <p>Drag & drop product images here</p>
            <p>or</p>
            <button class="btn btn-primary" id="select-images-btn">Select Images</button>
            <input type="file" id="product-images" accept="image/*" multiple style="display: none;">
        </div>
    `;
    
    uploadArea.style.display = 'block';
    ocrResults.style.display = 'none';
    
    // Re-attach event listeners
    document.getElementById('select-images-btn').addEventListener('click', () => {
        document.getElementById('product-images').click();
    });
    document.getElementById('product-images').addEventListener('change', handleImageUpload);
}

// Make functions available globally for HTML onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.resetUploadArea = resetUploadArea;
