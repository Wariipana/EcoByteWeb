const CART_KEY = 'ecobyteCart';
const IGV_RATE = 0.18;
const SHIPPING_COST = 25.00;


function getCartItems() {
    try {
        const storedItems = localStorage.getItem(CART_KEY);
        if (storedItems) {
            return JSON.parse(storedItems);
        }
    } catch (error) {
        console.error("Error al leer localStorage:", error);
    }

    return JSON.parse("[]");

}


function saveCartItems(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Error al escribir en localStorage:", error);
    }
}


function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'cart-item-card';
    card.dataset.id = item.id;

    const itemTotal = item.price * item.quantity;

    card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image" onerror="this.onerror=null;this.src='https://placehold.co/120x120/CCCCCC/333333?text=Producto'">

                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.details}</p>
                    <p class="part-number">P/N: ${item.partNo}</p>
                </div>

                <div class="item-quantity">
                    <button class="quantity-btn decrease-btn" data-action="decrease">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}" readonly>
                    <button class="quantity-btn increase-btn" data-action="increase">+</button>
                </div>

                <div class="item-price-actions">
                    <span class="item-price" data-total-price="${itemTotal.toFixed(2)}">S/ ${itemTotal.toFixed(2)}</span>
                    <button class="delete-btn" data-action="delete" data-id="${item.id}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;

    card.querySelector('.increase-btn').addEventListener('click', () => updateQuantity(item.id, 1));
    card.querySelector('.decrease-btn').addEventListener('click', () => updateQuantity(item.id, -1));
    card.querySelector('.delete-btn').addEventListener('click', () => removeItem(item.id));

    return card;
}


function renderCart() {
    const items = getCartItems();
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<div class="empty-cart-message">Tu carrito está vacío. ¡Empieza a comprar ahora!</div>';
        updateSummary(0);
        return;
    }

    let newSubtotal = 0;

    items.forEach(item => {
        container.appendChild(createItemCard(item));

        newSubtotal += item.price * item.quantity;
    });

    updateSummary(newSubtotal);
}


function updateSummary(subtotal) {
    const sub = subtotal/1.18;
    const tax = subtotal -sub;
    const total = subtotal;

    document.getElementById('subtotal-amount').textContent = `S/ ${sub.toFixed(2)}`;
    document.getElementById('shipping-amount').textContent = `S/ ${SHIPPING_COST.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `S/ ${tax.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `S/ ${total.toFixed(2)}`;
}


function updateQuantity(id, delta) {
    let items = getCartItems();
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        let newQuantity = items[index].quantity + delta;

        if (newQuantity < 0) {
            newQuantity = 0;
        }

        items[index].quantity = newQuantity;
        saveCartItems(items);
        renderCart();
    }
}


function removeItem(id) {
    let items = getCartItems();
    const initialLength = items.length;

    items = items.filter(item => item.id !== id);

    if (items.length !== initialLength) {
        saveCartItems(items);
        renderCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    document.querySelector('.checkout-btn').addEventListener('click', openCheckoutModal);
    document.getElementById('modal-close').addEventListener('click', closeCheckoutModal);
    document.getElementById('cancel-btn').addEventListener('click', closeCheckoutModal);
    document.getElementById('confirm-payment-btn').addEventListener('click', confirmPayment);
    document.getElementById('close-confirmation-btn').addEventListener('click', closeCheckoutModal);

    document.getElementById('checkout-modal').addEventListener('click', (e) => {
        if (e.target.id === 'checkout-modal') {
            closeCheckoutModal();
        }
    });
});


function openCheckoutModal() {
    const items = getCartItems();
    if (items.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = total/1.18;
    const tax = total -subtotal;

    document.getElementById('modal-subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById('modal-shipping').textContent = `S/ ${SHIPPING_COST.toFixed(2)}`;
    document.getElementById('modal-tax').textContent = `S/ ${tax.toFixed(2)}`;
    document.getElementById('modal-total').textContent = `S/ ${total.toFixed(2)}`;

    document.getElementById('checkout-modal').classList.add('active');
    document.getElementById('billing-form').style.display = 'block';
    document.getElementById('confirmation-view').style.display = 'none';
    document.body.style.overflow = 'hidden';
}


function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('postal').value = '';
    document.getElementById('payment-method').value = '';
}


function confirmPayment() {
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postal = document.getElementById('postal').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (!fullname || !email || !phone || !address || !city || !postal || !paymentMethod) {
        alert('Por favor, completa todos los campos requeridos');
        return;
    }

    const orderNumber = 'ECO-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    document.getElementById('order-number').textContent = orderNumber;

    document.getElementById('billing-form').style.display = 'none';
    document.getElementById('confirmation-view').style.display = 'block';

    saveCartItems([]);
    renderCart();
}
