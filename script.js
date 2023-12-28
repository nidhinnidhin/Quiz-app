const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startGame);
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");

let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }
  else{
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 5 + 5",
    answers: [
      { text: "10", correct: true },
      { text: "22", correct: false },
      { text: "100", correct: false },
      { text: "200", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell",
    answers: [
      { text: "Neuron", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Heart tisue", correct: false },
      { text: "Skull", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world",
    answers: [
      { text: "Shark", correct: false },
      { text: "Tuna", correct: false },
      { text: "Star Fish", correct: false },
      { text: "Blue wale", correct: true },
    ],
  },
  {
    question: " Which planet is known as the 'Red Planet'?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupitor", correct: false },
      { text: "Satern", correct: false },
      { text: "Mars", correct: true },
    ],
  },
  {
    question: "Who was the first President of the United States",
    answers: [
      { text: "George Washington", correct: true },
      { text: "Donald Trump", correct: false },
      { text: "Goe beiden", correct: false },
      { text: "Narendra Modi", correct: false },
    ],
  },
];
