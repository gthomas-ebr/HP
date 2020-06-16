/****************/
/* Header Menu */
/***************/
// Toggling nav bar in mobile
var windowHeight = $(window).height();
var windowWidth = $(window).width();

function searchSwap() {
  var $div = $('.search:has(".search-inner")');
  if (windowWidth < 1024) {
    $(".search-inner").insertAfter(".main-nav");
    $(".search").remove(".search-inner");
  } else {
    $(".search-inner").appendTo(".search");
    $(".nav-bar").remove(".search-inner");
  }
}

$(document).ready(function() {
  //Toggle active state for menu items
  var path = location.pathname;
  $(".menu-wrapper .nav-bar li.home a").each(function() {
    if ($(this).attr('href') == path) {
      $('.menu-wrapper .nav-bar li.home').removeClass('active');
      $('.menu-wrapper .nav-bar li.home').addClass('active');
    }
  });

  searchSwap();
  $(".menuIcon").click(function() {
    $(this).toggleClass("open");
    $(".nav-bar").toggleClass("show");
    $(".bar, .bar-1, .bar-2, .bar-3").toggleClass("change");
    $(".rsmpl-stop   button").trigger("click");
  });

  $(".search-toggle").click(function() {
    if ($(".search").hasClass("search-active")) {
      $(this)
        .closest(".search")
        .removeClass("search-active");
    } else {
      $(this)
        .closest(".search")
        .addClass("search-active");
    }
    if (windowWidth < 1024) {
      if ($(".nav-wrapper").hasClass("m-search-active")) {
        $(this)
          .closest(".nav-wrapper")
          .removeClass("m-search-active");
      } else {
        $(this)
          .closest(".nav-wrapper")
          .addClass("m-search-active");
        $(".nav-wrapper").removeClass("menu-active");
      }
    }
  });

  // Mobile menu function
  $(".hamburger").click(function() {
    if ($(".nav-wrapper").hasClass("menu-active")) {
      $(this).closest(".nav-wrapper").removeClass("menu-active");
      $(".nav-bar").css({
        'height': ""
      });
    } else {
      $(this).closest(".nav-wrapper").addClass("menu-active");
      $(".nav-wrapper").removeClass("m-search-active");
      // Adjust header height based on gout box and ISI
      navHeight();
    }
    if ($('body').hasClass('no-scroll')) {
      $('body, html').removeClass('no-scroll');
    } else {
      $('body, html').addClass('no-scroll');
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

  $('.visible-mobile .connect li a').click(function() {
    $(".nav-wrapper").removeClass("menu-active");
    $(".nav-bar").css({
      'height': ""
    });
    $('body, html').removeClass('no-scroll');
  });

  function goutHeight() {
    if ($(".hz-header-wrap > .gout-box").hasClass("show")) {
      var goutHeight = $('.hz-header-wrap > .gout-box').outerHeight();
      $(".hz-header-space").css("margin-top", goutHeight);
    } else {
      $(".hz-header-space").css("margin-top", "0px");
    }
  }
  // Cta Popup
  // check for home page cookie present
  if ($(window).width() < 1024) {
    var checkCookieHome = getCookie("popupdismissed");
    if (checkCookieHome != "" && checkCookieHome != undefined) {
      if ($(".hz-header-wrap > .gout-box").length > 0) {
        $(".hz-header-wrap > .gout-box").removeClass("show");
        goutHeight();
      }
    } else {
      $(".hz-header-wrap > .gout-box").addClass("show");
      goutHeight();
    }
  }
  $('.hz-header-wrap > .gout-box .close-icon').click(function() {
    setCookie("popupdismissed", "1");
    $(".hz-header-wrap > .gout-box").removeClass("show");
    if ($('.nav-bar').hasClass("show")) {
      navHeight();
    }
    goutHeight();
  });
});
$(window).resize(function() {
  if ($(window).width() >= 1024) {
    $(".hz-header-wrap > .gout-box").removeClass("show");
  } else {
    var checkCookieHome = getCookie("popupdismissed");
    if (checkCookieHome != "" && checkCookieHome != undefined) {
      if ($(".hz-header-wrap > .gout-box").length > 0) {
        $(".hz-header-wrap > .gout-box").removeClass("show");
      }
    } else {
      $(".hz-header-wrap > .gout-box").addClass("show");
    }
  }
});

function navHeight() {
  var hzHeader = $('.hz-header-wrap').height();
  var wHeight = $(window).height();
  var socialShareHeight = $('.social-share-wrap .social-media').height();
  var navHeight = hzHeader + socialShareHeight;
  // if ($(".gout-box").hasClass("show")) {
  navHeight = hzHeader + socialShareHeight;
  $(".nav-bar").css({
    'height': 'calc(100vh - ' + navHeight + 'px)'
  });
}

var overLay = $('<div class="overlay-isi"></div>');

$(".isi-tray .buttons a").click(function(e) {
  e.preventDefault();
  if ($(".isi-tray").hasClass("expand")) {
    overLay.remove();

  } else {
    overLay.insertBefore(".hz-header-wrap");
  }

});

window.onload = function() {
  $("main").each(function(index, elm) {
    $($(elm).find("a,h1,h2,h3,h4,h5,p,img")).attr("tabindex", 0);
  });
  $("main").each(function(index, elm) {
    $($(elm).find("p>img")).removeAttr("tabindex");
  });
  $(".skip-navigation a").attr("aria-label", "Skip Navigation");
  $(".zipSearchButton").attr("aria-label", "Search");
  $(".content-carousel.slick-initialized .carousal-content").each(function() {
    $(".slick-arrow img").removeAttr("tabindex");
    if ($(this).attr("tabindex") == -1) {
      $(this)
        .find("a,h1,h2,h3,h4,h5,p,img")
        .removeAttr("tabindex");
    }
  });
};

if ($(".important-information").length) {
  $(document).on("load resize scroll", function() {
    var scrollTop = $(window).scrollTop(),
      elementOffset = $(".important-information").offset().top,
      distance = elementOffset - scrollTop;
    //console.log(distance);
    if (distance < 830) {
      $(".isi-tray .tabs-container").fadeOut();
    } else {
      //if ($('footer').distFromViewport() < 0) {
      $(".isi-tray .tabs-container").fadeIn();
      //}
    }
  });
}

//Fixed isi panel script start
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
    if ($('.isi-tray-wrapper').distFromViewport() > 90) {
      $('.isi-tray').addClass("panel-none");
    } else {
      $('.isi-tray').removeClass("panel-none");
    }

    if ($(".isi-tray-wrapper").length) {
      $(document).on('load resize scroll', function() {
        if (($('.isi-tray-wrapper').distFromViewport() > 90)) {
          $('.isi-tray').addClass("panel-none");
        } else {
          if ($('footer').distFromViewport() < 0) {
            $('.isi-tray').removeClass("panel-none");
          }
        }
      });
    }
  }
}

$(document).ready(function() {
  if ($('.isi-tray-wrapper').length > 0) {
    viewportISI.init();
  }
  $(".buttons a").click(function() {
    $(".isi-tray").toggleClass("expand");
    if ($('body').hasClass('no-scroll') && $(".isi-tray.expand").length == 0 && $(".nav-wrapper.menu-active").length == 0) {
      $('body, html').removeClass('no-scroll');
    } else {
      $('body, html').addClass('no-scroll');
    }
    var str = $.trim($(this).find('span').text());
    if ($(".isi-tray").hasClass("expand")) {
      var res = str.replace("expand", "collapse");
      $(this).find('.span').html(res);
    } else {
      var res1 = str.replace("collapse", "expand");
      $(this).find('span').html(res1);
    }
  });

  if ($('.accordion-expand').length > 0) {

    $(".accordion-expand span").click(function() {
      $('.accordion-expand .collapse').toggleClass("show");
      $('.accordion-expand .expand').toggleClass("hide");
    });

    $(".accordion-expand .expand").click(function() {
      $('.card-title a').removeClass("collapsed").attr("aria-expanded", "false");
      $('.col .collapse').addClass("show");
    });

    $(".accordion-expand .collapse").click(function() {
      $('.card-title a').addClass("collapsed").attr("aria-expanded", "true");
      $('.col .collapse').removeClass("show");
    });

  }
});

/*sign-up form*/

// hide-the-div-onload
$(document).ready(function() {
  var $form = $("#signup");
  if ($form.length) {
    $(".caregiver-block, .patient-block, .privacy-submit, .notify-checkbox, .select-parent, .third-radio, .fourth-radio, .additional-input, .form-input-block").hide();
    $form.find("#Phone").closest(".form-group").hide();
  }
});

function hidePhoneBlock($form) {
  $phoneBlock = $form.find("#Phone").closest(".form-group");
  if (!$phoneBlock.is(":visible")) {
    return;
  }
  $phoneBlock.hide();

  var $phone = $form.find("#Phone").removeClass("input-validation-error");
  if ($phone.attr('data-val') === 'false') {
    $phone.attr('data-val', true);
    var $form = $phone.closest("form");
    // form.validate();
    $form.removeData("validator");
    //added by the raw jquery.validate plugin
    $form.removeData("unobtrusiveValidation");
    /* added by the jquery unobtrusive plugin */
    $.validator.unobtrusive.parse($form);
  }
  $form.find("#Phone-error").parent().removeClass("field-validation-error").addClass("field-validation-valid").empty();
}
$("#signup input[type='radio']").change(function() {
  var changedName = $(this).attr("name"),
    changedValue = $(this).val(),
    $form = $(this).closest("form"),
    userType = $('[name=UserType]:checked').val(),
    isPatient = userType === "Patient",
    $patientBlock = $(".patient-block"),
    $caregiverBlock = $(".caregiver-block"),
    $block = isPatient ? $patientBlock : $caregiverBlock,
    $otherBlock = !isPatient ? $patientBlock : $caregiverBlock,
    $diagnosisBlock = $block.find(".notify-checkbox"),
    $treatmentCountBlock = $block.find(".select-parent"),
    $programPAMBlock = $block.find(".third-radio"),
    $optInPostalBlock = $block.find(".fourth-radio"),
    $addressBlock = $form.find(".additional-input");
  if (changedName === "UserType") {
    hidePhoneBlock($form);
    $block.show();
    $otherBlock.hide();

    var $inputForm = $form.find(".form-input-block");
    if (!$inputForm.is(":visible")) {
      $inputForm.show();
      $(".privacy-submit").show();
    }
    $otherBlock.find(".notify-checkbox").hide();
    $otherBlock.find(".select-parent").hide();
    $otherBlock.find(".third-radio").hide();
    $otherBlock.find(".fourth-radio").hide();
    $addressBlock.hide();
    return;
  }
  if (changedName === "PatientUserJourney" || changedName === "CaregiverUserJourney") {
    var userJourney = changedValue,
      showDiagnosisBlock = userJourney === "Prospect",
      showTreatmentCountBlock = userJourney === "ExistingPatient",
      showProgramPAMBlock = changedName === "PatientUserJourney" && (userJourney === "ExistingPatient" || userJourney === "NewPatient"),
      showOptInPostalBlock = true;

    if (showDiagnosisBlock !== $diagnosisBlock.is(":visible")) {
      if (showDiagnosisBlock) {
        $diagnosisBlock.show();
      } else {
        $diagnosisBlock.hide();
      }
    }
    if (showTreatmentCountBlock !== $treatmentCountBlock.is(":visible")) {
      if (showTreatmentCountBlock) {
        $treatmentCountBlock.show();
      } else {
        $treatmentCountBlock.hide();
      }
    }
    if (changedName === "PatientUserJourney" && showProgramPAMBlock !== $programPAMBlock.is(":visible")) {
      if (showProgramPAMBlock) {
        $programPAMBlock.show();
      } else {
        $programPAMBlock.hide();
        hidePhoneBlock($form);
      }
    }
    if (showOptInPostalBlock !== $optInPostalBlock.is(":visible")) {
      if (showOptInPostalBlock) {
        $optInPostalBlock.show();
      } else {
        $optInPostalBlock.hide();
      }
    }
    return;
  }
  if (changedName === "Diagnosis") {
    return;
  }
  if (changedName === "TreatmentCount") {
    return;
  }
  if (changedName === "Program-PAM") {
    var showPhone = changedValue === "true",
      $phoneBlock = $form.find("#Phone").closest(".form-group");
    if (showPhone !== $phoneBlock.is(":visible")) {
      if (showPhone) {
        $phoneBlock.show();
      } else {
        hidePhoneBlock($form);
      }
    }
    return;
  }

  //changedName === "Opt-in-Postal"
  var showAddress = changedValue === "true";
  if (showAddress !== $addressBlock.is(":visible")) {
    if (showAddress) {
      $addressBlock.show();
    } else {
      $addressBlock.hide();
    }
  }
});

//reset hidden fields when not visible
$("#signup input[type='radio']").change(function() {
  $("#signup input[type='radio']:checked:not(:visible), #signup input[type='checkbox']:checked:not(:visible)").attr('checked', false);
  $("#signup select:not(:visible), #signup input:not([type='radio'],[type='checkbox'],[type='hidden'],:visible)").val('');
});

// window.rsConf = {
//   settings: {
//     hlword: '#A4CBFF',
//     hlsent: '#BEFFD6'
//   }
// };


/*end-sign-up form*/

// Smooth Scroll

var target = window.location.hash,
  target = target.replace('#', '');




function smoothScrollingTo(target) {
  if (target !== "" && $(target).length > 0) { //Check if hash is not empty
    //     var fixedbar_height = $('.hz-header-wrap').height();

    if ($(target).closest('.collapse').length > 0 || $(target).hasClass('collapse')) { // Check for Accordion-List
      target = $(target).closest('.collapse');
      $(target).collapse('show');
      $('html,body').animate({
        scrollTop: $(target).offset().top
      }, 1000);


      window.location.hash = ""; // delete hash so the page won't scroll to it
    } else {

      window.location.hash = ""; // delete hash so the page won't scroll to it
      $('html,body').animate({
        scrollTop: $(target).offset().top
      }, 1000);
    }
  }
}

window.addEventListener("load", function(e) {
  smoothScrollingTo("#" + target);
});

$(document).ready(function() {
  // Smooth Scroll
  $('a').on('click', function(event) {
    if (this.hash && this.pathname === location.pathname) { //check for hash and check that it is the same page.
      //pathname check is better than href due to location.href including a hash.
      smoothScrollingTo(this.hash);
      event.preventDefault();
    }
  });

});


/*readspeaker fixes to overcome JS Breaking*/
window.rsConf = {
  general: {
    preserveElements: '.rs_preserve, .isi-tray-wrapper.isi-tray, .accordion-expand,.content-carousel-wrap '

  }
};

// convert SVG to inline SVG to invert the color on hover
jQuery('.social-links img').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');

});

$(".multicolumncontent.card").click(function(e) {
  if (!$(e.target).is("a") && $(this).closest(".card").find("a").length) {
    $(this).closest(".card").find("a")[0].click();
  }
})

