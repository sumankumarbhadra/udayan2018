dotMechanic = (function() {

    var pointsOfInterest = [],
        canvas,
        ctx,
        bodyRect,
        coords,
        eRect,
        newDots = [],
        fragment,
        oldFragParent,
        fragParent,
        tl,
        bezier,
        trail,
        colliding;

    function update() {
        bodyRect = document.body.getBoundingClientRect();

        coords = pointsOfInterest.map(function(p) {
            eRect = p.getBoundingClientRect();

            return {
                x: Math.abs(eRect.left - bodyRect.left),
                y: Math.abs(eRect.top - bodyRect.top),
                color: [].filter.call(p.classList, function(c) {
                    return c == 'aqua' || c == 'orange' || c == 'green';
                })[0]
            }
        });

        newDots.forEach(function(d) {
            TweenLite.set(d, {
                x: getRandomInt(0, window.innerWidth),
                y: getRandomInt(0, window.innerHeight),
                opacity: 0
            });
        });
    }

    function init() {
        pointsOfInterest = [].slice.call(document.querySelectorAll('.poi-icon:not(.dynamic-icon)'));

        if(!pointsOfInterest.length) {
            return;
        }

        pointsOfInterest.forEach(function(p) {
            p.addEventListener('mouseover', focusedTween, false);
            p.addEventListener('mouseout', function() {
                newDots.forEach(newRandomTween, 80);
            }, false);
        });

        document.addEventListener('click', fadeDots, false);
        newDots = [].slice.call(document.querySelectorAll('.dynamic-icon'));
        update();
        draw();
    }

    function draw() {
        tl = new TimelineLite();
        tl.play();
        newDots.forEach(newRandomTween);
        requestAnimationFrame(loop);
    }

    function loop() {
        colliding = newDots.filter(function(d) {
            return collidingWithWindow(d);
        });

        if(colliding.length) {
            colliding.forEach(newRandomTween);
        }

        requestAnimationFrame(loop);
    }

    function fadeDots() {
        TweenLite.to(newDots, 2, {
            opacity: 0,
            scale: 0,
            ease: Power1.easeOut,
            overwrite: 'auto'
        });
    }

    function newRandomTween(e) {
        TweenLite.to(e, 3, {
            opacity: 1,
            scale: 1,
            ease: Power1.easeOut
        });

        TweenLite.to(e, 120, {
            physics2D: {
                velocity: getRandomInt(80, 115),
                angle: getRandomInt(0, 360),
                friction: 0,
                acceleration: 0
            }
        });
    }

    function focusedTween(e) {
        var rect = e.target.getBoundingClientRect();
        TweenLite.to(newDots, 0.75, {
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2),
            scale: 0
        });
    }

    function collidingWithWindow(a) { // a and b are your objects
        var aTop = a._gsTransform.y;
        var aLeft = a._gsTransform.x;

        this.radius = 10;
        this.x = 0;
        this.y = 0;
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        var colliding = [
            false,
            false,
            false,
            false
        ];

        // Left
        if(aLeft < this.x + this.radius) {
            colliding[3] = true;
            // Resetting the point like this avoids 'jitter' type effect.
            // Something to do with rounding?
            TweenLite.set(a, {x: this.x + this.radius});
        // Right
        } else if (aLeft > this.w - this.radius) {
            colliding[1] = true;
            TweenLite.set(a, {x: this.w - this.radius});
        }

        // Top
        if(aTop < this.y + this.radius) {
            colliding[0] = true;
            TweenLite.set(a, {y: this.y + this.radius});
        // Bottom
        } else if (aTop > this.h - this.radius) {
            colliding[2] = true;
            TweenLite.set(a, {y: this.h - this.radius});
        }

        return colliding.some(function(c) {
            return c;
        });
    }

    function getRandomAngle(from, to) {
        return getRandomInt(from || 0, to || 360) * (Math.PI / 180);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    (function() {
        var throttle = function(type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function() {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function() {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };

        /* init - you can init any event */
        throttle("resize", "optimizedResize");
    })();

    // handle event
    window.addEventListener("optimizedResize", update);

    return {
        init: init
    }
}());
