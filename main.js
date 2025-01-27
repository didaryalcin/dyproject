(async function () {
  const apiUrl =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

  // jQuery kütüphanesini ekle
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  script.type = "text/javascript";
  document.head.appendChild(script);

  script.onload = () => {
    console.log("jQuery başarıyla yüklendi!");

    function initializePage() {
      // Header ekle
      const header = document.createElement("div");
      header.style =
        "display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background-color: #fff; border-bottom: 1px solid #ccc;";

      // Logo ekle
      const logoImg = document.createElement("img");
      logoImg.src =
        "https://github.com/didaryalcin/logo1/blob/8687800eff9f13d34df5bb9e99f90e49aaa91164/logo.webp?raw=true";
      logoImg.alt = "LC Waikiki Logo";
      logoImg.style = "max-width: 150px; height: auto;";
      header.appendChild(logoImg);

      // İkonlar
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
      document.search.prepend(header);

      // Arama çubuğu
      const searchBar = $("<div>", {
        class: "search-bar",
        style: "text-align: center; margin-top: 10px; margin-bottom: 10px;",
      }).html(`
                <input type="text" placeholder="Ürün, kategori veya marka ara" style="padding: 10px; width: 300px; border: 1px solid #ccc; border-radius: 5px;">
                <button style="padding: 10px 20px; background-color: #ddd; border: none; border-radius: 5px; cursor: pointer;">Ara</button>
            `);
      $(header).after(searchBar);

      // menü
      const navMenu = $("<div>", { class: "nav-menu" }).html(`
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
            `);
      searchBar.after(navMenu);

      // Ürün detay bölümü
      const productDetail = $("<div>", { class: "product-detail" });
      $("body").append(productDetail);
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
      const productDetail = $(".product-detail");
      if (!productDetail.length) {
        console.error(".product-detail bulunamadı!");
        return;
      }

      const title = $("<h2>", {
        class: "carousel-title",
        text: "You Might Also Like",
        style:
          "text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;",
      });
      productDetail.append(title);

      const carouselContainer = $("<div>", {
        class: "carousel-container",
        style:
          "display: flex; gap: 10px; overflow: hidden; position: relative;",
      });

      // Sol ok butonu
      const prevButton = $("<button>", {
        class: "carousel-prev",
        text: "⬅",
        style:
          "position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background-color: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; z-index: 10;",
      }).on("click", () => {
        carouselContainer.scrollLeft(carouselContainer.scrollLeft() - 300);
      });

      // Sağ ok butonu
      const nextButton = $("<button>", {
        class: "carousel-next",
        text: "➡",
        style:
          "position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background-color: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; z-index: 10;",
      }).on("click", () => {
        carouselContainer.scrollLeft(carouselContainer.scrollLeft() + 300);
      });

      products.forEach((product) => {
        const item = $("<div>", {
          class: "carousel-item",
          style:
            "flex: 0 0 calc(100% / 6.5); text-align: center; border: 1px solid #ddd; border-radius: 5px; padding: 10px; background-color: #fff;",
        });
        item.data("url", product.url || "#");

        const img = $("<img>", {
          src: product.img || "https://via.placeholder.com/150",
          alt: product.name,
          style: "max-width: 100%; height: auto; margin-bottom: 10px;",
          class: "product-image",
        });
        const name = $("<p>", { text: product.name });
        const price = $("<p>", { text: `${product.price} TL` });
        const heartButton = $("<button>", {
          text: "🤍",
          class: "heart-icon",
        }).on("click", function (event) {
          event.stopPropagation();
          $(this).text($(this).text() === "🤍" ? "💙" : "🤍");
        });

        item.append(img, name, price, heartButton);
        carouselContainer.append(item);
      });

      productDetail.append(prevButton, carouselContainer, nextButton);

      // Ürün resmine tıklama
      $(document).on("click", ".product-image", function () {
        const productUrl = $(this).closest(".carousel-item").data("url");
        if (productUrl) {
          window.open(productUrl, "_blank");
        } else {
          alert("Bu ürün için bir URL bulunamadı!");
        }
      });
    }

    initializePage();
    fetchProducts().then((products) => createCarousel(products));

    // Responsive
    function applyResponsiveStyles() {
      // Mobil ekran (<768px)
      if (window.matchMedia("(max-width: 768px)").matches) {
        $(".nav-menu").css({
          "flex-direction": "column",
          "align-items": "center",
        });

        $(".carousel-item").css({
          flex: "0 0 calc(100% / 1)",
          "min-height": "220px",
        });

        $(".carousel").css({
          width: "100%",
          padding: "0 15px",
          "margin-top": "10px",
        });

        $(".carousel-title").css({
          "font-size": "16px",
        });
      }

      if (
        window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
      ) {
        $(".nav-menu").css({
          "flex-direction": "row",
          "justify-content": "center",
        });

        $(".carousel-item").css({
          flex: "0 0 calc(100% / 3)",
          "min-height": "250px",
          margin: "10px",
        });

        $(".carousel").css({
          width: "100%",
          padding: "0 20px",
        });
      }

      // Laptop ekran (1025px - 1280px)
      if (
        window.matchMedia("(min-width: 1025px) and (max-width: 1280px)").matches
      ) {
        // Nav menü ayarları
        $(".nav-menu").css({
          "flex-direction": "row",
          "justify-content": "space-between",
          "align-items": "center",
          padding: "0 20px",
        });

        // Carousel elemanları ayarları
        $(".carousel-item").css({
          flex: "0 0 calc(100% / 5)",
          margin: "10px",
          "min-height": "300px",
        });

        // Carousel genel ayarları
        $(".carousel").css({
          width: "100%",
          padding: "0 20px",
          "margin-top": "20px",
        });

        // Carousel başlık ayarları
        $(".carousel-title").css({
          "font-size": "20px",
          "text-align": "center",
        });
      }

      // Büyük monitör (>1280px)
      if (window.matchMedia("(min-width: 1281px)").matches) {
        $(".carousel-item").css({
          flex: "0 0 calc(100% / 7)",
          "min-height": "100px",
          margin: "0px",
        });

        $(".carousel-container").css({
          gap: "1px",
        });
      }
    }

    $(document).ready(applyResponsiveStyles);
    $(window).resize(applyResponsiveStyles);
  };
})();
