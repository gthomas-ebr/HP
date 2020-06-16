/*survey page validation*/
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


// $.validator.methods.email = function(value, element) {
//   return this.optional(element) || /[a-z0-9]+@[a-z]+\.[a-z]+/.test(value);
// }


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
$.validator.defaults.focusInvalid = true;



$("#Phone").inputmask({
  mask: "(999) 999-9999",
  placeholder: "(XXX) XXX-XXXX"
});

$('#zipcode, #finderZip').inputmask({
  mask: "99999",
  placeholder: ""
});


// phone field validation start
$('#Phone').on('blur', function() {
  var form = $('.formregistration');
  var phone_no = $(this).val();
  var plength = phone_no.replace(/[^0-9]/g, "");
  var msg = $(this).data('val-required');
  if (plength.length == 10) {
    $(this).attr('data-val', false);
    $(this).removeClass('input-validation-error');
    $(this).addClass('valid');
    $(this).parent().next('span.field-validation-valid').html('');
    // $(this).parents('.form-group').find('.field-validation-error').hide();
    form.removeData("validator")
    //added by the raw jquery.validate plugin 
    form.removeData("unobtrusiveValidation");
    /* added by the jquery unobtrusive plugin */
    $.validator.unobtrusive.parse(form); //$('#signup').submit();

  } else {
    console.log('else')
    $(this).attr('data-val', true);
    // $(this).parents('.form-group').find('.field-validation-error').show();
    $(this).addClass('input-validation-error');
    $(this).removeClass('valid');
    $(this).closest('.form-group').find('span').attr('class', 'field-validation-error');
    $(this).parent().next('span.field-validation-error').html('<span id="Phone-error">' + msg + '</span>');
    // form.validate(); 
    form.removeData("validator");
    //added by the raw jquery.validate plugin 
    form.removeData("unobtrusiveValidation");
    /* added by the jquery unobtrusive plugin */
    $.validator.unobtrusive.parse(form); //$('#signup').submit();

  }
})
