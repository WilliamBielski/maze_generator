export class maze_Algorithm {

    constructor(arrayConstruct, height, width, entranceR) {

        this.modArr = arrayConstruct;

        this.modArr[entranceR][1] = ["path"];
        this.currR = entranceR;
        this.currC = 1;

        this.canMove = true;

        movesArray = [0];

        while(this.canMove){
            moveIndex = movesArray.length()-1

            if((this.modArr[this.currR-2][this.currC] != ["wall"] && 
                this.modArr[this.currR+2][this.currC] != ["wall"] && 
                this.modArr[this.currR][this.currC-2] != ["wall"] && 
                this.modArr[this.currR][this.currC+2] != ["wall"]))
            {
                if(movesArray[movInd] == 1){
                    this.currR = this.currR+2
                    this.movesArray.pop()
                    
                }else if(movesArray[movInd] == 2){
                    this.currR = this.currR-2
                    this.movesArray.pop()

                }else if(movesArray[movInd] == 3){
                    this.currR = this.currC+2
                    this.movesArray.pop()
                    
                }else if(movesArray[movInd] == 4){
                    this.currR = this.currC-2
                    this.movesArray.pop()
                }else{
                    this.canMove = false;
                }

            }else{
                switch(getDirection()){
                    //1 is UP
                    case 1:
                        if(this.currR > 1 && this.modArr[this.currR-2][this.currC] != ["path"]){
                            this.modArr[this.currR-1][this.currC] = ["path"];
                            this.modArr[this.currR-2][this.currC] = ["path"];
                            this.currR = this.currR-2;
                            this.movesArray.push(1);
                        }
    
                    //2 is DOWN
                    case 2:
                        if(this.currR < height-1 && this.modArr[this.currR+2][this.currC] != ["path"]){
                            this.modArr[this.currR+1][this.currC] = ["path"];
                            this.modArr[this.currR+2][this.currC] = ["path"];
                            this.currR = this.currR+2; 
                            this.movesArray.push(2);
                        }
    
                    //3 is LEFT
                    case 3:
                        if(this.currC > 1 && this.modArr[this.currR][this.currC-2] != ["path"]){
                            this.modArr[this.currR][this.currC-1] = ["path"];
                            this.modArr[this.currR][this.currC-2] = ["path"];
                            this.currR = this.currC-2; 
                            this.movesArray.push(3);
                        }
    
                    //4 is Right
                    case 4:
                        if(this.currC < width-1 && this.modArr[this.currR][this.currC+2] != ["path"]){
                            this.modArr[this.currR][this.currC+1] = ["path"];
                            this.modArr[this.currR][this.currC+2] = ["path"];
                            this.currR = this.currR+2; 
                            this.movesArray.push(4);
                        }
        
                }
            }

        }

        return this.modArr;
    }

    getDirection(){
        return this.rand(1,4);
    }

    rand(min, max) {
        return min + Math.floor(Math.random() * ((max - min) + 1));
    }
}