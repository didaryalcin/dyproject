(async function () {
    console.log("LCW Project Initialized!");

    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    const savedProducts = JSON.parse(localStorage.getItem("productData"));

    if (savedProducts && savedProducts.length > 0) {
        console.log("Veri Local Storage'dan yüklendi.");
        createCarousel(savedProducts);
    } else {
        fetchProductsFromAPI();
    }

    // API'den Ürünleri Çekme
    async function fetchProductsFromAPI() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            console.log("API'den veri alındı ve Local Storage'a kaydedildi.");
            localStorage.setItem("productData", JSON.stringify(products));
            createCarousel(products);
        } catch (error) {
            console.error("API'ye bağlanırken hata oluştu:", error);
        }
    }

    // Karusel Oluşturma
    function createCarousel(products) {
        const wrapper = document.querySelector("#wrapper");
        if (!wrapper) {
            console.error("Wrapper bulunamadı!");
            return;
        }

        // Karusel Başlık
        const title = document.createElement("h1");
        title.textContent = "YOU MIGHT ALSO LIKE";
        title.classList.add("carousel-title");
        wrapper.appendChild(title);

        // Karusel Yapısı
        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const prevButton = document.createElement("button");
        prevButton.classList.add("carousel-prev");
        prevButton.textContent = "⬅";

        const nextButton = document.createElement("button");
        nextButton.classList.add("carousel-next");
        nextButton.textContent = "➡";

        const track = document.createElement("div");
        track.classList.add("carousel-track");

        products.forEach(product => {
            const item = document.createElement("div");
            item.classList.add("carousel-item");

            const img = document.createElement("img");
            img.src = product.img;
            img.alt = product.name;

            const name = document.createElement("p");
            name.textContent = product.name;

            const price = document.createElement("span");
            price.textContent = `${product.price} TL`;

            const favoriteBtn = document.createElement("button");
            favoriteBtn.classList.add("favorite-btn");
            favoriteBtn.textContent = checkFavorite(product.id) ? "💙" : "🤍";
            favoriteBtn.dataset.id = product.id;

            item.append(img, name, price, favoriteBtn);
            track.appendChild(item);
        });

        carousel.append(prevButton, track, nextButton);
        wrapper.appendChild(carousel);

        setCarouselEvents(track, products.length);
    }

    // Favori Kontrolü
    function checkFavorite(productId) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        return favorites.includes(productId);
    }

    // Karusel Eventleri
    function setCarouselEvents(track, totalItems) {
        const itemWidth = 200; // Tahmini genişlik
        let currentIndex = 0;

        document.querySelector(".carousel-next").addEventListener("click", () => {
            if (currentIndex + 6.5 < totalItems) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        });

        document.querySelector(".carousel-prev").addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - 6.5;
            }
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        });
    }
})();
