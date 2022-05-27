var number = 0;
var count_title = "Press the button!";
function onLoad(){
	document.getElementById("Press").innerHTML=count_title;
}
function onClick(){
	number = number+1;
	if(number>=15 && number < 150){
		var img = document.getElementById("image");
		img.src="https://i.imgur.com/Blr0dbT.png";
	}
    if(number>= 150){
		var img = document.getElementById("image");
		img.src="https://i.imgur.com/8Sidkk3.png";
        count_title = "Sorry for the delay, here's your hat!";
	    document.getElementById("Press").innerHTML=count_title;
		document.getElementById("hatgive").innerHTML="Enjoy your hat!";
        document.getElementById("hatgive").disabled = true;
	}
	return false;
}
