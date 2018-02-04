var postTypeCarousel = (function() {
    "use strict";

    var carousel,
        items,
        maxHeight;

    function init() {
        if(!document.querySelector('.post-type-carousel')) {
            return;
        }

        carousel = new crowdCarousel({
            container: '.post-type-carousel',
            item: '.carousel-item',
            animationDuration: 2000,
            pauseDuration: 5000,
            autoplay: true,
            buttons: false,
            dots: true,
            animationStart: function() {
            },
            animationEnd: function() {
            },
            domMutated: function(a) {
                items = [].slice.call(carousel.carousel.querySelectorAll(this.item));

                maxHeight = items.reduce(function(p, c) {
                    return c.clientHeight > p ? c.clientHeight : p;
                }, []);

                carousel.carousel.querySelector('.items-container').style.height = maxHeight + 'px';

                // Prime lazy loader
                crowdLazyLoad.prime([].slice.call(carousel.carousel.querySelectorAll('.load-container:not(.primed)')));
            }
        });
    }

    return {
        init: init,
        carousel: function() {
            return carousel;
        }
    }

}());
