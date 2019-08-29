const question        = document.getElementById("question"),
      ProgressText    = document.getElementById("ProgressText"),
      ProgressBarFull = document.getElementById("ProgressBarFull"),
      Score           = document.getElementById("score"),
      loader          = document.getElementById("loader"),
      game            = document.getElementById("game"),
      choices         = Array.from(document.getElementsByClassName("choice-text"));
      MaxQues         = document.getElementById("MAXQUES");
      
let currentQuestion  = {},
    acceptingAnswer  = false,
    questionCounter  = 0,
    score            = 0,
    availableQuestion= [],
    questions        = [];

// Fetching Question From The Open Triva Databse For Quiz Through API
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res => {
  return res.json();
})
.then(loadedQuestions => {
  questions = loadedQuestions.results.map(loadedQuestion => {   //mapping Of Loaded Question
    const formattedQuestion = {
      question: loadedQuestion.question
    };
    // Setting Up Choices In Our Format   
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestion.correct_answer);
        
    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });
        
    return formattedQuestion;
  });
  StartGame();
})

.catch(err => {
  console.error(err);
});

//Some Constants

const MAX_BONUS=10;
const MAX_QUESTION=10;

//Function For the New Question

function getNewQuestion(){
  if(availableQuestion === 0 || questionCounter >= MAX_QUESTION){
    //save the score to local storage
    localStorage.setItem('mostRecentScore',score);  //Saving Score To Local Storage

    //return to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;

  //Setting Process Bar
  ProgressText.textContent= "Question " + questionCounter + "/" + MAX_QUESTION;
  ProgressBarFull.style.width = `${(questionCounter/MAX_QUESTION)*100}%`;
  
  // Setting Questions Randomly From Avaliable List
  
  const QuestionIndex=Math.floor(Math.random()*availableQuestion.length);
  currentQuestion= availableQuestion[QuestionIndex];
  question.innerText=currentQuestion.question;

  // Setting Choices For The Question

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
    
  //Deleting Already Loaded Question

  availableQuestion.splice(QuestionIndex,1);

  acceptingAnswer=true;
}

// Game Start From Here

function StartGame(){
  questionCounter=0;
  score=0;
  availableQuestion=[...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
}

//Feedback Of Answer Choice

choices.forEach(choice => {
  choice.addEventListener("click", function(e){
    if(!acceptingAnswer)
      return;

    // Taking Answer Input

    acceptingAnswer=false;
    const selectedChoice= e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
        
    // Update Score And Add Class Correct and Incorrect

    if(selectedAnswer ==currentQuestion.answer){
      selectedChoice.parentElement.classList.add("correct");
      ScoreCounter();
    }

    else
    selectedChoice.parentElement.classList.add("incorrect");
    
    // Remove Class Correct And Incorrect

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove("correct");
      selectedChoice.parentElement.classList.remove("incorrect");
      getNewQuestion();
    }, 1000);
  });
});

// Calculating Score

function ScoreCounter(num) {
  score+= MAX_BONUS;
  Score.textContent=score;
}

    