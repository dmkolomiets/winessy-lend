//WOW
new WOW().init();

//Paralax
let image1 = document.getElementsByClassName('thumbnail1');
new simpleParallax(image1, {
  overflow: true,
  delay: 1,
});
let image2 = document.getElementsByClassName('thumbnail2');
new simpleParallax(image2, {
  overflow: true,
  scale: 1.5,
  delay: 2,
});

//Smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('.burger')[0].classList.remove('change')
      $('header .navbar-collapse').collapse('hide');
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 1000);
      return false;
    }
  }
});
// Swiper slider
const swiper = new Swiper('.swiper', {
  // loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  slidesPerView: 1.8,
  spaceBetween: 40,
  centeredSlides: true,
});

function changeClass(x) {
  x.classList.toggle("change");
}

$(window).scroll(function() {
  if($(this).scrollTop() > 10) {
    $('header').addClass('scroll-down');
  } else {
    $('header').removeClass('scroll-down');
  }
  if($(this).scrollTop() > 800) {
    $('.toTop').fadeIn(300);
  } else {
    $('.toTop').fadeOut(300);
  }
});
$('.toTop').click(function() {
  $('body,html').animate({scrollTop:0},800);
});


$("#form").submit(function(event){
  event.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    method: 'POST',
    url: '/mail.php',
    data: data,
    success: function(){
      $("#form")[0].reset();
    }
  });
});

$('#section7 .js-btn-more').click(function(event) {
  $(event.target).hide()
    .siblings('.js-text-more').slideToggle()
})