// Variables
const startBtn = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const submit = document.querySelector(".submit");
const questionPage = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const questionChoices = document.querySelector("#choices");
const timerBtn = document.querySelector("#time");
let timerCount = 60;
let intervalID;
let question = questionList[0];
let questionIndex = 0;
let score = 0;


// function to start game, display first question + start timer
startBtn.addEventListener("click", start);

function start() {
    // start screen to hide
    startScreen.classList.toggle("start")
    startScreen.classList.toggle("hide")

    // question title to appear
    questionPage.classList.toggle("hide")
    questionPage.classList.toggle("start")

    startTimer();
    timeRemaining();
    nextQuestion();
}

function startTimer () {
    intervalID = setInterval(timeRemaining, 1000);
}

function timeRemaining() {
    timerBtn.textContent = timerCount;
    if (timerCount > 0) {
      timerCount--;
    } else {
      clearInterval(intervalID);
    }
}

// function to go to next question (or first question?))
function nextQuestion() {
    // Clear existing answer buttons
    questionChoices.innerHTML = "";
    
    if (questionIndex < questionList.length) {
        let question = questionList[questionIndex];
        questionTitle.textContent = question.title;

    // create buttons for answer choices
        for (i = 0; i < question.choices.length; i++) {
            let answerBtn = document.createElement("button");
            answerBtn.textContent = question.choices[i];
            questionChoices.appendChild(answerBtn);
            // listen for answer buttons clicked.
            answerBtn.addEventListener("click", checkAnswer);
    }
} else {
        // Handle end of quiz or other logic here
        clearInterval(intervalID);
        alert("Quiz is over. Your score: " + score);
}
}


// validate correct answer and move onto the next question
function checkAnswer(event) {
    // get selected answer index from the event
    let selectedAnswerIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    // get correct answer index
    let correctAnswerIndex = questionList[questionIndex].correctAnswer;

    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    } else {
        timerCount -= 4;
    }

    questionIndex++;
    nextQuestion();
}
