var scrollbarHandler = (function () {
    'use strict';

    var scrollContainers,
    scrollingTables;

    function init() {
        scrollContainers = [].slice.call(document.querySelectorAll('.scrollbar'));
        scrollingTables = [].slice.call(document.querySelectorAll('.table-container'));

        scrollingTables.forEach(function (table, i) {
            table.addEventListener('scroll', function () {
                scrollContainers[i].scrollLeft = table.scrollLeft;
            }, false);
        });

        scrollContainers.forEach(function (container, i) {
            container.addEventListener('scroll', function () {
                scrollingTables[i].scrollLeft = container.scrollLeft;
            }, false);
        });
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        init: init
    }
}());
