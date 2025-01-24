(async function () {
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    function initializePage() {
        const productDetail = document.createElement("div");
        productDetail.className = "product-detail";
        document.body.appendChild(productDetail);

        const style = document.createElement("style");
        style.textContent = `
            .product-detail {
                padding: 20px;
                margin: 20px auto;
                max-width: 1200px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
            .carousel-title {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                font-family: Arial, sans-serif;
            }
            .carousel-container {
                display: flex;
                gap: 15px;
                overflow-x: auto;
            }
            .carousel-item {
                flex: 0 0 150px;
                text-align: center;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                background-color: #fff;
            }
            .carousel-item img {
                max-width: 100%;
                height: auto;
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(style);

        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "data:,";
        document.head.appendChild(favicon);
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

        // Başlık ekle
        const title = document.createElement("h2");
        title.className = "carousel-title";
        title.textContent = "You Might Also Like";
        productDetail.appendChild(title);

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
            heartButton.textContent = "🤍"; // Boş kalp
            heartButton.onclick = () => {
                heartButton.textContent = heartButton.textContent === "🤍" ? "💙" : "🤍";
            };

            item.appendChild(img);
            item.appendChild(name);
            item.appendChild(price);
            item.appendChild(heartButton);

            carouselContainer.appendChild(item);
        });

        productDetail.appendChild(carouselContainer);
    }

    initializePage();
    const products = await fetchProducts();
    createCarousel(products);
})();
