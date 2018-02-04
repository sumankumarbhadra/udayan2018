var newsLoadMore = (function() {
    'use strict';

    var offset,
        container,
        trigger,
        placeholder;

    function init() {
        offset = [].slice.call(document.querySelectorAll('.news-item')).length;
        trigger = document.querySelector('a[href="#load-more-news"]');
        if(!trigger) {
            return;
        }

        trigger.addEventListener('click', clickHandler, false);
    }

    function clickHandler(e) {
        e.preventDefault();
        container = e.target.parentElement.parentElement.parentElement.querySelector('.news-listing');

        ajax().post(crowdAjax, {
            action: 'more_news',
            numberposts: 5,
            offset: offset,
            cats: container.dataset.cats ? container.dataset.cats.split(',') : []
        }).then(function(r, xhr) {
            if(r === '') {
                return;
            }

            offset += 5;
            inject(r, e);
        });
    }

    function inject(markup, e) {
        // Convert string to HTML
        placeholder = document.createElement('div');
        placeholder.innerHTML = markup;
        placeholder = placeholder.firstElementChild;

        // Insert into DOM
        e.target.parentElement.parentElement.parentElement.insertBefore(placeholder, e.target.parentElement.parentElement);

        // Prime lazy loader
        crowdLazyLoad.prime([].slice.call(placeholder.querySelectorAll('.load-container')));
    }

    return {
        init: init
    }

}());
