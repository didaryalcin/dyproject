(async function () {
    // Sayfa yapısını başlat
    function initializePage() {
        const productDetail = document.createElement("div");
        productDetail.className = "product-detail";
        document.body.appendChild(productDetail);

        const style = document.createElement("style");
        style.textContent = `
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }
            .product-detail {
                padding: 20px;
                margin: 20px auto;
                max-width: 1200px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
            .carousel-container {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                gap: 15px;
                padding: 10px;
            }
            .carousel-item {
                flex: 0 0 calc(100% / 6.5);
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
            .carousel-prev, .carousel-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: #ddd;
                border: none;
                border-radius: 50%;
                padding: 10px;
                cursor: pointer;
                z-index: 10;
            }
            .carousel-prev {
                left: -40px;
            }
            .carousel-next {
                right: -40px;
            }
            @media (max-width: 768px) {
                .carousel-item {
                    flex: 0 0 calc(100% / 2);
                }
            }
            @media (max-width: 480px) {
                .carousel-item {
                    flex: 0 0 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Favori yönetimi
    function manageFavorites(productId) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        favorites[productId] = !favorites[productId];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return favorites;
    }

    // JSON verilerini kodda tanımlıyoruz
    async function fetchProducts() {
        const products = [
            {
                "id": 1,
                "name": "Bisiklet Yaka Düz Kısa Kollu Kadın Elbise",
                "price": "125.99",
                "img": "https://cdn.lcwaikiki.com/Resource/Images/Product/415354/0.jpg"
            },
            {
                "id": 2,
                "name": "Standart Fit Cep Detaylı Kadın Rodeo Jean Şort",
                "price": "99.99",
                "img": "https://cdn.lcwaikiki.com/Resource/Images/Product/415355/0.jpg"
            },
            {
                "id": 3,
                "name": "Bisiklet Yaka Nakış İşlemeli Uzun Kollu Viskon Kadın Bluz",
                "price": "64.99",
                "img": "https://cdn.lcwaikiki.com/Resource/Images/Product/415356/0.jpg"
            }
        ];
        localStorage.setItem("products", JSON.stringify(products)); // Verileri localStorage'a kaydedin
        return products;
    }

    // Carousel oluşturma
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

    // Başlat
    initializePage();
    const products = await fetchProducts();
    createCarousel(products);
})();
