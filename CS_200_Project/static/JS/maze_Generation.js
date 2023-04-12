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

        this.extXPos = 0;
        this.extYPos = 0;

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
                if(this.currR == 1 || this.currR == this.horzEdge-1){
                    this.canExit(numRows, numCels);
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
        return true;
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

    canExit(x, y){
        if(!(this.endSet)){
            this.xMax = (x - 1)/2;
            this.yMax = (y - 1)/2;

            this.ratio = 0.4;
            if((this.xMax + this.yMax)/2 >= 500){
                this.ratio = 0.0001;
            }else if((this.xMax + this.yMax)/2 >= 400){
                this.ratio = 0.05;
            }else if((this.xMax + this.yMax)/2 >= 300){
                this.ratio = 0.1;
            }else if((this.xMax + this.yMax)/2 >= 200){
                this.ratio = 0.15;
            }else if((this.xMax + this.yMax)/2 >= 100){
                this.ratio = 0.3;
            }else{
                this.ratio = 0.4;
            }
            
            if(((this.movesArray.length) - ((this.xMax * this.yMax)*this.ratio)) > 0){
                if(this.currR == this.horzEdge-1){
                    this.modArr[this.currR+1][this.currC] = ["exit"];
                    this.endSet = true;
                    console.log("exited x: "+this.currR+" y: "+this.currR+" %: "
                                + this.movesArray.length/(this.xMax * this.yMax));

                    this.extXPos = this.currR+1;
                    this.extYPos = this.currC;


                }else if(this.currR == 1){
                    this.modArr[this.currR-1][this.currC] = ["exit"];
                    this.endSet = true;
                    console.log("exited x: "+this.currR+" y: "+this.currR+" %: "
                                + this.movesArray.length/(this.xMax * this.yMax));

                    this.extXPos = this.currR-1;
                    this.extYPos = this.currC;

                }
                return true;
            }
        }else{
            return false;
        }
    }

    getExtXPosA(){
        return this.extXPos;
    }

    getExtYPosA(){
        return this.extYPos;
    }
}

class maze_Generation{

    constructor(width, height) {
        console.log("maze runs");

        this.width = width;
        this.height = height;

        //I will need roughly double the space here
        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;

        //initalize maze matrix
        this.maze = this.makeMatrix([]);

        //genertes the entry position based on a random odd number
        this.entPos = oddRand(1,this.cols-1);
        this.exitX = 0;

        //variables keep track of x & y positions in the maze
        this.playerPosX = 0;
        this.playerPosY = this.entPos;

        //boolean to reference to ensure maze has yet to be cleared
        this.cleared = false;

        //for each loops based on w3 schools example
        //source: https://www.w3schools.com/jsref/jsref_foreach.asp
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
        this.reference = new maze_Algorithm(this.maze, this.rows, this.cols, this.entPos);
        this.maze = this.reference.modArr;
        console.log("maze complete");
        console.log(this.maze);
        return true;
    }

    //standard 2d array from W3 docs
    //sources: https://www.w3docs.com/snippets/javascript/how-to-create-a-two-dimensional-array-in-javascript.html
    makeMatrix(value) {
        return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }

    initalizeVisited(value) {
        return new Array(this.height).fill().map(() => new Array(this.width).fill(value));
    }

    displayMaze(name) {
        //didn't think I would actually use parent child hookups from CS 120 like this but here we are.
        this.bankDiv = document.getElementById(name);

        if(!this.bankDiv) {
            document.write("name dosen't or you deleted the div");
            return false;
        }

        while(this.bankDiv.firstChild) {
            this.bankDiv.removeChild(this.bankDiv.firstChild);
        }

        const container = document.createElement("div");

        container.id = "generatedMaze";

        //for each loop based on w3 schools example
        //source: https://www.w3schools.com/jsref/jsref_foreach.asp
        this.maze.forEach((row) => {
            let rowDiv = document.createElement("div");

            row.forEach((cell) => {
                let cellDiv = document.createElement("div");

                if(cell) {
                    //class assignment base on answer on stack overflow
                    //source: https://stackoverflow.com/questions/1115310/how-can-i-add-a-class-to-a-dom-element-in-javascript
                    cellDiv.className = "mazeCell " + cell.toString();
                    cellDiv.name = "mazeCell";
                }
                rowDiv.appendChild(cellDiv);
            });

            container.appendChild(rowDiv);
        });

        this.bankDiv.appendChild(container);

        console.log("display runs");
        return true;
    }

    //moves player one to the right if needed
    initalizePlayer(){
        if(this.playerPosX == 0){
            console.log("x position adjusted")
            this.playerPosX = this.playerPosX+1;
            this.maze[this.playerPosX][this.playerPosY] = ["walked"];
        }
        return true;
    }

