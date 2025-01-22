(async function () {
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
    const localStorageKey = "productList";
    const favoriteKey = "favorites";

    // Ürünleri API'den veya localStorage'dan al
    async function fetchProducts() {
        try {
            const storedData = localStorage.getItem(localStorageKey);
            if (storedData) {
                console.log("Data loaded from localStorage.");
                return JSON.parse(storedData);
            }
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();
            localStorage.setItem(localStorageKey, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error("Failed to fetch products:", error);
            alert("Products could not be loaded. Please try again later.");
            return [];
        }
    }

    // Favorileri yönet
    function manageFavorites(productId) {
        const favorites = JSON.parse(localStorage.getItem(favoriteKey)) || {};
        favorites[productId] = !favorites[productId]; // Favori durumunu tersine çevir
        localStorage.setItem(favoriteKey, JSON.stringify(favorites));
        return favorites;
    }

    // Carousel oluştur
    function createCarousel(products) {
        const productDetailElement = document.querySelector(".product-detail");
        if (!productDetailElement) {
            console.error("'.product-detail' element not found.");
            return;
        }

        const carouselContainer = document.createElement("div");
        carouselContainer.className = "carousel-container";

        const title = document.createElement("h2");
        title.textContent = "You Might Also Like";
        carouselContainer.appendChild(title);

        const carouselTrack = document.createElement("div");
        carouselTrack.className = "carousel-track";
        carouselContainer.appendChild(carouselTrack);

        const favorites = JSON.parse(localStorage.getItem(favoriteKey)) || {};

        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.className = "carousel-item";

            const img = document.createElement("img");
            img.src = product.img || "https://via.placeholder.com/150";
            img.alt = product.name || "Product Image";
            img.onclick = () => window.open(product.url, "_blank");
            productItem.appendChild(img);

            const name = document.createElement("p");
            name.textContent = product.name || "Unnamed Product";
            productItem.appendChild(name);

            const price = document.createElement("span");
            price.textContent = `${product.price || "N/A"} TL`;
            productItem.appendChild(price);

            const favoriteButton = document.createElement("button");
            favoriteButton.innerHTML = favorites[product.id] ? "💙" : "🤍";
            favoriteButton.onclick = (e) => {
                e.stopPropagation();
                const updatedFavorites = manageFavorites(product.id);
                favoriteButton.innerHTML = updatedFavorites[product.id] ? "💙" : "🤍";
            };
            productItem.appendChild(favoriteButton);

            carouselTrack.appendChild(productItem);
        });

        const prevButton = document.createElement("button");
        prevButton.className = "carousel-prev";
        prevButton.textContent = "⬅";
        prevButton.onclick = () => scrollCarousel("left", carouselTrack);
        carouselContainer.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.className = "carousel-next";
        nextButton.textContent = "➡";
        nextButton.onclick = () => scrollCarousel("right", carouselTrack);
        carouselContainer.appendChild(nextButton);

        productDetailElement.appendChild(carouselContainer);
    }

    // Carousel kaydırma
    function scrollCarousel(direction, track) {
        const itemWidth = track.querySelector(".carousel-item").offsetWidth;
        const currentScroll = track.scrollLeft;
        track.scrollTo({
            left: direction === "left" ? currentScroll - itemWidth : currentScroll + itemWidth,
            behavior: "smooth",
        });
    }

    // Stil ekle
    function addCarouselStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .carousel-container {
                margin: 20px auto;
                padding: 10px;
                max-width: 1200px;
                background: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 10px;
                position: relative;
            }
            .carousel-container h2 {
                text-align: center;
                margin-bottom: 15px;
            }
            .carousel-track {
                display: flex;
                overflow-x: auto;
                gap: 15px;
                padding: 10px;
            }
            .carousel-item {
                flex: 0 0 calc(100% / 6.5);
                border: 1px solid #ddd;
                border-radius: 10px;
                padding: 10px;
                text-align: center;
                background: #fff;
            }
            .carousel-item img {
                width: 100%;
                height: auto;
                margin-bottom: 10px;
            }
            .carousel-item button {
                border: none;
                background: none;
                cursor: pointer;
                font-size: 1.5rem;
            }
            .carousel-prev, .carousel-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 50%;
                padding: 10px;
                cursor: pointer;
                z-index: 10;
            }
            .carousel-prev {
                left: -20px;
            }
            .carousel-next {
                right: -20px;
            }
        `;
        document.head.appendChild(style);
    }

    const products = await fetchProducts();
    if (products.length > 0) {
        addCarouselStyles();
        createCarousel(products);
    } else {
        console.error("No products found!");
    }
})();
