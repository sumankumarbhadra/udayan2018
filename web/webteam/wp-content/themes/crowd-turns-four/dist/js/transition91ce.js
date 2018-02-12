(function() {
    'use strict';

    var tl = new TimelineLite(),
        view,
        transition,
        svg,
        frames,
        newClass;

    document.addEventListener('DOMContentLoaded', function() {
        preloader.init();

        transition = document.querySelector('.transition'),
        svg = document.querySelector('#frame-2');
        frames = document.querySelector('.blanket-svg > path');
        tl.set(transition, {opacity: 0});

        setupViews();

        Barba.Pjax.start();
        Barba.Pjax.getTransition = function() {
            return HideShowTransition;
        };
        Barba.Prefetch.init();
        Barba.Dispatcher.on('newPageReady', function(c, p, ele) {
            newClass = ele.dataset.newClass;
        });

        Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
        Barba.Pjax.preventCheck = function(evt, element) {
            if (!Barba.Pjax.originalPreventCheck(evt, element)) {
                return false;
            }

            if (/#load-more-news/.test(element.href)) {
                return false;
            }

            return true;
        };

    }, false);

    function play(c, cb) {
        tl = new TimelineLite();
        tl.set(transition, {zIndex: 10});
        tl.addLabel('transition');
        tl.add(TweenLite.to(svg, 0.2, {morphSVG: '#frame-3', ease: Power0.easeNone}));
        tl.add(TweenLite.to(svg, 0.2, {morphSVG: '#frame-4', ease: Power0.easeNone}));
        tl.add(TweenLite.to(svg, 0.2, {morphSVG: '#frame-5', ease: Power0.easeNone}));
        tl.add(TweenLite.to(svg, 0.2, {morphSVG: '#frame-6', ease: Power0.easeNone}));
        tl.add(TweenLite.to(svg, 0.2, {morphSVG: '#frame-7', ease: Power0.easeNone}));
        tl.addLabel('transitionEnd');
        tl.add(TweenLite.to(transition, 0.25, {opacity: 1}), 'transition');
        tl.add(TweenLite.to(transition, 0.5, {opacity: 0}), 'transitionEnd');
        tl.add(TweenLite.to(c, 0.5, {opacity: 0}), 'transition+=0.5');

        tl.restart();

        tl.eventCallback('onComplete', function() {
            cb();
            tl.set(svg, {morphSVG: '#frame-2'});
            tl.set(transition, {zIndex: -1});
        });
    }

    function setupViews() {
        view = Barba.BaseView.extend({
            namespace: 'barba-view',
            onEnter: function() {
                // The new Container is ready and attached to the DOM.
            },
            onEnterCompleted: function() {
                // The Transition has just finished.
                identityArea.init();
                masthead.init();
                svgContainment.init();
                crowdLazyLoad.init();
                postTypeCarousel.init();
                newsLoadMore.init();
                crowdClock.init();
                mapController.init();
                contactForm.init();
                plyr.setup();
                initContactForm();
                stickyTableHeader.init();
                scrollbarHandler.init();

                setTimeout(function() {
                    dotMechanic.init();
                }, 500);

                ga('send', 'pageview', location.pathname, {
                    'title': document.title
                });
            },
            onLeave: function() {
                // A new Transition toward a new page has just started.
            },
            onLeaveCompleted: function() {
                // The Container has just been removed from the DOM.
            }
        });
        view.init();
    }

    function initContactForm() {
        if(typeof jQuery != 'undefined') {
            jQuery('div.wpcf7 > form').wpcf7InitForm();
            jQuery('form.wpcf7-form')
                .each(function() {
                    jQuery(this).find('img.ajax-loader').last().remove();
                });
        }
    }

    var HideShowTransition = Barba.BaseTransition.extend({
        start: function() {

            TweenLite.set(frames, { fill: '#ffffff' });
            [
                {
                    name: 'aqua',
                    hex: '#28f9f9'
                },
                {
                    name:  'green',
                    hex: '#1fff79',
                },
                {
                    name: 'orange',
                    hex: '#ff5b00'
                },
                {
                    name: 'slate',
                    hex: '#859998'
                }
            ].forEach(function(c) {
                if(document.body.classList.contains(c.name)) {
                    TweenLite.set(frames, { fill: c.hex });
                }
            });

            Promise.all(
                [this.newContainerLoading, this.animationController()]
            ).then(this.finish.bind(this));
        },

        animationController: function() {
            var _this = this;
            return new Promise(
                function(resolve) {
                    play(_this.oldContainer, resolve);
                }
            );
        },

        finish: function() {
            window.scrollTo(0,0);
            this.done();

            tl = new TimelineLite();
            tl.set(this.newContainer, {
                visibility: 'visible',
                opacity: 0
            });

            tl.to(this.newContainer, 1, {opacity: 1});
            document.body.className = newClass;

            tl.eventCallback('onComplete', function() {
            });
        }
    });


}());
