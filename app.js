//1st Step --- Press the button to Start the GAME

let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","green","blue"]; // Accessing the button for pressing it 

let started = false; // Means Over game not be started 
let level = 0; // for mapping the level not started == 0

let h2 = document.querySelector('h2');

// Detect the Pressing of key

document.addEventListener("keypress", function(){
    if(started == false){ // start game when it's not started 
    started = true; // Game was started can't stop untill Game Over
    }
    levelUp();
});


// Flashing button and Updating the level and also storing the value in H2 


// Flashing buttons for miliseconds
function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function() { // Using this remove the flashing in every 250 ms 
        btn.classList.remove("flash")
    },250); 
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function() { // Using this remove the flashing in every 250 ms 
        btn.classList.remove("userflash")
    },250); 
}


function levelUp(){
    userSeq = []; // For reset after Level upgrade 
    level++;
    h2.innerText = `Level ${level}`;

    // Choosing random btn for pressing
    let randomIdx = Math.floor(Math.random()* 4);  // Choosing random Number from 0-3
    let randomColor = btns[randomIdx];    // Using this Random number we choose a color from the Array of Btns
    let randomBtn = document.querySelector(`.${randomColor}`);  // And then Using choosing color create a class
    
    // console.log(randomIdx); console.log(randomColor); console.log(randomBtn);

    // Storing the randomColor  
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn); // With the help of class we Flashing the buttons 
}

//Checking the Level after user pressing the color
function checkAns(idx){
    // console.log("Current level ", level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
           setTimeout(levelUp(), 1000);
        }
    }else{
        h2.innerHTML = `Game Over..! <b>Your Score was ${level}</b><br> Press any key to start the game `;
        document.querySelector('body').style.backgroundColor = 'red'; // When you're guess was wrong the whole body become RED

        setTimeout(function(){ // After few minute they automatically come to their original color = white 
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150)
        reset(); // To reset after Game over
    }


}
// Adding Event Listener -- for checking the user pressed btn == games flashing btn 
function btnPress() {
    let btn = this;
    userFlash(btn);

    // Storing Usercolor that they press
    userColor = btn.getAttribute("id");
    // Pushing userColor into the userSeq
    userSeq.push(userColor); 

    checkAns(userSeq.length-1);
}


// Accessing all buttons
let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// Reset function ---> Use to reset the game after game was over 

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0 ; 
}