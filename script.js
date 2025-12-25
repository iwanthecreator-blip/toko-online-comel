const dataProduk = [
    { id: 1, nama: "Smartwatch Elite", harga: 1200000, kategori: "Elektronik", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 2, nama: "Headphone Bass", harga: 850000, kategori: "Aksesoris", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 3, nama: "Keyboard Glow", harga: 450000, kategori: "Elektronik", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },
    { id: 4, nama: "Mouse Wireless", harga: 300000, kategori: "Aksesoris", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500" }
];

let keranjang = JSON.parse(localStorage.getItem('KERANJANG_USER')) || [];

function renderProduk(produkToDisplay = dataProduk) {
    const display = document.getElementById('product-display');
    if(!display) return;
    display.innerHTML = "";
    
    produkToDisplay.forEach(item => {
        display.innerHTML += `
            <div class="product-card">
                <img src="${item.img}">
                <div class="info">
                    <h3>${item.nama}</h3>
                    <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
                    <button onclick="tambahKeKeranjang(${item.id})">Tambah ke Keranjang</button>
                </div>
            </div>`;
    });
}

function tambahKeKeranjang(id) {
    const barang = dataProduk.find(p => p.id === id);
    if (barang) {
        keranjang.push(barang);
        simpanDanUpdate();
    }
}

// FITUR BARU: Hapus Barang Satuan
function hapusBarang(index) {
    keranjang.splice(index, 1);
    simpanDanUpdate();
}

function simpanDanUpdate() {
    localStorage.setItem('KERANJANG_USER', JSON.stringify(keranjang));
    updateKeranjangUI();
}

function updateKeranjangUI() {
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = keranjang.length;
    
    const isi = document.getElementById('isi-keranjang');
    const totalElem = document.getElementById('total-harga');
    
    if (isi) {
        if (keranjang.length === 0) {
            isi.innerHTML = "<p style='text-align:center; padding:10px;'>Keranjang kosong</p>";
            if(totalElem) totalElem.innerText = "Rp 0";
        } else {
            isi.innerHTML = "";
            let total = 0;
            keranjang.forEach((item, index) => {
                total += item.harga;
                isi.innerHTML += `
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:5px; border-bottom:1px solid #eee;">
                        <span>${item.nama}</span>
                        <span>Rp ${item.harga.toLocaleString('id-ID')} 
                            <button onclick="hapusBarang(${index})" style="color:red; border:none; background:none; cursor:pointer; font-weight:bold;">X</button>
                        </span>
                    </div>`;
            });
            if(totalElem) totalElem.innerText = "Rp " + total.toLocaleString('id-ID');
        }
    }
}

// FITUR BARU: Kirim Pesanan ke WhatsApp
function checkout() {
    if (keranjang.length === 0) return alert("Keranjang kamu masih kosong!");
    
    let pesan = "Halo Admin E-Comel, saya mau beli:\n\n";
    let total = 0;
    
    keranjang.forEach((item, index) => {
        pesan += `${index+1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
        total += item.harga;
    });
    
    pesan += `\n*Total Bayar: Rp ${total.toLocaleString('id-ID')}*`;
    
    const nomorWA = "6285814565694"; // Ganti dengan nomor WhatsApp kamu
    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    
    window.open(linkWA, '_blank');
}

function bukaKeranjang() { document.getElementById('modal-keranjang').style.display = 'block'; }
function tutupKeranjang() { document.getElementById('modal-keranjang').style.display = 'none'; }

renderProduk();
updateKeranjangUI();