    movePlayer(direction) {

        this.vertEdge = this.cols-1;
        this.horzEdge = this.rows-1;

        // console.log("xPos = "+this.playerPosX+" yPos = "+this.playerPosY);
        this.direction = direction;

        /*
        checks if the player is in exit range, then based on the what the
        positions that the player will move to are marked as, the markings will
        change and the player current position will be modified, all acording to
        the directional input
        */
        if(this.direction == 'up' && this.playerPosY > 1){
            if(this.maze[this.playerPosX][this.playerPosY-1] == 'path' 
                && (this.maze[this.playerPosX+1][this.playerPosY-2] == 'exit' 
                || this.maze[this.playerPosX-1][this.playerPosY-2] == 'exit')){
                this.maze[this.playerPosX][this.playerPosY-1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY-2] = ["walked"];
                this.playerPosY = this.playerPosY-2;
                this.cleared = true;

            }else if(this.maze[this.playerPosX][this.playerPosY-1] == 'path'){
                this.maze[this.playerPosX][this.playerPosY-1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY-2] = ["walked"];
                this.playerPosY = this.playerPosY-2;

            }else if(this.maze[this.playerPosX][this.playerPosY-1] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX][this.playerPosY-1] = ["path"];
                this.playerPosY = this.playerPosY-2;

            }else{
                //alert("You can't move that direction (Click Enter)");
                return false;
            }
        }else if(this.direction == 'down' && this.playerPosY < this.vertEdge-1){
            if(this.maze[this.playerPosX][this.playerPosY+1] == 'path' 
                && (this.maze[this.playerPosX+1][this.playerPosY+2] == 'exit' 
                || this.maze[this.playerPosX-1][this.playerPosY+2] == 'exit')){
                this.maze[this.playerPosX][this.playerPosY+1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY+2] = ["walked"];
                this.playerPosY = this.playerPosY+2;
                this.cleared = true;

            }else if(this.maze[this.playerPosX][this.playerPosY+1] == 'path'){
                this.maze[this.playerPosX][this.playerPosY+1] = ["walked"];
                this.maze[this.playerPosX][this.playerPosY+2] = ["walked"];
                this.playerPosY = this.playerPosY+2;

            }else if(this.maze[this.playerPosX][this.playerPosY+1] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX][this.playerPosY+1] = ["path"];
                this.playerPosY = this.playerPosY+2;    

            }else{
                //alert("You can't move that direction (Click Enter)");
                return false;
            }
        }else if(this.direction == 'left' && this.playerPosX > 1){
            if(this.maze[this.playerPosX-1][this.playerPosY] == 'path' 
                && this.maze[this.playerPosX-3][this.playerPosY] == 'exit'){
                this.maze[this.playerPosX-1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX-2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX-2;
                this.cleared = true;

            }else if(this.maze[this.playerPosX-1][this.playerPosY] == 'path'){
                this.maze[this.playerPosX-1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX-2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX-2;

            }else if(this.maze[this.playerPosX-1][this.playerPosY] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX-1][this.playerPosY] = ["path"];
                this.playerPosX = this.playerPosX-2;    
            }else{
                //alert("You can't move that direction (Click Enter)");
                return false;
            }
        }else if(this.direction == 'right' && this.playerPosX < this.horzEdge-1){
            if(this.maze[this.playerPosX+1][this.playerPosY] == 'path' 
                && this.maze[this.playerPosX+3][this.playerPosY] == 'exit'){
                this.maze[this.playerPosX+1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX+2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX+2;
                this.cleared = true;

            }else if(this.maze[this.playerPosX+1][this.playerPosY] == 'path'){
                this.maze[this.playerPosX+1][this.playerPosY] = ["walked"];
                this.maze[this.playerPosX+2][this.playerPosY] = ["walked"];
                this.playerPosX = this.playerPosX+2;

            }else if(this.maze[this.playerPosX+1][this.playerPosY] == 'walked'){
                this.maze[this.playerPosX][this.playerPosY] = ["path"];
                this.maze[this.playerPosX+1][this.playerPosY] = ["path"];
                this.playerPosX = this.playerPosX+2;    
                
            }else{
                return false;
            }
        }else{
            //alert("You can't move that direction (Click Enter)");
            return false;
        }

    return true;
    }

    //getter for cleared boolean
    getCleared(){
        return this.cleared;
    }

    //getter for starting position
    getStartPos(){
        return this.entPos;
    }

    getExtXPos(){
        return this.reference.getExtXPosA();
    }

    getExtYPos(){
        return this.reference.getExtYPosA();
    }
}

//this is just to see if the HTML is seeing the JS
function trigger(){
    alert('works');

    return true;
}
//random number gen (inspired by w3schools example)
//source: https://www.w3schools.com/js/js_random.asp
function rand(min, max) {
    return min + Math.floor(Math.random() * ((max - min) + 1));
}
function oddRand(min, max) {
    return Math.floor(Math.random() * (((max - min)+1)/2))*2 + min;
}
