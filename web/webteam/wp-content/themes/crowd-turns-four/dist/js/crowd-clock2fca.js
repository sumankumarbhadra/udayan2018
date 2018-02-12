var crowdClock = (function() {
    'use strict';

    var timezones = [],
        t = Date.now() / 1000,
        utfo,
        start,
        end,
        clockContainer,
        target,
        infoBars,
        ticks,
        tl,
        activeOffice,
        wp,
        newTimezones,
        officePicker;

    function init() {
        clockContainer = document.getElementById('clock-track');
        infoBars = [].slice.call(document.querySelectorAll('.info-bar'));
        ticks = [].slice.call(document.querySelectorAll('.scale .tick'));
        officePicker = document.getElementById('office-picker');

        if(!clockContainer) {
            return;
        }

        start = unixTimeForOffset(Date.now(), 0);
        end   = unixTimeForOffset(Date.now(), 24);

        clockContainer.addEventListener('click', clickHandler, false);
        if (officePicker) {
            officePicker.addEventListener('change', changeHandler, false);
        }

        setTimeout(function() {
            getTimezones();
        }, 100);

        buildClock();
        loop();

        tl = new TimelineLite();
        tl.set(ticks, {y: -20, opacity: 0});
        tl.set(crowdOffices.map(function(o) {
            return o.ele;
        }), {opacity: 0});


        wp = new Waypoint({
            element: clockContainer,
            handler: function() {
                tl.add(TweenMax.staggerTo(ticks, 0.25, {y: 0, opacity: 1}, 0.075), 0);
                tl.add(TweenMax.staggerTo(crowdOffices.map(function(o) {
                    return o.ele;
                }), 0.5, {opacity: 1}, 0.25), 0);
                wp.destroy();
            },
            offset: '80%'
        });
    }

    function clickHandler(e) {
        target = e.target;

        if(!e.target.classList.contains('office-dot')) {
            if(!e.target.parentElement.classList.contains('office-dot')) {
                return;
            } else {
                target = e.target.parentElement;
            }
        }
        e.preventDefault();

        changeOffice(target.dataset.city);
    }

    function changeHandler(e) {
        target = e.target;
        e.preventDefault();

        changeOffice(target.value);
    }


    function changeOffice(targetOffice) {
        if(window.location.href.split('?')[0] != contactPage) {
            window.location.href = contactPage + "?office=" + targetOffice.replace(/\s+/g, '+');
            return;
        } else if (window.location.href != window.location.href.split('?')[0] + "?office=" + targetOffice.replace(/\s+/g, '+')) {
            window.history.pushState('obj', targetOffice, contactPage + "?office=" + targetOffice.replace(/\s+/g, '+'));
        }

        if (officePicker) {
            officePicker.value = targetOffice;
        }

        crowdOffices.forEach(function(o) {
            requestAnimationFrame(function() {
                o.ele.classList.remove('active');
            });
        });

        activeOffice = crowdOffices.filter(function(o) {
            return o.city === targetOffice;
        })[0];
        mapController.update(activeOffice);

        infoBars.forEach(function(ib) {
            requestAnimationFrame(function() {
                if(ib.dataset.city === activeOffice.city) {
                    ib.classList.add('active');
                } else {
                    ib.classList.remove('active');
                }
            });
        });

        requestAnimationFrame(function() {
            document.body.classList.remove('orange');
            document.body.classList.remove('aqua');
            document.body.classList.remove('green');
            document.body.classList.remove('slate');
            document.body.classList.add(activeOffice.color);
            activeOffice.ele.classList.add('active');
        });
    }

    function buildClock() {
        crowdOffices.forEach(function(o) {
            o.ele = document.createElement('div');
            o.ele.classList.add('office-dot');
            o.ele.classList.add('poi-icon');
            o.ele.classList.add(o.color);
            o.ele.dataset.city = o.city;

            o.name = document.createElement('span');
            o.name.classList.add('city-name');
            o.name.innerHTML = o.city;
            o.ele.appendChild(o.name);

            requestAnimationFrame(function() {
                clockContainer.appendChild(o.ele);
            });
        });
    }

    function loop() {
        t = Date.now() / 1000;
        crowdOffices.forEach(plot);

        setTimeout(function() {
            requestAnimationFrame(loop);
        }, 1000);
    }

    function plot(o, i) {
        if(!o.timezone) {
            return;
        }

        TweenMax.to(o.ele, 1, {
            css: {
                left: (function() {
                    if(((o.timezone.calculatedOffset + t) - start) / (end - start) < 0) {
                        return ((o.timezone.calculatedOffset + t) - start) / (end - start) + 1;
                    } else if(((o.timezone.calculatedOffset + t) - start) / (end - start) > 1) {
                        return ((o.timezone.calculatedOffset + t) - start) / (end - start) - 1;
                    } else {
                        return ((o.timezone.calculatedOffset + t) - start) / (end - start);
                    }
                })() * 100 + '%'
            },
            ease: Elastic.easeOut.config(1, 0.75),
            delay: i * 0.1
        });
    }

    function unixTimeForOffset(millisecondTime, hours, mins, seconds, mSeconds) {
        hours = hours || 0;
        mins = mins || 0;
        seconds = seconds || 0;
        mSeconds = mSeconds || 0;

        utfo = new Date(millisecondTime);
        utfo.setHours(hours);
        utfo.setMinutes(mins);
        utfo.setSeconds(seconds);
        utfo.setMilliseconds(mSeconds);
        return (utfo.getTime() - utfo.getTimezoneOffset()*60*1000) / 1000;
    }

    function getTimezones() {
        newTimezones = [];
        crowdOffices.forEach(getTimezone);
    }

    function getTimezone(o) {
        ajax().get('https://maps.googleapis.com/maps/api/timezone/json'
            + '?location='
            + o.location.lat
            + ','
            + o.location.lng
            + '&timestamp='
            + Date.now() / 1000
            + '&key='
            + googleKey
        ).then(function(r) {
            if(r.status != 'OK') {
                return;
            }

            r.calculatedOffset = r.rawOffset + r.dstOffset;
            o.timezone = r;

            newTimezones.push(o);
        });
    }

    return {
        init: init,
        changeOffice : changeOffice
    }

}());
