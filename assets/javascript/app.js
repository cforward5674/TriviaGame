/*Create a start button, and have it start the game, and a timer that
starts counting down, /

/*Create a set of questions centered around a theme.  select the correct answer for each question, from a multiple
choice list.  Only be able to click on one box per question*/

/*When timer is done end the game.  have a total of correct, Incorrect and unanswered 
questions*/


$(document).ready(function() {
    

    
    var questionCounter = 0;
  
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Which 80’s rock band had Mick Mars, Nikki Sixx, Vince Neil, & Tommy Lee?",
        choices: ["Twisted Sister", "Motley Crue", "Dokken", "Iron Maiden"], 
        correctAnswer: "Motley Crue",
	    image: "<img src='assets/images/motleycrue.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Which 80’s rock band refused to make a music video during the 80’s?",
	    choices: ["Cinderella", "Ratt", "Metallica", "Poison"],
	    correctAnswer: "Metallica",
	    image: "<img src='assets/images/metallica.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Which 80’s rock band remade the Beatles song “Live and Let Die?",
	    choices: ["Megadeth", "Bullet Boys", "Dio", "Guns & Roses"],
	    correctAnswer: "Guns & Roses",
	    image: "<img src='assets/images/guns-roses.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Which 80’s rock band made a hit song with a famous 80’s rap group?",
	    choices: ["Slaughter", "Aerosmith", "AC/DC", "Warrant"],
	    correctAnswer: "Aerosmith",
	    image: "<img src='assets/images/aerosmith.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "  Which 80’s rock band had a drummer with only one arm?",
	    choices: ["Def Leppard", "Scorpions", "Anthrax", "Whitesnake"],
	    correctAnswer: "Def Leppard",
	    image: "<img src='assets/images/defleppard.jpg'>"
	  }];
	  
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Wow! You got 'em all right!";
			var bottomText = "Dude, you rock!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Were you born in the 80's?";
			var bottomText = "80's ROCK!";
		}
		else {
			var endMessage = "You're not a real music fan...are you?";
			var bottomText = "Poser!";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p><strong>Right Answers: </strong>" + 
             correctGuesses + "<p><strong>Wrong Answers:  </strong>" + incorrectGuesses);
           
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	
        questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});