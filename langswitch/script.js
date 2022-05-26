var numr=0;
var lol = "a";
document.getElementById("button").addEventListener("click", onClick);
function onClick(){
    numr=numr+1;
    lol = lol+"a";
    if(numr%4==0){
        changer("Hello!", "Welcome to my webpage! Look around!");
    }
    else if(numr%4==1){
        changer("Dobar dan!", "Dobrodosli na moju web stranica! Razgledati!");
    }
    else if(numr%4==2){
        changer("Guten tag!", "Wilkommen auf meiner Webpage! Umschauen!");
    }
    else{
        changer("Buongiorno", "Bienvenuto alla mia pagina web! Guardati intorno!");
        setTimeout(function(){functionAlert();},1);
    }
    if(numr==20){
        setTimeout(function(){alert('wtf stop');},1);
        console.log("lag");
    }
    console.log(lol);
};
function changer(m1, m2){
    document.getElementById("h1").innerHTML = m1;
    document.getElementById("p").innerHTML = m2;
};
function functionAlert(msg, myYes) { //From stackoverflow
    document.getElementById("button").disabled = true;
    document.getElementById("a").disabled = true;
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
       confirmBox.hide();
       document.getElementById("button").disabled = false;
       document.getElementById("a").disabled = false;
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}

function place(id,x_pos, y_pos) { //From stackoverflow
    var element = document.getElementById(id);
    element.style.position = "absolute";
    element.style.left = x_pos+'px';
    element.style.top = y_pos+'px';
}  
function update(){ //From stackoverflow
    document.addEventListener('keydown', keyPress);
}   
function keyPress(e) {//From stackoverflow
    var x = e.keyCode;
    objct = "move";
    var move = document.getElementById(objct).getBoundingClientRect();
   
    var left = parseInt(move.left,10);
    var top = parseInt(move.top,10)
      
    switch (x) {
      case 37:
        place(objct, left-20,  top);
        if(window.event.shiftKey){
            place(objct, left-100,  top);
        }
        break;
  
      case 39:
        place(objct, left+20,  top);
        if(window.event.shiftKey){
            place(objct, left+100,  top);
        }
        break;
  
      case 38:
        place(objct, left,  top-20);
        if(window.event.shiftKey){
            place(objct, left,  top-100);
        }
        break;
  
      case 40:
        place(objct, left,  top+20);
        if(window.event.shiftKey){
            place(objct, left,  top+100);
        }
        break;
    }
}
update();
var cnt = 0;
function inverterKeyPress(event){
    if(event.keyCode == 49){
        cnt = cnt+1;
    }
    if(cnt%2==1){
        document.getElementById("move").style.filter = "invert(1)";
    }
    else{
        document.getElementById("move").style.filter = "invert(0)";
    }
}