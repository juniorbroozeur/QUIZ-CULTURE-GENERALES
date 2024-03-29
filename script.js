// Questions en français
const questions = [
    {
        "question": "Quelle est la capitale de la France ?",
        "options": ["Paris", "Londres", "Rome", "Berlin"],
        "answer": "Paris"
    },
    {
        "question": "Qui a écrit 'Les Misérables' ?",
        "options": ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Alexandre Dumas"],
        "answer": "Victor Hugo"
    },
    {
        "question": "Quel est le plus grand océan du monde ?",
        "options": ["Océan Pacifique", "Océan Atlantique", "Océan Indien", "Océan Arctique"],
        "answer": "Océan Pacifique"
    },
    {
        "question": "Quelle est la couleur du ciel par temps clair ?",
        "options": ["Bleu", "Rouge", "Vert", "Jaune"],
        "answer": "Bleu"
    },
    {
        "question": "Combien de continents y a-t-il sur Terre ?",
        "options": ["7", "5", "6", "4"],
        "answer": "7"
    },
    {
        "question": "Quelle est la planète la plus proche du Soleil ?",
        "options": ["Mercure", "Vénus", "Terre", "Mars"],
        "answer": "Mercure"
    },
    {
        "question": "Qui a peint 'La Joconde' ?",
        "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "Quel est le plus grand désert du monde ?",
        "options": ["Désert du Sahara", "Désert du Gobi", "Désert de l'Arabie", "Désert de l'Antarctique"],
        "answer": "Désert de l'Antarctique"
    },
    {
        "question": "Quel est le symbole chimique de l'eau ?",
        "options": ["H2O", "CO2", "O2", "NaCl"],
        "answer": "H2O"
    },
    {
        "question": "Qui a découvert la gravité ?",
        "options": ["Isaac Newton", "Albert Einstein", "Galilée", "Stephen Hawking"],
        "answer": "Isaac Newton"
    }
];

    // Ajoutez plus de questions ici si nécessaire

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fonction pour afficher les questions aléatoires
function displayQuestions() {
    const shuffledQuestions = shuffleArray(questions).slice(0, 5); // Sélectionne 5 questions aléatoires
    const quizContainer = document.getElementById('quiz-container');
    
    shuffledQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${index + 1}. ${question.question}</h3>
            <ul style="list-style: none; padding: 0; margin: 0;"> <!-- Ajouter un style inline pour annuler le style par défaut -->
                ${question.options.map(option => `<li><input type="radio" name="question${index}" value="${option}">${option}</li>`).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionDiv);
    });
}


// Fonction pour calculer le score et afficher les erreurs
function calculateScore() {
    let score = 0;
    let errors = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.answer) {
                score++;
            }
        } else {
            errors++;
        }
    });

    if (errors > 0) {
        alert(`Vous avez oublié de répondre à ${errors} question(s).`);
    }

    return score;
}


// Fonction pour afficher les questions suivantes
function displayRemainingQuestions() {
    const remainingQuestions = questions.slice(5); // Sélectionne les questions restantes
    const quizContainer = document.getElementById('quiz-container');
    
    remainingQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${index + 6}. ${question.question}</h3>
            <ul style="list-style: none; padding: 0; margin: 0;"> <!-- Ajouter un style inline pour annuler le style par défaut -->
                ${question.options.map(option => `<li><input type="radio" name="question${index + 5}" value="${option}">${option}</li>`).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Fonction pour passer aux questions suivantes
function nextQuestions() {
    displayRemainingQuestions();
    document.getElementById('next-btn').style.display = 'none'; // Masque le bouton 'Suivant'
}

// Fonction pour calculer le score
function calculateScore() {
    let score = 0;
    let errors = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.answer) {
                score++;
            }
        } else {
            if (index < 5) { // Vérifie seulement les 5 premières questions pour les erreurs
                errors++;
            }
        }
    });

    if (errors > 0) {
        alert(`Vous avez oublié de répondre à ${errors} question(s).`);
    }

    return score;
}

// Fonction pour afficher le résultat et gérer les questions restantes
function showResult() {
    const score = calculateScore();
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `<h2>Votre score : ${score}</h2>`;

    // Vérifie si des questions restent à afficher
    if (document.getElementById('next-btn').style.display !== 'none') {
        nextQuestions(); // Affiche les questions suivantes
    }
}

// Fonction pour passer aux questions suivantes
function nextQuestions() {
    displayRemainingQuestions();
    document.getElementById('next-btn').style.display = 'none'; // Masque le bouton 'Suivant'
}

// Événement pour le bouton Soumettre
document.getElementById('submit-btn').addEventListener('click', () => {
    showResult(); // Affiche le résultat et gère les questions restantes
});

// Afficher les premières questions lorsque la page est chargée
window.addEventListener('load', () => {
    displayQuestions();
});

