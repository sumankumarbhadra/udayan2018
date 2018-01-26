$(document).on('ready', function () {

    $(window).on('load', function () {
        "use strict";
        // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    })

    "use strict";

    // Parallax
    $('.parallax').scrolly({
        bgParallax: true
    });
    $(window).stellar();

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').on('click', function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    $('#blogs').waitForImages(function () {
        var $container = $('.blog_container');
        $container.isotope({
            filter: '*',
        });

        $('.blog_filter a').click(function () {
            $('.blog_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });


    //  lightcase
    $('a[data-rel^=lightcase]').lightcase();

    //  aos
    AOS.init({
        disable: 'mobile'
    });

    //  Feedback Carousel
    var owl = $('.owl-feedback');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 1,
        autoplay: true,
    });

    //  team Carousel
    var owl = $('.teamSlider');
    owl.owlCarousel({
        animateOut: 'fadeOutDown',
        animateIn: 'fadeInUp',
        items: 1,
        loop: true,
        margin: 1,
        autoplay: true,
        smartSpeed: 450,
        dots: false
    });

    //  single portfolio Carousel
    var owl = $('.single-portfolio');
    owl.owlCarousel({
        animateOut: 'fadeOutDown',
        animateIn: 'fadeInUp',
        items: 1,
        loop: true,
        margin: 1,
        autoplay: true,
        smartSpeed: 450,
        dots: true
    });

    //  Portfolio Center Carousel
    $('.recent').owlCarousel({
        center: false,
        items: 1,
        autoplay: true,
        loop: false,
        margin: 30,
        responsive: {
            1200: {
                items: 3
            },
            991: {
                items: 2
            },
            786: {
                items: 2
            },
            600: {
                items: 1
            }
        }
    });



    //  back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    // main slider 
    $('.flexslider').flexslider({
        animation: "fade",
        slideshowSpeed: 6000,
        animationSpeed: 500,
        directionNav: true,
        start: function () {
            setTimeout(function () {
                $('.interTextDiv h1,.interTextDiv p,.interTextDiv .btnsDiv').removeClass('animated fadeInUp');
                $('.flex-active-slide').find('.interTextDiv h1,.interTextDiv p,.interTextDiv .btnsDiv').addClass('animated fadeInUp');
            }, 500);
        },
        before: function () {
            setTimeout(function () {
                $('.interTextDiv h1,.interTextDiv p,.interTextDiv .btnsDiv').removeClass('animated fadeInUp');
                $('.flex-active-slide').find('.interTextDiv  h1,.interTextDiv p,.interTextDiv .btnsDiv').addClass('animated fadeInUp');
            }, 500);
        }
    });

    // main slider 
    $('.productSlider').flexslider({
        animation: "slide",
        slideshowSpeed: 6000,
        animationSpeed: 500,
        directionNav: true,
    });


    // start a timer when on appear
    var count = $('.count');
    count.appear();
    count.each(function () {
        $(this).on('appear', function () {
            var $this = $(this);
            if (!$this.hasClass('counter-loaded')) {
                $('.count').countTo({
                    speed: 2000,
                    formatter: function (value, options) {
                        return value.toFixed(options.decimals);
                    },
                });
                $this.addClass('counter-loaded');
            }
        });
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });

    //fullpage
    $('#fullpage').fullpage({
        //Navigation
        anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9'],
        menu: '#menu',
        navigationTooltips: ['home', 'about us', 'our works', 'contact us'],
        css3: true,
        verticalCentered: false,
        autoScrolling: false,
        fitToSection: false,
        responsiveWidth: 991,
        responsiveHeight: 0,
        responsiveSlides: false,
    });

    $('.menuDiv').on('click', function () {
        $(this).toggleClass('closeBtn');
    });

    // progress-bar
    var progress = $('.progress-bar');
    progress.appear();


    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'manual'
        }).tooltip('show');
    });

    $(this).on('appear', function () {


        $(".progress-bar").each(function () {
            each_bar_width = $(this).attr('aria-valuenow');
            $(this).width(each_bar_width + '%');
        });

    });

    // countdown

    $('.countdown').downCount({
        date: '06/10/2019 12:00:00',
        offset: +10
    }, function () {
        alert('WOOT WOOT, done!');
    });


    // fixedsticky
    $('.sidebar').fixedsticky();

    // freshslider
    var s3 = $("#ranged-value").freshslider({
        range: true,
        step: 1,
        value: [4, 60],
        onchange: function (low, high) {
            console.log(low, high);
        }
    });

    // fitVids
    $(".iframeContainer").fitVids();


    // Contact Form 	

    $("#contact_form #submit_btn").on('click', function () {
        //get input field values
        var user_name = $('#contact_form input[name=name]').val();
        var user_email = $('#contact_form input[name=email]').val();
        var user_message = $('#contact_form textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('#contact_form .input-contact input[name=name]').addClass('error');
            proceed = false;
        } else {
            $('#contact_form .input-contact input[name=name]').removeClass('error');
        }

        if (user_email == "") {
            $('#contact_form .input-contact input[name=email]').addClass('error');
            proceed = false;
        } else {
            $('#contact_form .input-contact input[name=email]').removeClass('error');
        }

        // if(user_phone=="") {    
        //     $('input[name=phone]').css('border-color','red'); 
        //     proceed = false;
        // }


        if (user_message == "") {
            $('#contact_form .textarea-contact textarea[name=message]').addClass('error');
            proceed = false;
        } else {
            $('#contact_form .textarea-contact textarea[name=message]').removeClass('error');
        }


        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };
            var output;
            //Ajax post data to server
            $.post('contact_me.php', post_data, function (response) {

                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';

                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }

                $("#result").hide().html(output).slideDown();
            }, 'json');

        }
    });


    // mailchimp start
    if ($('.mailchimp').length > 0) {
        /*  MAILCHIMP  */
        $('.mailchimp').ajaxChimp({
            language: 'es',
            callback: mailchimpCallback,
            url: "https://fioger.us6.list-manage.com/subscribe/post?u=b3a586ae54b7a16d4d10ee424&amp;id=c024e13632" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
        }
    }
    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: 'We have sent you a confirmation email',
        1: 'Please enter a value',
        2: 'An email address must contain a single @',
        3: 'The domain portion of the email address is invalid (the portion after the @: )',
        4: 'The username portion of the email address is invalid (the portion before the @: )',
        5: 'This email address looks fake or invalid. Please enter a real email address'
    };

});
