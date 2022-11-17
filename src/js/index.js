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
window.addEventListener("load", function () {
    let fade = document.getElementById("fade");
    let header = document.getElementById("header");
    /*let headerSticky = document.getElementById("header-sticky")*/
    let addProductCart = document.getElementById("add-product-cart");
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if(window.screen.width < 992){
            if (currentScroll <= 0) {
                body.classList.remove(scrollUp);
                //header.classList.remove("active");
                addProductCart.classList.remove("active");
                return;
            }
            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
                //header.classList.remove("active");
                addProductCart.classList.add("active");
            } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
                //header.classList.add("active");
                addProductCart.classList.remove("active");
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
                fadeIn(searchPopup);
                fadeIn(searchBackdrop)
            }
            if(window.screen.width < 992) {
                document.getElementById("searchInput").blur();
                document.getElementById("searchInput-2").focus();
            }
        })
        searchBtnClose.addEventListener('click',function (e) {
            if(search.classList.contains("active")){
                search.classList.toggle("active")
                fadeOut(searchPopup);
                fadeOut(searchBackdrop)
            }
        });
        searchBackdrop.addEventListener('click',function (e) {
            if(search.classList.contains("active")){
                search.classList.toggle("active")
                fadeOut(searchPopup);
                fadeOut(searchBackdrop)
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
            fadeIn(cityPopup);
            fadeIn(fade);
        });
        fade.addEventListener("click", function (e) {
            fadeOut(cityPopup);
            fadeOut(fade);
        });
        document.querySelector(".city-popup__close").addEventListener("click", function (e){
            fadeOut(cityPopup);
            fadeOut(fade);
        })
        document.querySelectorAll(".city-popup__list-item").forEach(function (el) {
            el.addEventListener("click", function (e) {
                document.querySelector(".city-popup__input").value = el.getAttribute("data-value");
                headerCity.querySelector("span").innerHTML = el.getAttribute("data-value");
                fadeOut(cityPopup);
                fadeOut(fade);
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
                fadeOut(headerMobMenu);
            }
            else{
                headerMobTitleProfile.classList.toggle("active");
                fadeIn(headerMobMenu, 'flex');
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
            fadeIn(headerMob);
            fadeIn(menuBackdrop)
        });
        headerIconMobClose.addEventListener("click", function (e) {
            fadeOut(headerMob);
            fadeOut(menuBackdrop)
        });
        menuBackdrop.addEventListener("click", function (e) {
            fadeOut(headerMob);
            fadeOut(menuBackdrop)
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
    let slideZoom = document.querySelectorAll(".zoom");
    if(!isEmptyObject(slideZoom)){
        slideZoom.forEach(function (el) {
            el.addEventListener("mousemove",function (e){
                console.log()
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

    var swiperSub = new Swiper(".product__swiper-sub", {
        direction: "vertical",
        spaceBetween: 20,
        slidesPerView: 4,
        mousewheel: true,
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
    function initSwiper(slider){
        let btnNext, btnPrev;
        if(slider.querySelector(".swiper-button-next") !== null){
            btnNext = slider.querySelector(".swiper-button-next");
        }
        if(slider.querySelector(".swiper-button-prev") !== null){
            btnPrev = slider.querySelector(".swiper-button-prev");
        }
        var swiper = new Swiper(slider, {
            slidesPerView: "auto",
            spaceBetween: 10,
            navigation: {
                prevEl: btnPrev,
                nextEl: btnNext,
            },
            breakpoints: {
                // when window width is >= 640px
                992: {
                    spaceBetween: 20,
                }
            }
        });
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
    /*const classChangeOnScroll = () => {
        document.querySelectorAll("[data-scroll_id]").forEach((el) => {
            let top = el.offsetTop - 110;
            let bottom = top + el.offsetHeight;
            let scroll = window.scrollY;
            let id = el.getAttribute("data-scroll_id");

            if (scroll > top && scroll < bottom) {
                document.querySelectorAll(".active.header__nav-item").forEach((button) => {
                    button.classList.remove("active");
                });
                document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                    if (button.classList.contains("header__nav-item")) {
                        button.classList.add("active");
                    }
                });
            }
        });
    };*/
    const scrollIntoViewWithMargin = (node, margin) => {
        const { top } = node.getBoundingClientRect();
        window.scrollTo({ top: top + window.scrollY + margin, behavior: "smooth" });
    };
    /*const initScrollButtons = () => {
        const scroll_buttons = document.querySelectorAll("[data-id]");
        if (!scroll_buttons) return;
        scroll_buttons.forEach((button) => {
            button.addEventListener("click", () => {
                window.removeEventListener("scroll", classChangeOnScroll);
                document.querySelectorAll(".header__nav-item").forEach((select) => {
                    select.classList.remove("active");
                });
                const id = button.getAttribute("data-id");
                const target = document.querySelector(`[data-scroll_id=${id}]`);
                document.querySelectorAll(`[data-id=${id}]`).forEach((button) => {
                    if (button.classList.contains("header__nav-item")) {
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
    initScrollButtons()*/

    document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href');
        const target = document.querySelector(id);
        scrollIntoViewWithMargin(target, -60);
    }));



    function initAcc(elem, option) {
        let item = elem.querySelectorAll(".ui-accordion-item__toggle");
        let item_content = elem.querySelectorAll(".ui-collapse");
        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click', function (e) {
                let parent = this.parentElement;
                let content = this.parentElement.querySelector(".ui-collapse");
                let mouseenter_ev;
                console.log(!parent.classList.contains('ui-accordion-item--opened'))
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
                    fadeIn(content);
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
                    fadeOut(content);
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
})