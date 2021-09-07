if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
(function (ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {
            return null
        } else return this.parentElement.closest(selector)
    };
}(Element.prototype));

(function () {

    // проверяем поддержку
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

})();

// Add button copy code
if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
} else {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
    script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
    script.crossOrigin = 'anonymous';
    script.onload = function () {
        addCopyButtons(clipboard);
    };

    document.body.appendChild(script);
}

function addCopyButtons(clipboard) {
    document.querySelectorAll('pre > code').forEach(function (codeBlock) {
        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = 'Скопировать';

        button.addEventListener('click', function () {
            clipboard.writeText(codeBlock.innerText).then(function () {
                /* Chrome doesn't seem to blur automatically,
                   leaving the button in a focused state. */
                button.blur();

                button.innerText = 'Скопировано!';

                setTimeout(function () {
                    button.innerText = 'Скопировать';
                }, 2000);
            }, function (error) {
                button.innerText = 'Ошибка';
            });
        });

        var pre = codeBlock.parentNode;
        if (pre.parentNode.classList.contains('highlight')) {
            var highlight = pre.parentNode;
            highlight.parentNode.insertBefore(button, highlight);
        } else {
            pre.parentNode.insertBefore(button, pre);
        }
    });
}


// Code
$('pre code').each(function (i, e) {
    hljs.highlightBlock(e)
});

// Table-hide
function tableHide() {
    $('.js-table-hide').each(function (key, item) {
        let $input = $(item).find('input');
        let $switch = $(item).find('.js-switch');
        let $row = $(item).find('.table__row.js-hide');

        $switch.bind('click', () => {
            $row.each(function () {
                if ($input.prop('checked') === true) {
                    $(this).css("display", "none");
                } else {
                    $(this).css("display", "table-row");
                }
            });
        });
    });
}
tableHide();


