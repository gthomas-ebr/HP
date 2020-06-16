/*************************/
/* scroll to section */
/*************************/

function scrollToSection() {
    if (window.location.hash && window.location.hash.length > 1) {

        console.log($('.hz-header-wrap').outerHeight());
        console.log($(window.location.hash).offset().top)

        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top - $('.hz-header-wrap').outerHeight()
        }, 0);
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search); //clear the hash so that the same hash change will scroll properly.
    }
}


if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $(document).on('ready', function() {
        scrollToSection();
    });
} else {
    $(window).on('load', function() {
        scrollToSection();
    });
}

$(window).on('hashchange', function(e) {
    scrollToSection();
});


/*************************/
/* Set cookie for popup */
/*************************/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*************************/
/* Get cookie */
/*************************/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




var windowWidth = $(window).width();
// Swap search in mobile and tab
function searchSwap() {
    var $div = $('.search:has(".search-inner")');
    if (windowWidth < 1024) {
        $(".search-inner").prependTo(".nav-bar");
        $('.search').remove(".search-inner");
    } else {
        $(".search-inner").appendTo(".search");
        $('.nav-bar').remove(".search-inner");
    }
}
// Window width check function (global)
$(window).resize(function() {
    windowWidth = $(window).width();
    // searchSwap();
});

// Sticky Header
var toggleAffix = function(affixElement, scrollElement, wrapper) {
    var height = affixElement.outerHeight(),
        displayBanner = sessionStorage.getItem('newsBanner') === null || typeof sessionStorage.getItem('newsBanner') === undefined,
        top = wrapper.offset().top;
    if (displayBanner) {
        height = affixElement.outerHeight() + $('#pnlNewsBanner').outerHeight();
    } else {
        height = affixElement.outerHeight();
        if (affixElement.offset().top == 0) {
            affixElement.removeClass("affix");
        }
    }
    if (scrollElement.scrollTop() > top) {
        wrapper.height(height - $('#pnlNewsBanner').outerHeight());
        affixElement.addClass("affix");
    } else {
        affixElement.removeClass("affix");
        wrapper.height(affixElement.outerHeight());
    }
};



// Cta Popup
// check for cookie present
if ($(window).width() < 768) {
    var checkCookieHome = getCookie("popupdismissed");
    if (checkCookieHome != "" && checkCookieHome != undefined) {
        if ($(".hz-header-wrap > .gout-box").length > 0) {
            $(".hz-header-wrap > .gout-box").removeClass("show");
        }
    } else {
        $(".hz-header-wrap > .gout-box").addClass("show");
    }
    $('.hz-header-wrap > .gout-box .close-icon').click(function() {
        setCookie("popupdismissed", "1");
        $(".hz-header-wrap > .gout-box").removeClass("show");
    });
}

$(function() {
    $(".skip-navigation").hide();
});

$(document).ready(function() {
    $('[data-toggle="affix"]').each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');
        ele.before(wrapper);
        $(window).on('scroll resize load scrollstop', function() {
            toggleAffix(ele, $(this), wrapper);
        });
        // init
        toggleAffix(ele, $(window), wrapper);
    });


    searchSwap();
    /*========== Header Scripts ============*/
    // Search function
    $(".search-toggle").click(function() {
        if ($(".search").hasClass("search-active")) {
            $(this).closest(".search").removeClass("search-active");
        } else {
            $(this).closest(".search").addClass("search-active");
        }
        if (windowWidth < 1024) {
            if ($(".nav-wrapper").hasClass("m-search-active")) {
                $(this).closest(".nav-wrapper").removeClass("m-search-active");
            } else {
                $(this).closest(".nav-wrapper").addClass("m-search-active");
                $(".nav-wrapper").removeClass("menu-active");
            }
        }
    });
    // Mobile menu function
    $(".hamburger").click(function() {
        if ($(".nav-wrapper").hasClass("menu-active")) {
            $(this).closest(".nav-wrapper").removeClass("menu-active");
            $("body, html").removeClass("no-scroll");
            $(".nav-bar").css({ 'height': "" });
        } else {
            $(this).closest(".nav-wrapper").addClass("menu-active");
            $("body, html").addClass("no-scroll");
            $(".nav-wrapper").removeClass("m-search-active");

            if ($(".gout-box").hasClass("show")) {
                var hzHeader = $('.hz-header-wrap').height();
                var wHeight = $(window).height();
                var navHeight = (wHeight - hzHeader);
                $(".nav-bar").css({ 'height': navHeight });
            }
        }
    });
    if (windowWidth < 1024) {
        $(".main-nav li.menu-item-has-children.active").addClass("show-submenu");
    }
    $(".main-nav li.menu-item-has-children > a").click(function(e) {
        if (windowWidth < 1024) {
            e.preventDefault();
            if ($(this).closest("li").hasClass("show-submenu")) {
                $(this).closest("li").removeClass("show-submenu");
            } else {
                $(".main-nav li.menu-item-has-children").removeClass("show-submenu");
                $(this).closest("li").addClass("show-submenu");
            }
        }
    });
    $(".menu-wrapper a").click(function(e) {
        if (windowWidth < 1024 && !$(this).closest("li").hasClass("menu-item-has-children")) {
            $(".hamburger").click(); //Close the menu on mobile 
        }
    });
});

