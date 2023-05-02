
//write a function to initalize the starting point and the targets;
function initPosition(diff) {
    var initCol = randomNum(mazeWidth - diff),
        initRow = randomNum(mazeHeight - diff);
    let cellStart_ID = `${initRow}` + '_' + `${initCol}`;

    let cellStart = document.getElementById(cellStart_ID);

    cellStart.style.background = "red";
    cellStart.setAttribute("flag", "true");
    startPos = new PersonObject(cellStart.id, initRow, initCol);
    for (let i = 0; i < diff; i++) {
        var finCol = randomNum(mazeWidth);
        var finRow = randomNum(mazeHeight);
        while (finRow < (initRow + 4) && finCol < (initCol + 5)) {
            finCol = randomNum(mazeWidth);
            finRow = randomNum(mazeHeight);
        }
        let cellFinal_ID = `${finRow}_${finCol}`;
        let cellFinal = document.getElementById(cellFinal_ID);
        cellFinal.style.background = "yellow";
        finalPos.push(new PersonObject(cellFinal_ID, finRow, finCol));
    }    
}

//generate random paths within the maze by eliminating the borders;
let generatePaths = () => {
    let cellArr = document.getElementsByClassName("cell");
    for (let rowIndex = 0; rowIndex < mazeHeight - 1; rowIndex++) {
        for (let columnIndex = 0; columnIndex < mazeWidth - 1; columnIndex++) {
            let i = Math.floor(Math.random() * mazeHeight);
            let j = Math.floor(Math.random() * mazeWidth);
            let flag = (j > i) ? true : false;

            if (flag) {
                let currCell = cellArr[`${rowIndex}` + "_" + `${columnIndex}`];
                let nextCell = cellArr[`${rowIndex + 1}` + "_" + `${columnIndex}`];
                currCell.style["border-bottom"] = "none";
                nextCell.style.borderTopStyle = "none";
            } else {
                let currCell = cellArr[`${rowIndex}` + "_" + `${columnIndex}`];
                let nextCell = cellArr[`${rowIndex}` + "_" + `${columnIndex + 1}`];

                currCell.style.borderRightStyle = "none";
                nextCell.style.borderLeftStyle = "none";
            }
        }
    }
}

// write a function to create a direct path to the destination
let createPath = () => {
    //* dirVert is a string => the direction along vertical, either "bottom" or "top"
    //* dirHor is a string => the direction along horizontal, either "left" or "right"
    let dirVert, dirHor;
    //* xSteps is the number of steps in x-direction
    //* ySteps is the number of steps in y-direction
    let xSteps, ySteps;
    //* arrDir is the array to contain the steps to be taken
    let arrDir = [];
    for (let i = 0; i < finalPos.length; i++) {
        if (startPos.col > finalPos[i].col && startPos.row < finalPos[i].row) {
            dirHor = "left";
            dirVert = "bottom";
            xSteps = startPos.col - finalPos[i].col;
            ySteps = finalPos[i].row - startPos.row;
        } else if (startPos.col < finalPos[i].col && startPos.row < finalPos[i].row) {
            dirHor = "right";
            dirVert = "bottom";
            xSteps = finalPos[i].col - startPos.col;
            ySteps = finalPos[i].row - startPos.row;
        } else if (startPos.col < finalPos[i].col && startPos.row > finalPos[i].row) {
            dirHor = "right";
            dirVert = "top";
            xSteps = finalPos[i].col - startPos.col;
            ySteps = startPos.row - finalPos[i].row;
        } else if (startPos.col > finalPos[i].col && startPos.row > finalPos[i].row) {
            dirHor = "left";
            dirVert = "top";
            xSteps = startPos.col - finalPos[i].col;
            ySteps = startPos.row - finalPos[i].row;
        }
        for (let x = 0; x < xSteps; x++) {
            arrDir.push(dirHor);
        }
        for (let y = 0; y < ySteps; y++) {
            arrDir.push(dirVert);
        }
        let currCell = document.getElementById(startPos.id);
        let rowIndex = startPos.row;

        let colIndex = startPos.col;

        var exit;

        var exitIndex;

        while (arrDir.length != 0) {
            exitIndex = Math.floor(Math.random() * arrDir.length);
            exit = arrDir[exitIndex];
            arrDir.splice(exitIndex, 1);
            currCell.style["border-" + exit] = "none";

            switch (exit) {
                case "right":
                    colIndex += 1;
                    break;
                case "bottom":
                    rowIndex += 1;
                    break;
                case "left":
                    colIndex -= 1;

                    break;
                case "top":
                    rowIndex -= 1;
                    break;
            }
            currCell = document.getElementById(rowIndex + "_" + colIndex);

            switch (exit) {
                case "right":
                    currCell.style["border-left"] = "none";
                    break;
                case "bottom":
                    currCell.style["border-top"] = "none";
                    break;
                case "left":
                    currCell.style["border-right"] = "none";
                    break;
                case "top":
                    currCell.style["border-bottom"] = "none";
                    break;
            }
        }
    }

}

const startBtn = document.getElementById("startMazeBtn");
const timerElem = document.getElementById("timerClock");
let timerInterval;
let setFlag = false;
startBtn.addEventListener("click", () => {
    finalPos = [];
    startPos = " ";
    //call the function to create the maze
    createMaze();
    initPosition(diff);
    //call the function to generate paths;
    generatePaths();
    createPath();
    if(setFlag){
        setFlag = false;
        timerElem.value = "00:00";
        clearInterval(timerInterval);
    }
    if(!setFlag){
        setFlag = true;
        timerInterval = setInterval(updateTimer, 1000); 
    }
});
//create a function to update timer when start button is pressed
function updateTimer() {
    timerElem.stepUp(1);    
}
if(setFlag){
    timerInterval = setInterval(updateTimer, 1000); 
}

document.addEventListener('keydown', (event) => {
    currCell = document.getElementById(`${startPos.row}_${startPos.col}`);
    var code = event.code;
    move(code, startPos);   
});

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