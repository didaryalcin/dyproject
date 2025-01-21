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
        const data = await response.json();

        // Veriyi localStorage'a kaydet
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        console.log("Veriler fetch ile çekildi ve localStorage'a kaydedildi.");
        return data;
    } catch (error) {
        console.error("Veri çekme hatası:", error);
    }
}

// DOM'a ürünleri eklemek için fonksiyon
function displayProducts(products) {
    // .product-detail sonrasına yeni bir HTML yapısı ekle
    const container = document.createElement("div");
    container.className = "product-carousel";

    // Başlık ekle
    const title = document.createElement("h2");
    title.textContent = "You Might Also Like";
    container.appendChild(title);

    // Ürün listesi oluştur
    const productList = document.createElement("div");
    productList.className = "product-list";
    container.appendChild(productList);

    // Her bir ürünü listeye ekle
    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        // Ürün görseli
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        productItem.appendChild(img);

        // Ürün adı
        const name = document.createElement("p");
        name.textContent = product.name;
        productItem.appendChild(name);

        // Ürün fiyatı
        const price = document.createElement("p");
        price.textContent = `${product.price} ${product.currency}`;
        productItem.appendChild(price);

        productList.appendChild(productItem);
    });

    // .product-detail sonrasına ekle
    const productDetail = document.querySelector(".product-detail");
    if (productDetail) {
        productDetail.after(container);
    } else {
        console.error("Ürün detay bölümü bulunamadı.");
    }
}

// JSON verisini DOM'a aktar
fetchProducts().then(data => {
    if (data) {
        displayProducts(data);
    }
});
