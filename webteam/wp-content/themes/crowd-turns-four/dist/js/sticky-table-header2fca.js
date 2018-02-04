var stickyTableHeader = (function () {
    'use strict';

    var tableHeaders,
        stuckHeaders,
        unstickers,
        headerWaypoints = [],
        unstickerWaypoints = [],
        horizontalColumns,
        stuckHeaderCells,
        tableContainers,
        horizontalWaypoints = [],
        placeholders,
        scrollbars;

    function init() {
        tableHeaders = [].slice.call(document.querySelectorAll('table.sticky'));
        placeholders = [].slice.call(document.querySelectorAll('.placeholder'));
        scrollbars = [].slice.call(document.querySelectorAll('.scrollbar'));
        tableHeaders.forEach(function (header, i) {
            headerWaypoints[i] = new Waypoint({
                element: header,
                handler: function(direction) {
                    if (direction == 'up') {
                        TweenMax.to(this.element, 0.5, {top: '-100%'});
                        if (stuckHeaderCells) {
                            stuckHeaderCells.forEach(function (cell) {
                                cell.style.transform = 'translateX(0)';
                            });
                        }
                        this.element.classList.remove('stick');
                        TweenMax.set(this.element, {clearProps:"all"});
                        if (placeholders) {
                            placeholders[i].classList.remove('active');
                        }
                        scrollbars[i].classList.remove('active');
                    } else {
                        if (placeholders) {
                            placeholders[i].classList.add('active');
                        }
                        this.element.classList.add('stick');
                        TweenMax.to(this.element, 0.5, {top: 0});
                        scrollbars[i].classList.add('active');
                    }
                }
            });
        });
        unstickers = [].slice.call(document.querySelectorAll('.footer'));
        unstickers.forEach(function (unsticker, i) {
            if (i == 0) {
                var offset = document.querySelector('.sticky.first').offsetHeight + 'px';
            } else if (i == 1) {
                var offset = document.querySelector('.sticky.second').offsetHeight - 25 + 'px';
            }
            unstickerWaypoints[i] = new Waypoint({
                element: unsticker,
                handler: function (direction) {
                    stuckHeaders = [].slice.call(document.querySelectorAll('.stick'));
                    if (direction == 'up') {
                        placeholders[i].classList.add('active');
                        tableHeaders[i].classList.add('stick');
                        TweenMax.to(tableHeaders[i], 0.5, {top: 0});
                        scrollbars[i].classList.add('active');
                    } else {
                        stuckHeaders.forEach(function(header) {
                            TweenMax.to(header, 2, {top: '-100%', onComplete:function () {
                                if (stuckHeaderCells) {
                                    stuckHeaderCells.forEach(function (cell) {
                                        cell.style.transform = 'translateX(0)';
                                    });
                                }
                                header.classList.remove('stick');
                                TweenMax.set(header, {clearProps:"all"});
                                placeholders[i].classList.remove('active');
                                scrollbars[i].classList.remove('active');
                            }});
                        });
                    }
                },
                offset: offset
            });
        });
        tableContainers = [].slice.call(document.querySelectorAll('.table-container'));
        tableContainers.forEach(function (container) {
            container.addEventListener('scroll', function () {
                stuckHeaderCells = [].slice.call(document.querySelectorAll('.stick td:not(.stuck-cell)'));
                stuckHeaderCells.forEach(function (cell) {
                    cell.style.transform = 'translateX(-' + container.scrollLeft + 'px)';
                });
                if ((typeof InstallTrigger !== 'undefined') || (/*@cc_on!@*/false || !!document.documentMode) || (!!window.StyleMedia)) {
                    var stickyColumns = [].slice.call(document.querySelectorAll('table:not(.stick) td:first-child'));
                    var nonStickyColumns = [].slice.call(document.querySelectorAll('.sub-tables td:first-child'));
                    stickyColumns.forEach(function (column) {
                        column.style.transform = 'translateX(' + container.scrollLeft + 'px)';
                    });
                    nonStickyColumns.forEach(function (column) {
                        column.style.transform = 'translateX(-' + container.scrollLeft + 'px)';
                    });
                }
            }, false);
        });
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        init: init
    }
}());
