// Mengambil data dari LocalStorage atau pakai data default jika kosong
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Premium Headphone", price: 1500000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Mechanical Keyboard", price: 850000, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" }
];

let cart = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById('page-' + pageId).classList.remove('hidden');
    window.scrollTo(0,0);
}

function renderHome() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <div class="card-content">
                <h3 style="margin:0">${p.name}</h3>
                <p class="price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-primary" style="width:100%" onclick="addToCart(${p.id})">Tambah Keranjang</button>
                <button onclick="hapusProduk(${p.id})" style="margin-top:10px; width:100%; background:none; border:none; color:red; cursor:pointer; font-size:0.8rem">Hapus Produk (Admin)</button>
            </div>
        </div>
    `).join('');
}

function tambahProduk(e) {
    e.preventDefault();
    const newP = {
        id: Date.now(), // ID unik berdasarkan waktu
        name: document.getElementById('p-name').value,
        price: parseInt(document.getElementById('p-price').value),
        img: document.getElementById('p-img').value,
        desc: document.getElementById('p-desc').value
    };

    products.push(newP);
    localStorage.setItem('products', JSON.stringify(products)); // Simpan ke Memori Browser
    renderHome();
    showPage('home');
    document.getElementById('form-admin').reset();
}

function hapusProduk(id) {
    if(confirm('Hapus produk ini dari katalog?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderHome();
    }
}

function addToCart(id) {
    const p = products.find(prod => prod.id === id);
    cart.push(p);
    document.getElementById('cart-count').innerText = cart.length;
    updateSummary();
}

function updateSummary() {
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('checkout-summary').innerHTML = `
        <p>Total Barang: <b>${cart.length} Item</b></p>
        <p>Total Bayar: <b style="color:var(--primary)">Rp ${total.toLocaleString('id-ID')}</b></p>
    `;
}

renderHome();