function myFunction() {
  var txt;
  if (confirm("ARE YOU READY?")) {
    txt = "";
  } else {
    txt = "";
  }
  document.getElementById("OK").innerHTML = txt
}

const startButton = document.getElementById('start-button')
const questionContainer = document.getElementById('question-container')
const question = document.getElementById('question')
const icons = document.getElementById('logo')
const boxskew = document.getElementById('boxskew')
const rectangle = document.getElementById('boxed')
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const footer = document.getElementById("footer")

// questions
let questions = [
  {
      question : "Which Italian city has a famous leaning tower?",
      imgSrc : "img/A.png",
      choiceA : "Venice",
      choiceB : "Pisa",
      choiceC : "Florence",
      correct : "B"
  },{
      question : "Which was the tallest dinosaur?",
      imgSrc : "img/B.png",
      choiceA : "Brachiosaurus",
      choiceB : "Lesothosaurus",
      choiceC : "Argentinosaurus",
      correct : "A"
    },{
      question : "Which one is a Palindrome?",
      imgSrc : "img/C.jpg",
      choiceA : "Malyalam",
      choiceB : "Mississippi",
      choiceC : "Floccinaucinihilipilification",
      correct : "C"
  },{
      question : "How many years ago did dinosaurs become extinct?",
      imgSrc : "img/D.png",
      choiceA : "90 million years ago",
      choiceB : "6 million years ago",
      choiceC : "66 million years ago",
      correct : "C"
  },{
      question : "What 2 other colors can oranges be?",
      imgSrc : "img/E.jpg",
      choiceA : "Red and Yellow",
      choiceB : "Green and Yellow",
      choiceC : "Yellow and Red",
      correct : "B"
  },{
      question : "What do players hit in badminton?",
      imgSrc : "img/F.png",
      choiceA : "A Ball",
      choiceB : "A Shuttlecock",
      choiceC : "A Stone",
      correct : "B"
  },{
    question : "How many languages are there in India?",
    imgSrc : "img/G.png",
    choiceA : "25",
    choiceB : "18",
    choiceC : "22",
    correct : "C"
},{
    question : "How many hearts does an octopus have?",
    imgSrc : "img/H.svg",
    choiceA : "3",
    choiceB : "6",
    choiceC : "8",
    correct : "A"
  },{
    question : "What animal can sleep for 3 years?",
    imgSrc : "img/I.jpg",
    choiceA : "A Turtle",
    choiceB : "A Snake",
    choiceC : "A Snail",
    correct : "C"
},{
    question : "Which monkey sneezes whenever it rains?",
    imgSrc : "img/J.png",
    choiceA : "The Burmese Sneezing Monkey",
    choiceB : "The Howler monkey",
    choiceC : "The Pygmy Marmoset",
    correct : "A"
},{
    question : "What is the country code of India for making a phone call?",
    imgSrc : "img/K.jpg",
    choiceA : "91",
    choiceB : "72",
    choiceC : "88",
    correct : "A"
},{
    question : "What number comes before 3*3*4?",
    imgSrc : "img/L.png",
    choiceA : "36",
    choiceB : "35",
    choiceC : "30",
    correct : "B"
},{
    question : "What is Santa called in Hawaii?",
    imgSrc : "img/M.jpg",
    choiceA : "Kanakaloka",
    choiceB : "Loka",
    choiceC : "Kana",
    correct : "A"
  }
];

// declaring variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
  let q = questions[runningQuestion];
  
  question.innerHTML = "<p>"+ q.question +"</p>";
  qImg.innerHTML = "<img src="+ q.imgSrc +">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

startButton.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    startButton.classList.add('hide')
    icons.classList.add('hide')
    boxskew.classList.add('hide')
    footer.style.display="block"
    rectangle.classList.remove('hide')
    renderQuestion();
    questionContainer.style.display="block";
    renderQuestion();
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


// progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
  }
}

// render
function renderCounter(){
  if(count <= questionTime){
      counter.innerHTML = count;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++
  }else{
      count = 0;
      // color to red
      answerIsWrong();
      if(runningQuestion < lastQuestion){
          runningQuestion++;
          renderQuestion();
      }else{
          // end the quiz and show the score
          clearInterval(TIMER);
          scoreRender();
      }
  }
}

// checkAnwer
function checkAnswer(answer){
  if( answer == questions[runningQuestion].correct){
      // answer is correct
      score++;
      //progress color to green
      answerIsCorrect();
  }else{
      // answer is wrong
      //progress color to red
      answerIsWrong();
  }
  count = 0;
  if(runningQuestion < lastQuestion){
      runningQuestion++;
      renderQuestion();
  }else{
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
  }
}

// answer is correct
function answerIsCorrect(){
  document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong(){
  document.getElementById(runningQuestion).style.backgroundColor = "rgb(238, 25, 25)";
}

// score
function scoreRender(){
  scoreDiv.style.display = "block";
  
  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round(100 * score/questions.length);
  
  // choose the image based on the scorePerCent
  let img = (scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";
  
  scoreDiv.innerHTML = "<img src="+ img +">";
  scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
  
}








