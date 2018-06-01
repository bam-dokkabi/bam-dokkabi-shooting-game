$(document).ready(function() {
	var charSizes = [
		{width: 84, height:100},
		{width:100, height:78},
		{width:90, height:96},
		{width:110, height:100}
	]

	var charNum = 1;
	var curScene = 1;
	
	changeCursorPos($('.scene01-c01'));

	$('.scene01-chars > div').on('mouseover', function() {
		changeCursorPos($(this));
	});

	$('.scene01-chars > div').on('click', function() {
		var selectedChar = $(this).index();
		$('.scene01').fadeOut(600, function() {
			$('.scene02').fadeIn(600);
			charNum = selectedChar;
			curScene = 2;

			var charX = $('#container').width()/2 - charSizes[charNum].width/2;
			$('.scene02-user-char')
			.css({'background':"url(images/c0" + (charNum+1) + ".png)", "background-repeat": "no-repeat", "background-position": "left top"})
			.css('left', charX)
			.css('bottom', 0)
			.css('width', charSizes[charNum].width)
			.css('height', charSizes[charNum].height);
		});
	});


	$(document).keydown(function(e) {
		if(curScene == 2) {
			var charPos = $('.scene02-user-char').position();

			switch(e.which) {
				case 37:
					if(charPos.left < 10) {
						return;
					}
					$('.scene02-user-char').finish().animate({
						left: "-=5",
						duration: 0.1
					});
					break;
				case 39:
					if(charPos.left > $('#container').width() - $('.scene02-user-char').width() - 10){
						return;
					}
					$('.scene02-user-char').finish().animate({
						left: "+=5",
						duration: 0.1
					});
					break;
			}
		}
	});

	function changeCursorPos(selector) {
		var c01Info = getCharInfo(selector);
		var cursorPos = getCursorPos(c01Info.width, c01Info.height, c01Info.x, c01Info.y);
		$('.scene01-char-cursor').offset({top:cursorPos.y, left:cursorPos.x});
	}

	function getCharInfo(selector) {
		var obj = {};
		obj.width = selector.width();
		obj.height = selector.height();

		var pos = selector.offset();
		obj.x = pos.left;
		obj.y = pos.top;

		return obj;
	}

	function getCursorPos(cWidth, cHeight, cX, cY) {
		var obj = {};
		var arrowWidth = $('.scene01-char-cursor').width();
		var arrowHeight = $('.scene01-char-cursor').height();

		obj.x = cX + (cWidth/2) - (arrowWidth/2);
		obj.y = 200;

		return obj;
	}
});