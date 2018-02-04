var masthead = (function() {
    'use strict';

    var masthead,
        title,
        expand,
        headline,
        originalCrumb,
        close;

    function init() {
        masthead = document.querySelector('.page-masthead');

        if(!masthead) {
            return;
        }

        originalCrumb = document.querySelector('.breadcrumb h2').innerHTML;
        close = masthead.querySelector('.poi-icon.close');
        expand = masthead.querySelector('.poi-icon.expand');
        headline = masthead.querySelector('h1');

        masthead.addEventListener('click', clickHandler, false);
    }

    function clickHandler(e) {
        if(e.target.classList.contains('expand') || e.target.classList.contains('close')) {
            toggleMasthead();
        }

        if(e.target.classList.contains('expand')) {
            swapBreadcrumb(headline.innerHTML);

            TweenMax.to(window, 1, {
                scrollTo: masthead.offsetTop,
                ease: Elastic.easeOut.config(1, 0.75)
            });
        } else {
            swapBreadcrumb(originalCrumb);
        }
    }

    function toggleMasthead() {
        requestAnimationFrame(function() {
            masthead.classList.toggle('expanded');
            document.body.classList.toggle('orange');
            close.classList.toggle('hide');
            expand.classList.toggle('hide');
        });
    }

    function swapBreadcrumb(string) {
        identityArea.updateBreadcrumb(string);
    }

    return {
        init: init
    }

}());
