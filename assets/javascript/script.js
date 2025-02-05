
const addPlayerButton = document.getElementById("add-player-button")
const playerInputDisplay = document.getElementById("player-input")
const startButtonSection = document.getElementById("start-button-section")
const playerNameInput = document.getElementById("player-name-input")
const playerDisplayTitle = document.getElementById("player-name-display-title")
const playerNameDisplay = document.getElementById("player-name-display")
const startButton = document.getElementById("start-game-button")
const startPlayerDisplay = document.getElementById("player-name-display")



const tasks = ["Namen mit A", "Namen mit B", "Namen mit C"]
let playerList =[]
let playerCounter = 0
let roundCounter = 6

class Player{
    constructor(name, minusPoints = 0, identifier){
        this.name = name
        this.minusPoints = minusPoints
        this.identifier = identifier
    }
}
    
function fetchTasks(){
    let randomTask = Math.floor(Math.random() * tasks.length)
    return tasks[randomTask]
}

function fetchRoundTime(){
    const min = 12
    const max = 45
    return Math.floor(Math.random() * (max-min + 1)) + min
}

function createPlayer(name){
    const newPlayer = new Player(name, 0, playerCounter++);
    playerList.push(newPlayer);
}

function displayPlayer(){
    const playerNameButton = document.createElement("button");
    const player = playerList[playerList.length - 1]; // Letzten Spieler holen
    playerNameButton.classList.add("player-name-button");
    playerNameButton.innerText = `${player.name} X`;
    playerNameInput.value = ""
    startPlayerDisplay.appendChild(playerNameButton)

    playerNameButton.addEventListener("click", (e) => { 
        const index = playerList.findIndex(p => p.identifier === player.identifier);
        if (index > -1) {
            playerList.splice(index, 1);
        }
        e.target.remove();
    })
}


function removeContent(){
    startPlayerDisplay.innerHTML = ""
    playerInputDisplay.innerHTML = ""
    startButtonSection.innerHTML = ""
}

function displayTask(){
    let task = fetchTasks()
    let taskDescription = document.createElement("h3")
    taskDescription.innerText = task
    taskDescription.classList.add("task-display")
    startPlayerDisplay.style.display = "flex"
    startPlayerDisplay.style.justifyContent = "center"
    startPlayerDisplay.style.alignItems = "center"
    startPlayerDisplay.appendChild(taskDescription)
}

function createSound(sound, id){
    const existingAudio = document.getElementById(id);
    if (!existingAudio) {
        const audio = document.createElement("audio");
        audio.id = id
        audio.src = `assets/sounds/${sound}`;
        audio.autoplay = true;
        audio.volume = 0.25;
        if (id === "ticking-sound"){
            audio.loop = true;
        } else {
            audio.loop = false;
        }
        document.body.appendChild(audio);
        audio.play().catch(error => console.error("Error to play sound:", error));
    }
}

function removeSound(){
    const existingAudio = document.getElementById("ticking-sound");
    existingAudio.remove();
}

function displayPlayerNames(){
    for (let i = 0; i < playerList.length; i++){
        const playerNameButton = document.createElement("button");
        const player = playerList[i];
        playerNameButton.classList.add("player-name-button");
        playerNameButton.innerText = `${player.name}`;
        startPlayerDisplay.appendChild(playerNameButton)
        roundCounter++

        playerNameButton.addEventListener("click", (e) => {
            player.minusPoints += 1;
            removeContent;
        })
    }
}

function showResults(){
    for (let i = 0; i < playerList.length; i++){
        const playerResults = document.createElement("p");
        const player = playerList[i];
        playerResults.classList.add("player-name-results");
        playerResults.innerText = `${player.name} : ${player.minusPoints}`;
        startPlayerDisplay.appendChild(playerNameButton)

        const endGameButton = document.createElement("button")
        endGameButton.classList.add("end-game-button")
        endGameButton.innerText = "Zurück zum Menü"
        endGameButton.addEventListener("click", () => {
            location.reload()
        })
    }
}

function readyForNextRound(){
    removeContent()
    const nextRoundQuestion = document.createElement("h3")
    nextRoundQuestion.innerText = "Bereit für die nächste Runde?"
    startPlayerDisplay.appendChild(nextRoundQuestion)

    const nextRoundButton = document.createElement("button")
    nextRoundQuestion.innerText = "Start"
    startButtonSection.appendChild(nextRoundButton)

    nextRoundButton.addEventListener("click", () => {
        if (roundCounter < 8){
            displayTask()
        } else {
            showResults()
        }
        
    })
}

function goToLosingScreen(){
    removeContent();
    removeSound("ticking-sound");
    createSound("explosion.mp3", "explosion-sound");
    const whoLostTitle = document.createElement("h2");
    whoLostTitle.innerText = "Wer hat verloren?";
    startPlayerDisplay.classList.add("who-won")
    startPlayerDisplay.appendChild(whoLostTitle);
    displayPlayerNames()
    console.log(playerList)
}


function startGame(){
    if (playerList != 0){
        let roundTime = fetchRoundTime()
        removeContent()
        displayTask()
        createSound("click-sound.mp3", "ticking-sound")
        setTimeout(() => {
        goToLosingScreen()
        }, roundTime * 1000)
    }
    
    
}


addPlayerButton.addEventListener("click", () =>{
    const pattern = /^[a-zA-Z0-9]+$/;
    playerDisplayTitle.remove()
    playerNameDisplay.style.display = "block"
    const x  = playerNameInput.value
    if (x.length < 2){
        playerNameInput.value = ""
        playerNameInput.placeholder = "Bitte mindestens 2 Buchstaben verwenden"
        playerNameInput.style.setProperty("--placeholder-color", "red"); 
    } else if (!pattern.test(x)){
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