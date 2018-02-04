var contactForm = (function() {
    'use strict';

    var tellUsMore,
        topic,
        values = [
            "A project that Crowd could help with",
            "The possibility of working at Crowd",
            "Something I'd like to discuss"
        ],
        location,
        locations = [
            "Bournemouth UK",
            "Dubai UAE",
            "Detroit USA"
        ],
        emails = [
            'results@thisiscrowd.com'
        ],
        careersEmails = [
            'careers@thisiscrowd.com',
            'tom@thisiscrowd.com',
            'tod@thisiscrowd.com'
        ],
        recip,
        options,
        submit,
        form,
        selects;

    function init() {
        topic = document.querySelector('select[name="topic"]');
        location = document.querySelector('select[name="studiolocation"]');
        recip = document.querySelector('input[name="recip"]');
        submit = document.querySelector('button[type="submit"]');
        form = document.querySelector('.natural-language-form form');
        tellUsMore = document.querySelector('.tell-us-more');
        selects = [].slice.call(document.querySelectorAll('select'));
        options = [].slice.call(document.querySelectorAll('[id*=option-]'));

        if(!form || !topic || !options.length) {
            return;
        }

        // disable autocomplete
        form.setAttribute('autocomplete', 'off');

        tellUsMore.disabled = true;
        tellUsMore.addEventListener('click', clickHandler, false);

        selects.forEach(bindSelect);

        topic.addEventListener('change', function(e) {
            requestAnimationFrame(function() {
                tellUsMore.disabled = false;
            });
        }, false);

        location.addEventListener('change', updateRecip, false);
    }

    function bindSelect(e) {
        e.addEventListener('change', function(e) {
            requestAnimationFrame(function() {
                e.target.classList.add('updated');
            });
        }, false);
    }


    function clickHandler(e) {
        if(values.indexOf(topic.value) < 0) {
            return;
        }

        options.forEach(function(e, i) {
            if(values.indexOf(topic.value) === i) {
                display(e, 'inline');
            } else {
                display(e, 'none');
            }
        });

        tellUsMore = null;

        requestAnimationFrame(function() {
            e.target.remove();
            submit.classList.add('active');
        });

        updateRecip();
    }

    function display(e, s) {
        requestAnimationFrame(function() {
            e.style.display = s;
        });
    }

    function updateRecip() {
        requestAnimationFrame(function(){
            if(topic.value == values[1]) {
                switch (location.value) {
                    case locations[0]:
                        recip.value = careersEmails[0];
                        break;
                    case locations[1]:
                        recip.value = careersEmails[1];
                        break;
                    case locations[2]:
                        recip.value = careersEmails[2];
                        break;
                    default:
                        recip.value = careersEmails[0];
                        break;
                }
            } else {
                recip.value = emails[0];
            }
        })
    }

    return {
        init: init
    }

}());
