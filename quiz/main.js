//All answer options

const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

//All our options

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');//сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'),//номер вопроса
    numberOfAllQuestions = document.getElementById('number-of-all-questions');//количество всех вопросов

let indexOfQuestion,//индекс текущего вопроса
    indexOfPage = 0;//индекс страницы

const answersTracker = document.getElementById('answers-tracker');//обертка для трекера
const btnNext = document.getElementById('btn-next');//кнопка далее

let score = 0;//Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),//количество правильных ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');//количество всех вопросов (в модальном окне)

const btnTryAgain = document.getElementById('btn-try-again');//кнопка "начать викторину заново"

const questions = [
    {
        question: "Столица Украины?",
        options: [
            "Харьков",
            "Львов",
            "Киев",
            "Одесса"
        ],
        rightAnswer: 2
    },
    {
        question: "В какой части Украины находится город Львов?",
        options: [
            "Север",
            "Восток",
            "Юг",
            "Запад"
        ],
        rightAnswer: 3
    },
    {
        question: "Из каких цветов состоит флаг Украины?",
        options: [
            "Чернный и Красный",
            "Синий и жолтый",
            "Белый и Синий",
            "Зеленый и Оранжевый"
        ],
        rightAnswer: 1
    },
    {
        question: "Что изображено на гербе Украины?",
        options: [
            "Трезубец",
            "Серп",
            "Лопата",
            "Молоток"
        ],
        rightAnswer: 0
    },
    {
        question: "На каком из контенентов находится Украины?",
        options: [
            "Азия",
            "Северная Америка",
            "Европа",
            "Антарктида"
        ],
        rightAnswer: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length;//Выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;//Сам вопрос

    //мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;//Установка номера текущей страницы
    indexOfPage++;//Увеличение индекса страницы
};

const completedAnswers = [];//Массив для уже заданых вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;//Якорь для проверки одинакових вопросов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDublicate = true;
                }
            });
            if (hitDublicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }

    completedAnswers.push(numberOfQuestion);
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
}

const checkAnswer = (el) => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', (e) => checkAnswer(e));
}

//Удаление классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа!')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', validate);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});


