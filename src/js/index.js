function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        let val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0.1) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
function searchData(search) {
    let towns = document.querySelectorAll(".city-popup__list-item");
    towns.forEach(function (el) {
        if (el.getAttribute("data-value").indexOf(search) === -1) {
            el.classList.add('hide');
        } else {
            el.classList.remove('hide');
        }
    })
    towns.forEach(function (el) {
        if (el.getAttribute("data-value").indexOf(search) === -1) {
            el.classList.add('hide');
        } else {
            el.classList.remove('hide');
        }
    });
}
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
window.addEventListener("load", function () {
    let fade = document.getElementById("fade");
    let header = document.getElementById("header");
    let footer = document.getElementById("footer");
    /*let headerSticky = document.getElementById("header-sticky")*/
    let addProductCart = document.getElementById("add-product-cart");
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if(window.screen.width < 1200){

            if (currentScroll <= 0) {
                body.classList.remove(scrollUp);
                header.classList.remove("active");
                addProductCart.classList.remove("active");
                return;
            }
            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
                header.classList.add("active");
                addProductCart.classList.add("active");
            } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
                header.classList.remove("active");
                addProductCart.classList.add("active");
            }
            if(footer.getBoundingClientRect().bottom / 2 - footer.getBoundingClientRect().height <= 0){
                addProductCart.classList.remove("active");
            }
            else{
                addProductCart.classList.add("active");
            }
            lastScroll = currentScroll;
        }
        else{
            if (currentScroll <= 0) {
                body.classList.remove(scrollUp);
                //header.classList.remove("active");
                //fadeOut(headerSticky);
                return;
            }
            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
                //header.classList.add("active");
                //fadeIn(headerSticky);
            }
            else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
            }
            lastScroll = currentScroll;
        }
    });
    let search = document.getElementById("search");
    let searchBackdrop = document.getElementById("search__backdrop");
    let searchInput = document.getElementById("search-input");
    let searchPopup = document.getElementById("search-autocomplete");
    let searchBtnClose = document.getElementById("autocomplete-mobile-close");
    if(searchInput !== null && searchPopup !== null && searchBtnClose !== null){
        searchInput.addEventListener('click',function (e) {

            if(!search.classList.contains("active")){
                search.classList.toggle("active")
                //fadeIn(searchPopup);
                searchPopup.classList.add("autocomplete--open")
                if(window.screen.width > 992) {
                    fadeIn(searchBackdrop)
                }
            }
            if(window.screen.width < 992) {
                document.getElementById("searchInput").blur();
                document.getElementById("searchInput-2").focus();
            }
        })
        searchBtnClose.addEventListener('click',function (e) {
            if(search.classList.contains("active")){
                search.classList.toggle("active")
                //fadeOut(searchPopup);
                searchPopup.classList.remove("autocomplete--open")
                if(window.screen.width > 992) {
                    fadeOut(searchBackdrop)
                }
            }
        });
        searchBackdrop.addEventListener('click',function (e) {
            if(search.classList.contains("active")){
                search.classList.toggle("active")
                //fadeOut(searchPopup);
                searchPopup.classList.remove("autocomplete--open")
                if(window.screen.width > 992) {
                    fadeOut(searchBackdrop)
                }
            }
        });
        /*document.addEventListener( 'click', (e) => {
            const withinBoundaries = e.composedPath().includes(search);
            if ( ! withinBoundaries ) {
                fadeOut(searchPopup)
                fadeOut(searchBackdrop)
                search.classList.toggle("active")
            }
        })*/
    }
    let headerCity = document.getElementById("header-city");
    let cityPopup = document.getElementById("city-popup");
    if(headerCity !== null && cityPopup !== null && fade !== null){
        headerCity.addEventListener("click", function (e) {
            cityPopup.classList.add("city-popup--open");
            fade.classList.add("open");
            //fadeIn(cityPopup);
            //fadeIn(fade);
        });
        fade.addEventListener("click", function (e) {
            cityPopup.classList.remove("city-popup--open");
            fade.classList.remove("open");
            //fadeOut(cityPopup);
            //fadeOut(fade);
        });
        document.querySelector(".city-popup__close").addEventListener("click", function (e){
            cityPopup.classList.remove("city-popup--open");
            fade.classList.remove("open");
            //fadeOut(cityPopup);
            //fadeOut(fade);
        })
        document.querySelectorAll(".city-popup__list-item").forEach(function (el) {
            el.addEventListener("click", function (e) {
                document.querySelector(".city-popup__input").value = el.getAttribute("data-value");
                headerCity.querySelector("span").innerHTML = el.getAttribute("data-value");
                cityPopup.classList.remove("city-popup--open");
                fade.classList.remove("open");
                //fadeOut(cityPopup);
                //fadeOut(fade);
            })
        })
        document.querySelector(".city-popup__input").addEventListener("input", function () {
            let search = this.value.toLowerCase();
            searchData(search);
        })
    }

    let headerMobTitleProfile = document.querySelector(".header-mob__title--profile");
    let headerMobMenu = document.querySelector(".header-mob__menu");
    if(headerMobTitleProfile !== null && headerMobMenu !== null ){
        headerMobTitleProfile.addEventListener("click", function (e) {
            if(headerMobTitleProfile.classList.contains("active")){
                headerMobTitleProfile.classList.toggle("active");
                headerMobMenu.classList.toggle("header-mob__menu--open")
                //fadeOut(headerMobMenu);
            }
            else{
                headerMobTitleProfile.classList.toggle("active");
                headerMobMenu.classList.toggle("header-mob__menu--open");
                //fadeIn(headerMobMenu, 'flex');
            }
        })
    }

    const svg = `<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.89896 8.14896C0.567014 8.4809 0.567014 9.01909 0.89896 9.35104C1.23091 9.68298 1.7691 9.68298 2.10104 9.35104L0.89896 8.14896ZM5.25 5L5.85104 5.60104C6.18299 5.26909 6.18299 4.7309 5.85104 4.39896L5.25 5ZM2.10104 0.648959C1.7691 0.317013 1.23091 0.317013 0.898961 0.648959C0.567015 0.980905 0.567015 1.51909 0.898961 1.85104L2.10104 0.648959ZM2.10104 9.35104L5.85104 5.60104L4.64896 4.39896L0.89896 8.14896L2.10104 9.35104ZM5.85104 4.39896L2.10104 0.648959L0.898961 1.85104L4.64896 5.60104L5.85104 4.39896Z" fill="#31353B"/>
        </svg>`;
    let headerMobItem = document.querySelectorAll(".header-mob__item");
    if(headerMobItem !== null){
        headerMobItem.forEach(function (el) {
            if(el.querySelector("ul")){
                el.insertAdjacentHTML('beforeend', svg);
            }
            el.addEventListener("click",function (e) {
                e.preventDefault();
                e.stopPropagation();
                if(this.classList.contains("header-mob__item--prev")){
                    let parent = this.parentNode;
                    parent.classList.remove('is-active');
                }
                else{
                    let parentCategory;
                    if(this.querySelector(".header-mob__link")) {
                        parentCategory = this.querySelector(".header-mob__link").innerHTML;
                    }
                    if(this.querySelector("ul")){
                        if(this.querySelector(".header-mob__item--prev")) {
                            this.querySelector(".header-mob__item--prev > span").innerHTML = parentCategory
                        }
                        this.querySelector("ul").classList.add('is-active');
                    }
                }
            })
        })
    }
    let asideMenuItem = document.querySelectorAll(".aside-menu__item");
    if(asideMenuItem !== null){
        asideMenuItem.forEach(function (el) {
            if(el.querySelector("ul")){
                el.querySelector(".aside-menu__row").insertAdjacentHTML('beforeend', svg);
            }
        })
    }

    let headerIconMobOpen = document.querySelector(".header__icon-mob");
    let headerIconMobClose = document.querySelector(".header-mob__btn");
    let headerMob = document.querySelector(".header-mob");
    let menuBackdrop = document.getElementById("menu-backdrop");
    if(window.screen.width < 1430) {
        headerIconMobOpen.addEventListener("click", function (e) {
            //fadeIn(headerMob);
            headerMob.classList.add("header-mob--open")
            if(window.screen.width > 992) {
                fadeIn(menuBackdrop)
            }
        });
        headerIconMobClose.addEventListener("click", function (e) {
            //fadeOut(headerMob);
            headerMob.classList.remove("header-mob--open")
            if(window.screen.width > 992) {
                fadeOut(menuBackdrop)
            }
        });
        menuBackdrop.addEventListener("click", function (e) {
            //fadeOut(headerMob);
            headerMob.classList.remove("header-mob--open")
            if(window.screen.width > 992) {
                fadeOut(menuBackdrop)
            }
        });
    }
    /*else if(window.innerWidth > 992 && window.innerWidth < 1430){
        let parent  = headerIconMobOpen.parentNode;
        let menu = parent.querySelector('.aside-menu');
        let backdrop = parent.querySelector('.header-menu__backdrop');
        console.log(backdrop)
        parent.addEventListener("click", function (e) {
            fadeIn(menu, 'flex');
            fadeIn(backdrop);
        });
        backdrop.addEventListener("click", function (e) {
            fadeOut(menu);
            fadeOut(backdrop);
        });
        menu.addEventListener("mouseout", function (e) {
            fadeOut(menu);
            fadeOut(backdrop);
        });
    }*/
    if(window.screen.width > 992){
        let slideZoom = document.querySelectorAll(".zoom-custom");
        if(!isEmptyObject(slideZoom)){
            slideZoom.forEach(function (el) {
                el.addEventListener("mousemove",function (e){
                    var zoomer = e.currentTarget;
                    //e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
                    //e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
                    e.offsetX ? offsetX = e.offsetX : offsetX = (e.touches) ? e.touches[0].pageX : 0;
                    e.offsetY ? offsetY = e.offsetY : offsetX = (e.touches) ? e.touches[0].pageX : 0;
                    var x = offsetX/zoomer.offsetWidth * 100
                    var y = offsetY/zoomer.offsetHeight * 100
                    zoomer.style.backgroundPosition = x + '% ' + y + '%';
                })
            })
        }
    }

    var swiperSub = new Swiper(".product__swiper-sub", {
        direction: "vertical",
        spaceBetween: 20,
        slidesPerView: 4,
        allowTouchMove: false,
        mousewheel:  true,
    });
    var swiperMain = new Swiper(".product__swiper-main", {
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        thumbs: {
            swiper: swiperSub,
        },
    });
    let productSwiperMain = document.querySelector(".product__swiper-main");
    if (productSwiperMain !== null) {
        lightGallery(productSwiperMain, {
            selector: '.product__slide ',
            subHtmlSelectorRelative: true,
            plugins: [lgThumbnail],
            thumbHeight: '50px',
            thumbWidth: 50,
            prevHtml: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M17.0404 19.1275C17.431 19.5181 17.431 20.1512 17.0404 20.5417C16.6499 20.9323 16.0168 20.9323 15.6262 20.5417L17.0404 19.1275ZM10.5 14.0013L9.79289 14.7084C9.40237 14.3179 9.40237 13.6847 9.79289 13.2942L10.5 14.0013ZM15.6262 7.46086C16.0167 7.07034 16.6499 7.07034 17.0404 7.46086C17.431 7.85139 17.431 8.48455 17.0404 8.87508L15.6262 7.46086ZM15.6262 20.5417L9.79289 14.7084L11.2071 13.2942L17.0404 19.1275L15.6262 20.5417ZM9.79289 13.2942L15.6262 7.46086L17.0404 8.87508L11.2071 14.7084L9.79289 13.2942Z" fill="white"/>\n' +
                '</svg>',
            nextHtml: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M10.9596 19.1275C10.569 19.5181 10.569 20.1512 10.9596 20.5417C11.3501 20.9323 11.9832 20.9323 12.3738 20.5417L10.9596 19.1275ZM17.5 14.0013L18.2071 14.7084C18.5976 14.3179 18.5976 13.6847 18.2071 13.2942L17.5 14.0013ZM12.3738 7.46086C11.9833 7.07034 11.3501 7.07034 10.9596 7.46086C10.569 7.85139 10.569 8.48455 10.9596 8.87508L12.3738 7.46086ZM12.3738 20.5417L18.2071 14.7084L16.7929 13.2942L10.9596 19.1275L12.3738 20.5417ZM18.2071 13.2942L12.3738 7.46086L10.9596 8.87508L16.7929 14.7084L18.2071 13.2942Z" fill="currentColor"/>\n' +
                '</svg>',
            mobileSettings: {
                showCloseIcon: true
            },
        });
    }
    function initSwiper(slider) {
        let btnNext, btnPrev;
        if (slider.querySelector(".swiper-button-next") !== null) {
            btnNext = slider.querySelector(".swiper-button-next");
        }
        if (slider.querySelector(".swiper-button-prev") !== null) {
            btnPrev = slider.querySelector(".swiper-button-prev");
        }
        var swiper = new Swiper(slider, {
            slidesPerView: "auto",
            spaceBetween: 10,
            navigation: {
                prevEl: btnPrev,
                nextEl: btnNext,
            },
            allowTouchMove: true,
            breakpoints: {
                // when window width is >= 640px
                992: {
                    allowTouchMove: false,
                    spaceBetween: 20,
                }
            },
        });
        if (btnPrev !== null && btnPrev !== btnNext){
            if (btnPrev.classList.contains('swiper-button-disabled')) {
                btnPrev.classList.remove('swiper-button-disabled')
            }
            if (btnPrev.getAttribute('aria-disabled') == "true") {
                btnPrev.classList.add('disabled')
            } else {
                btnPrev.classList.remove('disabled')
            }
            if (btnNext.classList.contains('swiper-button-disabled')) {
                btnNext.classList.remove('swiper-button-disabled')
            }
            if (btnNext.getAttribute('aria-disabled') == "true") {
                btnNext.classList.add('disabled')
            } else {
                btnNext.classList.remove('disabled')
            }
            btnPrev.addEventListener("click", function (e) {
                if (btnPrev.classList.contains('swiper-button-disabled')) {
                    btnPrev.classList.remove('swiper-button-disabled')
                }
                if (btnPrev.getAttribute('aria-disabled') == "true") {
                    btnPrev.classList.add('disabled')
                } else {
                    btnPrev.classList.remove('disabled')
                }
                if (btnNext.getAttribute('aria-disabled') == "true") {
                    btnNext.classList.add('disabled')
                } else {
                    btnNext.classList.remove('disabled')
                }
            })
            btnNext.addEventListener("click", function (e) {
                if (btnNext.classList.contains('swiper-button-disabled')) {
                    btnNext.classList.remove('swiper-button-disabled')
                }
                if (btnNext.getAttribute('aria-disabled') == "true") {
                    btnNext.classList.add('disabled')
                } else {
                    btnNext.classList.remove('disabled')
                }
                if (btnPrev.getAttribute('aria-disabled') == "true") {
                    btnPrev.classList.add('disabled')
                } else {
                    btnPrev.classList.remove('disabled')
                }
            })
        }
    }
    let productSwiper = document.querySelectorAll(".other-product-swiper");
    if(!isEmptyObject(productSwiper)){
        productSwiper.forEach(function (el) {
            initSwiper(el)
        })
    }
    /*
    var swiper = new Swiper("#latest-watched-slider", {
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            prevEl: ".other-product-swiper-prev",
            nextEl: ".other-product-swiper-next",
        },
        breakpoints: {
            // when window width is >= 640px
            992: {
                spaceBetween: 20,
            }
        }
    });
    var swiper = new Swiper("#analog-slider", {
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            prevEl: ".other-product-swiper-prev",
            nextEl: ".other-product-swiper-next",
        },
        breakpoints: {
            // when window width is >= 640px
            992: {
                spaceBetween: 20,
            }
        }
    });
    */
    /////
    const classChangeOnScroll = () => {
        document.querySelectorAll("[data-scroll_id]").forEach((el) => {
            let top = el.offsetTop - 110;
            let bottom = top + el.offsetHeight;
            let scroll = window.scrollY;
            let id = el.getAttribute("data-scroll_id");

            if (scroll > top && scroll < bottom) {
                document.querySelectorAll(".active.scroll-item").forEach((button) => {
                    button.classList.remove("active");
                });
                document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                    if (button.classList.contains("scroll-item")) {
                        button.classList.add("active");
                    }
                });
            }
        });
    };
    const scrollIntoViewWithMargin = (node, margin) => {
        const { top } = node.getBoundingClientRect();
        window.scrollTo({ top: top + window.scrollY + margin, behavior: "smooth" });
    };
    const initScrollButtons = () => {
        const scroll_buttons = document.querySelectorAll("[data-id]");
        if (!scroll_buttons) return;
        scroll_buttons.forEach((button) => {
            button.addEventListener("click", () => {
                window.removeEventListener("scroll", classChangeOnScroll);
                document.querySelectorAll(".scroll-item").forEach((select) => {
                    select.classList.remove("active");
                });
                const id = button.getAttribute("data-id");
                const target = document.querySelector(`[data-scroll_id=${id}]`);
                document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                    if (button.classList.contains("scroll-item")) {
                        button.classList.add("active");
                    }
                });
                if (!target) return;
                scrollIntoViewWithMargin(target, -110);
                setTimeout(() => {
                    window.addEventListener("scroll", classChangeOnScroll);
                }, 1000);
            });
        });
        window.addEventListener("scroll", classChangeOnScroll);
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href');
        if(id != "#"){
            const target = document.querySelector(id);
            scrollIntoViewWithMargin(target, -60);
        }
    }));
    initScrollButtons()


    function initAcc(elem, option) {
        let item = elem.querySelectorAll(".ui-accordion-item__toggle");
        let item_content = elem.querySelectorAll(".ui-collapse");
        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click', function (e) {
                let parent = this.parentElement;
                let content = this.parentElement.querySelector(".ui-collapse");
                let mouseenter_ev;
                if (!parent.classList.contains('ui-accordion-item--opened')) {
                    if (option == true) {
                        for (let i = 0; i < item.length; i++) {
                            let parent = item[i].parentElement;
                            parent.classList.remove('ui-accordion-item--opened');
                            mouseenter_ev = setTimeout(() => {
                                fadeOut(item_content[i]);
                            }, 100);
                        }
                    }
                    clearTimeout(mouseenter_ev);
                    parent.classList.add('ui-accordion-item--opened');
                    //fadeIn(content);
                } else {
                    if (option == true) {
                        for (let i = 0; i < item.length; i++) {
                            let parent = item[i].parentElement;
                            parent.classList.remove('ui-accordion-item--opened');
                            mouseenter_ev = setTimeout(() => {
                                fadeOut(item_content[i]);
                            }, 100);
                        }
                    }
                    clearTimeout(mouseenter_ev);
                    parent.classList.remove('ui-accordion-item--opened');
                    //fadeOut(content);
                }
            });
        }
    }
    if(window.screen.width < 992) {
        let instructions = document.getElementById("instructions");
        if (instructions !== null) {
            initAcc(instructions, false);
        }
    }
    let categoryMenu = document.querySelector(".category-menu-filter");
    if (categoryMenu !== null) {
        initAcc(categoryMenu, false);
    }



    let categoryMenuGroup =  document.querySelectorAll(".category-menu-group");
    if(!isEmptyObject(categoryMenuGroup)){
        categoryMenuGroup.forEach(function (item) {
            if(item.querySelector(".category-menu-group__list") !== null){
                let btn = item.querySelector(".category-menu-group__btn");
                let menuItem = item.querySelectorAll(".category-menu__item");
                if(menuItem.length <= 3){
                    fadeOut(btn)
                }
                btn.addEventListener("click", function () {
                    if(btn.classList.contains("active")){
                        btn.classList.remove("active");
                        btn.innerHTML = "Показать все";
                        menuItem.forEach(function (el,i) {
                            if(i > 2){
                                el.classList.add("hidden")
                            }
                        })
                    }
                    else{
                        btn.classList.add("active");
                        btn.innerHTML = "Скрыть";
                        menuItem.forEach(function (el) {
                            el.classList.remove("hidden")
                        })
                    }
                })
            }
        })
    }
    let catalogPanel = document.querySelector(".catalog-panel");
    if(catalogPanel !== null){
        let panels = catalogPanel.querySelectorAll(".catalog-panel__item");
        let btn = catalogPanel.querySelector(".catalog-panel__btn");
        panels.forEach(function (el,i) {
            if(window.screen.width < 992) {
                if(i > 7){
                    el.classList.add("hidden")
                }
            }
            else{
                if(i > 15){
                    el.classList.add("hidden")
                }
            }
        })
        if(btn !== null){
            btn.addEventListener("click", function (e){
                if(btn.classList.contains("active")) {
                    btn.classList.remove("active");
                    btn.innerHTML = "Показать все";
                    panels.forEach(function (el,i) {
                        if(window.screen.width < 992) {
                            if(i > 7){
                                el.classList.add("hidden")
                            }
                        }
                        else{
                            if(i > 15){
                                el.classList.add("hidden")
                            }
                        }
                    })
                }
                else{
                    btn.classList.add("active");
                    btn.innerHTML = "Скрыть";
                    panels.forEach(function (el) {
                        el.classList.remove("hidden")
                    })
                }

            })
        }
    }
    document.querySelectorAll(".btn-heart").forEach(function (btn){
        btn.addEventListener("click", function (e){
            e.preventDefault();
            e.stopPropagation()
            btn.classList.toggle("added");
        })
    })


    const selectSingle = document.querySelector('.catalog-sorting__select');
    if(selectSingle !== null){
        const selectSingle_title = selectSingle.querySelector('.catalog-sorting__title');
        const selectSingle_labels = selectSingle.querySelectorAll('.catalog-sorting__label');
        if(selectSingle_title !== null && selectSingle_labels !== null){
            selectSingle_title.addEventListener('click', () => {
                if ('active' === selectSingle.getAttribute('data-state')) {
                    selectSingle.setAttribute('data-state', '');
                } else {
                    selectSingle.setAttribute('data-state', 'active');
                }
            });
            for (let i = 0; i < selectSingle_labels.length; i++) {
                selectSingle_labels[i].addEventListener('click', (evt) => {
                    console.log(evt.target.textContent)
                    selectSingle_title.querySelector("span").innerHTML = selectSingle_labels[i].textContent; //
                    selectSingle.setAttribute('data-state', '');
                });
            }
        }
    }

    const formSelect = document.querySelector('.form-select');
    if(formSelect !== null){
        const formSelect_title = formSelect.querySelector('.form-select__title');
        const formSelect_labels = formSelect.querySelectorAll('.form-select__label');
        if(formSelect_title !== null && formSelect_labels !== null){
            formSelect_title.addEventListener('click', () => {
                if ('active' === formSelect.getAttribute('data-state')) {
                    formSelect.setAttribute('data-state', '');
                } else {
                    formSelect.setAttribute('data-state', 'active');
                }
            });
            for (let i = 0; i < formSelect_labels.length; i++) {
                formSelect_labels[i].addEventListener('click', (evt) => {
                    formSelect_title.querySelector("span").innerHTML = formSelect_labels[i].textContent; //
                    formSelect.setAttribute('data-state', '');
                });
            }
        }
    }

    const form = document.querySelector(".catalog-sorting__form");
    const select = document.querySelectorAll(".catalog-sorting__input");
    if(!isEmptyObject(select)){
        select.forEach(function (el) {
            el.addEventListener("change", function () {
                //form.submit();
            })
        })
    }

    const filterBtnMob = document.getElementById("filter-btn-mob");
    const filterBtnMobClose = document.getElementById("filter-btn-mob-close");
    const asideMenu = document.querySelector(".aside-menu--filter");
    const filterBackdrop = document.getElementById("filter-backdrop");
    if(filterBtnMob !== null && asideMenu  !== null && filterBtnMobClose !== null && filterBackdrop !== null){
        filterBtnMob.addEventListener('click', (evt) => {
            filterBtnMob.classList.toggle("active");
            asideMenu.classList.toggle("aside-menu--open");
            filterBackdrop.classList.toggle("filter-backdrop--open");
        });
        filterBtnMobClose.addEventListener('click', (evt) => {
            filterBtnMob.classList.toggle("active");
            asideMenu.classList.toggle("aside-menu--open");
            filterBackdrop.classList.toggle("filter-backdrop--open");
        });
        filterBackdrop.addEventListener('click', (evt) => {
            filterBtnMob.classList.toggle("active");
            asideMenu.classList.toggle("aside-menu--open");
            filterBackdrop.classList.toggle("filter-backdrop--open");
        });
    }
    let allData = {
        price: [0, 1200],
        checked: [],
    };
    const svgClose = `<svg width="10" height="10">
                        <use xlink:href="/img/sprites.svg#icon-close"></use>
                    </svg>`;
    let articleDiv = document.getElementById("sort-tags");
    let clearTag, elemText;
    if(articleDiv !== null){
        clearTag = document.createElement("a");
        clearTag.href = document.location.href;
        clearTag.setAttribute('class', 'sort__item df df-ai-center p3');
        elemText = document.createTextNode("Все");
        clearTag.appendChild(elemText);
        clearTag.insertAdjacentHTML('beforeend', svgClose);
        articleDiv.appendChild(clearTag)
    }
    function createTags(arr){
        articleDiv.innerText = "";
        articleDiv.appendChild(clearTag)
        if(arr.price[0]){
            let elem = document.createElement("div");
            //elem.href = "#";
            elem.setAttribute('class', 'sort__item df df-ai-center p3');
            elem.setAttribute('data-value', arr.price[0])
            let elemText = document.createTextNode("от " + arr.price[0] + " руб.");
            elem.appendChild(elemText);
            elem.insertAdjacentHTML('beforeend', svgClose);
            articleDiv.appendChild(elem)
        }
        if(arr.price[1]){
            let elem = document.createElement("div");
            //elem.href = "#";
            elem.setAttribute('class', 'sort__item df df-ai-center p3');
            let elemText = document.createTextNode("до " + arr.price[1] + " руб.");
            elem.setAttribute('data-value', arr.price[1])
            elem.appendChild(elemText);
            elem.insertAdjacentHTML('beforeend', svgClose);
            articleDiv.appendChild(elem)
        }
        arr.checked.forEach(function (el) {
            let elem = document.createElement("div");
            //elem.href = "#";
            elem.setAttribute('class', 'sort__item df df-ai-center p3');
            elem.setAttribute('data-value', el)
            let elemText = document.createTextNode(el);
            elem.appendChild(elemText);
            elem.insertAdjacentHTML('beforeend', svgClose);
            articleDiv.appendChild(elem)
        })
        let tags = articleDiv.querySelectorAll(".sort__item");
        tags.forEach(function (el){
            el.addEventListener("click", function (e){
                let value = el.getAttribute("data-value");
                document.querySelectorAll("input").forEach(function (tag){
                    if(tag.value == value){
                        el.remove();
                        if(tag.type == "number"){
                            tag.value = "";
                        }
                        else{
                            tag.checked = false;
                        }
                    }
                })
            })
        })
    }
    let filter = document.getElementById('filter-form');
    let inputsFilter;
    let createData = () => {
        let nodeList = filter.querySelectorAll('input:checked');
        let nodeNumberList = filter.querySelectorAll('input[type="number"]');
        let checked = {
            price: [],
            checked: [],
        };
        nodeNumberList.forEach((node) => {
            if(node.name == "price_min"){
                checked.price[0] = node.value;
            }
            else if(node.name == "price_max"){
                checked.price[1] = node.value;

            }
        });
        nodeList.forEach((node) => {
            checked.checked.push(node.value);
        });
        allData.checked.push(checked.checked);
        allData.checked.push(checked.price);
        //createTags(checked.checked)
        createTags(checked)
    }
    if(filter !== null){
        inputsFilter = filter.querySelectorAll('input');
        inputsFilter.forEach(input => {
            input.addEventListener('change', createData);
            input.addEventListener('keyup', createData);
        })
    }
    /*if(filter !== null){
        filter.addEventListener('submit', (event) => {
            event.preventDefault();
            if(allData.checked.length > 1){
                allData.checked = [allData.checked.pop()];
            }
        });
    }*/
    if(getCookie('cookieNotice') !== null){
        const cookieNotice = document.getElementById("cookie-notice");
        const cookieNoticeBtn = document.getElementById("cookie-notice-btn");
        if(cookieNoticeBtn !== null && cookieNotice !== null){
            if(getCookie('cookieNotice') != 1){
                cookieNotice.classList.add("cookie-notice--open");
            }
            cookieNoticeBtn.addEventListener("click", function (e){
                setCookie('cookieNotice', '1'); // {secure: true, 'max-age': 3600}
                cookieNotice.style.display = "none";
            })
        }
    }


    let FormLinks = document.querySelectorAll(".ui-tab-item");
    let FormPanels = document.querySelectorAll(".ui-tab-content");
    if (!isEmptyObject(FormPanels) && !isEmptyObject(FormLinks)) {
        for (let el of FormLinks) {
            el.addEventListener("click", e => {
                e.preventDefault();
                if (el.parentNode.parentNode.parentNode.querySelector(".ui-tab-item.ui-tab-item--active")) {
                    el.parentNode.parentNode.parentNode.querySelector(".ui-tab-item.ui-tab-item--active").classList.remove("ui-tab-item--active");
                }
                if (el.parentNode.parentNode.parentNode.querySelector(".ui-tab-content.ui-tab-content--active")) {
                    el.parentNode.parentNode.parentNode.querySelector(".ui-tab-content.ui-tab-content--active").classList.remove("ui-tab-content--active");
                }
                //const parentListItem = el.parentElement;
                el.classList.add("ui-tab-item--active");
                var index = [...el.parentElement.children].indexOf(el);
                var panel = [...el.parentNode.parentNode.parentNode.querySelectorAll(".ui-tab-content")].filter(el => el.getAttribute("data-index") == index);
                panel[0].classList.add("ui-tab-content--active");
            });
        }
    }

    const toggleContainer = this.document.querySelector('.catalog-brands__description');
    if (toggleContainer !== null) {
        const toggleText = toggleContainer.querySelector('.cms-description-text');
        let toggleTextChild;
        if (toggleText !== null) {
            toggleTextChild = toggleText.querySelectorAll("*");
        }
        let heighEl = 0;
        for (let i = 0; i < toggleTextChild.length; i++) {
            if (toggleTextChild[i].tagName === 'P') {
                toggleTextChild[i].style.display = "-webkit-box";
                toggleTextChild[i].style.webkitBoxOrient = "vertical";
                toggleTextChild[i].style.overflow = "hidden";
                toggleTextChild[i].style.webkitLineClamp = "4";
                heighEl += toggleTextChild[i].offsetHeight;
                break
            }
        }
        heighEl = heighEl + 10;
        toggleText.style.maxHeight = heighEl + "px";
        toggleContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('catalog-brands__btn') || e.target.closest('.catalog-brands__btn')) {
                if(toggleContainer.classList.contains('opened')){
                    toggleContainer.classList.remove('opened');
                    toggleContainer.querySelector(".catalog-brands__btn").innerHTML = "Показать все";
                }
                else{
                    toggleContainer.classList.add('opened');
                    toggleContainer.querySelector(".catalog-brands__btn").innerHTML = "Скрыть";
                }
            }
        })
    }

    const regexEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    let inputsEmail = document.querySelectorAll(".input-email");
    inputsEmail.forEach(function (input){
        input.addEventListener('keyup', () => {
            let parent = input.parentNode;
            if (regexEmail.test(input.value)) {
                parent.classList.remove("error");
                parent.classList.add("valid");
            } else {
                parent.classList.remove("valid");
                parent.classList.add("error");
            }
        });
    })
    let fadeForm = document.getElementById("fade-form");
    let loginPopup = document.getElementById("login-popup");
    let registrationPopup = document.getElementById("registration-popup");
    let registrationSuccess = document.getElementById("registration-success");
    let passwordForgetPopup = document.getElementById("password-forget-popup");
    let passwordForgetSuccess = document.getElementById("password-forget-success");
    let passwordBtnClose = document.getElementById("password-btn-close");
    let passwordBtnOpen = document.getElementById("password-btn-open");
    if(fadeForm !== null && loginPopup !== null && registrationPopup !== null && passwordForgetPopup !== null && registrationSuccess !== null && passwordForgetSuccess !== null){
        fadeForm.addEventListener("click", function (e) {
            loginPopup.classList.remove("login-popup--open");
            registrationPopup.classList.remove("registration-popup--open");
            passwordForgetPopup.classList.remove("password-forget--open");
            registrationSuccess.classList.remove("registration-success--open");
            passwordForgetSuccess.classList.remove("password-forget-success--open");
            fadeForm.classList.remove("open");
        });
        document.querySelectorAll(".popup__close").forEach(function (btn){
            btn.addEventListener("click", function (e){
                loginPopup.classList.remove("login-popup--open");
                registrationPopup.classList.remove("registration-popup--open");
                passwordForgetPopup.classList.remove("password-forget--open");
                fadeForm.classList.remove("open");
            })
        })
        document.querySelectorAll(".popup-success__close").forEach(function (btn){
            btn.addEventListener("click", function (e){
                registrationSuccess.classList.remove("registration-success--open");
                passwordForgetSuccess.classList.remove("password-forget-success--open");
                fadeForm.classList.remove("open");
            })
        })
        document.querySelectorAll(".popup-success__btn").forEach(function (btn){
            btn.addEventListener("click", function (e){
                registrationSuccess.classList.remove("registration-success--open");
                passwordForgetSuccess.classList.remove("password-forget-success--open");
                fadeForm.classList.remove("open");
            })
        })
        passwordBtnClose.addEventListener("click", function (e){
            passwordBtnClose.classList.add("hidden");
            passwordBtnOpen.classList.remove("hidden");
            passwordBtnClose.parentNode.querySelector("input").type = "text";
        })
        passwordBtnOpen.addEventListener("click", function (e){
            passwordBtnOpen.classList.add("hidden");
            passwordBtnClose.classList.remove("hidden");
            passwordBtnOpen.parentNode.querySelector("input").type = "password";
        })
        let loginForm = loginPopup.querySelector(".login-form");
        loginForm.addEventListener('keyup', () => {
            let inputs =loginForm.querySelectorAll("input");
            let empty = false;
            let btn = loginForm.querySelector("button");
            inputs.forEach(function (input){
                let parent = input.parentNode;
                console.log(input)
                if(input.value == "" ){
                    empty = true;
                }
                if(parent.classList.contains("error")){
                    empty = true;
                }
                if(input.classList.contains("input-password")){
                    if(input.value.length < 6 ){
                        empty = true;
                    }
                }
            })
            if(empty == false){
                btn.removeAttribute("disabled");
            }
            else{
                btn.setAttribute("disabled","disabled");
            }
        });
        let registrationForm = registrationPopup.querySelector(".registration-form");
        registrationForm.addEventListener('keyup', () => {
            let inputs = registrationForm.querySelectorAll("input");
            let empty = false;
            let btn = registrationForm.querySelector("button");
            inputs.forEach(function (input){
                let parent = input.parentNode;
                if(input.value == "" ){
                    empty = true;
                }
                if(parent.classList.contains("error")){
                    empty = true;
                }
            })
            if(empty == false){
                btn.removeAttribute("disabled");
            }
            else{
                btn.setAttribute("disabled","disabled");
            }
        });

        let passwordForgetForm = passwordForgetPopup.querySelector(".password-forget-form");
        passwordForgetForm.addEventListener('keyup', () => {
            let inputs = passwordForgetForm.querySelectorAll("input");
            let empty = false;
            let btn = passwordForgetForm.querySelector("button");
            inputs.forEach(function (input){
                let parent = input.parentNode;
                if(input.value == "" ){
                    empty = true;
                }
                if(parent.classList.contains("error")){
                    empty = true;
                }
            })
            if(empty == false){
                btn.removeAttribute("disabled");
            }
            else{
                btn.setAttribute("disabled","disabled");
            }
        });
    }

    let textPageMenuList = document.querySelector(".text-page-menu__list");
    let textPageContent = document.getElementById("text-page-content");
    if(textPageMenuList !== null && textPageContent !== null){
        let titles = textPageContent.querySelectorAll(".template-text-page-title");
        for (let i = 0; i < titles.length; i++){
            let elem = document.createElement("li");
            elem.setAttribute('class', "text-page-menu__item p1 scroll-item");
            elem.setAttribute('data-id', "section-"+i);
            let elemText = document.createTextNode(`${titles[i].textContent}`);
            elem.appendChild(elemText);
            textPageMenuList.appendChild(elem)
            if(i + 1 == titles.length){
                initScrollButtons()
            }
        }
        if(window.screen.width < 992) {
            initAcc(textPageContent, false);
        }
    }



    const regexSubject = /^[а-яёА-Я0-9 .,!?:'"+_&@#*()-]{2,100}$/iu;
    const regexPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,12}(\s*)?$/;

    const feedbackForm = document.getElementById('feedback-form');
    const feedbackFormName = document.getElementById('feedback-name');
    const feedbackFormEmail = document.getElementById('feedback-email');
    const feedbackFormPhone = document.getElementById('feedback-phone');
    const feedbackFormCompany = document.getElementById('feedback-company');
    const feedbackFormAppeal = document.querySelectorAll('input[name="appeal"]')

    if(feedbackForm !== null) {
        feedbackFormAppeal.forEach(function (input) {
            input.addEventListener("change", function (el) {
                if (input.checked) {
                    let parent = input.parentNode.parentNode.parentNode.parentNode;
                    if (input.value == "Выберете тему обращения") {
                        parent.classList.add("error")
                    } else{
                        parent.classList.remove("error");
                        parent.classList.add("valid");
                    }
                }
            })
        })
        feedbackForm.addEventListener('keyup', () => {
            if (regexSubject.test(feedbackFormName.value)) {
                feedbackFormName.parentNode.classList.remove("error");
                feedbackFormName.parentNode.classList.add("valid");
            } else {
                feedbackFormName.parentNode.classList.remove("valid");
                feedbackFormName.parentNode.classList.add("error");
            }
            if(feedbackFormCompany !== null){
                if (regexSubject.test(feedbackFormCompany.value)) {
                    feedbackFormCompany.parentNode.classList.remove("error");
                    feedbackFormCompany.parentNode.classList.add("valid");
                } else {
                    feedbackFormCompany.parentNode.classList.remove("valid");
                    feedbackFormCompany.parentNode.classList.add("error");
                }
            }
            if (regexEmail.test(feedbackFormEmail.value)) {
                feedbackFormEmail.parentNode.classList.remove("error");
                feedbackFormEmail.parentNode.classList.add("valid");
            } else {
                feedbackFormEmail.parentNode.classList.remove("valid");
                feedbackFormEmail.parentNode.classList.add("error");
            }
            if (regexPhone.test(feedbackFormPhone.value)) {
                feedbackFormPhone.parentNode.classList.remove("error");
                feedbackFormPhone.parentNode.classList.add("valid");
            } else {
                feedbackFormPhone.parentNode.classList.remove("valid");
                feedbackFormPhone.parentNode.classList.add("error");
            }
            if(!isEmptyObject(feedbackFormAppeal)) {
                feedbackFormAppeal.forEach(function (el) {
                    if (el.checked) {
                        let parent = el.parentNode.parentNode.parentNode.parentNode;
                        if (el.value == "Выберете тему обращения") {
                            parent.classList.add("error")
                        } else {
                            parent.classList.remove("error");
                            parent.classList.add("valid");
                        }
                    }
                })
            }
        });
        feedbackForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let radioValue = '';
            if(document.querySelector('input[name="appeal"]') !== null){
                radioValue = document.querySelector('input[name="appeal"]:checked').value;
            }
            let feedbackFormCompanyValue;
            if(feedbackFormCompany !== null){
                feedbackFormCompanyValue = feedbackFormCompany.value
            }
            if (!regexSubject.test(feedbackFormName.value) || !regexEmail.test(feedbackFormEmail.value) || !regexPhone.test(feedbackFormPhone.value) || radioValue == "Выберете тему обращения" && !regexSubject.test(feedbackFormCompanyValue)) {
                if (!regexSubject.test(feedbackFormName.value)) {
                    feedbackFormName.parentNode.classList.add("error");
                }
                if(feedbackFormCompany !== null) {
                    if (!regexSubject.test(feedbackFormCompany.value)) {
                        feedbackFormCompany.parentNode.classList.add("error");
                    }
                }
                if (!regexEmail.test(feedbackFormEmail.value)) {
                    feedbackFormEmail.parentNode.classList.add("error");
                }
                if (!regexPhone.test(feedbackFormPhone.value)) {
                    feedbackFormPhone.parentNode.classList.add("error");
                }
                if(!isEmptyObject(feedbackFormAppeal)) {
                    feedbackFormAppeal.forEach(function (el) {
                        if (el.checked) {
                            let parent = el.parentNode.parentNode.parentNode.parentNode;
                            if (el.value == "Выберете тему обращения") {
                                parent.classList.add("error")
                            } else {
                                parent.classList.remove("error");
                                parent.classList.add("valid");
                            }
                        }
                    })
                }
            }
            else {
                const ajax = async () => {
                    const response = await fetch('/wp-admin/admin-ajax.php', { // php обработчик формы
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                        body: new FormData(feedbackForm),
                    });
                    if (!response.ok) {
                        throw new Error(response.status);
                    } else {
                        const data = await response.text();
                        switch (data) {
                            case '0':
                                console.log("Извините, произошла ошибка. Пожалуйста, повторите отправку позже!")
                                break;
                            case '1':
                                feedbackFormName.classList.remove("valid");
                                feedbackFormEmail.classList.remove("valid");
                                feedbackFormPhone.classList.remove("valid");
                                if(feedbackFormCompany !== null) {
                                    feedbackFormCompany.classList.remove("valid");
                                }
                                break;
                        }
                    }
                };
                //ajax()
                feedbackForm.reset();
                if(!isEmptyObject(feedbackFormAppeal)){
                    feedbackFormAppeal.forEach(function (input) {
                        if (input.value == "Выберете тему обращения") {
                            input.checked = true;
                            document.querySelector(".form-select__title span").innerHTML = "Выберете тему обращения";
                        }
                    })
                }
            }
        });
    }
})