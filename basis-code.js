const startPlayerDisplay = document.getElementById("player-name-display")
const addPlayerButton = document.getElementById("player-name")
const playernameInput = document.getElementById("player-name-input")
const tasks = []

class Player{
    constructor(name, minusPoints = 0){
        this.name = name
        this.minusPoints = minusPoints
    }
}
    
function fetchTasks(){
    let randomTask = Math.floor(Math.random() * tasks.length())
    return tasks[randomTask]
}

function fetchRoundTime(){
    const min = 12
    const max = 45
    return randomTime = Math.floor(Math.random() * (max-min + 1)) + min
}

let playerList =[]

function createPlayer(name){
    const newplayer = new Player(name)
    playerList.push(Player)
    displayPlayer(newplayer.name)
    playernameInput.value = ""
}


function displayPlayer(player){
    const playerName = document.createElement("button");
    playerName.classList.add("player-name-button")
    playerName.innerText = `${player} X`;
    startPlayerDisplay.appendChild(playerName)

}

function iteratePlayers(player, range){
    for (let step = 0; step < range; step++){

    }
}
 

addPlayerButton.addEventListener("click", () =>{
    const x  = playernameInput.value
    createPlayer(x)
})


