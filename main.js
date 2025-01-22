(function() {
    // Check if we are on a product page
    if (!document.querySelector('.product-detail')) return;

    // Check local storage for products or fetch them if not available
    let products = localStorage.getItem('products');
    if (!products) {
        fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('products', JSON.stringify(data));
                initializeCarousel(data);
            });
    } else {
        initializeCarousel(JSON.parse(products));
    }

    function initializeCarousel(products) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        
        // Creating HTML structure with JavaScript
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';
        carouselContainer.innerHTML = `
            <h2>You Might Also Like</h2>
            <div class="carousel-wrapper">
                <button class="carousel-control prev"><</button>
                <div class="carousel">
                    ${products.map(product => `
                        <div class="carousel-item" data-id="${product.id}">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                            <button class="favorite" style="background-color: ${favorites[product.id] ? 'blue' : 'transparent'}">❤</button>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control next">></button>
            </div>
        `;

        // Appending after .product-detail
        const productDetail = document.querySelector('.product-detail');
        if (productDetail) {
            productDetail.parentNode.insertBefore(carouselContainer, productDetail.nextSibling);
        }

        // CSS styles
        const style = document.createElement('style');
        style.innerHTML = `
            .carousel-container { text-align: center; }
            .carousel-wrapper { position: relative; overflow: hidden; width: 100%; }
            .carousel { display: flex; overflow-x: scroll; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
            .carousel-item { flex: 0 0 auto; margin-right: 10px; width: calc(100% / 6.5 - 10px); text-align: center; }
            .carousel-control { position: absolute; top: 50%; transform: translateY(-50%); padding: 10px; background: rgba(0,0,0,0.5); color: white; cursor: pointer; }
            .prev { left: 0; }
            .next { right: 0; }
            .favorite { border: none; background: transparent; font-size: 20px; cursor: pointer; }
            @media (max-width: 768px) { .carousel-item { width: calc(100% / 4 - 10px); } }
            @media (max-width: 480px) { .carousel-item { width: calc(100% / 2 - 10px); } }
        `;
        document.head.appendChild(style);

        // Event listeners
        const carousel = carouselContainer.querySelector('.carousel');
        const prevButton = carouselContainer.querySelector('.prev');
        const nextButton = carouselContainer.querySelector('.next');

        prevButton.addEventListener('click', () => carousel.scrollLeft -= carousel.offsetWidth);
        nextButton.addEventListener('click', () => carousel.scrollLeft += carousel.offsetWidth);

        carousel.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', function() {
                window.open(`product-page-url?id=${this.dataset.id}`, '_blank');
            });

            const favoriteBtn = item.querySelector('.favorite');
            favoriteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemId = this.closest('.carousel-item').dataset.id;
                if (!favorites[itemId]) {
                    favorites[itemId] = true;
                    this.style.backgroundColor = 'blue';
                } else {
                    delete favorites[itemId];
                    this.style.backgroundColor = 'transparent';
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
            });
        });
    }
})();