/********************/
//ISI PANEL
/*********************/
var overLay = $('<div class="isi-overlay"></div>');
$.fn.distFromViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return Math.min(elementBottom - viewportTop, viewportBottom - elementTop);
};
var viewportISI = {
    init: function() {
        viewportISI.enableISI();
    },
    enableISI: function() {
        if ($(".isi-tray-wrapper").length) {
            $(document).on('ready resize scroll', isiOnScroll);
            isiOnScroll();

            function isiOnScroll() {
                var isiTray = $(".isi-tray-wrapper").offset().top;
                var isiFixed = $(".isi-tray-wrapper.isi-tray").offset().top;
                if ($(window).width() > 767) {
                    if (isiFixed >= isiTray) {
                        $('.isi-tray').addClass("panel-none");
                        $('.isi-tray').removeClass("panel-show");
                    } else {
                        if ($('footer').distFromViewport() < 0) {
                            $('.isi-tray').removeClass("panel-none");
                            $('.isi-tray').addClass("panel-show");
                        }
                    }
                } else {
                    var isiFixedMob = $(".isi-tray-wrapper.isi-tray").offset().top;
                    if (isiFixedMob >= isiTray) {
                        $('.isi-tray').addClass("panel-none");
                        $('.isi-tray').removeClass("panel-show");
                    } else {
                        if ($('footer').distFromViewport() < 0) {
                            $('.isi-tray').removeClass("panel-none");
                            $('.isi-tray').addClass("panel-show");
                        }
                    }
                }
            };
        }
    }
}
$(".isi-tray .buttons a").click(function(e) {
    e.preventDefault();
    if ($(".isi-tray").hasClass("expand")) {
        $(".isi-tray").removeClass("expand");
        $(".isi-tray").css("height", "") //removes the height if set specifically when the gout-box is displayed.
        $('body, html').removeClass('no-scroll');
        overLay.remove();

    } else {
        $(".isi-tray").addClass("expand");
        // if ($(".gout-box.show").length) { //adjust the height of the isi tray since the gout-box is displayed currently.
        $(".isi-tray").height($(window).height() - ($(".hz-header-wrap").height() + $("#pnlNewsBanner").height()));
        // }

        $('body, html').addClass('no-scroll');
        overLay.insertBefore(".hz-header-wrap");
    }
    var str = $.trim($(this).text());
});
if ($('.isi-tray-wrapper').length > 0) {
    viewportISI.init();
}

$(window).resize(function() {
    $(".isi-tray.expand").height($(window).height() - ($(".hz-header-wrap").height() + $("#pnlNewsBanner").height()));
});
/***END: ISI***/



// quiz results start
// function Answer(questionId, answerId) {
//   this.questionId = questionId;
//   this.answerId = answerId;
// }
var resultArr = ['ABB', 'ABC', 'ABD', 'ACA', 'ACB', 'ACC', 'ACD', 'ADB', 'ADC', 'ADD'];
// quiz result end

