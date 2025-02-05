const startPlayerDisplay = document.getElementById("player-name-display")
const addPlayerButton = document.getElementById("add-player-button")
const playernameInput = document.getElementById("player-name-input")
const tasks = []
let playerList =[]

class Player{
    constructor(name, minusPoints = 0){
        this.name = name
        this.minusPoints = minusPoints
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
    const newplayer = new Player(name)
    playerList.push(newplayer)
}


function displayPlayer(){ 
    const playerNameButton = document.createElement("button");
    playerNameButton.classList.add("player-name-button");
    playerNameButton.innerText = `${playerList[0].name} X`;
    playernameInput.value = ""
    startPlayerDisplay.appendChild(playerNameButton)
}


addPlayerButton.addEventListener("click", () =>{
    const x  = playernameInput.value
    createPlayer(x)
    displayPlayer()
})


