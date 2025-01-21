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

        const img = document.createElement("img");
        img.src = product.image; // JSON'dan gelen görsel URL'si
        img.alt = product.name;
        productItem.appendChild(img);

        const name = document.createElement("p");
        name.textContent = product.name;
        productItem.appendChild(name);

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
        console.error(".product-detail sınıfı bulunamadı!");
    }
}

// Veriyi çek ve DOM'a ekle
fetchProducts().then(data => {
    if (data) {
        displayProducts(data);
    }
});