// Isi Panel
$(document).ready(function() {

    $('[name=UserJourney]').change(function(e) {
        var target = $(e.target);
        if (target.val() == "Other") {
            $('.check-hide').show();
        } else {
            $('.check-hide').hide();
            /*Adding values to label from the data attribute*/
        }
    });
    // code for making the radio on back button 
    if (sessionStorage.quiz_answers) {
        var ansArrOnLoad = JSON.parse(sessionStorage.quiz_answers)
        ansArrOnLoad.forEach(function(ans) {
            $('[name="' + ans.question_id + '"][value="' + ans.ans_id + '"]').attr("checked", true)
        })
    }
    // code for making the radio button 

    //code for making the button enabled on radio option selection start
    $('.question-wrapper .checkmark').click(function() {
        $(this).parent('label').find('input[type="radio"]').trigger('click');
        var radio_chk = $(this).parents('label').find('input[type="radio"]').prop('checked').toString();
        if (radio_chk) {
            $('.quiz-wrapper').find('.next-btn').removeClass('disabled');
            // console.log($('.quiz-wrapper .next-btn').offset().top )
            if ($(window).height() <= 1023) {
                jQuery("html, body").animate({
                    scrollTop: jQuery('.quiz-wrapper .next-btn').offset().top - ($('.text-banner-wrapper').outerHeight() + $('.hz-header-wrap').outerHeight() + 50)
                }, 500);
            }
        }
    })
    var opt_ans = $('.question-wrapper [type="radio"]:checked').val();
    if (opt_ans) {

        $('.quiz-wrapper .next-btn').removeClass('disabled');

    }
    //code for making the button enabled on radio option selection end

    //code for storing the quiz answers in session stotage start
    var answerArr = [];
    $('.quiz-wrapper .next-btn').click(function(e) {
        if (sessionStorage.quiz_answers) {
            answerArr = JSON.parse(sessionStorage.quiz_answers);
        }
        var question_id = $(this).parent().find('.question-wrapper').data('qno');


        var ans_id = $('.question-wrapper [name="' + question_id + '"]:checked').val();
        if (ans_id) {
            $(this).removeClass('disabled');
            var filterArr = answerArr.filter(function(ans) {
                return ans.question_id !== question_id;
            });
            filterArr.push({
                "question_id": question_id,
                "ans_id": ans_id
            });
            answerArr = filterArr;
        }
        // console.log(answerArr);
        sessionStorage.quiz_answers = JSON.stringify(answerArr);
        if ($('.next-btn').data('url-1')) {
            // var curAns = [];
            var ansStr = '';
            for (aid in answerArr) {
                // console.log(aid)
                if (aid <= 2) {
                    ansStr += answerArr[aid].ans_id;
                }
            }
            // console.log(curAns,resultArr);
            var gControl = $('.next-btn').data('url-1');
            var gUnControl = $('.next-btn').data('url-2');
            if (resultArr.indexOf(ansStr) === -1) {
                console.log('false');
                window.location.href = gUnControl;
                sessionStorage.clear();
            } else {
                window.location.href = gControl;
                sessionStorage.clear();
            }
        }
    })
    //code for storing the quiz answers in session stotage end



    //Adding active class for home-icon
    if (window.location.pathname === "/") {
        $('.main-nav li.active').removeClass('active');
        $(".menu-wrapper .nav-bar a.icon-home").addClass('active');
    }

});


/*hotspots*/

$(document).on('click', '.img-wrap .gout', function(e) {
    e.preventDefault();
    var imgId = $(this).data("img");
    $(".popup").hide();
    $(".popup[data-img='" + imgId + "']").show();
});


$(document).on('click', '.popup  button', function(e) {
    e.preventDefault();
    $(".popup").hide();
});




$(document).on('click', '.tap-rotate', function() {
    $('.left-row,.right-row').toggle();
});

/*hotspots*/
$.validator.methods.email = function(value, element) {
    return this.optional(element) || /^(?:\w+[\-\.])*\w+@(?:\w+[\-\.])*\w+\.\w+$/.test(value);
}


//cta-box-2-column 

