const questions = [
    {
        question: "What does AI stand for?",
        options: ["Artificial Intelligence", "Automated Input", "Applied Integration"],
        answer: 0,
    },
    {
        question: "Which is a subset of AI?",
        options: ["Machine Learning", "Data Preprocessing", "Data Analysis"],
        answer: 0,
    },
    {
        question: "What is the first step in the ML pipeline?",
        options: ["Data Preprocessing", "Data Collection", "Feature Engineering"],
        answer: 1,
    },
    {
        question: "Which of these is a common ML algorithm?",
        options: ["Random Forest", "Linear Equation", "Sorting Algorithm"],
        answer: 0,
    },
    {
        question: "What does overfitting mean?",
        options: [
            "The model performs well on unseen data.",
            "The model performs poorly on training data.",
            "The model performs well on training data but poorly on unseen data.",
        ],
        answer: 2,
    },
    {
        question: "Which is NOT a challenge in ML?",
        options: ["Data Quality", "Model Overfitting", "Adding More Data Always Improves Accuracy"],
        answer: 2,
    },
    {
        question: "What is a feature in ML?",
        options: [
            "An attribute or variable used for training the model.",
            "The final output of the model.",
            "A mathematical operation in the model.",
        ],
        answer: 0,
    },
    {
        question: "What is model evaluation?",
        options: [
            "Cleaning the data for better results.",
            "Testing the model's performance using specific metrics.",
            "Choosing the appropriate ML algorithm.",
        ],
        answer: 1,
    },
    {
        question: "Which is an example of supervised learning?",
        options: [
            "Clustering similar products together.",
            "Predicting house prices based on previous data.",
            "Finding patterns in unlabeled data.",
        ],
        answer: 1,
    },
    {
        question: "What is the goal of AI?",
        options: [
            "To replace humans completely.",
            "To enable machines to perform tasks requiring human intelligence.",
            "To create systems that work only on predefined rules.",
        ],
        answer: 1,
    },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 300; // 5 minutes in seconds

function showArticle() {
    document.getElementById("article-section").classList.remove("hidden");
    document.getElementById("quiz-section").classList.add("hidden");
}

function startQuiz() {
    document.getElementById("article-section").classList.add("hidden");
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("quiz-navigation").classList.remove("hidden");
    loadQuestion();
    resetTimer();
}

function loadQuestion() {
    const container = document.getElementById("quiz-container");
    const question = questions[currentQuestion];
    container.innerHTML = `
        <h3>${question.question}</h3>
        <ul>
            ${question.options
                .map(
                    (opt, idx) => `<li><input type="radio" name="answer" value="${idx}"> ${opt}</li>`
                )
                .join("")}
        </ul>
    `;
    document.getElementById("prev-btn").style.display = currentQuestion === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display =
        currentQuestion === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display =
        currentQuestion === questions.length - 1 ? "inline-block" : "none";
}

function nextQuestion() {
    const selected = document.querySelector("input[name='answer']:checked");
    if (!selected) {
        alert("Please select an answer.");
        return;
    }
    const answer = parseInt(selected.value);
    if (answer === questions[currentQuestion].answer) score++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    currentQuestion--;
    loadQuestion();
}

function submitQuiz() {
    showResults();
}

function showResults() {
    clearInterval(timer);
    const container = document.getElementById("quiz-container");
    container.innerHTML = `<h3>Your Score: ${score}/${questions.length}</h3>`;
    document.getElementById("quiz-navigation").innerHTML = `
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    timeRemaining = 300;
    document.getElementById("quiz-navigation").innerHTML = `
        <button id="prev-btn" onclick="prevQuestion()">Previous</button>
        <button id="next-btn" onclick="nextQuestion()">Next</button>
        <button id="submit-btn" onclick="submitQuiz()">Submit</button>
    `;
    startQuiz();
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById("time-remaining");
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        }
    }, 1000);
}
