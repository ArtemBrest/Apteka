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
    let header = document.getElementById("header");
    let stuck = false;
    let stickPoint = getDistance();
    function getDistance() {
        let topDist = header.offsetTop;
        return topDist;
    }
    window.onscroll = function(e) {
        let distance = getDistance() - window.pageYOffset;
        let offset = window.pageYOffset;
        if ((distance <= 0) && !stuck) {
            header.classList.add("active");
            stuck = true;
        } else if (stuck && (offset <= stickPoint)) {
            header.classList.remove("active");
            stuck = false;
        }
    }
    let search = document.getElementById("search");
    let searchInput = document.getElementById("search-input");
    let searchPopup = document.getElementById("search-autocomplete");
    if(searchInput !== null && searchPopup !== null){
        searchInput.addEventListener('click',function (e) {
            if(!search.classList.contains("active")){
                search.classList.toggle("active")
                fadeIn(searchPopup);
            }

        })
        document.addEventListener( 'click', (e) => {
            const withinBoundaries = e.composedPath().includes(search);
            if ( ! withinBoundaries ) {
                fadeOut(searchPopup)
                search.classList.toggle("active")
            }
        })
    }
    let headerCity = document.getElementById("header-city");
    let fade = document.getElementById("fade");
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

    let headerMobItem = document.querySelectorAll(".header-mob__item");
    if(headerMobItem !== null){
        let svg = `<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.89896 8.14896C0.567014 8.4809 0.567014 9.01909 0.89896 9.35104C1.23091 9.68298 1.7691 9.68298 2.10104 9.35104L0.89896 8.14896ZM5.25 5L5.85104 5.60104C6.18299 5.26909 6.18299 4.7309 5.85104 4.39896L5.25 5ZM2.10104 0.648959C1.7691 0.317013 1.23091 0.317013 0.898961 0.648959C0.567015 0.980905 0.567015 1.51909 0.898961 1.85104L2.10104 0.648959ZM2.10104 9.35104L5.85104 5.60104L4.64896 4.39896L0.89896 8.14896L2.10104 9.35104ZM5.85104 4.39896L2.10104 0.648959L0.898961 1.85104L4.64896 5.60104L5.85104 4.39896Z" fill="#31353B"/>
        </svg>`;
        headerMobItem.forEach(function (el) {
            if(el.querySelector("ul")){
                el.insertAdjacentHTML('beforeend', svg);
            }
            el.addEventListener("click",function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(this)
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


    let headerIconMobOpen = document.querySelector(".header__icon-mob");
    let headerIconMobClose = document.querySelector(".header-mob__btn");
    let headerMob = document.querySelector(".header-mob");
    headerIconMobOpen.addEventListener("click", function (e) {
        fadeIn(headerMob);
    });
    headerIconMobClose.addEventListener("click", function (e) {
        fadeOut(headerMob);
    });
})