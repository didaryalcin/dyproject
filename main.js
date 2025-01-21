async function fetchProducts() {
    const localStorageKey = "productList";

    // Local storage'da veri var mı kontrol et
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
        console.log("Veriler localStorage'dan alındı.");
        return JSON.parse(storedData);
    }

    // Local storage boşsa, veriyi fetch ile çek
    try {
        const response = await fetch("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json");
        if (!response.ok) {
            throw new Error(`HTTP Hatası! Durum: ${response.status}`);
        }
        const data = await response.json();

        // Veriyi localStorage'a kaydet
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log("Veriler fetch ile çekildi ve localStorage'a kaydedildi.");
        return data;
    } catch (error) {
        console.error("Veri çekme hatası:", error);
    }
}

function displayProducts(products) {
    // Yeni HTML yapısı oluştur
    const container = document.createElement("div");
    container.className = "product-carousel";

    // Başlık
    const title = document.createElement("h2");
    title.textContent = "You Might Also Like";
    container.appendChild(title);

    // Ürün listesi
    const productList = document.createElement("div");
    productList.className = "product-list";
    container.appendChild(productList);

    // Ürünleri listeye ekle
    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        // Görsel
        const img = document.createElement("img");
        img.src = product.image || "https://via.placeholder.com/150"; // Görsel yoksa placeholder göster
        img.alt = product.name || "Ürün Görseli";
        productItem.appendChild(img);

        // İsim
        const name = document.createElement("p");
        name.textContent = product.name || "Ürün Adı Yok";
        productItem.appendChild(name);

        // Fiyat
        const price = document.createElement("p");
        price.textContent = `${product.price || "Fiyat Yok"} ${product.currency || ""}`;
        productItem.appendChild(price);

        productList.appendChild(productItem);
    });

    // #wrapper içerisine ekle
    const wrapper = document.querySelector("#wrapper");
    if (wrapper) {
        wrapper.appendChild(container);
    } else {
        console.error("#wrapper öğesi bulunamadı!");
    }
}

// Veriyi çek ve DOM'a ekle
fetchProducts().then(data => {
    if (data) {
        displayProducts(data);
    }
});

// CSS ekle
const style = document.createElement("style");
style.textContent = `
    .product-carousel {
        margin: 20px auto;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
        max-width: 1200px;
    }
    .product-carousel h2 {
        text-align: center;
        font-family: Arial, sans-serif;
        margin-bottom: 20px;
    }
    .product-list {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
    }
    .product-item {
        width: 200px;
        text-align: center;
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        background-color: #fff;
        transition: transform 0.3s;
    }
    .product-item:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .product-item img {
        max-width: 100%;
        height: auto;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .product-item p {
        margin: 5px 0;
    }
    .product-item p:last-child {
        font-weight: bold;
        color: #333;
    }
`;
document.head.appendChild(style);
