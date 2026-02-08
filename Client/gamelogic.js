let gametext = document.querySelector(".gametext")
let boardspaces = Array.from(document.querySelector(".gameboard").children)
let restartbtn = document.getElementById("restartbtn")
let currentPlayer = "X"
var playgame = true
const winningcombonations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function checkforwin(player) {
    let result = false
    
    for (condition of winningcombonations) {
        let [a, b, c] = boardspaces.filter((elem) => {
            return condition.indexOf(Number(elem.id)) >= 0;
        }).map(elem => elem.innerText);
        
        if ((a == player) && (a == b) & (b == c)) {
            result = [...condition];
            break;
        }
    }
    return result;
}


function playerBtnClick(eventObj){
    if (!playgame || eventObj.target.innerText) {
        return
    }

    eventObj.target.innerText = currentPlayer
    let win = checkforwin(currentPlayer)

    if (!win) {
        currentPlayer = currentPlayer == "X" ? "O" : "X"
    }
    else {
        playgame = false
        gametext.innerText = `${currentPlayer} wins!`
        for (space of boardspaces) {
            if (win.indexOf(Number(space.id)) >= 0) {
                space.style.background = "green";
            }
        }
    }
}


function loadgame() {
    for (space of boardspaces) {
        space.addEventListener("click", playerBtnClick)
    }
    restartbtn.addEventListener("click", () => {
        for (space of boardspaces) {
            space.innerText = ""
            space.style.background = "white";
        }
        playgame = true
        gametext.innerText = "Tic Tac Toe"
    })
}


loadgame()
