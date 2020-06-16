var defaultRangeValidator = $.validator.methods.range;
$.validator.methods.range = function(value, element, param) {
  if (element.type === 'checkbox' || element.type === 'radio') {
    // if it's a checkbox return true if it is checked
    return element.checked;
  } else {
    // otherwise run the default validation function
    return defaultRangeValidator.call(this, value, element, param);
  }
};
$.validator.addMethod("require_if_true", function(value, element, options) {
  if (value == '')
    return false;
  return true;
});

$.validator.addMethod("stringlength_if_true", function(value, element, options) {
  var length = value.length;
  if (length < $(element).data('val-min-length') || length > $(element).data('val-max-length'))
    return false;
  return true;
});

$.validator.unobtrusive.adapters.add("requireiftrue", ["dependentProperty"], function(options) {

  options.rules["require_if_true"] = options.params.dependentProperty;
  options.messages["require_if_true"] = options.message;
});

$.validator.unobtrusive.adapters.add("stringlengthiftrue", ["dependentProperty"], function(options) {
  options.rules["stringlength_if_true"] = options.params.dependentProperty;
  options.messages["stringlength_if_true"] = options.message;
});

// checkbox validation
$.validator.defaults.focusInvalid = false;
// Trim space
function trimWhitespaces(element) {
  var textFieldVal = $(element).val();
  $(element).val($.trim(textFieldVal));
}
$(function() {
  var multiChckError = $(".multi-checkbox").attr("data-val-required");
  $.validator.addMethod("CheckOneCategory", function(value, element) {
    if ($(".multi-checkbox:checkbox:checked").length > 0) {
      $(".multi-checkbox").removeClass("input-validation-error");
      // $(".multi-checkbox").closest("radio-button-wrap").removeClass("addmargin");
      return true;
    } else {
      $(".multi-checkbox").addClass("input-validation-error");
      return false;
    }
  }, multiChckError);
  $.validator.addClassRules("multi-checkbox", { CheckOneCategory: true });
});

$(document).ready(function() {
  $("input[type=checkbox], input[type=radio]").on("change", function() {
    var $this = $(this);
     setTimeout(function() {
      if ($this.hasClass("input-validation-error")) {
        $this.closest(".radio-button-wrap").addClass("addmargin");
        $this.closest(".radio-flex").addClass("addmargin");
      } else {
        $this.closest(".radio-button-wrap").removeClass("addmargin");
        $this.closest(".radio-flex").removeClass("addmargin");
      }
   },25);
  });

  $(".cta-btn").click(function(e) {
    trimWhitespaces("#fname");
    trimWhitespaces("#lname");
    trimWhitespaces("#email");
    trimWhitespaces("#emailconf");
    setTimeout(function() {
      if( $(".contact-info").find("input.input-validation-error").length > 0){
        $(".privacy-notice").css("margin-top","25px");
      }else{
        $(".privacy-notice").css("margin-top","0");
      }
    },50);
    $(".radio-button-wrap").each(function() {
      var $this = $(this);
      setTimeout(function() {
        if ($this.find("input").hasClass("input-validation-error")) {
          $this.addClass("addmargin");
        } else {
          $this.removeClass("addmargin");
        }
      },25);
    });
    setTimeout(function() {
      if ($(".radio-flex").find("input").hasClass("input-validation-error")) {
        $(".privacy-notice .radio-flex").addClass("addmargin");
      } else {
       $(".privacy-notice .radio-flex").removeClass("addmargin");
      }
    },25);
    if($('.input-validation-error').length >0){
      setTimeout(function() {
        $('html,body').animate({
          'scrollTop': ($('.input-validation-error').first().offset().top - 55)
        }, 550);
        $('.input-validation-error').first().focus();
      });
    }
  });
});

function validateNumber(e) {
  var key = window.e ? e.keyCode : e.which;
  if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 32) {
    return true;
  } else if (key < 48 || key > 57) {
    return false;
  } else {
    return true;
  }
}


function validateZipCode() {
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  if (!(isAndroid)) {
    $("input[type='tel']").keypress(validateNumber);
  } else {
    console.log('Android device, zip validation is off');
  }
}

var util = {
  zipSearch: {
    init: function() {
      //console.log('handlers zipSearch init');
      $(".zipcode-box button").on('click', function(e) {
        //console.log('handlers zipSearch init firstFunction');
        e.preventDefault();
         util.zipSearch.redirectFAS();
      });

      $(".zipcode-box input[name='zip']").on('keydown', function(event) {
        if (event.keyCode === 13) {
          util.zipSearch.redirectFAS();
        }
      });
    },
    redirectFAS: function() {
      var search_input_val = $(".zipcode-box input[name='zip']").val();
      if (search_input_val == '' || search_input_val.length < 5) {
        $(".zipcode-box").addClass('error');
      } else {
        $(".zipcode-box").removeClass('error');
        /*var findSpecialistUrl = url.DOCTOR_FINDER + "?zipcode=" + search_input_val;
        console.log(findSpecialistUrl);
        window.location.href = findSpecialistUrl;*/
      }
    }
  }
}
$(document).ready(function() {
  
  $(".zipcode-box input[type='tel']").on("cut copy paste", function(e) {
    e.preventDefault();
  });
  util.zipSearch.init();
  validateZipCode();
  // Phone field paste validation
  $("#Zip").on("paste keypress", function(e) {
    var $this = $(this);
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
    }
    setTimeout(function(){
        $this.val($this.val().replace(/[^\d\.]/g, ""));
    },100);
  });

  if($("#Phone").length > 0) {
    $("#Phone").inputmask({
      mask: "(999) 999-9999",
      placeholder: "(XXX) XXX-XXXX"
    });
  }


  $(".formregistration button[type=submit]").on('click', function(e) {
    e.preventDefault();
    var headHeight = $('.hz-header-wrap').height() +40;
    if ($('.input-validation-error').length > 0) {
      setTimeout(function() {
        $('html,body').animate({
          'scrollTop': ($('.input-validation-error').first().offset().top - headHeight)
        }, 0);
        $('.input-validation-error').first().focus();
      });
    }
  });
});
