//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in javascript can be used to store _____",
        choices: ["multiple values", "the index", "my lunch", "None of the above."],
        answer: "multiple values"
    },
    {
        title: "What is 'this' keyword in JavaScript?",
        choices: ["that", "calls an object", "a question", "call function"],
        answer: "calls an object"
    },
    {
        title: "Which of the following is a looping structures in Javascript?",
        choices: ["backwards", "for", "dump", "regester"],
        answer: "for"
    }
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// display wrong answer plus audio link
function wrongAnswer() {
    document.getElementById('wrong').innerHTML = '<p>Wrong Answer!!!!!!</p><audio src="buzzer_x.wav" autoplay></audio>';
}
// display Correct!!! plus audio link 
function betterChoice() {
    document.getElementById('wrong').innerHTML = '<p>Correct!!!!</p><audio src="chime_up.wav" autoplay></audio>';
}
//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            stopGame();
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function stopGame() {
    clearInterval(timer);

    var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score + ` /100!</h3>
<h3>That means you got ` + score / 20 + ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
    document.getElementById('wrong').innerHTML = '<p> </p>';
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;


    var quizContent = `
<h1>
  JavaScript Quiz!
</h1>
<h3>
  Click to play!   
</h3>
<button onclick="start()">Start!</button>
`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer and run wrongAnswer function
function incorrect() {
    wrongAnswer();
    timeLeft -= 15;
    next();
}

//adds 20points if correct answer is chosen
function correct() {
    betterChoice();
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"


    for (var quizRun = 0; quizRun < questions[currentQuestion].choices.length; quizRun++) {


        var buttonVar = "<button onclick=\"[ANS]\">[CHOICE]</button>";


        buttonVar = buttonVar.replace("[CHOICE]", questions[currentQuestion].choices[quizRun]);

        if (questions[currentQuestion].choices[quizRun] == questions[currentQuestion].answer) {
            buttonVar = buttonVar.replace("[ANS]", "correct()");
        } else {
            buttonVar = buttonVar.replace("[ANS]", "incorrect()");
        }

        quizContent += buttonVar
    }

    document.getElementById("quizBody").innerHTML = quizContent;
}
