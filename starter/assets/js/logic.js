// Variables
const startBtn = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const submit = document.querySelector(".submit");
const questionPage = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const questionChoices = document.querySelector("#choices");
const timerBtn = document.querySelector("#time");
const endScreen = document.querySelector("#end-screen");
const submitBtn = document.querySelector("#submit");
let timerCount = 60;
let intervalID;
let questionIndex = 0;
let score = 0;

// function to start game, display first question + start the timer
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

// function to start the timer
function startTimer() {
    intervalID = setInterval(timeRemaining, 1000);
}

// function for the timer to count down
function timeRemaining() {
    timerBtn.textContent = timerCount;
    if (timerCount > 0) {
        timerCount--;
    } else {
        clearInterval(intervalID);
    }
}

// function to go to next question (or is this for the first question only?))
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
        endQuiz();
    }
}

function checkAnswer(event) {
    // get selected answer index from the event
    let selectedAnswerIndex = event.target.dataset.index; // assuming you set data-index on your buttons
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

/* validate correct answer and move onto the next question
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
} */

// function to toggle between start and hide end screen pages
function endQuiz() {
    endScreen.classList.toggle("start");
    endScreen.classList.toggle("hide");

    endScreen.classList.toggle("hide");
    endScreen.classList.toggle("start");

    questionPage.classList.add("hide");
    endScreen.classList.remove("hide");
    document.getElementById("final-score").textContent = score;
}

// Submit button event listener for initials
submitBtn.addEventListener("click", function () {
    const initials = document.getElementById("initials").value.trim();

    if (initials !== "") {
        // Handle the submitted initials and score
        addHighscore(initials, score);

        // Redirect to highscores page
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
});

// Submit initials and handle completion
function addHighscore(initials, score) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    const newScore = { initials: initials, score: score };
    highscores.push(newScore);

    // Sort high scores in descending order
    highscores.sort((a, b) => b.score - a.score);

    // Keep only the top 5 high scores
    highscores.splice(5);

    // Save high scores to localStorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
}