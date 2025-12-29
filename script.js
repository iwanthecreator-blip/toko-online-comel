// --- DATA & STATE ---
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Premium Headphone", price: 1500000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Mechanical Keyboard", price: 850000, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" }
];

let cart = [];
let isAdminLoggedIn = false; // Status login admin

// --- NAVIGASI ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    window.scrollTo(0,0);
}

// Fungsi proteksi halaman admin
function aksesAdmin() {
    if (isAdminLoggedIn) {
        showPage('admin');
    } else {
        showPage('login');
    }
}

function cekLogin() {
    const passInput = document.getElementById('admin-password').value;
    const errorMsg = document.getElementById('login-error');
    
    if (passInput === "admin123") { // PASSWORD ADMIN
        isAdminLoggedIn = true;
        errorMsg.classList.add('hidden');
        document.getElementById('admin-password').value = "";
        showPage('admin');
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    showPage('home');
}

// --- LOGIKA PRODUK ---
function renderHome() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}">
            <div class="card-content">
                <h3 style="margin:0">${p.name}</h3>
                <p class="price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-primary" style="width:100%" onclick="addToCart(${p.id})">Tambah Keranjang</button>
                ${isAdminLoggedIn ? `<button onclick="hapusProduk(${p.id})" style="margin-top:10px; width:100%; background:none; border:none; color:red; cursor:pointer; font-size:0.8rem">Hapus Produk</button>` : ''}
            </div>
        </div>
    `).join('');
}

function tambahProduk(e) {
    e.preventDefault();
    const newP = {
        id: Date.now(),
        name: document.getElementById('p-name').value,
        price: parseInt(document.getElementById('p-price').value),
        img: document.getElementById('p-img').value,
        desc: document.getElementById('p-desc').value
    };
    products.push(newP);
    localStorage.setItem('products', JSON.stringify(products));
    renderHome();
    showPage('home');
    document.getElementById('form-admin').reset();
}

function hapusProduk(id) {
    if(confirm('Hapus produk ini?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderHome();
    }
}

// --- KERANJANG & CHECKOUT ---
function addToCart(id) {
    const p = products.find(prod => prod.id === id);
    cart.push(p);
    document.getElementById('cart-count').innerText = cart.length;
    updateSummary();
    alert("Berhasil ditambah!");
}

function updateSummary() {
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('checkout-summary').innerHTML = `
        <p>Total Barang: <b>${cart.length} Item</b></p>
        <p>Total Bayar: <b style="color:#2563eb">Rp ${total.toLocaleString('id-ID')}</b></p>
    `;
}

function prosesCheckout(e) {
    e.preventDefault();
    alert('Pesanan Terkirim!');
    cart = [];
    document.getElementById('cart-count').innerText = "0";
    showPage('home');
}

// Jalankan saat pertama buka
renderHome();