function setHeightCtaBox() {

    if ($(window).width() >= 768) {

        var elemh4 = 0;
        var elemP = 0;
        var elemBtn = 0;

        $('.cta-box-2-column .inner-box-content h4').each(function() {
            if ($(this).height() > elemh4) {
                elemh4 = $(this).height();
            }
        });

        $('.cta-box-2-column .inner-box-content p').each(function() {
            if ($(this).height() > elemP) {
                elemP = $(this).height();
            }
        });

        $('.cta-box-2-column .inner-box-content .cta-btn').each(function() {
            if ($(this).height() > elemBtn) {
                elemBtn = $(this).height();
            }
        });

        $('.cta-box-2-column .inner-box-content h4').height(elemh4);
        $('.cta-box-2-column .inner-box-content p').height(elemP);
        $('.cta-box-2-column .inner-box-content .cta-btn').height(elemBtn);

    }

}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }


    // other browser
    return false;
}

/*window.addEventListener('resize', function() {
  // We execute the same script as before
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
});*/
/*videoscrubber*/
$(document).ready(function() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    /*var vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', vh + 'px');*/

    if ($(".video-scrubber")[0]) {
        var myvideo = document.getElementById('scrubber-video');
        jumplink = document.getElementById('scrubber-btn');
        var startingFrame = $("#scrubber-video").data("setframe");
        var setPosition = 1;
        var setTime = 0;
        myvideo.pause();
        if (startingFrame == 1) {
            setPosition = 1;
            setTime = 0;
        } else if (startingFrame == 2) {
            setPosition = 2;
            // setTime = 1.27;
            setTime = 0.06;
        } else if (startingFrame == 3) {
            setPosition = 3;
            setTime = 0.08;
            // setTime = 2.3;
        }


        setTimeout(function() {
            myvideo.currentTime = setTime;
        }, 500);

        var slider = new Slider("#ex5a", {
            id: "slider5a",
            min: 1,
            max: 3,
            value: setPosition

        }).on("slide", function(sliderValue) {
            if (sliderValue == 1) {
                myvideo.currentTime = 0;
            } else if (sliderValue == 2) {
                myvideo.currentTime = 0.06;
            } else if (sliderValue == 3) {
                myvideo.currentTime = 0.08;
            }
        });
        $("#slider5a").on("click", function(event) {
            event.preventDefault();
        });
    }
    /*videoscrubber*/


    setHeightCtaBox();
    if ($(".phonetic-section").length > 0) {
        $(".phonetic-section .cta-btn").click(function(e) {
            e.preventDefault();
            var audio = document.getElementById("phoneticKXX");
            audio.play();
        });
    }



    // IE fixes
    if (detectIE()) {
        setTimeout(function() {
            $('.main-nav > li > a').css("letter-spacing", "0.5");
        }, 500);
        setTimeout(function() {
            $('sup').css("font-size", "13.5px");
            $('.main-nav > li > a').removeAttr('style')
        }, 1500);
    }

});


// ADA compliance
window.onload = function() {
    $("main").each(function(index, elm) { $($(elm).find('a,h1,h2,h3,h4,h5,p,img')).attr('tabindex', 0); });
    $(".header").each(function(index, elm) { $($(elm).find('p')).attr('tabindex', 0); });
    $("main").each(function(index, elm) { $($(elm).find('p>img')).removeAttr('tabindex'); });
    $(".skip-navigation a").attr("aria-label", "Skip Navigation");
    $(".zipSearchButton").attr("aria-label", "Search");
    $(".content-carousel.slick-initialized .carousal-content").each(function() {
        $(".slick-arrow img").removeAttr("tabindex");
        if ($(this).attr("tabindex") == -1) {
            $(this).find("a,h1,h2,h3,h4,h5,p,img").removeAttr("tabindex");
        }
    });
    $(".slick-dots li", ".text-carousel-wrap .slick-dots li button").removeAttr("tabindex");
}


/*video-banner*/
function bannerSetCookie(key, value) {
    var now = new Date();
    now.setDate(now.getDate() + 1)
    now.setHours(0);
    now.setMinutes(0);
    now.setMilliseconds(0);
    var bannerdate = new Date(now);
    // bannerdate.setTime(bannerdate.getTime() + expiry);
    // document.cookie = key + '=' + value + ';' + bannerdate + ";path=/";
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + bannerdate;
}


