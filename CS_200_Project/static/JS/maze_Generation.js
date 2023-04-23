/* The maze_Algorithm class generates a maze by randomly moving through the cells of a 2D array and
marking the cells as a path, while also checking for and marking exits at the edge of the maze. */
class maze_Algorithm {

    /**
     * This constructor modifies a maze by randomly moving through the cells of a 2D array and marking
     * the cells as a path, while also checking for and marking exits at the edge of the maze.
     * @param arrayConstruct - A 2D array representing the initial state of the maze.
     * @param numRows - The number of rows in the maze grid.
     * @param numCels - The number of cells (columns) in the maze.
     * @param entranceY - The y-coordinate of the entrance to the maze.
     * @returns a boolean value of true.
     */
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

        /* The below code is a while loop that generates a maze by randomly moving through the cells of a 2D
        array. It checks if movement is possible in any of the four directions (left, right, up, down) and
        if so, randomly chooses a direction and moves two cells in that direction, marking the cells as a
        path. If movement is not possible, it backtracks to the previous cell and tries a different
        direction until it finds a new path or exhausts all possibilities. The code also checks if the
        current cell is at the edge of the maze and if so, marks it as an exit.*/
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
    /**
     * The function checks if the player can move left by checking if there is a wall to the left.
     * @param xRow - The row index of the current position of the object on the game board.
     * @param yCell - The y-coordinate of the cell in the grid.
     * @returns The function `canMoveLeft` returns a boolean value (`true` or `false`) depending on whether
     * there is a wall to the left of the current position. If there is a wall, it returns `true`,
     * indicating that the player cannot move left. If there is no wall, it returns `false`, indicating
     * that the player can move left.
     */
    canMoveLeft(xRow,yCell){
        if(xRow > 1 && this.modArr[xRow-2][yCell] == 'wall'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * This function checks if the player can move right in a game grid by checking if there is a wall
     * to the right.
     * @param xRow - The row index of the current position in the grid.
     * @param yCell - The y-coordinate of the cell in the grid.
     * @returns a boolean value, either true or false, depending on whether the player can move right
     * or not.
     */
    canMoveRight(xRow,yCell){
        if(xRow < this.horzEdge-1 && this.modArr[xRow+2][yCell] == 'wall'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * This function checks if a player can move up in a game grid by checking if there is a wall two cells
     * above their current position.
     * @param xRow - The row number of the current position of the player on the game board.
     * @param yCell - The y-coordinate of the current cell in the grid.
     * @returns a boolean value (true or false) depending on whether the cell above the current cell
     * (specified by the xRow and yCell parameters) is a wall or not. If the cell above is a wall, the
     * function returns true, indicating that the player can move up. Otherwise, it returns false,
     * indicating that the player cannot move up.
     */
    canMoveUp(xRow,yCell){
        if(yCell > 1 && this.modArr[xRow][yCell-2] == 'wall'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * This function checks if a cell can move down by checking if there is a wall below it.
     * @param xRow - The row index of the current cell in the grid.
     * @param yCell - The current cell's vertical position in the grid.
     * @returns a boolean value (true or false) depending on whether the cell below the current cell
     * (specified by the xRow and yCell parameters) is a wall or not. If it is a wall, the function
     * returns true, indicating that the player cannot move down from the current cell. If it is not a
     * wall, the function returns false, indicating that the player can move down
     */
    canMoveDown(xRow,yCell){
        if(yCell < this.vertEdge-1 && this.modArr[xRow][yCell+2] == 'wall'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * The function checks if an object can move in any direction and returns true if it can, false
     * otherwise.
     * @param x - The x-coordinate of the current position of the object that is being checked for
     * movement.
     * @param y - The y parameter represents the vertical position of an object on a grid or coordinate
     * system. It is used in the canMove function to determine if the object can move up or down.
     * @returns The function `canMove(x,y)` returns a boolean value (`true` or `false`) indicating
     * whether or not the object can move in any direction from its current position (`x`, `y`).
     */
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

    /**
     * The function checks if the maze can be exited based on the current position and the maze
     * dimensions.
     * @param x - The width of the maze (in number of cells)
     * @param y - The "y" parameter in the function "canExit(x, y)" represents the height or number of
     * rows in the maze grid.
     * @returns The function canExit(x, y) returns a boolean value. It returns true if the maze has
     * been generated to a certain point and an exit has been set, and false if the exit has already
     * been set.
     */
    canExit(x, y){
        if(!(this.endSet)){
            this.xMax = (x - 1)/2;
            this.yMax = (y - 1)/2;

            this.ratio = 0.4;
            this.dimensionAverage = (this.xMax + this.yMax)/2;

            /*the generated maze tends to have a duration slightly above or at 
            the set ratio or it imeadiatly loops in on itself at the higher dimensions.*/
            if(this.dimensionAverage == 500){
                this.ratio = 0.0001;
            }else if(this.dimensionAverage >= 400){
                this.ratio = 0.05;
            }else if(this.dimensionAverage >= 300){
                this.ratio = 0.1;
            }else if(this.dimensionAverage >= 200){
                this.ratio = 0.15;
            }else if(this.dimensionAverage >= 100){
                this.ratio = 0.3;
            }else{
                this.ratio = 0.4;
            }
            
            if(((this.movesArray.length) - ((this.xMax * this.yMax)*this.ratio)) > 0 
                && this.dimensionAverage <= 500){
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
            /**allows maze to exit provided that it has progressed the average of it
             * width and height. This minimum is to ensure that the maze has a minimum
             * travel duration based on its dimensions. AKA the maze dosent instantly end.
             */
            }else if((this.movesArray.length > this.dimensionAverage) 
                        && this.dimensionAverage > 500){
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
            }
        }else{
            return false;
        }
    }

    /**
     * The function returns the value of the "extXPos" property.
     * @returns the value of the property `extXPos`.
     */
    getExtXPosA(){
        return this.extXPos;
    }

    /**
     * The function returns the value of the "extYPos" property.
     * @returns the value of the property `extYPos`.
     */
    getExtYPosA(){
        return this.extYPos;
    }
}

/* The maze_Generation class generates and displays a maze using a specified algorithm and allows for
player movement within the maze. */
class maze_Generation{

    /**
     * This function initializes a maze with walls everywhere except for the entrance position, and
     * applies an algorithm to break up the maze.
     * @param width - The width of the maze, measured in number of cells.
     * @param height - The height parameter is used to determine the number of rows in the maze grid.
     * It is multiplied by 2 and added by 1 to calculate the total number of rows needed.
     * @returns A boolean value of true is being returned.
     */
    constructor(width, height) {
        console.log("maze runs");

        this.width = width;
        this.height = height;

    /* The below code is setting the number of columns and rows for a grid. The number of columns is
    calculated by multiplying the width by 2 and adding 1, while the number of rows is calculated by
    multiplying the height by 2 and adding 1. */
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

        //calculated the size of cell needed to fit the user's screen
        this.cellSize = 15;
        if((screen.width-100)/(this.width*2+1) < this.cellSize){
            this.cellSize = (screen.width-100)/(this.width*2+1);
        }
        
        //for each loops based on w3 schools example
        //source: https://www.w3schools.com/jsref/jsref_foreach.asp
        /* The below code is iterating through a 2D array called "maze" using nested forEach loops. For each
        cell in the array, it checks if the row index is 0 and the column index is equal to the value of
        "entPos". If this condition is true, it sets the value of that cell to an array containing the
        string "entrance". Otherwise, it sets the value of that cell to an array containing the string
        "wall". Essentially, it is initializing the maze with walls everywhere except for the entrance
        position. */
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
    /**
     * The below function creates a matrix with a specified number of rows and columns, filled with a specified
     * value.
     * @param value - The value parameter is the value that will be used to fill each element of the
     * matrix.
     * @returns A matrix (2D array) with dimensions specified by `this.rows` and `this.cols`, where each
     * element has the value specified by the `value` parameter.
     */
    makeMatrix(value) {
        return new Array(this.rows).fill().map(() => new Array(this.cols).fill(value));
    }

    /**
     * The function initializes a 2D array with a given value for all its elements.
     * @param value - The value parameter is the initial value that will be assigned to each element in the
     * 2D array that is being created.
     * @returns A 2D array with dimensions of `height` and `width`, where each element is initialized to
     * the `value` parameter passed to the function.
     */
    initalizeVisited(value) {
        return new Array(this.height).fill().map(() => new Array(this.width).fill(value));
    }

    /**
     * This function generates and displays a maze in a specified HTML element.
     * @param id - The id of the HTML element where the maze will be displayed.
     * @returns a boolean value - true or false. It returns true if the div with the given id is found
     * and the maze is successfully displayed, and false if the div is not found or has been deleted.
     */
    displayMaze(id) {
        console.log(this.cellSize);

        this.bankDiv = document.getElementById(id);

        if(!this.bankDiv) {
            console.log("name dosen't match or you deleted the div");
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
                    cellDiv.style.width=this.cellSize+"px";
                    cellDiv.style.height=this.cellSize+"px";
                }
                rowDiv.appendChild(cellDiv);
            });

            container.appendChild(rowDiv);
        });

        this.bankDiv.appendChild(container);

        console.log("display runs");
        return true;
    }


    /**
     * The function initializes the player's position in a maze game and adjusts their x position if it
     * is at 0.
     * @returns a boolean value of `true`.
     */
    initalizePlayer(){
        if(this.playerPosX == 0){
            console.log("x position adjusted")
            this.playerPosX = this.playerPosX+1;
            this.maze[this.playerPosX][this.playerPosY] = ["walked"];
        }
        return true;
    }

    /* The below code is a method called "movePlayer" in JavaScript. It takes a parameter called
    "direction" which specifies the direction in which the player should move. The method checks if
    the player is in exit range and based on the positions that the player will move to, the
    markings will change and the player's current position will be modified, all according to the
    directional input. If the player cannot move in the specified direction, the method returns
    false. */
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
            return false;
        }

    return true;
    }

    /**
     * The function returns the value of the "cleared" property.
     * @returns The `getCleared()` method is returning the value of the `cleared` property.
     */
    getCleared(){
        return this.cleared;
    }

    /**
     * The function "getStartPos" returns the position of an entity.
     * @returns The function `getStartPos()` is returning the value of `this.entPos`.
     */
    getStartPos(){
        return this.entPos;
    }

    /**
     * The function returns the external x position of a reference object.
     * @returns The method `getExtXPos()` is returning the value returned by the method `getExtXPosA()` of
     * the object `this.reference`.
     */
    getExtXPos(){
        return this.reference.getExtXPosA();
    }

    /**
     * The function returns the external Y position of a reference object.
     * @returns The function `getExtYPos()` is returning the value of `this.reference.getExtYPosA()`. The
     * exact value being returned depends on the implementation of `getExtYPosA()` in the `reference`
     * object.
     */
    getExtYPos(){
        return this.reference.getExtYPosA();
    }
}

/**random number gen (inspired by w3schools example)
*source: https://www.w3schools.com/js/js_random.asp
*/
function rand(min, max) {
    return min + Math.floor(Math.random() * ((max - min) + 1));
}
/**
 * The function generates a random odd number between a given minimum and maximum value, assuming min is 0.
 * @param min - The minimum value of the range from which the random odd number should be generated.
 * @param max - The "max" parameter in the "oddRand" function represents the maximum value of the range
 * from which the function will generate a random odd number.
 * @returns a random odd integer between the minimum and maximum values (inclusive) provided as
 * arguments.
 */
function oddRand(min, max) {
    return Math.floor(Math.random() * (((max - min)+1)/2))*2 + min;
}
