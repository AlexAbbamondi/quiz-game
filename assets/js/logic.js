var time = questions.length * 15;
var currQuestionIndex = 0;
var count = 0;

var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var questionChoices = document.querySelector("#choices");
var startScreen = document.querySelector("#start-screen");
var titleEl = document.querySelector("#question-title");
var endScreen = document.querySelector("#end-screen");
var score = document.getElementById("final-score");
var submitBtn = document.getElementById("submit");

var initials = document.getElementById("initials");
var storedInitials = localStorage.getItem("initial");

var counter = document.getElementById("counter");
var storedCount = localStorage.getItem("count");

function startQuiz() {
  startScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class", "hide");
  getCurrentQuestion();
  timer();
}

//Gets the current question, displys it to the pages with the fours answer options
function getCurrentQuestion() {
  var currentQuestion = questions[currQuestionIndex];
  titleEl.textContent = currentQuestion.title;
  questionChoices.textContent = "";

  //creates a button --- set current question choice --- append choices to page
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", currentQuestion.choices[i]);

    choiceNode.textContent = i + 1 + ". " + currentQuestion.choices[i];

    questionChoices.appendChild(choiceNode);

    //check to see if the right answer was chosen and respond accordingly --- show end screen after the 5th questions
    var answer = questions[currQuestionIndex].answer;

    choiceNode.addEventListener("click", function (event) {
      if (event.target.getAttribute("value") === answer) {
        correctAnswer();
        currQuestionIndex++;
        count++;
        if (
          currQuestionIndex === currentQuestion.choices.length + 1 &&
          event.target.getAttribute("value") === answer
        ) {
          endScreen.removeAttribute("class", "hide");
          questionsEl.setAttribute("class", "hide");
          finalScore();
        } else {
          getCurrentQuestion();
        }
      } else {
        wrongAnswer();
        currQuestionIndex++;
        if (
          currQuestionIndex === currentQuestion.choices.length + 1 &&
          event.target.getAttribute("value") != answer
        ) {
          endScreen.removeAttribute("class", "hide");
          questionsEl.setAttribute("class", "hide");
          finalScore();
        } else {
          getCurrentQuestion();
        }
      }
    });
  }
}

//Create response for correct answer
function correctAnswer() {
  var correctAnswer = document.createElement("h3");
  correctAnswer.setAttribute("class", "responses");
  correctAnswer.textContent = "correct";
  document.querySelector("#responses").appendChild(correctAnswer);
}

//Create response for incorrect answer
function wrongAnswer() {
  var wrongAnswer = document.createElement("h3");
  wrongAnswer.setAttribute("class", "responses");
  wrongAnswer.textContent = "Incorrect";
  document.querySelector("#responses").appendChild(wrongAnswer);
}

//timer function --- decrements every second
function timer() {
  var timer = setInterval(function () {
    if (time <= 0) {
      clearInterval(timer);
      timerEl.innerHTML = 0;
    } else {
      timerEl.innerHTML = time;
    }
    time -= 1;
  }, 1000);
}

//shows final score to user and sets its to a key value pair
function finalScore() {
  score.textContent = count;
  localStorage.setItem("count", count);
}

//on submit sets the initials to a key value pair
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.setItem("initial", initials.value);
})


//create li with initials and count
startBtn.addEventListener("click", startQuiz);
