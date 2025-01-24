(async function () {
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    function initializePage() {
        const productDetail = document.createElement("div");
        productDetail.className = "product-detail";
        document.body.appendChild(productDetail);

        const navMenu = document.createElement("div");
        navMenu.className = "nav-menu";
        navMenu.innerHTML = `
            <nav>
                <ul style="display: flex; justify-content: center; list-style: none; padding: 0; margin: 20px 0;">
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">KADIN</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">ERKEK</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">ÇOCUK & BEBEK</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">AKSESUAR</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">EV & YAŞAM</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">KOZMETİK</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer;">TÜM KATEGORİLER</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer; color: blue;">WAIKIKILAND</li>
                    <li style="margin: 0 15px; font-weight: bold; cursor: pointer; color: red;">OUTLET</li>
                </ul>
            </nav>
        `;
        document.body.insertBefore(navMenu, productDetail);

        const style = document.createElement("style");
        style.textContent = `
            .product-detail {
                padding: 20px;
                margin: 20px auto;
                max-width: 1200px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 10px;
                position: relative;
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
                scroll-behavior: smooth;
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

        // Ok butonlarını ekle
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
    createCarousel(products);
})();
