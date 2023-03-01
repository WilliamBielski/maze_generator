class maze_Algorithm {

    constructor(arrayConstruct, numRows, numCels, entranceY) {
        this.vertEdge = numCels-1;
        this.horzEdge = numRows-1;

        this.modArr = arrayConstruct;

        this.modArr[1][entranceY] = ["path"];
        //roughly x axis
        this.currR = 1;
        //roughly on inverted y axis
        this.currC = entranceY;

        //array to keep track of past moves
        this.movesArray = [0];

        //condition that keeps the while loop running
        this.movable = true;

        //makes sure that only one exit is chosen.
        this.endSet = false;

        while(this.movable){
            //console.log("loop resets - current possition "+ this.currR +", "+ this.currC)
            //for when movement is possible
            if(this.canMove(this.currR, this.currC)){
                //console.log("movement triggers")
                switch(rand(1,4)){
                    //1 is LEFT
                    case 1:
                        //console.log("tries going left")
                        if(this.canMoveLeft(this.currR, this.currC)){
                            // console.log("left triggered")
                            this.modArr[this.currR-1][this.currC] = ["path"];
                            this.modArr[this.currR-2][this.currC] = ["path"];
                            this.currR = this.currR-2;
                            this.movesArray.push(1);
                        }
                        break;
    
                    //2 is RIGHT
                    case 2:
                        //console.log("tries going right")
                        if(this.canMoveRight(this.currR, this.currC)){
                            //console.log("right triggered")
                            this.modArr[this.currR+1][this.currC] = ["path"];
                            this.modArr[this.currR+2][this.currC] = ["path"];
                            this.currR = this.currR+2; 
                            this.movesArray.push(2);
                        }
                        break;
    
                    //3 is UP
                    case 3:
                        // console.log("tries going up")
                        if(this.canMoveUp(this.currR, this.currC)){
                            //console.log("up triggered")
                            this.modArr[this.currR][this.currC-1] = ["path"];
                            this.modArr[this.currR][this.currC-2] = ["path"];
                            this.currC = this.currC-2; 
                            this.movesArray.push(3);
                        }
                        break;
    
                    //4 is DOWN
                    case 4:
                        //console.log("tries going down")
                        if(this.canMoveDown(this.currR, this.currC)){
                            //console.log("down triggers")
                            this.modArr[this.currR][this.currC+1] = ["path"];
                            this.modArr[this.currR][this.currC+2] = ["path"];
                            this.currC = this.currC+2; 
                            this.movesArray.push(4);
                        }
                        break;
                }
            //for when movement isn't possible
            }else{
                if(!(this.endSet) && this.currR == this.horzEdge-1){
                    this.modArr[this.currR+1][this.currC] = ["exit"];
                    this.endSet = true;
                }
                //1 went Left, 2 went Right, 3 went Up, 4 went down.
                //reverses course till a new route is possible or it kills the loop
                this.moveIdx = this.movesArray.length-1;
                //console.log("reverse/end calls");
                //console.log(this.movesArray[this.moveIdx]);
                if(this.movesArray[this.moveIdx] == 1){
                    this.currR = this.currR+2;
                    this.movesArray.pop();
                    
                }else if(this.movesArray[this.moveIdx] == 2){
                    this.currR = this.currR-2;
                    this.movesArray.pop();

                }else if(this.movesArray[this.moveIdx] == 3){
                    this.currC = this.currC+2
                    this.movesArray.pop();
                    
                }else if(this.movesArray[this.moveIdx] == 4){
                    this.currC = this.currC-2;
                    this.movesArray.pop();
                }else{
                    //console.log("while ends")
                    this.movable = false;
                }
            }
        }
        return this.modArr;
    }

    canMoveLeft(xRow,yCell){
        if(xRow > 1 && this.modArr[xRow-2][yCell] == 'wall'){
            //console.log("Able to move left");
            return true;
        }else{
            // console.log("cant move left");
            // console.log("xRow > 1:");
            // console.log(xRow > 1);
            // if(xRow > 1){
            //     console.log("this.modArr[xRow-2][yCell] == 'wall':");
            //     console.log(this.modArr[xRow-2][yCell] == 'wall');
            // }
            return false;
        }
    }

    canMoveRight(xRow,yCell){
        if(xRow < this.horzEdge-1 && this.modArr[xRow+2][yCell] == 'wall'){
            //console.log("Able to move right");
            return true;
        }else{
            // console.log("cant move right");
            // console.log("xRow < this.horzEdge-1:");
            // console.log(xRow < this.horzEdge-1);
            // if(xRow < this.horzEdge-1){
            //     console.log("this.modArr[xRow+2][yCell] == 'wall':");
            //     console.log(this.modArr[xRow+2][yCell] == 'wall');
            // }
            return false;
        }
    }

    canMoveUp(xRow,yCell){
        if(yCell > 1 && this.modArr[xRow][yCell-2] == 'wall'){
            // console.log("Able to move up");
            return true;
        }else{
            // console.log("cant move up");
            // console.log("yCell > 1:");
            // console.log(yCell > 1);
            // if(yCell > 1){
            //     console.log("this.modArr[xRow][yCell-2] == 'wall':");
            //     console.log(this.modArr[xRow][yCell-2] == 'wall');
            // }
            return false;
        }
    }

    canMoveDown(xRow,yCell){
        if(yCell < this.vertEdge-1 && this.modArr[xRow][yCell+2] == 'wall'){
            // console.log("Able to move down");
            return true;
        }else{
            // console.log("cant move down");
            // console.log("yCell < this.vertEdge-1:");
            // console.log(yCell < this.vertEdge-1);
            // if(yCell < this.vertEdge-1){
            //     console.log("this.modArr[xRow][yCell+2] == 'wall':");
            //     console.log(this.modArr[xRow][yCell+2] == 'wall');
            // }
            return false;
        }
    }

    canMove(x,y){
        //checks if can move left
        if(this.canMoveLeft(x,y)){
            return true;
        //checks if can move right
        }else if(this.canMoveRight(x,y)){
            return true;
        //checks if can move up
        }else if(this.canMoveUp(x,y)){
            return true;
        //checks if can move down
        }else if(this.canMoveDown(x,y)){
            return true;
        }else{
        //returns false as no movement is possible
            return false;
        }
    }
}

