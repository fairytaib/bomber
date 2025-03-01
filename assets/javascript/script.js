const addPlayerButton = document.getElementById("add-player-button")
const playerInputDisplay = document.getElementById("player-input")
const playerNameInput = document.getElementById("player-name-input")
const playerDisplayTitle = document.getElementById("player-name-display-title")
const playerNameDisplay = document.getElementById("player-name-display")
const startButton = document.getElementById("start-game-button")
const startPlayerDisplay = document.getElementById("player-name-display")

let playerList = []
let playerCounter = 0
let roundCounter = 6
let questions;

fetch('assets/json/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data; // Fragen in der Variable speichern
        // Hier kannst du dann den Rest deines Codes ausführen, der die Fragen benötigt.
        // Zum Beispiel den Event-Listener für den "Add Player"-Button.
    })
    .catch(error => {
        console.error('Fehler beim Laden der JSON-Datei:', error);
    })



class Player {
    constructor(name, minusPoints = 0, identifier) {
        this.name = name
        this.minusPoints = minusPoints
        this.identifier = identifier
    }
}

function fetchQuestionType() {
    const questionType = playerList[0].name
    if (questionType === "NSFW") {
        return questions[questionType]
    } else {
        return questions["standard"]
    }

}

function fetchTasks() {
    const questionList = fetchQuestionType()
    let randomTask = Math.floor(Math.random() * questionList.length)
    return questionList[randomTask]
}

function fetchRoundTime() {
    const min = 20;
    const max = 40;
    let roundTime = Math.floor(Math.random() * (max - min + 1)) + min;

    // Ensure the roundTime is never less than min
    return Math.max(roundTime, min);
}

function createPlayer(name) {
    const newPlayer = new Player(name, 0, playerCounter++);
    playerList.push(newPlayer);
}

function displayPlayer() {
    const playerNameButton = document.createElement("button");
    const player = playerList[playerList.length - 1]; // Den gerade erstellten Spieler holen
    playerNameButton.classList.add("player-name-button");
    playerNameButton.innerText = `${player.name} X`;
    playerNameInput.value = "";
    startPlayerDisplay.appendChild(playerNameButton);

    playerNameButton.addEventListener("click", (e) => {
        playerList = playerList.filter(p => p.identifier !== player.identifier); // ID zum Entfernen verwenden
        e.target.remove();
        console.log(playerList);
    });
}


function removeContent() {
    startPlayerDisplay.innerHTML = ""
    playerInputDisplay.innerHTML = ""
}

function displayTask() {
    let roundTime = fetchRoundTime()
    removeContent()
    createSound("click-sound.mp3", "ticking-sound")
    let task = fetchTasks()
    let taskDescription = document.createElement("h3")
    taskDescription.innerText = task
    taskDescription.classList.add("task-display")
    taskDescription.style.margin = "5px"
    taskDescription.style.textAlign = "center"
    startPlayerDisplay.style.display = "flex"
    startPlayerDisplay.style.justifyContent = "center"
    startPlayerDisplay.style.alignItems = "center"
    startPlayerDisplay.appendChild(taskDescription)

    const skipButton = document.createElement("button")
    skipButton.innerText = "Überspringen"
    skipButton.addEventListener("click", () => {
        removeSound()
        removeContent()
        readyForNextRound()
    })
    playerInputDisplay.appendChild(skipButton)

    setTimeout(() => {
        if (roundCounter < 100) {
            goToLosingScreen()
        } else {
            goToLosingScreen()
        }
    }, roundTime * 1000)

}

function createSound(sound, id) {
    const audio = document.createElement("audio");
    audio.id = id
    audio.src = `assets/sounds/${sound}`;
    audio.autoplay = true;
    audio.volume = 0.25;
    if (id === "ticking-sound") {
        audio.loop = true;
    } else {
        audio.loop = false;
    }
    document.body.appendChild(audio);
    audio.play().catch(error => console.error("Error to play sound:", error));
}

function removeSound() {
    const existingAudio = document.getElementById("ticking-sound");
    existingAudio.remove();
}


function displayPlayerNames() {
    for (let i = 0; i < playerList.length; i++) {
        const playerNameButton = document.createElement("button");
        const player = playerList[i];
        playerNameButton.classList.add("player-name-button");
        playerNameButton.innerText = `${player.name}`;
        startPlayerDisplay.appendChild(playerNameButton)
        playerNameButton.addEventListener("click", (e) => {
            player.minusPoints += 1;
            readyForNextRound()
        })
    }
}

function showResults() {
    for (let i = 0; i < playerList.length; i++) {
        const playerResults = document.createElement("p");
        const player = playerList[i];
        playerResults.classList.add("player-name-results");
        playerResults.innerText = `${player.name} : ${player.minusPoints}`;
        startPlayerDisplay.appendChild(playerResults)

        const endGameButton = document.createElement("button")
        endGameButton.classList.add("end-game-button")
        endGameButton.innerText = "Zurück zum Menü"
        endGameButton.addEventListener("click", () => {
            location.reload()
        })
    }
}

function readyForNextRound() {
    removeContent()
    const nextRoundQuestion = document.createElement("h3")
    nextRoundQuestion.innerText = "Bereit für die nächste Runde?"
    startPlayerDisplay.appendChild(nextRoundQuestion)

    const nextRoundButton = document.createElement("button")
    nextRoundButton.innerText = "Start"
    nextRoundButton.id = "next-round-button"
    startPlayerDisplay.appendChild(nextRoundButton)

    nextRoundButton.addEventListener("click", () => {
        displayTask()
    })
}

function goToLosingScreen() {
    removeSound("ticking-sound");
    removeContent();
    createSound("explosion.mp3", "explosion-sound");
    const whoLostTitle = document.createElement("h2");
    whoLostTitle.innerText = "Wer hat verloren?";
    startPlayerDisplay.classList.add("who-won")
    startPlayerDisplay.appendChild(whoLostTitle);
    displayPlayerNames()
    console.log(playerList)
}


function startGame() {
    if (playerList.length >= 1) {
        removeContent()
        displayTask()
    }
}


addPlayerButton.addEventListener("click", () => {
    const pattern = /^[a-zA-Z0-9]+$/;
    playerDisplayTitle.remove()
    playerNameDisplay.style.display = "block"
    const x = playerNameInput.value
    if (x.length < 2) {
        playerNameInput.value = ""
        playerNameInput.placeholder = "Bitte mindestens 2 Buchstaben verwenden"
        playerNameInput.style.setProperty("--placeholder-color", "red");
    } else if (!pattern.test(x)) {
        playerNameInput.value = "";
        playerNameInput.placeholder = "Bitte nur Buchstaben benutzen";
        playerNameInput.style.setProperty("--placeholder-color", "red");
    } else if (x.length >= 20) {
        playerNameInput.value = "";
        playerNameInput.placeholder = "Digga chill mal. Das ist zu lange"; // Error message for long names
        playerNameInput.style.setProperty("--placeholder-color", "red");
    } else {
        createPlayer(x)
        displayPlayer()
    }
})

startButton.addEventListener("click", () => {
    startGame()
})