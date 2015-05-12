var CaffeineMachine = CaffeineMachine || {};

CaffeineMachine = (function() {
	var beverages,
			payLine,
			spinLoops,
			payLinePositions,
			btnDisableSeconds,
			winner,
			reelCount;


	function init(){
		btnDisableSeconds = 3.5;
		spinLoops = 4;
		spinSpeed = 250;

		beverages = ["coffee", "tea", "espresso"];

		reel = [
			["coffee-maker", "teapot", "espresso-machine"],
			["coffee-filter","tea-strainer","espresso-tamper"],
			["coffee-grounds","tea-loose","espresso-grounds"]
		];

		registerButton();
		populateReels();
	}

	function registerButton(){
		$("#btn-spin").click(function() {
			spinReels();
			var btn = $(this);
			btn.prop('disabled', true);
			setTimeout(function(){
				btn.prop('disabled', false);
			}, btnDisableSeconds*1000);
		});
	}

	function populateReels(){

		for(var i=0; i<3; i++){

			for(var j=0; j<3; j++){
				$("#reel"+i).append("<li class="+reel[i][j]+">"+ reel[i][j] +"</li>");
			}

			// append extra li for continuous animation
			$("#reel"+i).append("<li class="+reel[i][0]+">"+ reel[i][0] +"</li>");
		}

	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function randomPick(){

		payLine = [];
		payLinePositions = [];

		for(var i=0; i<3; i++){
			payLine.push(getRandomInt(0,3));
		}


		payLinePositions = payLine.map(function(el) {
			return -el*150;
		});

		//console.log("Payline array: " + payLine);
		//console.log("payLinePositions array: " + payLinePositions);

		winCheck(payLine);

	}

	function winCheck(array){
		var item;
		winner = false;
		var firstReel = array[0];
		var match = 0;

		if(firstReel === 0)
			item = "coffee";
		if(firstReel === 1)
			item = "tea";
		if(firstReel === 2)
			item = "espresso";

		for(var i=0; i<=3; i++){
			if(firstReel === array[i]){
				match++;
			}
		}

		if(match === 3){
			winner = true;
		}

		$("#status h2").hide();
		$(".winner").fadeOut();
		displayStatus(item);
	}

	function displayStatus(item){


		$("#status h2").delay( 3500 ).fadeIn();
		if(winner){
			$("#status h2").html("You WIN "+item+"!");
			$(".win-"+item).delay( 3500 ).fadeIn();
		}else{
			$("#status h2").html("You lose! You get nothing!");
		}
	}

	function spinReels(){
		randomPick();
		animateReels();
	}

	function animateReels(){

		for(var i=0; i<spinLoops; i++){

			$("#reel0").animate({
				top: "0px"
			},spinSpeed, 'linear', function() {
				$("#reel0").css({
					top: "-450px"
				});

			});
		}

		$("#reel0").animate({
			top: payLinePositions[0]
		},spinSpeed*2, 'easeOutElastic', function() {
		});



		for(var j=0; j<spinLoops*2; j++){
			$("#reel1").animate({
				top: "0px"
			},spinSpeed, 'linear', function() {
				$("#reel1").css({
					top: "-450px"
				});
			});
		}
		$("#reel1").animate({
			top: payLinePositions[1]
		},spinSpeed*2, 'easeOutElastic', function() {
		});


		for(var k=0; k<spinLoops*3; k++){

			$("#reel2").animate({
				top: "0px"
			},spinSpeed, 'linear', function() {
				$("#reel2").css({
					top: "-450px"
				});
			});
		}
		$("#reel2").animate({
			top: payLinePositions[2]
		},spinSpeed*2, 'easeOutElastic', function() {
		});

	}

	// Public Interface
	return {
		init: init
	};

}());

CaffeineMachine.init();
