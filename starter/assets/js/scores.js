const clearButton = document.querySelector("#clear");

document.addEventListener("DOMContentLoaded", function () {
    // Display high scores on the "highscores.html" page
    renderHighscores();
});

// Function to render high scores on the page
function renderHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    const highscoresList = document.getElementById("highscores");

    // Clear existing high scores
    highscoresList.innerHTML = "";

    // Append each high score to the list
    highscores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        highscoresList.appendChild(listItem);
    });
}

// Function to clear high scores from localStorage
function clearHighscores() {
    localStorage.removeItem("highscores");
    renderHighscores(); // Assuming you have a function to render high scores on the page
}

// Event listener for the clear button
clearButton.addEventListener("click", clearHighscores);