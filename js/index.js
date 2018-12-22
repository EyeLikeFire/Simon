//----------------------------------------//
//                                        //
//          Welcome! 🙈 🙉 🙊            // 
//                                        //
//----------------------------------------//

var boxOfRandom = [];
var current = 1; //currentNumber
var round = 0; //roundNumber
var limiter = 0; //used to limit callBack looping
var speed = 1000; //This will get decrimented and then reset
var strict = false;
var pressOnce = true; //This will be used to keep the user from starting the game 5 times in one second
var okayToClick = true;
var fauxButton = true;
var gameMessages = document.getElementById("gameMessages");
//var noClickEvent = document.getElementsByTagName("BODY")[0];


var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");// buffers automatically when created (courtesy of stackoverflow)
/*
var greenSound = document.getElementById("audioGreen");
var redSound = document.getElementById("audioRed");
var blueSound = document.getElementById("audioBlue");;
var yellowSound = document.getElementById("audioYellow");
*/
/*
https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, 
https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, 
https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, 
https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.
*/
function startFun(){
  document.getElementById("redButt").classList.add("redOn");
setTimeout(function(){  document.getElementById("redButt").classList.remove("redOn");}, 150);
setTimeout(function(){ pressOnce = true}, 1500); //This alows the game to restart after 3 seconds if the button is pressed again.
    if(pressOnce){
    pressOnce = false;
    reset(); // <-- This starts the game
  }
};
function strictFun(){
  var strictClass = document.getElementById("strictID");
  if(strict){
    strict = false;
    strictClass.classList.remove("yellowOn");
  }else{
    strict = true;
    strictClass.classList.add("yellowOn");
  }
};

function reset(){ //Reset / New Game
  document.getElementById("gameMessages").innerHTML = "";
  gameMessages.classList.add("invisible");
   fauxButton = false;
   boxOfRandom = [];
   current = 1; //currentNumber
   round = 0; //roundNumber
   limiter = 0; //used to limit callBack looping
   speed = 1000; //This will get decrimented and then reset
   okayToClick = true;
   //strict = false;
  //document.getElementById("testingMessages").innerHTML = "-";
  document.getElementById("counter").innerHTML = "00";
  increment();
 // setTimeout(function(){ increment();}, 1000);
   
}

function userInput(input){
if(okayToClick){
  
  if(input == 0){
    greenSound.load();
    greenSound.play();
    document.getElementById(input).classList.add("TLClick");
  }else if(input == 1) {
    redSound.load();
    redSound.play();
    document.getElementById(input).classList.add("TRClick");
  }else if(input == 2) {
    blueSound.load();
    blueSound.play();
    document.getElementById(input).classList.add("BLClick");
  }else if(input == 3) {
    yellowSound.load();
    yellowSound.play();
    document.getElementById(input).classList.add("BRClick");
  } 
  //does it match? //
  //document.getElementById(input).className = "redLight";
  setTimeout(function(){  
      document.getElementById(0).classList.remove("TLClick");
      document.getElementById(1).classList.remove("TRClick");
      document.getElementById(2).classList.remove("BLClick");
      document.getElementById(3).classList.remove("BRClick");
  }, 100);
  
  if(!fauxButton){ //This won't run the below code before the game has started
  if(input !== boxOfRandom[current -1]){
    okayToClick = false;
    //noClickEvents.classList.add("noClick");//#important#
    limiter = 0;
    current = 1; //reset
    if(strict){
      gameMessages.classList.remove("invisible");
      document.getElementById("gameMessages").innerHTML = "G A M E O V E R"; 
      
      setTimeout(function(){ document.getElementById("gameMessages").innerHTML = "N e w G a m e";}, 1000);
      
      setTimeout(function(){reset();}, 3000);
    }else {
      gameMessages.classList.remove("invisible");
      gameMessages.innerHTML = "Retry";
      setTimeout(function(){  
        gameMessages.innerHTML = "";
        gameMessages.classList.add("invisible");
      animateRound();}, 3000);
                     
    }//else
    
  } else if (current === 20) {
    gameMessages.classList.remove("invisible");
    document.getElementById("gameMessages").innerHTML = "Y O U W I N";
    
    setTimeout(function(){ 
    gameMessages.classList.add("invisible"); reset();}, 3000);

  } else {
    if(current === round){
      //call animateNextRound() function
      increment();
    } else { 
      current ++//incriment the current number of moves
    }
  }
  }//fauxButton
}//okay to click
  
};

function increment(){
current = 1; //(Resets current)
if(round !== 20){  boxOfRandom.push(Math.floor(Math.random() * 4));
round++;
                 if(round<10){
document.getElementById("counter").innerHTML = "0" + round;
                 }else{
 document.getElementById("counter").innerHTML = round;                  
                 }
limiter = 0; //Resets limiter so the animation can run. 
speed = 1000; //resets speed
animateRound();
                }
};
function animateRound(){ //This will be split into multiple variables (a,b,c, & d)
  if(limiter < boxOfRandom.length){
    limiter++;
    okayToClick = false;
    //speed -= 25; This is where I could make the program go faster and faster if I wanted it too
    //abcd.innerHTML = "-";
    /*setTimeout(function(){ 
      abcd.innerHTML = "-"; 
      document.getElementById(0).className = "noLight";
      document.getElementById(1).className = "noLight";
      document.getElementById(2).className = "noLight";
      document.getElementById(3).className = "noLight";}, 500);
    */
    setTimeout(function(){ 
      let output = boxOfRandom[limiter -1];
      let blink = document.getElementById(output);
        if(output == 0){
           greenSound.play();
           blink.classList.add("TLClick");
           setTimeout(function(){ 
             blink.classList.remove("TLClick"); }, 300);
         }else if(output == 1) {
           redSound.play();
           blink.classList.add("TRClick");
           setTimeout(function(){ 
             blink.classList.remove("TRClick"); }, 300);
         }else if(output == 2) {
           blueSound.play();
           blink.classList.add("BLClick");
           setTimeout(function(){ 
             blink.classList.remove("BLClick"); }, 300);
         }else if(output == 3) {
           yellowSound.play();
           blink.classList.add("BRClick");
           setTimeout(function(){ 
             blink.classList.remove("BRClick"); }, 300);
    }
      animateRound(); 
    }, speed);
    
        setTimeout(function(){ 
      abcd.innerHTML = "-"; 
      document.getElementById(0).classList.remove("TLClick");
      document.getElementById(1).classList.remove("TRClick");
      document.getElementById(2).classList.remove("BRClick");
      document.getElementById(3).classList.remove("BLClick");}
                   ,speed + 500);
    

  } else { okayToClick = true;}
  //This is a function that creates an animation buy running a timer, then it uses a call back to re-run the timer for each incrimentation. I can also increase the speed with each incrimentation with a variable.
 document.getElementById("animateRefrence").innerHTML = boxOfRandom;
};


//increment(); //starts automatically - will be replaced by a new game / reset button that calls the function.