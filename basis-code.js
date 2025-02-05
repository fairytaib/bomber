const startPlayerDisplay = document.getElementById("player-name-display")
const addPlayerButton = document.getElementById("add-player-button")
const playernameInput = document.getElementById("player-name-input")
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
    playernameInput.value = ""
    startPlayerDisplay.appendChild(playerNameButton)
    playerCounter++

    playerNameButton.addEventListener("click", (e) => { 
        const index = playerList.findIndex(player => player.identifier === playerCounter);
        if (index > -1) {
            playerList.splice(index, 1);
        }

        e.target.remove();
        playerCounter--
    })
}


addPlayerButton.addEventListener("click", () =>{
    const x  = playernameInput.value
    createPlayer(x)
    displayPlayer()
})






