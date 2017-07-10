$(document).ready(function() {

	var $red = $('#red');
	var $blue = $('#blue');
	var $target = $('#target');
	var winCoords = {};

	//Set Intervals
	var checkingForBlueWin; 
	var checkingForRedWin;
	var checkRedPosition;
	var checkBluePosition;

	var previousInit;

/***********************************************************************/
/*** GAME LOGIC ********************************************************/
/***********************************************************************/

    if ($('window').width() < 1200 || window.innerWidth < 1200) {
      $('#modal button').click(function() {
        $('#modal').css('display', 'none');
        $('#game_screen').css('display', 'block');
      	getRandomGameInit();
      	startGame();
      	if (checkForRedWin()) {
      		clearInterval(checkRedPosition);
      		clearInterval(checkBluePosition);
      	}
      	if (checkForBlueWin()) {
      		clearInterval(checkRedPosition);
      		clearInterval(checkBluePosition);
    	  }
      });
    } else {
      $('#modal').css('display', 'none');
      $('#game_screen').css('display', 'block');
      getRandomGameInit();
      startGame();
      console.log('Target: ' + $('#target').position().left + ', ' + $('#target').position().top);
      if (checkForRedWin()) {
        clearInterval(checkRedPosition);
        clearInterval(checkBluePosition);
      }
      if (checkForBlueWin()) {
        clearInterval(checkRedPosition);
        clearInterval(checkBluePosition);
      }
    }



/***********************************************************************/
/***********************************************************************/
/***********************************************************************/

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function getRandomGameInit() {
		var random = getRandomNumber(1, 4);
		var previousInit = random;
		console.log("Previous load: " + previousInit);
		if (random === previousInit) {  //Make sure we load a new game init each time
			var addOrSubtractGameInits = getRandomNumber(1,2);
			console.log(addOrSubtractGameInits);
			if (addOrSubtractGameInits === 1) {
				if (random === 4) {
					random = 1;
				} else {
					random++;
				}
			} else {
				if (random === 1) {
					random = 4;
				} else {
					random--;
				}
			}
		}
		console.log('Game Init: ' + random);
		switch (random) { //Rotates the board according to the random number
			case 1:
				$('#game_screen').append($red);
				$red.css('left','0px');
				$red.css('top','0px');
				$red.css('display','block'); //Don't show the player's gamepiece until it's ready, otherwise it glitches from top:0,left:0 every time a new board is rendered.

				$('#game_screen').append($blue);
				$blue.css('left','0px');
				$blue.css('bottom','0px');
				$blue.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($target);
				$target.css('right', '20px');
				$target.css('top', '210px');
				$target.css('display','block');

				winCoords = { //The coordinates the players must fall within to win for this game setup
					top: 180,
					left: 1090,
					right: 1180,
					bottom: 240
				};
				break;
			case 2:
				$('#game_screen').append($red);
				$red.css('right','0px');
				$red.css('top','0px');
				$red.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($blue);
				$blue.css('left','0px');
				$blue.css('top','0px');
				$blue.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($target);
				$target.css('left', '560px');
				$target.css('bottom', '20px');
				$target.css('display','block');

				winCoords = { //The coordinates the players must fall within to win for this game setup
					top: 370,
					left: 530,
					right: 650,
					bottom: 490
				};
				break;
			case 3:
				$('#game_screen').append($red);
				$red.css('right','0px');
				$red.css('bottom','0px');
				$red.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($blue);
				$blue.css('right','0px');
				$blue.css('top','0px');
				$blue.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($target);
				$target.css('left', '20px');
				$target.css('top', '210px');
				$target.css('display','block');

				winCoords = { //The coordinates the players must fall within to win for this game setup
					top: 180,
					left: 0,
					right: 110,
					bottom: 240
				};
				break;
			case 4:
				$('#game_screen').append($red);
				$red.css('left','0px');
				$red.css('bottom','0px');
				$red.css('display','block'); //Don't show the player's gamepiece until it's ready
				
				$('#game_screen').append($blue);
				$blue.css('right','0px');
				$blue.css('bottom','0px');
				$blue.css('display','block'); //Don't show the player's gamepiece until it's ready

				$('#game_screen').append($target);
				$target.css('left', '560px');
				$target.css('top', '20px');
				$target.css('display','block');

				winCoords = { //The coordinates the players must fall within to win for this game setup
					top: 0,
					left: 530,
					right: 650,
					bottom: 100
				};
				break;
			}
		}

	function startGame() {
		var boundaries = $('#game_screen');
		var blue = $('#blue');
		var red = $('#red');
		var blueMaxHeight = boundaries.height() - blue.height();
		var redMaxHeight = boundaries.height() - red.height();
		var blueMaxWidth = boundaries.width() - blue.width();
		var redMaxWidth = boundaries.width() - red.width();
		var keysPressed = {};
		var distancePerPress = 4; //in px

		//I cannot claim this approach to calculating the position of the 
		//players, but I DID have to add a height dimension because the 
		//original solution assumed the playable area was a square, while mine
		//is a rectangle with uneven sides. Plus, I had to account for two 
		//players moving around, as opposed to the one. 

		function calculateNewBlueHeight(oldValue, key1, key2) {
			var newValue = parseInt(oldValue, 10) - (keysPressed[key1] ? distancePerPress : 0) + (keysPressed[key2] ? distancePerPress : 0);
			return newValue < 0 ? 0 : newValue > blueMaxHeight ? blueMaxHeight: newValue;
		}

		function calculateNewRedHeight(oldValue, key1, key2) {
			var newValue = parseInt(oldValue, 10) - (keysPressed[key1] ? distancePerPress : 0) + (keysPressed[key2] ? distancePerPress : 0);
			return newValue < 0 ? 0 : newValue > redMaxHeight ? redMaxHeight: newValue;
		}

		function calculateNewBlueWidth(oldValue, key1, key2) {
			var newValue = parseInt(oldValue, 10) - (keysPressed[key1] ? distancePerPress : 0) + (keysPressed[key2] ? distancePerPress : 0);
			return newValue < 0 ? 0 : newValue > blueMaxWidth ? blueMaxWidth: newValue;
		}

		function calculateNewRedWidth(oldValue, key1, key2) {
			var newValue = parseInt(oldValue, 10) - (keysPressed[key1] ? distancePerPress : 0) + (keysPressed[key2] ? distancePerPress : 0);
			return newValue < 0 ? 0 : newValue > redMaxWidth ? redMaxWidth: newValue;
		}

		//Have the action start when user presses a key, and have it stop right when the key is no longer held
		$(window).keydown(function(event) { 
			keysPressed[event.which] = true; 
		});
		$(window).keyup(function(event) { 
			keysPressed[event.which] = false; 
		});

		checkRedPosition = setInterval(function() {
	    blue.css({
	        left: function(index, oldValue) {
	            return calculateNewBlueWidth(oldValue, 83, 70); //Runs new blue width function whenever the keycodes 83 or 70 are triggered
	        },
	        top: function(index, oldValue) {
	            return calculateNewBlueHeight(oldValue, 69, 68); //Runs new blue height function whenever the keycodes 69 or 68 are triggered
	        }
	    });
		}, 1); //Update the position every millisecond

		checkBluePosition = setInterval(function() {
	    red.css({
	        left: function(index, oldValue) {
	            return calculateNewRedWidth(oldValue, 37, 39);
	        },
	        top: function(index, oldValue) {
	            return calculateNewRedHeight(oldValue, 38, 40);
	        }
	    });
		}, 1);  //Update the position every millisecond
	}

	function checkForRedWin() {
		checkingForRedWin = setInterval(function() {
			var redX = $('#red').position().left;
			var redY = $('#red').position().top;
			if ((redX < winCoords.right && redX > winCoords.left) && (redY < winCoords.bottom && redY > winCoords.top)) {
				clearInterval(checkingForRedWin);
				clearInterval(checkingForBlueWin);
				$('#game_screen').addClass('red_wins');
				setTimeout(resetGame, 2000);
			}
		}, 1);
	}

	function checkForBlueWin() {
		checkingForBlueWin = setInterval(function() {
			var blueX = $('#blue').position().left;
			var blueY = $('#blue').position().top;
			if ((blueX < winCoords.right && blueX > winCoords.left) && (blueY < winCoords.bottom && blueY > winCoords.top)) {
				clearInterval(checkingForBlueWin);
				clearInterval(checkingForRedWin);
				$('#game_screen').addClass('blue_wins');
				setTimeout(resetGame, 2000);
				return true;
			} else {
				return false;
			}
		}, 1);
	}

	function resetGame() { 
		$('#game_screen').removeClass('blue_wins');
		$('#game_screen').removeClass('red_wins');
		$('#blue').remove();
		$('#red').remove();
		$('#target').remove();
		setTimeout(function() {
			getRandomGameInit();
			console.log('New winning coordinates: ' + ' L: ' + winCoords.left + ' R: ' + winCoords.right + ' T: ' +winCoords.top + ' B: ' + winCoords.bottom);
			console.log('New Target L: ' + $('#target').position().left + ' T: ' + $('#target').position().top);
			startGame();
		}, 2000);
	}
});
