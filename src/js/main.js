
 $('.nav__mobile-btn').on('click', function(){
    if($('.nav__list').is('.open')){
      $('.nav__list').removeClass('open').slideUp();
    }
    else{
      $('.nav__list').addClass('open').slideDown();     
    }
    return false;
  });

 $('.nav__close').on('click', function(){
    if($('.nav__list').is('.open')){
      $('.nav__list').removeClass('open').slideUp();
    }
    return false;
  });

 