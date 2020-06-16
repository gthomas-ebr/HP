var utilities = {
  scrollTo: function(selector) {
    jQuery("html, body").animate({
      scrollTop: jQuery(selector).offset().top
    }, 500);
  }
};

jQuery(window).scroll(function() {
  if (this.scrollTO) clearTimeout(this.scrollTO);
  this.scrollTO = setTimeout(function() {
    jQuery(this).trigger('scrollEnd');
  }, 500);
});

var APP = {
  desktopBreakpoint: 968,
  currentView: '',
  isTouchDevice: '',
  init: function() {
    //console.log('app init func');
    this.setCurrentView();
    this.setIsTouchDevice();
    this.initListeners();
    this.handlers.init();
  },
  setCurrentView: function() {
    if (APP.isMobile()) {
      APP.currentView = 'mobile';
    } else if (APP.isDeskTop()) {
      APP.currentView = 'desktop';
    }
  },
  setIsTouchDevice: function() {
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch === undefined || supportsTouch === false) {
      APP.isTouchDevice = false;
    } else {
      APP.isTouchDevice = true;
      jQuery('body').addClass('touch');
    }
  },
  isMobile: function() {
    return jQuery(window).width() < APP.desktopBreakpoint;
  },
  isDeskTop: function() {
    return jQuery(window).width() >= APP.desktopBreakpoint;
  },
  initListeners: function() {
    this.handlers.init();
  },
  handlers: {
    init: function() {}
  }
};

function getUrlParams() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0].toLowerCase());
    vars[hash[0].toLowerCase()] = hash[1];
  }
  return vars;
}

function getHash() {
  return window.location.hash.substr(1);
}

