var score=0;
var snake_body = [];
var hleft = 0;
var htop = 0;
const snake = {head:"snhead", body:snake_body, head_left: hleft, head_top: htop};
var p_left = 0;
var p_top = 0;
const gamePiece= {piece: "piece", p_l: p_left, p_t: p_top};
var boardSize = 5;
var buff= boardSize+1;
const input = document.getElementById("in");

input.addEventListener('input', updateValue);
function updateValue(e) {
    buff = e.target.value;
}

class Body{
    constructor(id, x, y){
        document.getElementById("snbody").innerHTML+="<img id=\""+id+"\" src=\"assets/seg.png\">";
        this.id=id;
        this.x=x;
        this.y=y;
    }
}

function buttonClick(){
    if(buff!=""){
        console.log(buff);
        var boardSizeTemp = parseInt(buff, 10);
        if(isNaN(boardSizeTemp) || boardSizeTemp < 4 || boardSizeTemp> 9){
            alert("Please enter a valid integer between 4 and 9!");
        }
        else{
            boardSize = boardSizeTemp - 1;
            endGame("reset");
        }
    }
    else{
        endGame();
    }
}

function render(){
    document.getElementById(snake.head).style.position="absolute";
    document.getElementById(gamePiece.piece).style.position="absolute";
    
    pl = (gamePiece.p_l*100);
    document.getElementById(gamePiece.piece).style.left=pl;
    pt = (gamePiece.p_t*100);
    document.getElementById(gamePiece.piece).style.top =pt;
    
    hl = (snake.head_left*100);
    document.getElementById(snake.head).style.left=hl;
    ht = (snake.head_top*100);
    document.getElementById(snake.head).style.top= ht;

    for(let i = 0; i < snake.body.length; i++){
        document.getElementById(snake.body[i].id).style.position="absolute";
        sl = (snake.body[i].x*100)
        document.getElementById(snake.body[i].id).style.left= sl;
        st = (snake.body[i].y*100)
        document.getElementById(snake.body[i].id).style.top= st;
    }
}

function update(){ //From stackoverflow
    document.addEventListener('keydown', keyPress);
    snake.body=snake_body;
    snake.head_left=hleft;
    snake.head_top=htop;
    gamePiece.p_l=p_left;
    gamePiece.p_t=p_top;
    console.log("Snake-head position=("+snake.head_left+", "+snake.head_top+")");
    document.getElementById("score").innerHTML= "Score = " + score;
    render();
}

/*
TODO:
>Fix drifting on zoomed in page
Optional:
>Change graphics
>Toggle borders wrapping or blocking
>Toggle automatic move
*/

function newGame(size = boardSize){
    boardSize = size;
    constructBoard();
    score = -100;
    document.getElementById(snake.head).style.transform="rotate(0deg)";
    snake_body=[];
    document.getElementById("snbody").innerHTML="";
    place(Math.floor(Math.random() * boardSize+1), Math.floor(Math.random() * boardSize+1));
    setTimeout(move_piece(),1);
    update();
}

function constructBoard(){
    document.getElementById("board").innerHTML = "";
    var row = "";
    for(let i=0; i <= boardSize;i++){
        row = "";
        for(let j=0; j<= boardSize; j++){
            row+= "<img src=\"assets/tile.png\">";
        }   
        row+="<br>\n";
        console.log(row);
        document.getElementById("board").innerHTML+=row;
    }
}

function endGame(condition = null){
    if(condition == "win")
        alert("You win!");
    else if(condition == "lose")
        alert("You lose!");
    else if(condition == "reset"){
        console.log("Reset...")
    }
    else
        alert("Ending the game.")
    newGame(boardSize);
}

function place(x_pos, y_pos) { //From stackoverflow
    if(x_pos>boardSize){
        x_pos=0;
    }
    else if(x_pos<0){
        x_pos=boardSize;
    }
    if(y_pos>boardSize){
        y_pos=0;
    }
    else if(y_pos<0){
        y_pos=boardSize;
    }
    hleft=x_pos;
    htop=y_pos;
}

function placeSeg(id,x_pos, y_pos) { //From stackoverflow
    if(x_pos>boardSize){
        x_pos=0;
    }
    else if(x_pos<0){
        x_pos=boardSize;
    }
    if(y_pos>boardSize){
        y_pos=0;
    }
    else if(y_pos<0){
        y_pos=boardSize;
    }
    id.x=x_pos;
    id.y=y_pos;
}

function move_piece(){
    score= score + 100;
    if(score/100==(boardSize+1)**2){
        endGame("win");
    }
    block_l = gamePiece.p_l;
    block_t = gamePiece.p_t;
    var x_pos = block_l;
    var y_pos = block_t;
    var inSnake = false;
    while(((x_pos == block_l || x_pos == (snake.head_left)) && (y_pos == block_t || y_pos == (snake.head_left))) || inSnake){
        inSnake = false;
        x_pos = Math.floor(Math.random() * (boardSize+1));
        y_pos = Math.floor(Math.random() * (boardSize+1));
        for(let i = 0; i < snake_body.length; i++){
            if((x_pos == snake_body[i].x) && (y_pos == snake_body[i].y)){
                inSnake = true;
                break;
            }
        }
    }
    console.log("Point position=("+x_pos+", "+y_pos+")");
    p_left=x_pos;
    p_top=y_pos;
}

function keyPress(e) {//From stackoverflow
    var a=0;
    var b=0;
    var x = e.keyCode;
    head = snake.head;
    body = snake.body;
    var left = snake.head_left;
    var top = snake.head_top;
    var moved = true;
    var scored = false;
    var rotate = 0;
    var collision = false;
      
    switch (x) {
      case 37:
        a=-1;
        rotate = 270;
        if(top==gamePiece.p_t && (left-1==gamePiece.p_l || (left-1<0 && gamePiece.p_l==boardSize))){
                scored = true;
        }
        break;
  
      case 39:
        a=1;
        rotate=90;
        if(top==gamePiece.p_t && (left+1==gamePiece.p_l || (left+1>boardSize && gamePiece.p_l==0))){
            scored = true;
        }
        break;
  
      case 38:
        b=-1;
        if(left==gamePiece.p_l && (top-1==gamePiece.p_t || (top-1<0 && gamePiece.p_t==boardSize))){
            scored = true;
        }
        break;
  
      case 40:
        b=1;
        rotate=180;
        if(left==gamePiece.p_l && (top+1==gamePiece.p_t || (top+1>boardSize && gamePiece.p_t==0))){
            scored = true;
        }
        break;

      default:
        moved = false;
    }
    
    if(moved){
        document.getElementById(head).style.transform = "rotate("+rotate+"deg)";
        place(left+(a),  top+(b));
        //check collision with body on wrap
        if(body.length>=1){
            for(let i=body.length-1; i>0;i--){
                placeSeg(body[i],body[i-1].x, body[i-1].y);
            }
            placeSeg(body[0], left, top);
            for(let i=0; i < body.length; i++){
                if((body[i].x == hleft) && (body[i].y == htop)){
                    collision = true;
                    break;
                }
            }
        }
        if(collision){
            endGame("lose");
            scored = false;
        }
        if(scored){
            if(body.length==0){
                body.push(new Body("seg"+body.length,left,top));
            }
            else{body.push(new Body("seg"+body.length,body[body.length-1].x,body[body.length-1].y));}
            setTimeout(move_piece(),1);
        }
        update();
    }
}
