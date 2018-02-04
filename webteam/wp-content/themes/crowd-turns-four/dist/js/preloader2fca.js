var preloader = (function() {
    'use strict';

    var tl,
        pathsG,
        pathGs,
        paths,
        letters,
        icon,
        loader,
        callback,
        svg,
        moons,
        emits,
        planets,
        epicenter,
        barba;

    /**
     * Init takes a callback function that's executed once everything has been
     * "preloaded"
     */
    function init(cb) {
        callback = cb;


        barba = document.querySelector('#barba-wrapper');
        loader = document.querySelector('.preloader');
        svg = document.querySelector('#preloader');
        pathsG = document.querySelector('#preloader .paths');
        letters = document.querySelector('#preloader .letters');
        icon = document.querySelector('#preloader .icon');
        epicenter = document.querySelector('#preloader .epicenter');
        //pathGs = [].slice.call(document.querySelectorAll('#preloader .paths > g'));
        paths = [].slice.call(document.querySelectorAll('#preloader .paths .path'));
        planets = [].slice.call(document.querySelectorAll('#preloader .planet'));
        //moons = [].slice.call(document.querySelectorAll('#preloader .moon'));

        moons = [];
        emits = [].slice.call(document.querySelectorAll('#preloader .emit'));
        emits.forEach(function(e, i) {
            moons[i] = childrenWithClass(e, 'moon');
        });

        tl = new TimelineLite();

        tl.set([svg, barba], { opacity: 0 });

        tl.set(paths, {
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
        });

        tl.set([[].concat.apply([], moons), planets, epicenter], {
            scale: 0,
            transformOrigin: 'center center'
        });

        tl.set(loader, {background: 'rgba(255, 255, 255, 1)'});

        if(localStorage.getItem('preloaderAnimationComplete')) {
            tl.set(loader, {opacity: 0});
            tl.set(barba, {opacity: 1});
            return;
        }

        play();
        localStorage.setItem('preloaderAnimationComplete', true);
    }

    function childrenWithClass(e, className) {
        if(e.children) {
            return [].filter.call(e.children, function(c) {
                return c.classList.contains(className);
            });
        } else {
            return [];
        }
    }

    function play() {
        tl.to(svg, 2, {opacity: 1});
        tl.set(barba, {opacity: 1});
        tl.addLabel('startPaths');
        tl.to(letters, 0.75, {opacity: 0});
        tl.to(epicenter, 2, {
            scale: 1,
            ease: Elastic.easeOut.config(1, 0.75)
        }, '-=1');

        tl.add(TweenMax.staggerTo(paths, 8, {strokeDashoffset: 0}, 0.1), 'startPaths');

        planets.forEach(function(p, i) {
            tl.add([
                TweenLite.to(p, 8, {
                    bezier: {
                        values: MorphSVGPlugin.pathDataToBezier(
                            paths[i], {
                                align: p
                            }
                        ),
                        type: 'cubic'
                    },
                    ease: Power1.easeOut
                }),
                TweenLite.to(p, 3, {
                    scale: 1,
                    ease: Elastic.easeOut.config(1, 0.75)
                }),

                TweenLite.to(moons[i], 8, {
                    bezier: {
                        values: MorphSVGPlugin.pathDataToBezier(
                            paths[i], {
                                align: p,
                            }
                        ),
                        type: 'cubic'
                    }
                }),

            ], 'startPaths+=' + (i * 0.25))


            tl.add([
                TweenLite.to(moons[i], 2, {
                    scale: 1,
                    ease: Elastic.easeOut.config(1, 0.75)
                }),
            ], 'startPaths+=' + (i * 0.25 + 0.5))

            tl.add([
                TweenLite.to(moons[i], 2, {
                    scale: 0,
                    ease: Power1.easeOut
                }),
            ], 'startPaths+=' + (i * 0.25 + 1))

        });

        tl.addLabel('planetsEnd');

        tl.add(TweenMax.staggerTo(paths, 8, {strokeDashoffset: -2000}, 0.1), 'planetsEnd-=9');
        tl.add(TweenMax.to(icon, 0.75, {opacity: 0, onComplete: callback}), 'planetsEnd-=6');
        tl.add(TweenMax.to(epicenter, 0.75, {scale: 0, opacity: 0}), 'planetsEnd-=6');
        tl.add(TweenMax.to(loader, 1, {background: 'rgba(255, 255, 255, 0)'}), 'planetsEnd-=5');
        tl.add(TweenMax.to(loader, 1, {opacity: 0}), 'planetsEnd-=3');
        tl.play();
    }

    return {
        init: init
    }
}());
