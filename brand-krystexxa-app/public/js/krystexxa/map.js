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

var fad = {
  docs: [],
  endpoint: "http://localhost:3000/patterns/07-pages-specialist-finder/07-pages-specialist-finder.rendered.html",
  dataTable: null,
  map: undefined,
  markers: [],
  infoWindows: [],
  pin_icon: "/map_test/ghost-pin.png",
  pinClass: "iconLabel",
  pinClassSelected: "iconLabelSelected",
  maxZIndex: 0,
  docTableIdentifier: "#doctors",
  goutHelpZipCodes: ["44143","44117","44092","44121","44132","44040","44123","44119","44124","44110","44112","44118","44122","44108","44096","44097","44095","44106","44094","44120","44073","44026","44022","44128","44103","44104","44072","44065","44024","44061","44060","44045","44077","44081","44086","44057","44033","44046","44064","44021","44137","44139","44146","44105","44127","40202","40285","40251","40252","40253","40250","40256","40257","40259","40261","40255","40294","40266","40293","40290","40289","40287","40295","40281","40280","40270","40268","40233","40232","40283","40282","40297","40201","40296","40231","40221","40225","40224","40041","40298","40203","47132","47133","47131","47134","47144","47199","40204","47190","40212","40210","40206","40208","40292","40217","47129","47151","40211","40209","40215","40205","47150","40207","40213","47130","40025","40216","40214","40218","40222","40220","40027","40219","40242","47146","47172","40258","40241","40118","40109","40272","40129","40228","40229","47136","47117","42701","42702","42740","40160","40223","40269","40243","40059","40056","40165","40166","40110","40150","40177","40245","40018","40067","40014","40023","40299","40010","40291","40047","42503","42502","42564","42501","42533","42567","40741","40742","40745","40743","40755","40750","40744","40729","40740"],
  getDocs: function(zip) {
    fad.submitDisable();

    var request = jQuery.ajax({
      url: fad.endpoint + "?zip=" + zip,
      method: "GET",
    });
    

    jQuery('#results').addClass('open loading');
    var docs = [{
      "ADDRESS_LINE1": "7777 Forest Ln Ste B332",
      "ADDRESS_LINE2": null,
      "AMA_SPECIALITY": "Allergy & Immunology",
      "CITY": "Dallas",
      "Distance": 17.375676893767682,
      "FIRST_NAME": "Richard",
      "Formatted_Address": "7777 Forest Ln B332, Dallas, TX 75230, USA",
      "id": "0014600000zyBC9AAM",
      "LAST_NAME": "Wasserman",
      "Latitude": 32.9113881,
      "Longitude": -96.773446299999989,
      "PHONE": "9725667788",
      "PRIMARY_DEGREE": "MD",
      "STATE": "TX",
      "ZIP": "75230-6822"
    }, {
      "ADDRESS_LINE1": "5323 Harry Hines Blvd",
      "ADDRESS_LINE2": null,
      "AMA_SPECIALITY": "Allergy & Immunology",
      "CITY": "Dallas",
      "Distance": 24.365452196240739,
      "FIRST_NAME": "Christian",
      "Formatted_Address": "5323 Harry Hines Blvd, Dallas, TX 75390, USA",
      "id": "0014600000zyAvJAAU",
      "LAST_NAME": "Wysocki",
      "Latitude": 32.8119829,
      "Longitude": -96.8392037,
      "PHONE": "2146452800",
      "PRIMARY_DEGREE": "MD",
      "STATE": "TX",
      "ZIP": "75390"
    }];

    request.done(function(docs) {
      jQuery('#results').removeClass('loading');
      jQuery('#input').removeClass('error');
      
      if (jQuery.inArray(zip, fad.goutHelpZipCodes) !== -1) {
        jQuery("#promo-message").show();
        //evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', zip, 'Gout Help');
      }
      else {
        jQuery("#promo-message").hide();
      }

      // if (APP.isMobile()) {
      //   utilities.scrollTo('.mobileScroll');
      // }

      // remove old clicks
      jQuery(fad.docTableIdentifier).off('click','tr');
      //alert(docs);
      fad.submitEnable();
      docs.forEach(function(doc, index) {
        doc.id = index + 1;
        doc.PHONE_FORMATTED = fad.formatPhone(doc.PHONE);
      });

      fad.docs = docs;

      // add markers and infowindows to data set
      for (x = 0; x < fad.docs.length; x++) {
        var hcp = fad.docs[x];
        fad.docs[x].marker = new MarkerWithLabel({
          position: { lat: Number(hcp.Latitude), lng: Number(hcp.Longitude) },
          //labelContent: fad.docs[x].id,
          labelAnchor: new google.maps.Point(14, 40), // this adjusts positioning of lable on pin, could be dynamically adjusted based on number of digit or something
          labelClass: fad.pinClass,
          //animation: google.maps.Animation.DROP,
          //zIndex: fad.docs.length - x,
          icon: fad.pin_icon
        });

        // control the pop up window content here

        var daddr = hcp.ADDRESS_LINE1;
        if (hcp.ADDRESS_LINE2) daddr += " " + hcp.ADDRESS_LINE2;
        daddr += " " + hcp.CITY + ", " + hcp.STATE + " " + hcp.ZIP;

        var contentString = '<div class="info_window">' + hcp.FIRST_NAME + ' ' + hcp.LAST_NAME + '<br/>';
        contentString += "<a href='tel:" + hcp.PHONE + "' class='phone-link'>" + hcp.PHONE_FORMATTED + "</a>" + '<br/>';
        contentString += hcp.ADDRESS_LINE1 + '<br/>';
        if (hcp.ADDRESS_LINE2) contentString += hcp.ADDRESS_LINE2 + '<br/>';

        contentString += hcp.CITY + ', ' + hcp.STATE + ' ' + hcp.ZIP + '<br/>';
        contentString += "<a class='directions' href='https://maps.google.com/maps?daddr=" + encodeURIComponent(daddr) + "' target='_blank'>Get directions</a>";
        contentString += "</div>";
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
            //console.log("init event");
            //fad.initializeMap();
            //fad.syncSortClasses();
            fad.mapRows();
            // move prev/next controls
            //fad.movePageControls();
          }).DataTable({
            'data': fad.docs,
            'searching': false,
            'lengthMenu': [10, 20, 30],
            'language': {
              'lengthMenu': "Display results _MENU_"
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
                  if (full.ADDRESS_LINE2) daddr += ' ' + full.ADDRESS_LINE2;
                  daddr += ' ' + full.CITY + ', ' + full.STATE + ' ' + full.ZIP;

                  var output = '<div class="detailbox"><div class="detail-close">Return to results</div><span class="distance">' + fad.formatDistance(full.Distance) + ' miles</span>';
                  output += '<span class="name">' + full.FIRST_NAME + space + full.LAST_NAME + ", " + full.PRIMARY_DEGREE + '</span>';
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
                  output += '<span class="phonenumber">' + full.PHONE_FORMATTED + '</span>';
                  output += '<a href="tel:' + full.PHONE + '" class="phone-link">' + full.PHONE_FORMATTED + '</a>';
                  output += '<a class="download">Download this info plus a guide for your visit</a></div>';
                  return output;
                }
              },
              // { "data": "FIRST_NAME" },
              // { "data": "LAST_NAME" },
              // { "data": "ADDRESS_LINE1" },
              // { "data": "ADDRESS_LINE2" },
              // { "data": "CITY" },
              // { "data": "STATE" },
              // { "data": "ZIP" },
              // { "data": "PRIMARY_DEGREE" },
              // { "data": "AMA_SPECIALITY" },
              // { "data": "PHONE" },
              // { "data": "Latitude" },
              // { "data": "Longitude" },
              // { "data": "Distance" }
            ]
          });
      }

      jQuery(fad.docTableIdentifier).on('click', 'td .download', function(e) {
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

        utilities.scrollTo('.mobileScroll');

        // dataLayer.push({
        //     'event': 'hcpClick',
        //     'docClickType': 'View Doctor Result on List'
        // });
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
        // console.log("draw event");
        //jQuery('#hcp_list thead').remove();
        // synchronize sort order classes
        //fad.syncSortClasses();
        // synchronize map display
        fad.mapRows();
        // move prev/next controls
        //fad.movePageControls();
      });
    });

    request.fail(function(jqXHR, textStatus) {
      fad.submitEnable();
      jQuery('#input').addClass('error');

      jQuery('#results').removeClass('loading').removeClass('open');
      jQuery("#promo-message").hide();
      //alert( "Request failed: " + jqXHR.responseJSON[0].error );
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
      //console.log(hcp);

      if (hcp != undefined) {
        // uncomment this to add numbers to pins
        hcp.marker.labelContent = info.end - count / 2;
        hcp.marker.origZIndex = count + 1;
        hcp.marker.setZIndex(hcp.marker.origZIndex);
        //hcp.marker.labelZIndex = count + 2;
        fad.dropPin(hcp);
        markerBounds.extend(new google.maps.LatLng(Number(hcp.Latitude), Number(hcp.Longitude)));
        //console.log(info.start + count);
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
      // dataLayer.push({
      //     'event': 'hcpClick',
      //     'docClickType': 'View Doctor Result on Map'
      // });
      fad.closeInfoWindows();

      fad.resetStyles();
      //hcp.infoWindow.open(fad.map,hcp.marker);
      var latLng = hcp.marker.getPosition();
      var infoRow = jQuery('#doctors tr').eq(hcp.marker.labelContent);

      evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', hcp.ID, 'Click Specialist Map Location');

      infoRow.addClass('open-detail').siblings().removeClass('open-detail');
      fad.map.setCenter(latLng);
      fad.setSelectedStyle(hcp.marker);

      utilities.scrollTo('.mobileScroll');
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
    marker.labelClass = fad.pinClassSelected;
    marker.label.setStyles();
  },
  'setDefaultStyle': function(marker) {
    marker.labelClass = fad.pinClass;
    marker.label.setStyles();
  },
  'submitDisable': function() {
    jQuery('form[name="zipForm"] button').attr("disabled", "disabled");
  },
  'submitEnable': function() {
    jQuery('form[name="zipForm"] button').removeAttr("disabled");
  },
  'download': function(doc) {
    // var download_doc = jQuery.extend({}, doc);
    // download_doc.marker = null;
    // download_doc.infoWindow = null;
    // alert(doc["ID"]);
    evokeEvent.sendEvent('fadEvent', 'Specialist Finder - Detail', doc.ID, 'Download Specialist Info');
    jQuery('input[name="doc"]').val(JSON.stringify(doc, ["FIRST_NAME", "LAST_NAME", "ADDRESS_LINE1", "ADDRESS_LINE2", "CITY", "STATE", "ZIP", "PRIMARY_DEGREE", "AMA_SPECIALITY", "PHONE", "Latitude", "Longitude", "Distance"]));
    jQuery('form[name="downloadForm"]').submit();
    //alert(doc);
  },
  'formatDistance': function(distance) {
    return Math.round(distance * 100) / 100;
  },
  'formatPhone': function(phone) {
    var formatted = '';
    if (phone) {
      formmatted = phone;
    }

    if (phone && phone.length == 10) {
      formatted = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6);
    }
    return formatted;
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
        jQuery('.zipcode-box .zip-field input').val(URLzip);
        fad.getDocs(URLzip);
      }

      jQuery('.zipcode-box button').click(function(e) {
        e.preventDefault();
        fad.getDocs(jQuery('.zipcode-box .zip-field input').val());
      });

      jQuery('.zipcode-box .zip-field input').on('keydown', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          fad.getDocs(jQuery(this).val());
        }
      });
    });

    // tracking listener
    // google.maps.event.addListener(fad.map, 'maptypeid_changed', function() {
    //     console.log(fad.map.mapTypeId);
    //     var mapType = 'Map';
    //     if(fad.map.mapTypeId == google.maps.MapTypeId.HYBRID || fad.map.mapTypeId == google.maps.MapTypeId.SATELLITE) {
    //         mapType = 'Satellite';
    //     };
    //     dataLayer.push({
    //         'event': 'mapTypeChange',
    //         'mapType': mapType
    //     });
    // });
  }
};

google.maps.event.addDomListener(window, 'load', fad.initializeMap);

var evokeEvent = {
  sendEvent: function(event, category, label, action) {
    document.getElementsByTagName('body')[0].dispatchEvent(
      new CustomEvent(
        event,
        {
          'detail': {
            'category': category,
            'label': label,
            'action': action
          },
          'bubbles': true,
          'cancelable': true
        }
      ));
  },
  logEvent: function(e) {
    console.log(e.detail);
  }
};

jQuery(document).on('ready', function() {
  document.addEventListener('fadEvent', evokeEvent.logEvent, false);
});