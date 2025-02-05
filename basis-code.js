const startPlayerDisplay = document.getElementById("player-name-display")
const addPlayerButton = document.getElementById("add-player-button")
const playerNameInput = document.getElementById("player-name-input")
const playerDisplayTitle = document.getElementById("player-name-display-title")
const playerNameDisplay = document.getElementById("player-name-display")


const tasks = []
let playerList =[]
let playerCounter = 0

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
    return randomTime = Math.floor(Math.random() * (max-min + 1)) + min
}

function createPlayer(name){
    const newplayer = new Player(name, playerCounter)
    playerList.push(newplayer)
}


function displayPlayer(){
    const playerNameButton = document.createElement("button");
    const playerId = playerList[playerCounter].identifier
    playerNameButton.classList.add("player-name-button");
    playerNameButton.innerText = `${playerList[playerCounter].name} X`;
    playerNameInput.value = ""
    startPlayerDisplay.appendChild(playerNameButton)
    playerCounter++

    playerNameButton.addEventListener("click", (e) => { 
        const index = playerList.findIndex(player => player.identifier === playerId);
        if (index > -1) {
            playerList.splice(index, 1);
    }

    e.target.remove();
    })
}


addPlayerButton.addEventListener("click", () =>{
    const pattern = /^[a-zA-Z0-9]+$/;
    playerDisplayTitle.remove()
    playerNameDisplay.style.display = "block"
    const x  = playerNameInput.value
    if (x.length <= 2){
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
