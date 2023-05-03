
//write a function to initalize the starting point and the targets;
function initPosition(diff) {
    var initCol = randomNum(mazeWidth - diff),
        initRow = randomNum(mazeHeight - diff);
    let cellStart_ID = `${initRow}` + '_' + `${initCol}`;

    let cellStart = document.getElementById(cellStart_ID);

    cellStart.style.background = "red";
    cellStart.setAttribute("flag", "true");
    startPos = new PersonObject(cellStart.id, initRow, initCol);
    
    let arr = Object.keys(fruitObject);
    for (let i = 0; i < diff; i++) {
        var finCol = randomNum(mazeWidth);
        var finRow = randomNum(mazeHeight);
        while (finRow < (initRow + 4) && finCol < (initCol + 5)) {
            finCol = randomNum(mazeWidth);
            finRow = randomNum(mazeHeight);
        }

        let randX = randomNum(arr.length);
        var fruit = arr.splice(randX,1)[0];
        let source;
        for (key in fruitObject){
            if(key === fruit)
            {
                source = fruitObject[key];
            }
        }

        let cellFinal_ID = `${finRow}_${finCol}`;
        let cellFinal = document.getElementById(cellFinal_ID);
        finalPos.push(new PersonObject(cellFinal_ID, finRow, finCol));
        finalPos[i]["name"] = fruit;
       
        cellFinal.style.backgroundImage = `url(${source})`;
        cellFinal.style.backgroundSize = "contain";
        cellFinal.style.backgroundRepeat = "no-repeat";
        cellFinal.setAttribute("name", `${fruit}`);
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

