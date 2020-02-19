$("#regsolo").hide(500);
$("#reggroup").hide(500);
function display_form(){
  if($("#type").val() == ""){
    $("#regsolo").hide(500);
    $("#reggroup").hide(500);
  }
  else if($("#type").val() == "solo"){
    $("#regsolo").show(500);
    $("#reggroup").hide(500);
  }
  else if($("#type").val() == "group"){
    $("#regsolo").hide(500);
    $("#reggroup").show(500);
  }
  else{
    $("#regsolo").hide(500);
    $("#reggroup").hide(500);
  }
}
function register() {
  var Name = $('#Name').val();
  var School_College = $('#School_College').val();
  var ContactNum = $('#ContactNum').val();
  var Email = $('#Email').val();
  var Branch = $('#Branch').val();
  var Gender = $('#Gender').val();
  var CollegeRoll = $('#CollegeRoll').val();


  var patt = /[A-Za-z \.]+/g;
  if (patt.test(Name) == false) {
    alert("Incorrect Name Entered");
    return false;
  }

  patt = /[A-Za-z ,\-]+/g;
  if (patt.test(School_College) == false) {
    alert("Incorrect School/College Entered");
    return false;
  }

  patt = /[0-9]{10}/g;
  if (patt.test(ContactNum) == false) {
    alert("Incorrect Phone Number Entered");
    return false;
  }


  patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (patt.test(Email) == false) {
    alert("Incorrect Email Entered");
    return false;
  }

  var patt = /[A-Za-z \.]+/g;
  if (patt.test(Branch) == false) {
    alert("Incorrect Branch Entered");
    return false;
  }

  if (CollegeRoll.length == 0) {
    alert("Incorrect Rollno Entered");
    return false;
  }


  if (Gender != "Male" && Gender != "Female") {
    alert("Incorrect Gender Entered");
    return false;
  }
  
  $("#regbutton").html("Registering..");

  var dataString = 'Name='+ Name + '&School_College='+ School_College + '&ContactNum='+ ContactNum + '&Email='+ Email + '&Branch='+ Branch+ '&Gender='+ Gender+ '&CollegeRoll='+ CollegeRoll;
  $.ajax({
    type: "POST",
    url: "api/formsql.php",
    data: dataString,
    cache: false,
    success: function(result){
      if(result.includes("You have registered successfully!")){
        document.getElementById("regform").innerHTML = result;
      }
      else{
        $("#regbutton").html("Register");
        alert("An unknown error occured. Please try again later.");
      }
    }
  });
}


function groupreg() {
  
  var Email = $('#gEmail').val();
  var regid = $('#gregid').val();
  var num = $('#gnum').val();
  var event = $('input[name=gevent]:checked').val();

  if(event == "" || event == undefined){
    alert("Select an event to register");
    return false;
  }

  var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (patt.test(Email) == false) {
    alert("Incorrect Email Entered");
    return false;
  }

  if (regid.length == 0) {
    alert("Incorrect Registration Id Entered");
    return false;
  }

  patt = /[2-8]{1}/;

  if (patt.test(num) == false) {
    alert("Minimum 2 and Maximum 8 group members allowed.");
    return false;
  }
  
  $("#gregbutton").html("Registering..");

  var dataString = 'num='+num+'&event='+event+'&regid='+regid+'&Email='+Email;
  $.ajax({
    type: "POST",
    url: "api/groupevent.php",
    data: dataString,
    cache: false,
    success: function(result){
      if(result.includes("You have successfully registered")){
        alert(result);
        document.getElementById("gregid").value = "";
        document.getElementById("gnum").value = "";
        document.getElementById("gEmail").value = "";
        document.getElementById("gevent").value = "";
        
      }
      else{
        $("#gregbutton").html("Register");
        alert(result);
      }
    }
  });
}


function soloreg() {
  var eventList = [];
  var Email = $('#sEmail').val();
  var regid = $('#sregid').val();

  if($("#sswaranjali").is(":checked")){
    eventList.push("swaranjali");
  }
  if($("#starang").is(":checked")){
    eventList.push("tarang");
  }
  if($("#ssurrealsymphony").is(":checked")){
    eventList.push("surealsymphony");
  }
  if($("#smaati").is(":checked")){
    eventList.push("maati");
  }
  if($("#sjhankaar").is(":checked")){
    eventList.push("jhankaar");
  }

  var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (patt.test(Email) == false) {
    alert("Incorrect Email Entered");
    return false;
  }



  if (regid.length == 0) {
    alert("Incorrect Registration Id Entered");
    return false;
  }


  if (eventList.length == 0) {
    alert("Please select at least 1 event.");
    return false;
  }
  
  $("#gregbutton").html("Registering..");

  var dataString = 'eventList='+eventList+'&regid='+regid+'&Email='+Email;
  $.ajax({
    type: "POST",
    url: "api/soloevent.php",
    data: dataString,
    cache: false,
    success: function(result){
      if(result.includes("You have successfully registered for the specified events.")){
        alert(result);
        $('input[id=sswaranjali]').attr('checked', false);
        $('input[id=starang]').attr('checked', false);
        $('input[id=surrealsymphony]').attr('checked', false);
        $('input[id=smaati]').attr('checked', false);
        $('input[id=sjhankaar]').attr('checked', false);
        document.getElementById("sregid").value = "";
        document.getElementById("sEmail").value = "";
      }
      else{
        $("#gregbutton").html("Register");
        alert(result);
      }
    }
  });
}


jQuery(document).ready(function ($) {

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
    (index === 0) ?
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
    $(this).children('.carousel-background').remove();
  });

  $(".carousel").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll: "vertical"
  });

  // Skills section
  $('#skills').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%' });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

});


