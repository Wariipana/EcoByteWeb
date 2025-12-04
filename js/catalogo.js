const products = [
    {
        id: 'ram-fury-beast',
        name: 'MEM. RAM KINGSTON FURY BEAST RGB, 16GB DDR5 6400 MHz, CL32',
        details: 'Kingston Fury Beast RGB',
        partNo: 'KF564C32BBAK2-16',
        price: 80,
        category: 'ram',
        imageUrl: 'img/catalogo/MemoriaRam.jpg',
        features: [
            'Capacidad: 16GB DDR5',
            'Velocidad: 6400 MHz',
            'Latencia: CL32',
            'RGB personalizable',
            'Compatible con Intel y AMD'
        ]
    },
    {
        id: 'cooler-deepcool',
        name: 'COOLER DE PROCESADOR DEEPCOOL AK400 DIGITAL SE WH',
        details: 'Deepcool AK400 Digital White',
        partNo: 'R-AK400-WHDSEW-G',
        price: 90,
        category: 'cpu',
        imageUrl: 'img/catalogo/Cooler.jpg',
        features: [
            'Diseño en color blanco',
            'Display digital LED',
            'Disipación eficiente',
            'Compatible con múltiples sockets',
            'Bajo nivel de ruido'
        ]
    },
    {
        id: 'laptop-asus',
        name: 'LAPTOP ASUS TUF Gaming Intel Core 5 210H, 8GB DDR4, SSD 512GB, RTX 3050, 16" WUXGA',
        details: 'ASUS TUF Gaming F15',
        partNo: 'FX506HF-HN014',
        price: 1500,
        category: 'laptops',
        imageUrl: 'img/catalogo/LaptopGaming.jpg',
        features: [
            'Procesador Intel Core 5 210H',
            '8GB RAM DDR4 (expandible)',
            'SSD 512GB NVMe',
            'NVIDIA RTX 3050 4GB',
            'Pantalla 16" WUXGA 144Hz'
        ]
    },
    {
        id: 'vga-rtx3060',
        name: 'VGA ZOTAC NVIDIA GEFORCE RTX 3060 TWIN EDGE 12GB GDDR6',
        details: 'Zotac RTX 3060 Twin Edge',
        partNo: 'ZT-A30600E-10M',
        price: 120,
        category: 'gpu',
        imageUrl: 'img/catalogo/tarjetaVideo.jpg',
        features: [
            '12GB GDDR6',
            'Ray Tracing de segunda generación',
            'DLSS 2.0',
            'Sistema de enfriamiento dual',
            'Diseño compacto'
        ]
    },
    {
        id: 'hdd-wd',
        name: 'DISCO DURO WESTERN DIGITAL, 2TB SATA 7200 RPM',
        details: 'WD Blue 2TB',
        partNo: 'WD20EZAZ',
        price: 50,
        category: 'hdd',
        imageUrl: 'img/catalogo/discoduro.jpg',
        features: [
            'Capacidad: 2TB',
            'Velocidad: 7200 RPM',
            'Interfaz: SATA III 6Gb/s',
            'Cache: 256MB',
            'Confiabilidad comprobada'
        ]
    },
    {
        id: 'monitor-asus',
        name: 'MONITOR PROFESIONAL ASUS ProArt Display PA278QV, 27" IPS, WQHD, 100% sRGB, 75Hz, 5ms',
        details: 'ASUS ProArt PA278QV',
        partNo: 'PA278QV',
        price: 130,
        category: 'monitors',
        imageUrl: 'img/catalogo/monitor.jpg',
        features: [
            'Panel IPS 27 pulgadas',
            'Resolución WQHD (2560x1440)',
            '100% sRGB color accuracy',
            'Tasa de refresco 75Hz',
            'Calibración de fábrica'
        ]
    }
];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = [];
    try {
        const storedCart = localStorage.getItem('ecobyteCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    } catch (error) {
        console.error('Error al leer el carrito:', error);
    }

    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            details: product.details,
            partNo: product.partNo,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl
        });
    }

    try {
        localStorage.setItem('ecobyteCart', JSON.stringify(cart));
        updateCartButtons();
    } catch (error) {
        console.error('Error al guardar en el carrito:', error);
    }
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalPartNo = document.getElementById('modalPartNo');
    const modalPrice = document.getElementById('modalPrice');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalAddBtn = document.getElementById('modalAddBtn');

    modalImage.src = product.imageUrl;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalDetails.textContent = product.details;
    modalPartNo.textContent = `Código: ${product.partNo}`;
    modalPrice.textContent = `S/.${product.price}`;

    if (product.features && product.features.length > 0) {
        modalFeatures.innerHTML = product.features.map(feature =>
            `<li>${feature}</li>`
        ).join('');
    } else {
        modalFeatures.innerHTML = '<li>Información no disponible</li>';
    }

    modalAddBtn.onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", function() {


    const categoriesToggle = document.getElementById('categoriesToggle');
    const categoriesMenu = document.getElementById('categoriesMenu');

    if (categoriesToggle && categoriesMenu) {
        categoriesToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            categoriesMenu.classList.toggle('active');

            const buttonText = this.querySelector('span');
            if (categoriesMenu.classList.contains('active')) {
                buttonText.textContent = 'Ocultar Categorías';
            } else {
                buttonText.textContent = 'Ver Categorías';
            }
        });
    }

    const modalHTML = `
        <div id="productModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Detalles del Producto</h2>
                    <button class="modal-close" onclick="closeProductModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image-section">
                        <img id="modalImage" class="modal-image" src="" alt="">
                    </div>
                    <div class="modal-info-section">
                        <h3 id="modalTitle" class="modal-product-title"></h3>
                        <p id="modalDetails" class="modal-product-details"></p>
                        <p id="modalPartNo" class="modal-product-partno"></p>
                        
                        <div class="modal-price-section">
                            <div class="modal-price-label">Precio</div>
                            <div id="modalPrice" class="modal-price"></div>
                        </div>

                        <div class="modal-features">
                            <h3>Características principales</h3>
                            <ul id="modalFeatures"></ul>
                        </div>

                        <div class="modal-actions">
                            <button id="modalAddBtn" class="modal-btn-add">
                                <i class="fas fa-shopping-cart"></i>
                                Agregar al Carrito
                            </button>
                            <button class="modal-btn-close" onclick="closeProductModal()">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });

    function renderProducts(productsToRender) {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='https://placehold.co/250x250/CCCCCC/333333?text=Producto'">
                <h4>${product.name}</h4>
                <p class="price">S/.${product.price}</p>
                <button class="view-details" onclick="openProductModal('${product.id}')">
                    <i class="fas fa-eye"></i> Ver más
                </button>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            `;
            container.appendChild(card);
        });
    }

    document.querySelectorAll('.categories-menu li').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                renderProducts(products);
            } else {
                document.querySelectorAll('.categories-menu li').forEach(li => {
                    li.classList.remove('active');
                });

                this.classList.add('active');

                const filteredProducts = category === 'all'
                    ? products
                    : products.filter(p => p.category === category);
                renderProducts(filteredProducts);
            }

            if (window.innerWidth <= 768) {
                categoriesMenu.classList.remove('active');
                categoriesToggle.classList.remove('active');
                categoriesToggle.querySelector('span').textContent = 'Ver Categorías';
            }
        });
    });

    document.getElementById('price-filter').addEventListener('change', function() {
        const value = this.value;
        let filtered = products;

        if (value !== 'all') {
            if (value === '500+') {
                filtered = products.filter(p => p.price >= 500);
            } else {
                const [min, max] = value.split('-').map(Number);
                filtered = products.filter(p => p.price >= min && p.price <= max);
            }
        }

        renderProducts(filtered);
    });

    document.getElementById('sort-filter').addEventListener('change', function() {
        const value = this.value;
        let sorted = [...products];

        switch(value) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        renderProducts(sorted);
    });

    renderProducts(products);
    updateCartButtons();
});

function updateCartButtons() {
    let cart = [];
    try {
        const storedCart = localStorage.getItem('ecobyteCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    } catch (error) {
        console.error('Error al leer el carrito:', error);
    }

    const cartProductIds = cart.map(item => item.id);

    document.querySelectorAll('.add-to-cart').forEach(button => {
        const productId = button.getAttribute('onclick').match(/'([^']+)'/)[1];

        if (cartProductIds.includes(productId)) {
            button.innerHTML = '<i class="fas fa-check"></i> En el carrito';
            button.classList.add('in-cart');
        } else {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Agregar al Carrito';
            button.classList.remove('in-cart');
        }
    });
}