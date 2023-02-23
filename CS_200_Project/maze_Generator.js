import { maze_Algorithm } from "./maze_Algorithm";

class maze_Generator{

    constructor(width, height) {

        this.width = width;
        this.height = height;

        //battleship style will need roughly double the space
        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;

        //initalize maze matrix
        this.maze = this.initalizeMatrix([]);

        this.entPos = this.rand(1, this.height-1)

        this.maze.forEach((row, r) => {
            row.forEach((cell, c) => {
                if(r == 0 && c == this.entPos){
                    this.maze[r][c] = ["door", "entrance"];
                }else{
                    this.maze[r][c] = ["wall"];
                }
            });

        });

        // apply algorithm to break up maze
        this.maze = new maze_Algorithm(this.maze, this.height, this.width, this.entPos)
    }

    //standard 2d array (thx w3 schools)
    initalizeMatrix(value) {
        return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }

    initalizeVisited(value) {
        return new Array(this.height).fill().map(() => new Array(this.width).fill(value));
    }

    rand(min, max) {
        return min + Math.floor(Math.random() * ((max - min) + 1));
    }

    display(id) {

        this.parentDiv = document.getElementById(id);

        if(!this.parentDiv) {
            alert("Cannot initialise maze - no element found with id \"" + id + "\"");
            return false;
        }

        while(this.parentDiv.firstChild) {
            this.parentDiv.removeChild(this.parentDiv.firstChild);
        }

        const container = document.createElement("div");
        container.id = "maze";
        container.dataset.steps = this.totalSteps;

        this.maze.forEach((row) => {
            let rowDiv = document.createElement("div");
            row.forEach((cell) => {
            let cellDiv = document.createElement("div");
            if(cell) {
                cellDiv.className = cell.join(" ");
            }
            rowDiv.appendChild(cellDiv);
            });
            container.appendChild(rowDiv);
        });

        this.parentDiv.appendChild(container);

        return true;
    }
}