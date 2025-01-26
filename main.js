(async function () {
    const apiUrl = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    function initializePage() {
        // Header ekle
        const header = document.createElement("div");
        header.style = "display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background-color: #fff; border-bottom: 1px solid #ccc;";

        // Logo ekle
        const logoImg = document.createElement("img");
        logoImg.src = "https://github.com/didaryalcin/logo1/blob/8687800eff9f13d34df5bb9e99f90e49aaa91164/logo.webp?raw=true";
        logoImg.alt = "LC Waikiki Logo";
        logoImg.style = "max-width: 150px; height: auto;";
        header.appendChild(logoImg);

        // İkonları ekle
        const iconContainer = document.createElement("div");
        iconContainer.style = "display: flex; gap: 15px;";

        const userIcon = document.createElement("img");
        userIcon.src = "https://img.icons8.com/ios/50/user--v1.png";
        userIcon.alt = "User Icon";
        userIcon.style = "width: 24px; height: 24px; cursor: pointer;";
        iconContainer.appendChild(userIcon);

        const likeIcon = document.createElement("img");
        likeIcon.src = "https://img.icons8.com/ios/50/like--v1.png";
        likeIcon.alt = "Like Icon";
        likeIcon.style = "width: 24px; height: 24px; cursor: pointer;";
        iconContainer.appendChild(likeIcon);

        const shoppingIcon = document.createElement("img");
        shoppingIcon.src = "https://img.icons8.com/ios/50/shopping-bag--v1.png";
        shoppingIcon.alt = "Shopping Icon";
        shoppingIcon.style = "width: 24px; height: 24px; cursor: pointer;";
        iconContainer.appendChild(shoppingIcon);

        header.appendChild(iconContainer);
        document.body.prepend(header);

        // Ürün detay ve diğer bölümler
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

        const searchBar = document.createElement("div");
        searchBar.className = "search-bar";
        searchBar.style = "text-align: center; margin-bottom: 20px;";
        searchBar.innerHTML = `
            <input type="text" placeholder="Ürün, kategori veya marka ara" style="padding: 10px; width: 300px; border: 1px solid #ccc; border-radius: 5px;">
            <button style="padding: 10px 20px; background-color: #ddd; border: none; border-radius: 5px; cursor: pointer;">Ara</button>
        `;
        navMenu.insertAdjacentElement("afterend", searchBar);
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
        carouselContainer.style = `
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scroll-behavior: smooth;
        `;

        products.forEach(product => {
            const item = document.createElement("div");
            item.className = "carousel-item";
            item.style = `
                flex: 0 0 calc(100% / 6.5); /* 6.5 ürün görünür */
                text-align: center;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                background-color: #fff;
            `;

            const img = document.createElement("img");
            img.src = product.img || "https://via.placeholder.com/150";
            img.alt = product.name;
            img.style = "max-width: 100%; height: auto; margin-bottom: 10px;";

            const name = document.createElement("p");
            name.textContent = product.name;

            const price = document.createElement("p");
            price.textContent = `${product.price} TL`;

            const heartButton = document.createElement("button");
            heartButton.textContent = "🤍";
            heartButton.onclick = () => {
                heartButton.textContent = heartButton.textContent === "🤍" ? "💙" : "🤍";
            };

            item.appendChild(img);
            item.appendChild(name);
            item.appendChild(price);
            item.appendChild(heartButton);

            carouselContainer.appendChild(item);
        });

        const prevButton = document.createElement("button");
        prevButton.textContent = "⬅";
        prevButton.onclick = () => carouselContainer.scrollBy({ left: -200, behavior: "smooth" });

        const nextButton = document.createElement("button");
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
