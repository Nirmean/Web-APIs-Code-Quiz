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
    //let question = questionList[0];
    questionTitle.textContent = question.title;

    // create buttons for answer choices
    for (i = 0; i < questionChoices.length; i++) {
        let answerBtn = document.createElement("button");
        answerBtn.textContent = questionChoices[i];
        questionChoices.appendChild(answerBtn);
         // listen for answer buttons clicked.
        answerBtn.addEventListener("click", checkAnswer);
    }
}

// validate correct answer and move onto next question

function checkAnswer(event) {
    // get selected answer from the event
    let selectedAnswer = event.target.value;
    // get correct answer
    let correctAnswer = question.correctAnswer

    if (selectedAnswer === correctAnswer) {
        score++;
        nextQuestion(); 
    } else {
        timerCount -= 4;
    }
}


    /* if correct answer clicked, add 1 to score and move onto next question.
    let answer = question.correctAnswer[i];
    if (answer = question.correctAnswer[0]) {
        question.title + 4;
        //store data 
        // go to next question
        //for (i = 0; i < question.title.length; i++)
         } else {
         // if incorrect answer, reduce time by x.
         timerCount - 4;
    } */






// function to display score


// function to save name and score
