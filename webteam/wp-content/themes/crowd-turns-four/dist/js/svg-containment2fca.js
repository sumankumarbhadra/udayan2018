var svgContainment = (function() {
    'use strict';
    // Size SVGs to their correct aspect ratios, for internet explorer

    var svgs,
        attrs;

    function init() {
        svgs = [].slice.call(document.querySelectorAll('.svg-container svg'));

        svgs.forEach(function(svg) {
            requestAnimationFrame(function() {
                attrs = svg.getAttribute('viewBox');
                if(!attrs) {
                    return;
                }
                attrs = attrs.split(' ');
                if(svg.parentNode.classList.contains('svg-container')) {
                    svg.parentNode.style.paddingBottom = (attrs[3] / attrs[2]) * 100 + '%';
                }
            });
        });
    }

    return {
        init: init
    }

}());

