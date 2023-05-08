let scoreBoard = document.getElementById("scores");
const startBtn = document.getElementById("startMazeBtn");
const timerElem = document.getElementById("timerClock");
const playBtn = document.getElementById("playBtn");

let timerInterval;
let setFlag = false;

let finalArr = [];

startBtn.addEventListener("click",startGame);
playBtn.addEventListener("click",startGame);

function startGame(){
    messageCont.style.visibility = "hidden";
    finalPos = [];
    startPos = " ";
    finalArr = [];
    //call the function to create the maze
    createMaze();
    initPosition(diff);
    scoreBoard.setAttribute("value", "00");
    //call the function to generate paths;
    generatePaths();
    createPath();
    finalPos.forEach(object => {
        finalArr.push(object.name);
    });
    if (setFlag) {
        setFlag = false;
        timerElem.value = "00:00";
       clearInterval(timerInterval);
    }
    if (!setFlag) {
        setFlag = true;
        timerInterval = setInterval(updateTimer, 1000);
    }

}
//create a function to update timer when start button is pressed
function updateTimer() {
    timerElem.stepUp(1);
}
let audioOne = document.createElement("audio");
let audioTwo = document.createElement("audio");

audioOne.src = "./static/sounds/correct-choice.mp3";
audioTwo.src = "./static/sounds/level-complete.mp3";

let messageCont = document.getElementById("messageContainer");

document.addEventListener('keydown', (event) => {
    currCell = document.getElementById(`${startPos.row}_${startPos.col}`);
    var code = event.code;
    move(code, startPos);
    finalArr.forEach(elem => {
        if(elem === currCell.getAttribute("name")){
            var scoreValue = parseInt(scoreBoard.getAttribute("value"));
            scoreValue += 10;
            scoreBoard.setAttribute("value", `${scoreValue}`);
            audioOne.play();
            finalArr.splice(finalArr.indexOf(elem),1);
        }
        if(finalArr.length === 0){
            clearInterval(timerInterval);
            audioTwo.play();
            toggleVisibility();
        }       
    });
});
function toggleVisibility(){
    if (messageCont.style.visibility === "visible") {
        messageCont.style.visibility = "hidden";
    } else {
        messageCont.style.visibility = "visible";
    }
}

//create a function to allow movement of object within the paths
let move = (name, Object) => {
    switch (name) {
        case "ArrowUp":
            if (currCell.style.borderTopStyle === "none") {
                Object.row -= 1;
                Object.col = Object.col;
                moveElem();
            }
            break;
        case "ArrowDown":
            if (currCell.style.borderBottomStyle === "none") {
                Object.row += 1;
                Object.col = Object.col;
                moveElem();
            }
            break;
        case "ArrowLeft":
            if (currCell.style.borderLeftStyle === "none") {

                Object.row = Object.row;
                Object.col -= 1;
                moveElem();
            }
            break;
        case "ArrowRight":
            if (currCell.style.borderRightStyle === "none") {
                Object.row = Object.row;
                Object.col += 1;
                moveElem();
            }
            break;
    }
    function moveElem() {
        currCell.style.background = "";
        currCell = document.getElementById(`${Object.row}_${Object.col}`);
        currCell.style.background = "red";
    }
}