class maze_Generation{

    constructor(width, height) {
        console.log("maze runs");

        this.width = width;
        this.height = height;

        //battleship style will need roughly double the space
        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;

        //initalize maze matrix
        this.maze = this.makeMatrix([]);

        //get to work later for random
        this.entPos = oddRand(1,this.cols-1);

        this.playerPosX = 0;
        this.playerPosY = this.entPos;


        this.maze.forEach((row, r) => {
            row.forEach((cell, c) => {
                if(r == 0 && c == this.entPos){
                    this.maze[r][c] = ["entrance"];
                }else{
                    this.maze[r][c] = ["wall"];
                }
            });

        });

        // apply algorithm to break up maze
        this.maze = new maze_Algorithm(this.maze, this.rows, this.cols, this.entPos);
        console.log("maze complete");
        console.log(this.maze);
        return true;
    }

    //standard 2d array (thx w3 schools)
    makeMatrix(value) {
        return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }

    initalizeVisited(value) {
        return new Array(this.height).fill().map(() => new Array(this.width).fill(value));
    }

    displayMaze(id) {
        //didn't think I would actually use parent child hookups like this but here we are.
        this.bankDiv = document.getElementById(id);

        if(!this.bankDiv) {
            document.write("name dosen't or you deleted the div");
            return false;
        }

        while(this.bankDiv.firstChild) {
            this.bankDiv.removeChild(this.bankDiv.firstChild);
        }

        const container = document.createElement("div");

        container.id = "generatedMaze";

        //w3 is unmatched
        this.maze.forEach((row) => {
            let rowDiv = document.createElement("div");

            row.forEach((cell) => {
                let cellDiv = document.createElement("div");

                if(cell) {
                    cellDiv.className = cell.toString();
                }
                rowDiv.appendChild(cellDiv);
            });

            container.appendChild(rowDiv);
        });

        this.bankDiv.appendChild(container);

        console.log("display runs");
        return true;
    }

