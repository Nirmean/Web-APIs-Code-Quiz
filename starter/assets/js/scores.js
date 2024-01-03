document.addEventListener("DOMContentLoaded", function () {
    const highscoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");
    // Load high scores from localStorage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Display high scores
    renderHighscores();
    // Event listener for the clear button
    clearButton.addEventListener("click", function () {
        // Clear high scores
        localStorage.removeItem("highscores");
        // Refresh the displayed high scores
        renderHighscores();
    });

    // Function to render high scores on the page
    function renderHighscores() {
        highscoresList.innerHTML = ""; // Clear existing list

        // Loop through high scores and add them to the list
        for (let i = 0; i < highscores.length; i++) {
            const scoreEntry = document.createElement("li");
            scoreEntry.textContent = `${highscores[i].initials} - ${highscores[i].score}`;
            highscoresList.appendChild(scoreEntry);
        }
    }

    // Function to add a new high score
    function addHighscore(initials, score) {
        const newScore = { initials: initials, score: score };
        highscores.push(newScore);

        // Sort high scores in descending order
        highscores.sort((a, b) => b.score - a.score);

        // Keep only the top 5 high scores
        highscores.splice(5);

        // Save high scores to localStorage
        localStorage.setItem("highscores", JSON.stringify(highscores));

        // Refresh the displayed high scores
        renderHighscores();
    }
});