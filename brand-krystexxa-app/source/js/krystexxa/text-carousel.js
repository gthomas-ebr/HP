$(document).ready(function(){
  $('.text-carousel-wrap').slick({
      infinite: true,
      dots:true,
      prevArrow:"<a href='#' class='prev-arrow'><img src='../../images/krystexxa/arrow-left.svg' alt='prev arrow'></a>",
      nextArrow:"<a href='#' class='next-arrow'><img src='../../images/krystexxa/arrow-right.svg' alt='next arrow'></a>",
      responsive: [{
      breakpoint: 768,
      settings: {
        dots: false
      }
    }]
  });
  // Image carousal

  $('.image-carousal').slick({
    infinite: false,
    dots: true,
    prevArrow: "<a href='#' class='prev-arrow'><img src='../../images/krystexxa/arrow-left.svg' alt='prev arrow'></a>",
    nextArrow: "<a href='#' class='next-arrow'><img src='../../images/krystexxa/arrow-right.svg' alt='next arrow'></a>",
    responsive: [{
      breakpoint: 768,
      settings: {
        dots: false
      }
    }]
  });

  $('.content-carousel').slick({
      infinite: true,
      dots:true,
      prevArrow:"<a href='#' class='prev-arrow'><img src='../../images/krystexxa/arrow-left.svg' alt='prev arrow'></a>",
      nextArrow:"<a href='#' class='next-arrow'><img src='../../images/krystexxa/arrow-right.svg' alt='next arrow'></a>",
      responsive: [{
        breakpoint: 768,
          settings: {
            dots: false
          }
      }]
  });
});