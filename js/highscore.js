const highScoreList = document.getElementById("highScoreList");
const highscores = JSON.parse(localStorage.getItem("highscore")) || [];

highScoreList.innerHTML = highscores
    .map (score => {
        return `<li class = "high-score"> ${score.name} - ${score.score} </li>`  //Showing High Score
    })
    .join("");