$(document).ready(function() {

  $('section').addClass('perspective');

  var e = $('#e'),
      s = $('#s'),
      d = $('#d'),
      f = $('#f'),

      up = $('#up'),
      left = $('#left'),
      down = $('#down'),
      right = $('#right');

  function flashRed(key) {
    key.css('background', 'rgba(200, 30, 50, .3');
    setTimeout(function() {
    key.css('background', 'rgba(0, 0 , 0, 0)');
    }, 120);
  }

  function flashBlue(key) {
    key.css('background', 'rgba(50, 30, 200, .3');
    setTimeout(function() {
      key.css('background', 'rgba(0, 0 , 0, 0)');
    }, 120);
  }

  $(document).keydown(function(event) {
    var key = event.which;
    console.log(key);
    switch (key) {
      //Blue player's ESDF control pad
      case 69:
        flashBlue(e);
        break;
      case 83:
        flashBlue(s);
        break;
      case 68:
        flashBlue(d);
        break;
      case 70:
        flashBlue(f);
        break;
      //Red player's arrow
      case 38:
        flashRed(up);
        break;
      case 37:
        flashRed(left);
        break;
      case 40:
        flashRed(down);
        break;
      case 39:
        flashRed(right);
        break;
    }


  });









});