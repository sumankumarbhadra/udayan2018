var crowdLazyLoad = (function() {
    var containers = [],
        waypoints = [],
        img;

    function init() {
        containers = [];
        waypoints = [];

        primeContainers([].slice.call(document.querySelectorAll('.load-container')));
    }

    function primeContainers(newContainers) {
        if(!newContainers) {
            return;
        }

        containers = containers.concat(newContainers);
        containers.forEach(function(c, i) {
            waypoints[i] = new Waypoint({
                element: c,
                handler: function(dir) {
                    if(!waypoints[i]) {
                        return;
                    }

                    if(!this.element.classList.contains('primed')) {
                        lazyLoad(c);
                    }

                    waypoints[i].destroy();
                },
                offset: '35%'
            });
        });

    }

    function lazyLoad(container) {
        if(!container.dataset.load) {
            return;
        }
        container.classList.add('primed');

        img = document.createElement('img');
        img.onload = triggerFade;
        img.classList.add('lazy-loaded');
        img.src = container.dataset.load;

        container.appendChild(img);
    }

    function triggerFade(e) {
        e.target.parentElement.classList.add('loaded');
    }

    return {
        init: init,
        prime: primeContainers
    }

}());
