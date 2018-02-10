var identityArea = (function() {
    'use strict';

    var icon,
        left,
        right,
        logoLimit,
        breadcrumb,
        tl;

    function init() {
        tl = new TimelineLite();
        icon = document.querySelector('svg.crowd-logo-export .logo-icon');
        left = document.querySelector('svg.crowd-logo-export .logo-left');
        right = document.querySelector('svg.crowd-logo-export .logo-right');
        breadcrumb = document.querySelector('.breadcrumb');
        logoLimit = document.querySelector('.logo-limit');

        tl.set(icon, {transformOrigin: 'center center'});
        tl.set(breadcrumb, {display: 'none', opacity: 0});

        animate();
    }

    function animate() {
        tl.add(TweenLite.to([left, right], 0.15, {opacity: 0, ease: Power1.easeOut}), 1);
        tl.add(TweenLite.to(icon, 0.6, {x: '-100%', ease: Power1.easeOut}), 1.15);
        tl.add(TweenLite.to(logoLimit, 0.6, {maxWidth: '-=85', scale: 1.4, ease: Power1.easeOut}), 1.15);
        tl.set(breadcrumb, {display: 'block'});
        tl.add(TweenLite.to(breadcrumb, 1, {opacity: 1, ease: Power1.easeOut}));
    }

    function updateBreadcrumb(text) {
        TweenLite.to(breadcrumb, 1, {opacity: 0}).eventCallback('onComplete', function() {
            breadcrumb.innerHTML = '<h2 class="dynamic-crumb">' + text + '</h2>';
            TweenLite.to(breadcrumb, 1, {opacity: 1});
        });
    }

    return {
        init: init,
        updateBreadcrumb: updateBreadcrumb
    };
}());
