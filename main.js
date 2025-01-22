document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    function initializePage() {
        const productDetail = document.createElement("div");
        productDetail.className = "product-detail";
        document.body.appendChild(productDetail);

        const style = document.createElement("style");
        style.textContent = `/* CSS Kodlarınız */`;
        document.head.appendChild(style);

        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "data:,";
        document.head.appendChild(favicon);
    }

    function manageFavorites(productId) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        favorites[productId] = !favorites[productId];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return favorites;
    }

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("API Hatası");
            return await response.json();
        } catch (error) {
            console.error("Ürünleri çekerken hata oluştu:", error);
            return [];
        }
    }

    function createCarousel(products) {
        const productDetail = document.querySelector(".product-detail");
        if (!productDetail) {
            console.error(".product-detail bulunamadı!");
            return;
        }

        const carouselContainer = document.createElement("div");
        carouselContainer.className = "carousel-container";

        products.forEach(product => {
            const item = document.createElement("div");
            item.className = "carousel-item";

            const img = document.createElement("img");
            img.src = product.img || "https://via.placeholder.com/150";
            img.alt = product.name;

            const name = document.createElement("p");
            name.textContent = product.name;

            const price = document.createElement("p");
            price.textContent = `${product.price} TL`;

            const heartButton = document.createElement("button");
            heartButton.textContent = JSON.parse(localStorage.getItem("favorites"))?.[product.id] ? "💙" : "❤️";
            heartButton.onclick = () => {
                const favorites = manageFavorites(product.id);
                heartButton.textContent = favorites[product.id] ? "💙" : "❤️";
            };

            item.appendChild(img);
            item.appendChild(name);
            item.appendChild(price);
            item.appendChild(heartButton);

            carouselContainer.appendChild(item);
        });

        const prevButton = document.createElement("button");
        prevButton.className = "carousel-prev";
        prevButton.textContent = "⬅";
        prevButton.onclick = () => carouselContainer.scrollBy({ left: -200, behavior: "smooth" });

        const nextButton = document.createElement("button");
        nextButton.className = "carousel-next";
        nextButton.textContent = "➡";
        nextButton.onclick = () => carouselContainer.scrollBy({ left: 200, behavior: "smooth" });

        productDetail.appendChild(prevButton);
        productDetail.appendChild(carouselContainer);
        productDetail.appendChild(nextButton);
    }

    initializePage();
    const products = await fetchProducts();
    if (products.length === 0) {
        console.error("Ürünler yüklenemedi!");
        const productDetail = document.querySelector(".product-detail");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Ürünler şu anda görüntülenemiyor. Lütfen daha sonra tekrar deneyin.";
        errorMessage.style.color = "red";
        productDetail.appendChild(errorMessage);
        return;
    }
    createCarousel(products);
});
