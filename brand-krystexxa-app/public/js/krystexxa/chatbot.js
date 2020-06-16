$(document).ready(function() {

  // ISI expanded state behaviour for Chatbot

  $(".isi-tray .buttons a").click(function(e) {
    if ($('.isi-tray').hasClass('expand')) {
      $("#rulai-widget-iframe-wrapper").addClass("hide");
    } else {
      $("#rulai-widget-iframe-wrapper").removeClass("hide");
    }
  });

});

// // If first page visit, have the bot appear if enough time passes
$(window).load(function() {
  window._rulai_widget.minimize();
  // // If first page visit, have the bot appear if enough time passes
  if (!window._rulai_widget.popped) {
    setTimeout(function openBotAfterTime() {
      window._rulai_widget.popin();
      window._rulai_widget.popped = true;
    }, 30000);
    // Otherwise, don't annoy the user; keep bot hidden with each page change
  } else {
    window._rulai_widget.minimize();
  }
});

// TO fix scrolling issue on Chatbot link click
// $(window).on('hashchange', function (e) {
//   if (window.location.hash && window.location.hash.length > 1) {
//     $('html, body').animate({
//       scrollTop: $(window.location.hash).offset().top - $('.hz-header-wrap').outerHeight()
//     },0);
//     window.history.replaceState({}, document.title, window.location.pathname + window.location.search);//clear the hash so that the same hash change will scroll properly.
//   }
// });