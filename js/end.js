const SaveScoreBtn = document.getElementById("saveScoreBtn"),
      username     = document.getElementById("username"),
      FinalScore   = document.getElementById("FinalScore");

const mostRecentScore = localStorage.getItem('mostRecentScore');  //Getting Most Recent Score
const highscore       = JSON.parse(localStorage.getItem('highscore')) || [];

const MAX_HIGH_SCORES =5;  // total High Score To Show

FinalScore.textContent=mostRecentScore;  //Setting Final Score To recent Score

username.addEventListener("keyup",function(){
    SaveScoreBtn.disabled= !username.value;  //enbling The Save Button When User Type Their Name
});

SaveScoreBtn.addEventListener("click",function(e){
    e.preventDefault();

    const score= {
        score: mostRecentScore,
        name: username.value
    };
//Pusing Score Into Array Of HighScore in LocalStorage
    highscore.push(score);
    highscore.sort((a,b) => b.score - a.score ); //Sorting Score
    highscore.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highscore",JSON.stringify(highscore));
    window.location.assign("../index.html");
});