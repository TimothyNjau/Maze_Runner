//define the maze height and width
var mazeWidth = 10;
var mazeHeight = 10;
let diff = 3;
//this is a class constructor use to create objects
class PersonObject {
    constructor(id, row, column) {
        this.id = id;
        this.row = row;
        this.col = column;
    }
}

let selectElem = document.getElementById("options");
selectElem.addEventListener("change", (event) => {
    console.log(event.target.value);
    var mazeVal = event.target.value;
    switch(mazeVal){
        case "easy":
            mazeHeight = 10;
            mazeWidth = 10;
            diff = 3;
            break;
        case "medium":
        mazeHeight = 15;
        mazeWidth = 15;
        diff = 4;
            break;
        case "hard":
        mazeWidth = 20;
        mazeHeight = 20;
        diff = 7;
            break;
    }
}) 
//define variables for start and final position
let startPos = {};
let finalPos = [];

//get the maze container to hold the maze;
let mazeCont = document.getElementById("maze_container");
let table = document.getElementById("mazeGrid");
// create the maze with respect to the set height and width
function createMaze() {
    let rowIndex = 0, columnIndex = 0;
    table.innerHTML = "";
    let tBody = document.createElement("tbody");
    for (rowIndex = 0; rowIndex < mazeHeight; rowIndex++) {
        let tableRow = document.createElement("tr");
        for (columnIndex = 0; columnIndex < mazeWidth; columnIndex++) {
            let tableCell = document.createElement("td");
            tableCell.id = `${rowIndex}` + "_" + `${columnIndex}`;
            tableCell.className = "cell";
            tableRow.appendChild(tableCell);
        }
        tBody.appendChild(tableRow);
    }
    table.append(tBody);
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}
let fruitObject = {
"banana": 'static/images/fruits/banana.png',
"apple": 'static/images/fruits/apple.png',
"orange": 'static/images/fruits/orange.png',
"berry": 'static/images/fruits/strawberry.png',
"pear": 'static/images/fruits/pear.png',
"watermelon": 'static/images/fruits/watermelon.png',
"pineapple": 'static/images/fruits/pineapple.png',
"mango": 'static/images/fruits/mango.png',
"lemon": 'static/images/fruits/lemon.png'
}