function bannerScroll() {
    var checkVideoPlayed = getCookie("isPlayed");

    // if ($('.video-section-banner').length > 0 && $('.video-section-banner video').hasClass("play-inview")) {

    if ($('.video-section-banner').length > 0 && !checkVideoPlayed && $('.video-section-banner video').hasClass("play-inview")) {
        var hT = $('.video-section-banner').offset().top,
            hH = $('.video-section-banner').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
            $('.video-section-banner video')[0].play();
            $('.video-section-banner video')[0].disablePictureInPicture = true;
            $('.video-section-banner video').show();
            $('.video-section-banner img').hide();
            bannerSetCookie("isPlayed", true);
        }
    }
}

$(window).scroll(function() {
    bannerScroll();
});



$(document).ready(function() {

    if (!$('.video-section-banner video').hasClass("play-inview")) {
        bannerScroll();
    }

    $('.video-section-banner video').on('ended', function() {
        $(".video-section-banner video").hide();
        $(".video-section-banner img").show();
        $(".video-section-banner .play-btn").show();
        if ($(window).width() > 1024) {
            $(".video-section-banner .play-btn").hide();

            $(".video-section-banner").hover(function() {
                if ($('.video-section-banner video').css('display') == 'none') {
                    $(".play-btn").show();
                }
            }, function() {
                $(".play-btn").hide();
            });

        }

    });
    $(".video-section-banner").click(function() {
        if ($('.video-section-banner video').css('display') == 'none') {
            $(".video-section-banner video").show();
            $('.video-section-banner video')[0].play();
            $('.video-section-banner video')[0].disablePictureInPicture = true;
            $(".video-section-banner img").hide();
            $(".video-section-banner .play-btn").hide();
        }
    });
    var checkVideoPlayed = getCookie("isPlayed");
    if (checkVideoPlayed) {
        $(".video-section-banner video").hide();
        $(".video-section-banner img").show();
        $(".video-section-banner .play-btn").show();
    }
});

function videoplay() {
    $('.video-section-banner video').trigger('play');


}

function videopause() {
    $('.video-section-banner video').trigger('pause');


}
var x = false;
$(".video-section-banner video").on('click touchstart', function() {
    if (!x) {
        videoplay()

        x = true;
    } else {
        videopause()

        x = false;

    }
});
/*video-banner-end*/


// Append gout-box inside Header

// var windowWidth = $(window).width();
// $(window).load(function(){

//   if (windowWidth <= 1024) {
//     $(".gout-box.grey-bg.visible-mobile").insertBefore(".top-nav-links.visible-mobile")
//   }
// });





// Covid News Banner 

$(window).load(function() {
    $(".skip-navigation").hide();
});


// Hotspot Auto Animate