var fad = {
  docs: [],
  endpoint: '/SpecialistFinder/Index',
  dataTable: null,
  map: undefined,
  markers: [],
  infoWindows: [],
  pin_icon: "/images/pin.png",
  pin_icon_selected: "/images/pin-selected.png",//added selected pin
  pinClass: "iconLabel",
  pinClassSelected: "iconLabelSelected",
  maxZIndex: 0,
  docTableIdentifier: '#doctors',
  goutHelpZipCodes: [],
  getDocs: function(zip) {
    // fad.submitDisable();
    console.log("Calling Specialist Finder API: " + fad.endpoint + "?zip=" + zip);
    var request = jQuery.ajax({
      url: fad.endpoint,
      method: "POST",
      data: { "__componentInstanceName": "SpecialistFinderConfig", "zip": zip }
    });
    jQuery('#results').addClass('open loading');


    request.done(function(resp) {
      var docs = resp.data;
      console.log(docs);
      if ($(docs).length == 0) {
        $(".zipcode-box").addClass('error');
        jQuery('#results').removeClass('open loading');
        jQuery('#FAS_zip').addClass('error');
        fad.submitEnable();
      } else {
        $(".zipcode-box").removeClass('error');
        jQuery('#results').removeClass('loading');
        jQuery('#FAS_zip').removeClass('error');
        if (jQuery.inArray(zip, fad.goutHelpZipCodes) !== -1) {
          jQuery("#promo-message").show();

          //evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', zip, 'Gout Help');
        } else {
          jQuery("#promo-message").hide();
        }
         // if (APP.isMobile()) {
          // utilities.scrollTo('#promo-message') + $('.hz-header-wrap').outerHeight();
          if($('#promo-message').is(":visible")){
            jQuery("html, body").animate({
              scrollTop: jQuery('#promo-message').offset().top - ($('.hz-header-wrap').outerHeight() + 10)
            }, 500); 
          }else{
            jQuery("html, body").animate({
              scrollTop: jQuery('#results').offset().top - ($('.hz-header-wrap').outerHeight() + 10)
            }, 500); 
          }
          
        // }
        // remove old clicks
        jQuery(fad.docTableIdentifier).off('click', 'tr');

        fad.submitEnable();

        docs.forEach(function(doc, index) {
          doc.id = index + 1;
          if(doc.PHONE){
            doc.PHONE_FORMATTED = fad.formatPhone(doc.PHONE).formatted;
            doc.PHONE_CLEAN = fad.formatPhone(doc.PHONE).phoneOnly;
            doc.PHONE_TYPE = fad.formatPhone(doc.PHONE).type;
            doc.PHONE_EXT = fad.formatPhone(doc.PHONE).ext;
          }else{
            doc.PHONE_FORMATTED = "";
            doc.PHONE_CLEAN ="";
          }
        });

        fad.docs = docs;

        // add markers and infowindows to data set
        for (x = 0; x < fad.docs.length; x++) {
          var hcp = fad.docs[x];
          fad.docs[x].marker = new MarkerWithLabel({
            position: { lat: Number(hcp.Latitude), lng: Number(hcp.Longitude) },
            labelAnchor: new google.maps.Point(14, 39), // this adjusts positioning of label on pin, could be dynamically adjusted based on number of digit or something
            labelClass: fad.pinClass,
            icon: fad.pin_icon
          });

          var daddr = hcp.Formatted_Address;

          var contentString = '<div class="info_window">' + hcp.FIRST_NAME + ' ' + hcp.LAST_NAME + '<br/>';
             switch (hcp.PHONE_TYPE) { // default, numeric, ext, alpha
            case 'numeric':
              contentString += "<a href='tel:" + hcp.PHONE_CLEAN + "' class='phone-link'>" + hcp.PHONE_FORMATTED + "</a>" + '<br/>';
              break;
            case 'ext':
              contentString += "<a href='tel:" + hcp.PHONE_CLEAN + "' class='phone-link'>" + hcp.PHONE_FORMATTED + " " + hcp.PHONE_EXT + "</a>" + '<br/>';
              break;
            case 'alpha':
              contentString += "<a class='phone-link alpha-phone-link'>" + hcp.PHONE_FORMATTED + "</a>" + '<br/>';
              break;
            default:
              contentString += "<a href='tel:" + hcp.PHONE_FORMATTED + "' class='phone-link'>" + hcp.PHONE_FORMATTED + "</a>" + '<br/>';
              break;
          }
           contentString +=  hcp.Formatted_Address + '<br/>' +
            "<a class='directions' href='https://maps.google.com/maps?daddr=" + encodeURIComponent(daddr) + "' target='_blank'>Get directions</a>" +
            "</div>";

          fad.docs[x].infoWindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
          });
        }

        var space = " ";
        var line_break = "<br />";
        if (jQuery.fn.dataTable.isDataTable(fad.docTableIdentifier)) {
          table = jQuery(fad.docTableIdentifier).DataTable();
          table.clear().rows.add(fad.docs).draw();

        } else {
          fad.dataTable = jQuery(fad.docTableIdentifier).
          on('init.dt', function() {
            fad.mapRows();
          }).DataTable({
            'data': fad.docs,
            'searching': false,
            'lengthMenu': [10, 20, 30],
            'language': {
              'lengthMenu': "Results _MENU_"
            },
            'ordering': false,
            'autoWidth': false,
            'info': false,
            'dom': 'lfr<"tablescroll"t>ip',
            'columns': [
              { "data": "id" },
              {
                "data": "Distance",
                "render": function(data, type, full, meta) {
                  var daddr = full.ADDRESS_LINE1;
                    if (full.ADDRESS_LINE2)
                      daddr += ' ' + full.ADDRESS_LINE2;
                    daddr += ' ' + full.CITY + ', ' + full.STATE + ' ' + full.ZIP;
                  var output = '<div class="detailbox"><div class="detail-close">Back to results<span></span></div><span class="distance">' + fad.formatDistance(full.Distance) + ' miles</span>';
                  var nullcheck = ", " + full.PRIMARY_DEGREE;
                  if (full.PRIMARY_DEGREE == null) {
                    nullcheck = '';
                  } else {
                    nullcheck
                  }
                  output += '<span class="name">' + full.FIRST_NAME + space + full.LAST_NAME + nullcheck + '</span>';
                  if (full.AMA_SPECIALITY) {
                    output += '<span class="speciality">' + full.AMA_SPECIALITY + '</span>';
                  }
                  output += '<span class="distance2">' + fad.formatDistance(full.Distance) + ' miles away from you</span>';
                  output += '<a class="directions" href="https://maps.google.com/maps?daddr=' + encodeURIComponent(daddr) + '" target="_blank">Get directions</a>';
                  output += '<span class="addressline1">' + full.ADDRESS_LINE1 + '</span>';
                    if (full.ADDRESS_LINE2) {
                      output += '<span class="addressline2">' + full.ADDRESS_LINE2 + '</span>';
                    }
                    output += '<span class="addressline3">' + full.CITY + ", " + full.STATE + space + full.ZIP + '</span>'; 
                  switch (full.PHONE_TYPE) { // default, numeric, ext, alpha
                    case 'numeric':
                      output += '<a href="tel:' + full.PHONE_CLEAN + '" class="phone-link">' + full.PHONE_FORMATTED + '</a>';
                      break;

                    case 'ext':
                      output += '<a href="tel:' + full.PHONE_CLEAN + '" class="phone-link">' + full.PHONE_FORMATTED + " " + full.PHONE_EXT + '</a>';
                      break;
                    case 'alpha':
                      output += '<a class="phone-link alpha-phone-link">' + full.PHONE_FORMATTED + '</a>';
                      break;
                    default:
                      output += '<a href="tel:' + full.PHONE_FORMATTED + '" class="phone-link">' + full.PHONE_FORMATTED + '</a>';
                      break;
                  }               
                  output += '<div class="download">USE THIS DOCTOR DISCUSSION GUIDE DURING YOUR VISIT<a class="cta-btn" href=#>Download now</a></div></div>';
                  return output;
                }
              }
            ]
          });
        }

        jQuery(fad.docTableIdentifier).on('click', 'td .download a', function(e) {
          e.preventDefault();
          var doc = fad.dataTable.row(jQuery(this).parents('tr')).data();
          fad.download(doc);
        });

        jQuery(fad.docTableIdentifier).on('click', 'td .detail-close', function(e) {
          e.preventDefault();
          var detailpane = jQuery(this).parents('tr');
          var results = jQuery('.tablescroll');

          detailpane.removeClass('open-detail');
          results.removeAttr('style');
        });

        // this adds the click events to the table rows
        jQuery(fad.docTableIdentifier).on('click', 'tr:not(.open-detail)', function() {
          var hcp = fad.dataTable.row(jQuery(this)).data();
          var latLng = hcp.marker.getPosition();
          var results = jQuery('.tablescroll');
          evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', hcp.ID, 'Click Specialist Name');
          jQuery(this).addClass('open-detail').siblings().removeClass('open-detail');
          results.css('overflow', 'hidden');

          fad.closeInfoWindows();
          fad.resetZIndexes();
          fad.resetStyles();
          // hcp.infoWindow.open(fad.map,hcp.marker);
          hcp.marker.setZIndex(fad.maxZIndex);
          fad.setSelectedStyle(hcp.marker);

          fad.map.setCenter(latLng);
        });

        // this adds the click events to the table rows
        jQuery(fad.docTableIdentifier).on('mouseover', 'tr:not(.open-detail)', function() {
          var hcp = fad.dataTable.row(jQuery(this)).data();
          var latLng = hcp.marker.getPosition();
          fad.resetZIndexes();
          fad.resetStyles();
          hcp.marker.setZIndex(fad.maxZIndex);
          fad.setSelectedStyle(hcp.marker);
        });

        fad.dataTable.on('draw.dt', function() {
          fad.mapRows();
        });
      }

    });

    request.fail(function(jqXHR, textStatus) {
      fad.submitEnable();
      jQuery('#FAS_zip').addClass('error');
      jQuery('#results').removeClass('loading').removeClass('open');
    });
  },
  'mapRows': function() {
    fad.closeInfoWindows();
    fad.clearInfoWindows();
    fad.clearMarkers();
    fad.resetStyles();
    var count = 0;
    var markerBounds = new google.maps.LatLngBounds();
    jQuery(jQuery(fad.docTableIdentifier + ' tr').get().reverse()).each(function() {
      var hcp = jQuery(fad.docTableIdentifier).DataTable().row(jQuery(this)).data();
      var info = jQuery(fad.docTableIdentifier).DataTable().page.info();

      if (hcp != undefined) {
        hcp.marker.labelContent = info.end - count / 2;
        hcp.marker.origZIndex = count + 1;
        hcp.marker.setZIndex(hcp.marker.origZIndex);
        //hcp.marker.labelZIndex = count + 2;
        fad.dropPin(hcp);
        markerBounds.extend(new google.maps.LatLng(Number(hcp.Latitude), Number(hcp.Longitude)));
        count = count + 2;
      }
    });
    fad.map.fitBounds(markerBounds);
    fad.maxZIndex = count;
  },
  'dropPin': function(hcp) {
    // add the prebaked marker to the map
    hcp.marker.setMap(fad.map);

    // add eventlister for click
    google.maps.event.addListener(hcp.marker, 'click', function() {
      fad.closeInfoWindows();

      fad.resetStyles();
      //hcp.infoWindow.open(fad.map,hcp.marker);
      var latLng = hcp.marker.getPosition();
      var infoRow = jQuery('#doctors tr').eq(hcp.marker.labelContent);

      evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', hcp.ID, 'Click Specialist Map Location');

      infoRow.addClass('open-detail').siblings().removeClass('open-detail');
      fad.map.setCenter(latLng);
      fad.setSelectedStyle(hcp.marker);
    });

    // add eventlister for click
    google.maps.event.addListener(hcp.marker, 'mouseover', function() {
      fad.closeInfoWindows();
      fad.resetZIndexes();
      fad.resetStyles();

      var latLng = hcp.marker.getPosition();
      var infoRow = jQuery('#doctors tr').eq(hcp.marker.labelContent);

      infoRow.addClass('hover-detail').siblings().removeClass('hover-detail');
      fad.setSelectedStyle(hcp.marker);
      hcp.marker.setZIndex(fad.maxZIndex);
    });

    // push marker/window into array for easy future removal
    fad.markers.push(hcp.marker);
    fad.infoWindows.push(hcp.infoWindow);
  },
  'clearMarkers': function() {
    while (fad.markers.length > 0) {
      var marker = fad.markers.pop();
      marker.setMap(null);
    }
  },
  'clearInfoWindows': function() {
    fad.infoWindows.length = 0;
  },
  'closeInfoWindows': function() {
    for (var index = 0; index < fad.infoWindows.length; index++) {
      fad.infoWindows[index].close();
    }
  },
  'resetZIndexes': function() {
    for (var index = 0; index < fad.markers.length; index++) {
      fad.markers[index].setZIndex(fad.markers[index].origZIndex);
    }
  },
  'resetStyles': function() {
    for (var index = 0; index < fad.markers.length; index++) {
      fad.setDefaultStyle(fad.markers[index]);
    }
  },
  'setSelectedStyle': function(marker) {
    marker.setIcon(fad.pin_icon_selected); //update icon for selected
    marker.labelClass = fad.pinClassSelected;
    marker.label.setStyles();
  },
  'setDefaultStyle': function(marker) {
    marker.setIcon(fad.pin_icon); //update icon for default
    marker.labelClass = fad.pinClass;
    marker.label.setStyles();
  },
  'submitDisable': function() {
    jQuery('.full-width .zipSearchButton').attr("disabled", "disabled");
  },
  'submitEnable': function() {
    jQuery('.full-width .zipSearchButton').removeAttr("disabled");
  },
  'download': function(doc) {

    $('input[name="__componentInstanceName"]').val("DoctorDiscussionGuidePDF");
    $('input[name="FIRST_NAME"]').val(doc.FIRST_NAME);
    $('input[name="LAST_NAME"]').val(doc.LAST_NAME);
    $('input[name="ADDRESS_LINE1"]').val(doc.ADDRESS_LINE1);
    $('input[name="ADDRESS_LINE2"]').val(doc.ADDRESS_LINE2);
    $('input[name="CITY"]').val(doc.CITY);
    $('input[name="STATE"]').val(doc.STATE);
    $('input[name="ZIP"]').val(doc.ZIP);
    $('input[name="PRIMARY_DEGREE"]').val(doc.PRIMARY_DEGREE);
    $('input[name="AMA_SPECIALITY"]').val(doc.AMA_SPECIALITY);
    $('input[name="PHONE"]').val(doc.PHONE);
    $('input[name="Latitude"]').val(doc.Latitude);
    $('input[name="Longitude"]').val(doc.Longitude);
    $('input[name="Formatted_Address"]').val(doc.Formatted_Address);
    $('input[name="Distance"]').val(doc.Distance);
    $('input[name="ID"]').val(doc.ID);

    // $.post('/Platform/Process?' + $('form#fakeForm').serialize());
    $('form#fakeForm').submit();

  },

  'formatDistance': function(distance) {
    return Math.round(distance * 100) / 100;
  },
 'formatPhone': function(phone) {
    if(phone){
      var formatted = '';
      var phoneExt = '';
      var phoneType = '';
      var phoneOnly = '';
      var cleaned = ('' + phone).replace(/\D/g, '');
      var alphaNumeric = phone.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ')
      var match = alphaNumeric.match(/^(\d{3})(\d{3})(\d{4})$/);

      phoneType = "default";
      formatted = phone;
      // console.log('phone', phone)
      if (phone.length == 10 && cleaned.length == 10) {
        phoneOnly = phone;
        phoneType = "numeric";
        formatted = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6);
      } else if (phone.includes('Ext.')) {
        var regex = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})(.*$)/g;
        match = regex.exec(phone);
        phoneOnly = phone.split('Ext.')[0];
        if(match){
          phoneExt = match[4];
          phoneExt = phoneExt.trim();
        }
        phoneType = "ext";
        formatted = "(" + phoneOnly.substring(0, 3) + ") " + phoneOnly.substring(3, 6) + "-" + phoneOnly.substring(6, 10) + " " +phoneExt;
      } else if (/[a-zA-Z]/.test(phone.substring(0, 10))) {
        phoneOnly = phone;
        phoneType = "alpha";
        formatted = phone;
      }else if (match) {
        phoneOnly = cleaned;
        phoneType = "numeric";
        formatted = '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }else if(phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)){
        phoneOnly = cleaned;
        phoneType = "numeric";
        formatted = phone;
      }else{
        phoneOnly = phone.substring(0,10);
        phoneExt = phone.substring(11);
        phoneType = "numeric";
        formatted = "(" + phoneOnly.substring(0, 3) + ") " + phoneOnly.substring(3, 6) + "-" + phoneOnly.substring(6) + " " + phoneExt;
      }
      return {
        phoneOnly: phoneOnly,
        formatted: formatted,
        ext: phoneExt,
        type: phoneType // default, numeric, ext, alpha
      };
    }
  },
  'initializeMap': function() {
    var mapOptions = {
      center: { lat: 40.988400, lng: -73.797203 },
      zoom: 8
    };

    fad.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addListenerOnce(fad.map, 'idle', function() {
      var URLzip = getUrlParams().zipcode;

      if (URLzip) {
        jQuery('#finderZip').val(URLzip);
        fad.getDocs(URLzip);
      }

      jQuery('.full-width .zipSearchButton').click(function(e) {
        e.preventDefault();
        fad.checkInputVal();
      });

      jQuery('#finderZip').on('keydown', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          fad.checkInputVal();
        }
      });
    });
  },
  'checkInputVal': function() {
    if ($('#finderZip').val() == '') {
      jQuery('#FAS_zip').removeClass('error');
      jQuery('#FAS_zip').addClass('error_no_val');
      jQuery('#results').removeClass('open');
    } else {
      fad.getDocs(jQuery('#finderZip').val());
    }
  }
};

google.maps.event.addDomListener(window, 'load', fad.initializeMap);

var evokeEvent = {
  sendEvent: function(event, category, label, action) {
    setTimeout(function() {
      document.getElementsByTagName('body')[0].dispatchEvent(
        new CustomEvent(
          event, {
            'detail': {
              'category': category,
              'label': label,
              'action': action
            },
            'bubbles': true,
            'cancelable': true
          }
        ));
    }, 500);
  },
  logEvent: function(e) {
    console.log(e.detail);
  }
};

jQuery(document).on('ready', function() {
  document.addEventListener('fadEvent', evokeEvent.logEvent, false);
});

$(document).ready(function() {
  APP.init();
});
