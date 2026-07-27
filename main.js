const hamBtn=document.querySelector("#hamIcon");
const menuItemsList=document.querySelector("nav");
hamBtn.addEventListener("click",toggleMenus);
function toggleMenus(){ /*open and close menu*/
//if menuItemsList dont have the class "menuShow", add it, else remove it
menuItemsList.classList.toggle("menuShow");
//if menu is showing (has the class “menuShow”)
if(menuItemsList.classList.contains("menuShow")){
hamBtn.innerHTML="☰"; //change button text to chose menu
}else{ //if menu NOT showing
hamBtn.innerHTML="☰"; //change button text open menu
}
}

// switch pages
//target all elements to save to constants
const mainMenu = document.querySelector("#mainMenu");
const homeBtn = document.querySelector("#topHead")
const page1btn=document.querySelector("#TOKBtn");
const page2btn=document.querySelector("#BPSBtn");
const page3btn=document.querySelector("#RescueBtn");
const page4btn=document.querySelector("#quizgamebtn");
const page1=document.querySelector("#TOK");
const page2=document.querySelector("#BPS");
const page3=document.querySelector("#Rescue");
const page4=document.querySelector("#quizgame");
function hideall(){ //function to hide all pages
mainMenu.style.display = "none";
page1.style.display="none";
page2.style.display="none";
page3.style.display="none"; 
page4.style.display="none";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () { 
hideall(); //we don't know which page is shown, so hideall
page1.style.display="flex";
});
page2btn.addEventListener("click", function () { 
hideall(); //we don't know which page is shown, so hideall
page2.style.display="flex";
});
page3btn.addEventListener("click", function () {
hideall(); //we don't know which page is shown, so hideall
page3.style.display="flex";
});
page4btn.addEventListener("click", function () {
hideall(); //we don't know which page is shown, so hideall
page4.style.display="flex";
});
homeBtn.addEventListener("click", function () {
    hideall();
    mainMenu.style.display = "flex";
});

hideall();
mainMenu.style.display = "flex";

//quiz------------------------------------------------------------------

const btnSubmit=document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
var q1,q2,q3,q4,score=0;
function CheckAns(){
score=0; //reset score to 0, check ans and give score if correct
//read the value of the selected radio button for q1
q1=document.querySelector("input[name='q1']:checked").value;
console.log(q1); //check q1 value retrieved
if(q1=="control")score++;
//read the value of the selected radio button for q2
q2=document.querySelector("input[name='q2']:checked").value;
console.log(q2); //check q2 value retrieved
if(q2=="sweep")score++;
//read the value of the selected radio button for q3
q3=document.querySelector("input[name='q3']:checked").value;
console.log(q3); //check q1 value retrieved
if(q3=="2")score++;
scorebox.innerHTML="Score:"+score;
//read the value of the selected radio button for q3
q4=document.querySelector("input[name='q4']:checked").value;
console.log(q4); //check q1 value retrieved
if(q4=="q44")score++;
scorebox.innerHTML="Score:"+score;
}

// game -------------------------------------------------------------------------------
	
const player = document.getElementById("player");
const enemykayak = document.getElementById("enemykayak");
const gamebox = document.getElementById("gamebox");

const startBtn = document.getElementById("startBtn");
const paddleBtn = document.getElementById("goBtn");
const resetBtn = document.getElementById("resetBtn");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

const result = document.getElementById("result");

const winSound = new Audio("audio/win.mp3");
const loseSound = new Audio("audio/lose.mp3");
const tiredSound = new Audio("audio/tired.mp3");

var playerPos = 0
var enemyPos = 0;
var enemyMovement;
var enemySpeed = 5;
var paddleCount = 0;
var paddleLimit = 15;

var gameStarted = false;
var gameReset = true;
var tired = false;


easyBtn.addEventListener("click", function() {
	if (!gameStarted && gameReset) {
		enemykayak.src = "images/gameeasykayak.png";
		enemySpeed = 5;
		paddleLimit = 15;
    }
});

hardBtn.addEventListener("click", function() {
	if (!gameStarted && gameReset) {
		enemykayak.src = "images/gamehardkayak.png";
		enemySpeed = 9;
		paddleLimit = 30;
	}
});

startBtn.addEventListener("click", function() {
	if (!gameStarted && gameReset) {
		gameStarted = true;
		gameReset = false;
		enemyMovement = setInterval(moveEnemy, 100);
	}
});

paddleBtn.addEventListener("click", function() {
	if (gameStarted && !tired)
	{
		move();
		
		paddleCount++
		
		if (paddleCount >= paddleLimit)
		{
			tired = true;
			paddleBtn.innerHTML = "TIRED!";
			paddleBtn.disabled = true;
			
			tiredSound.play();
			
			setTimeout(function()
			{
				paddleCount = 0;
				tired = false;
				paddleBtn.disabled = false;
				paddleBtn.innerHTML = "PADDLE";
			}, 1500);
		}
	}
});



resetBtn.addEventListener("click", function() {

    clearInterval(enemyMovement);

    playerPos = 0;
    enemyPos = 0;
	paddleCount = 0;

    player.style.left = "0px";
    enemykayak.style.left = "0px";
	result.innerHTML = "Reach the other side of the river before the other kayak! (you're the bottom one)";

	tired = false;
	paddleBtn.disabled = false;
    gameStarted = false;
	gameReset = true;
});

function moveEnemy()
{
    enemyPos += enemySpeed;
    enemykayak.style.left = enemyPos + "px";

    if (enemyPos >= gamebox.clientWidth - enemykayak.clientWidth) {

        clearInterval(enemyMovement);
		gameStarted = false;
        result.innerHTML = "You lose!";
		loseSound.play();
    }

}

function move()
{
	playerPos += 15;
	player.style.left = playerPos + "px";

    if (playerPos >= gamebox.clientWidth - player.clientWidth) {

        clearInterval(enemyMovement);
		gameStarted = false;
        result.innerHTML = "You win!";
		winSound.play();
    }
}

