$(document).ready(function() {
  $('.content-carousel').slick({
    infinite: true,
    adaptiveHeight: true,
    dots: true,
    prevArrow: "<a href='#' class='prev-arrow'><img class='withoutHover' src='/images/arrow-left.png' alt='prev arrow'> <img class='withHover' src='/images/arrow-left-hover.png' alt='prev arrow'> </a>",
    nextArrow: "<a href='#' class='next-arrow'><img class='withoutHover' src='/images/arrow-right.png' alt='next arrow'> <img class='withHover' src='/images/arrow-right-hover.png' alt='next arrow'></a>",
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: true,
        prevArrow: "<a href='#' class='prev-arrow'><img src='/images/arrow-mobile-left.png' alt='prev arrow'></a>",
        nextArrow: "<a href='#' class='next-arrow'><img src='/images/arrow-mobile-right.png' alt='next arrow'></a>",
      }
    }]
  });
      var userAgent = navigator.userAgent.toLowerCase();
var  isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

if(isTablet){
$(".slick-arrow").on('click' , function() {
  $(".withHover").hide();
  $(".withoutHover").css("display" , "block");
})
}

});