    movePlayer(direction) {

        this.vertEdge = this.cols-1;
        this.horzEdge = this.rows-1;

        // console.log("xPos = "+this.playerPosX+" yPos = "+this.playerPosY);
        if(this.playerPosX == 0){
            this.playerPosX = this.playerPosX+1;
            this.maze[this.playerPosX][this.playerPosY] = ["walked"];
        }

        // console.log("xPos = "+this.playerPosX+" yPos = "+this.playerPosY);
        this.direction = direction;

        if(this.direction == 'up' && this.playerPosY > 1){
            // console.log("goes up");
            // console.log("xPos = " + this.playerPosX + " yPos = "+ this.playerPosY);
            if(this.maze[this.playerPosX+1][this.playerPosY-2] == 'exit'){
                this.maze[this.playerPosX][this.playerPosY-1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY-2] = ["walked"];
                this.playerPosY = this.playerPosY-2;
                alert("Maze Clear!!!");
            }else if(this.maze[this.playerPosX][this.playerPosY-1] == 'path'){
                this.maze[this.playerPosX][this.playerPosY-1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY-2] = ["walked"];
                this.playerPosY = this.playerPosY-2;
                // console.log(this.maze);
            }else if(this.maze[this.playerPosX][this.playerPosY-1] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX][this.playerPosY-1] = ["path"];
                this.playerPosY = this.playerPosY-2;
            }else{
                alert("you can't move that way");
                return false;
            }
        }else if(this.direction == 'down' && this.playerPosY < this.vertEdge-1){
            // console.log("goes down");
            // console.log("xPos = " + this.playerPosX + " yPos = "+ this.playerPosY);
            if(this.maze[this.playerPosX+1][this.playerPosY+2] == 'exit'){
                this.maze[this.playerPosX][this.playerPosY+1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY+2] = ["walked"];
                this.playerPosY = this.playerPosY+2;
                alert("Maze Clear!!!");
            }else if(this.maze[this.playerPosX][this.playerPosY+1] == 'path'){
                this.maze[this.playerPosX][this.playerPosY+1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY+2] = ["walked"];
                this.playerPosY = this.playerPosY+2;
                // console.log(this.maze);
            }else if(this.maze[this.playerPosX][this.playerPosY+1] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX][this.playerPosY+1] = ["path"];
                this.playerPosY = this.playerPosY+2;    
            }else{
                alert("you can't move that way");
                return false;
            }
        }else if(this.direction == 'left' && this.playerPosX > 1){
            // console.log("goes left");
            // console.log("xPos = " + this.playerPosX + " yPos = "+ this.playerPosY);
            if(this.maze[this.playerPosX-1][this.playerPosY] == 'path'){
                this.maze[this.playerPosX-1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX-2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX-2;
                // console.log(this.maze);
            }else if(this.maze[this.playerPosX-1][this.playerPosY] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX-1][this.playerPosY] = ["path"];
                this.playerPosX = this.playerPosX-2;    
            }else{
                alert("you can't move that way");
                return false;
            }
        }else if(this.direction == 'right' && this.playerPosX < this.horzEdge-1){
            // console.log("goes right");
            // console.log("xPos = " + this.playerPosX + " yPos = "+ this.playerPosY);
            if(this.maze[this.playerPosX][this.playerPosY+3] == 'exit'){
                this.maze[this.playerPosX][this.playerPosY+1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY+2] = ["walked"];
                this.playerPosX = this.playerPosX+2;
                alert("Maze Clear!!!");
            }else if(this.maze[this.playerPosX+1][this.playerPosY] == 'path'){
                this.maze[this.playerPosX+1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX+2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX+2;
                // console.log(this.maze);
            }else if(this.maze[this.playerPosX+1][this.playerPosY] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX+1][this.playerPosY] = ["path"];
                this.playerPosX = this.playerPosX+2;     
            }else{
                alert("you can't move that way");
                return false;
            }
        }else{
            alert("you can't move that way");
            return false;
        }

    return true;
    }
}

//this is just to see if the HTML is seeing the JS
function trigger(){
    alert('works');

    return true;
}
//randome number gen
function rand(min, max) {
    return min + Math.floor(Math.random() * ((max - min) + 1));
}
function oddRand(min, max) {
    return Math.floor(Math.random() * (((max - min)+1)/2))*2 + min;
}