$.fn.inView = function() {
    var win = $(window);
    obj = $(this);
    var adjHeight = $(".hz-header-wrap").outerHeight() + 50;
    if ($('.news-banner-wrapper:visible').length) {
        adjHeight = $(".hz-header-wrap").height() + $('.news-banner-wrapper').height() - 50;
    }
    var scrollPosition = win.scrollTop();
    var visibleArea = win.scrollTop() + win.height();
    var objEndPos = (obj.offset().top + obj.outerHeight() - (adjHeight));
    return (visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
};


var count = -1;
var aminated = false;
var aminateStarted = false;
var timesRun = 0;
var interval, addAnimater;
var windowWidth = $(window).width();

function randomClass() {
    aminateStarted = true;
    interval = setInterval(function() {
        timesRun += 1;
        if (timesRun === 5) {
            aminated = true;
            clearInterval(interval);
            $('.gout').removeClass("hover");
            addAnimate();
        }
        if (!aminated) {
            var items = $('.gout');
            var number = items.length;
            var random = Math.floor((Math.random() * number));
            items.removeClass("hover");
            items.eq(random).addClass("hover");
        }
    }, 1000);
}

function addAnimate() {
    addAnimater = setInterval(function() {
        var boxes = $('.gout');
        var boxLength = boxes.length - 1;
        count < boxLength ? count++ : count = 0;
        boxes.removeClass('active').eq(count).addClass('active');

        var imgId = $(boxes[count]).data("img");
        $(".popup").hide();
        $(".popup[data-img='" + imgId + "']").show();

        if (count == '5' && windowWidth <= 767) {
            $('.left-row, .right-row').toggle();
        }

        if (boxLength == count) {
            clearInterval(addAnimater);
            setTimeout(function() {
                $('.gout').removeClass('active')
                $('.popup').hide();

                if (windowWidth <= 767) {
                    $('.left-row, .right-row').toggle();
                }
            }, 2000);
        }
    }, 2000);
}


$(window).scroll(function() {
    if ($(".hotspots").length > 0) {
        if ($(".hotspots").inView() && !aminateStarted) {
            randomClass();
        }
    }
});


var pinkBg = $('.hotspots').parents('.bg-gradient');

$(pinkBg).on('click', function() {
    $('.gout').removeClass('hover')
    $('.popup').hide();
    clearInterval(interval)
    clearInterval(addAnimater)
});



// Scrolling Desktop Navigation


$(window).scroll(function() {

    if (windowWidth >= 1024) {
        var header = $('.hz-header-wrap'),
            scroll = $(window).scrollTop();

        if (scroll >= 51) {
            // header.addClass('affix');

            if ($('.nav-bar').find('.logo-wrapper').length == 0) {
                $('.top-container .logo-wrapper').clone().insertBefore($('.nav-bar .icon-home'));
            }

        } else {
            // header.removeClass('affix');
        }
    }
});



warnAboutLeaving = false;

$("#quiz-start .cta-btn").on("click", function(e) {
    quizSetCookie("isStarted", true);
    addWindowUnload()
});

function addWindowUnload() {
    if (!warnAboutLeaving) {
        warnAboutLeaving = true;
        $(window).on('beforeunload', function() {
            return true;
        });
    }
}

function removeWindowUnload() {

    warnAboutLeaving = false;
    $(window).off('beforeunload');
}

$(document).on("click", "a", function(e, $e) {
    var quizStarted = getCookie("isStarted");

    quizContent = $(this).parents(".quiz-content").length;
    quizWrapper = $(this).parents(".quiz-wrapper").length;

    if ($(this).parent().find('.question-wrapper').data('qno') === "q6") {
        setCookie("isStarted", 'false');
        $("a").off("click");
    }

    if ($(this).data("dismiss") === "modal") {
        $('#leave-modal-dialog').modal('hide');
    }

    link = $(this).attr('href')
    if ($(this).hasClass('btn-continue')) {
        sessionStorage.removeItem("quiz_answers")
        removeWindowUnload();
        window.location = link;
    }

    if (quizStarted && (quizContent || quizWrapper)) {
        removeWindowUnload();
    } else {
        if ($(".quiz-wrapper").length == 1 && !$(this).parents('.isi-tray-main-div').length == 1 && !$(this).parent(".menu-item-has-children").length == 1) {
            showLeaveModal(e, $e, link);
        }
    }

    var rbChecked = $(".pam-form input:radio:checked").length;
    var cbChecked = $(".pam-form input:checkbox:checked").length;
    var ipFilled = false;
    var ipError = $('.input-validation-error').length;

    $(".form-wrapper .form-group input").each(function() {
        if ($(this).val() !== "") {
            ipFilled = true;
        }
    });

    if (rbChecked || ipFilled || ipError || cbChecked) {
        if (!$(this).parents('.isi-tray-main-div').length == 1) {
            removeWindowUnload();
            showLeaveModal(e, $e, link);
        }
    }
})


function quizSetCookie(key, value) {
    var now = new Date();
    now.setDate(now.getDate() + 1)
    now.setHours(0);
    now.setMinutes(0);
    now.setMilliseconds(0);
    var bannerdate = new Date(now);
    // bannerdate.setTime(bannerdate.getTime() + expiry);
    // document.cookie = key + '=' + value + ';' + bannerdate + ";path=/";
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + bannerdate;
}


function showLeaveModal(e, $e, link) {
    $e = $(this);
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation(); //stop other events firing on this element.
    //   link = $e.attr('href');
    $leaveModal = $('#leave-modal-dialog');
    $leaveModal.modal();

    $("#leave-modal-dialog .btn-continue").attr("href", link);

}



// Exit modal on Peer mentor form and Gout Quiz 

$(document).ready(function() {
    var formDirty = getCookie("formDirty");
    setCookie("formDirty", 'false');
    removeWindowUnload();

    if (window.location.href.indexOf("question-1") > -1) {
        addWindowUnload();
    }

    $('form').on('keyup change paste', 'input, select, textarea', function() {
        formDirty = getCookie("formDirty");

        if (formDirty == "false") {
            setCookie("formDirty", 'true');
        }
    });

    if (window.location.href.indexOf("pam") > -1 || window.location.href.indexOf("peer-mentor") > -1) {
        console.log("page");
        $(window).on('beforeunload', function() {
            formDirty = getCookie("formDirty");
            console.log(formDirty);
            if (formDirty === "true") {
                return true;
            }
        });
    }

    $(".cta-btn.form-submit").on("click", function() {

        if ($('.input-validation-error').length >= 1) {
            $(window).on('beforeunload', function() {
                return true;
            });
        } else {
            $(window).off('beforeunload');
        }
    });

})


$('#leave-modal-dialog').on('hidden.bs.modal', function(e) {
    console.log("leave");
    formDirty = getCookie("formDirty");
    if (formDirty === "true") {
        console.log("in");
        addWindowUnload();
    }
});

// newsBanner

(function($) {
    $(function() {
        var onClose = null,
            displayBanner = sessionStorage.getItem('newsBanner') === null || typeof sessionStorage.getItem('newsBanner') === undefined;
        if (displayBanner) {
            $('.news-banner-wrapper').show();
            $('body').addClass('news-banner-open');
        } else {
            if ($('.news-banner-wrapper').length > 0) {
                $('#pnlNewsBanner,.news-banner-wrapper').hide();
            }
        }
        $('.news-banner-wrapper .news-banner-close').click(function() {
            sessionStorage.setItem('newsBanner', '1');
            $('#pnlNewsBanner,.news-banner-wrapper').hide();
            $('.hz-header-wrap').css('top', 0);
            $('body').removeClass('news-banner-open');
            if (typeof onClose === 'function') {
                onClose();
            }
        });;
        if (displayBanner) {
            var onScroll = function() {
                    var offset = parseInt($('.news-banner-wrapper').css('top'), 0);
                    if (!$('body').hasClass('news-banner-open')) {
                        $(window).off('load resize scrollstop scroll', onScroll);
                        if (offset > 0) {
                            $('.hz-header-wrap').css('top', 0);
                        }
                        return;
                    }
                    var top = $(window).scrollTop(),
                        height = $('#pnlNewsBanner').height();
                    if (top < height && offset !== height) {
                        var updatedTop = height - top,
                            menuTop = $('.news-banner-wrapper').height() + $('.hz-header-wrap').height() + updatedTop;
                        if (!$('.hz-header-wrap').hasClass('affix')) {
                            menuTop -= top;
                        }
                        $('.hz-header-wrap').css('top', updatedTop);
                        $('.menuIcon').css('top', menuTop);
                    } else {
                        $('.hz-header-wrap').css('top', 0);
                    }
                },
                toggleMenu = function() {
                    if (!$('body').hasClass('news-banner-open')) {
                        $('.menuIcon').off('click', toggleMenu);
                        return;
                    }
                    if (!$('.hz-header-wrap').hasClass('affix')) {
                        var scrollTop = $(window).scrollTop(),
                            top = $('.news-banner-wrapper').height() + $('.hz-header-wrap').height() + parseInt($('.hz-header-wrap').css('top'), 0),
                            menuTop = parseInt($('.menuIcon').css('top'), 0);
                        if (menuTop != top - scrollTop) {
                            $('.menuIcon').css('top', top - scrollTop);
                        }
                    }
                };
            $('.menuIcon').on('click', toggleMenu);
            $(window).on('load resize scrollstop scroll', onScroll);
            onScroll();
            onClose = onScroll;
        }

    });
    $()
})(window.jQuery);