$(() => {

    $("body").on("click", ".features--item", function () {
        if (!$(this).find('.features--item__inner').hasClass('flip')) {
            $(this).find('.features--item__inner').addClass('flip');
            $(this).addClass('active');
        } else {
            $(this).find('.features--item__inner').removeClass('flip');
            $(this).removeClass('active');
        }
    });

    // Buttton Ripple Effect
    // function createRipple(event) {
    //     const button = event.currentTarget;

    //     const circle = document.createElement("span");
    //     const diameter = Math.max(button.clientWidth, button.clientHeight);
    //     const radius = diameter / 2;

    //     const buttonCoords = button.getBoundingClientRect();
    //     circle.style.width = circle.style.height = `${diameter}px`;
    //     circle.style.left = `${event.clientX - buttonCoords.left - radius}px`;
    //     circle.style.top = `${event.clientY - buttonCoords.top - radius}px`;
    //     circle.classList.add("ripple");

    //     const ripple = button.getElementsByClassName("ripple")[0];

    //     if (ripple) {
    //         ripple.remove();
    //     }

    //     button.appendChild(circle);
    // }

    // const buttons = document.getElementsByTagName("button");
    // for (const button of buttons) {
    //     button.addEventListener("click", createRipple);
    // }

    // Tabs
    $('.tabs').tabs();


    // Swiper
    $('.swiper-container').each(function (key, item) {
        var swiper = new Swiper($(item).find('.swiper-grid'), {
            nextButton: $(item).find('.swiper-button-next'),
            prevButton: $(item).find('.swiper-button-prev'),
            pagination: $(item).find('.swiper-pagination'),
            slidesPerView: 1,
            centeredSlides: true,
            paginationClickable: true,
            keyboardControl: true,
            mousewheelControl: true,
            mousewheelForceToAxis: true,
            initialSlide: 0,
            grabCursor: true,
            loop: true,
        });
    });


    // Fixed  menu
    const hideMenu = () => {
        let menu = document.querySelector(".header"),
            scrollPrev = 0,
            scrolled = 0;
        window.addEventListener("scroll", onScroll);

        function onScroll() {
            let scrolled = window.pageYOffset;
            showNav();
            if (scrolled > scrollPrev && scrolled > 75) {
                hideNav();
            } else {
                if (scrollPrev !== scrolled) {
                    showNav();
                }
            }
            scrollPrev = scrolled;
        }

        function hideNav() {
            document.querySelector("header").classList.remove("is-visible");
            document.querySelector("header").classList.add("is-hidden");
        }

        function showNav() {
            document.querySelector("header").classList.remove("is-hidden");
            document.querySelector("header").classList.add("is-visible");
            document.querySelector("header").classList.add("scrolling");
        }
    };

    hideMenu();

    function sortable_resize() {
        $('.list-group-item').each(function (index, el) {
            var el = $(this).closest('.row').find('.auto_height');
            el[index].style.height = $(this).innerHeight() + 'px';
        });
    };

    sortable_resize();


    function heightFlipCard() {
        $('.features').each(function (key, item) {
            var _this = this;

            var card = $(item).find('.features--item__inner img');
            var minHeight = Math.max($(item).find('.features--front').outerHeight(), $(item).find('.features--back').outerHeight());
            $(item).find('.features--item').css('min-height', minHeight + 'px');
            $(item).find('.features--item')[0].minHeight = minHeight;

            card.one("load", function () {
                $(item).find('.features--item').css('min-height', minHeight + 'px');
            }).each(function () {
                if (_this.complete || $(_this).height() > 0) {
                    $(_this).load();
                }
            });
        });

        $('.row.features').each(function (key, item) {
            var cards = $(item).find('.features--item');
            var minHeightRow = 0;
            if (cards.length !== 0) {
                $(cards).each(function(key, card) {
                    if (card.minHeight > minHeightRow) {
                        minHeightRow = card.minHeight;
                    }
                });
                $(cards).each(function(key, card) {
                    $(card).css('min-height', minHeightRow + 'px');
                });
            }
        });
    }

    window.addEventListener("resize", function() {
        heightFlipCard();
    });

    heightFlipCard();

    function onScrollContent() {
        var contentHeight = $("body")[0].clientHeight;
        var widthPrev = $('.btn__prev').parent().width();
        $('.btn__prev').css('width', widthPrev + 'px').addClass('bottom');


        window.addEventListener("scroll", function () {
            $(".animated:visible").each(function () {
                var offset_top = $(this).offset().top;
                var animItem = $(this).hasClass("hidden");
                if (offset_top < contentHeight / 1.5 && animItem) {
                    $(this).eq(0).removeClass("hidden");
                }
            });

            $(".animation").each(function () {
                var offset_top = $(this).offset().top;
                var show_attr = $(this).attr("show-attr") == "true";

                if (offset_top < contentHeight / 1 && show_attr) {
                    slide_anim($(this).attr("id"));
                    $(this).attr("show-attr", "false");
                }
            });

            // $(".btn__next").each(function () {
            //     var offset_top = $(this).offset().top;
            //     var fixedItem = $(this).hasClass("btn__next");

            //     if (offset_top < contentHeight && fixedItem) {
            //         $('.btn__prev').css('width', widthPrev + 'px');
            //         $('.btn__prev').addClass('bottom');
            //     } else {
            //         $('.btn__prev').css('width', widthPrev + 'px');
            //         $('.btn__prev').removeClass('bottom');
            //     }
            // });
        });
    }

    onScrollContent();


    // Open nav menu
    const openMenu = () => {
        const open = document.querySelector('.header-icon-menu');
        const fader = document.querySelector('.fader');

        document.body.style.overflow = "hidden";
        fader.classList.add('show');
        open.classList.add('show');
        document.querySelector('.nav').classList.add('show');
    }

    document.querySelector('.header-icon-menu').addEventListener("click", openMenu);

    document.querySelector('.fader').addEventListener("click", function () {
        document.body.style.overflow = "";
        document.querySelector('.fader').classList.remove('show');
        document.querySelector('.nav').classList.remove('show');
    });

    // Open url and files
    let windowObjectReference = null;

    const openRequestedPopup = (url, windowName) => {
        if (windowObjectReference == null || windowObjectReference.closed) {
            windowObjectReference = window.open(
                url,
                windowName,
                "resizable,scrollbars,status"
            );
        } else {
            windowObjectReference.focus();
        }
    };
});