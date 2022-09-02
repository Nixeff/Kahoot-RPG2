var x = 0;
var mouse_x = 0;
var mouse_y = 0;
var mouse_pressed = false;

var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

var q = 0;

let questions = [];
let anwsers = [];

var img = new Image();
img.src = "png/Enemy.png";

fetch('getQue.php').then(function(response) {
    return response.json();
})
.then(function(data){
    console.log(data);
    questions = data;
    for (let i = 0; i < questions.length; i++){
        console.log(questions);
    }
});

fetch('getAnw.php').then(function(response) {
    return response.json();
})
.then(function(data){
    anwsers = data;
    for (let i = 0; i < anwsers.length; i++){
        console.log(anwsers);
    }
});



let questions_old = [
{
    "Quest": "What color is the sky",
    "an1": "Blue",
    "an2": "Green",
    "an3": "Yellow",
    "an4": "Red",
    "correct": "an3"
},
{
    "Quest": "What is Love?",
    "an1": "bby Don't Hurt Me",
    "an2": "42",
    "an3": "Ur Mom",
    "an4": "Me",
    "correct": "an2"
},
{
    "Quest": "Knock Knock",
    "an1": "Who's there?",
    "an2": "Ur Mom",
    "an3": "Ur Mom who?",
    "an4": "Joke",
    "correct": "an1"
},
{
    "Quest": "Execute order...",
    "an1": "66",
    "an2": "77",
    "an3": "96",
    "an4": "55",
    "correct": "an1"
}
]

let BattleEnemy = class {
    constructor(img, hp, questDif){
        this.img = img;
        this.hp = hp;
        this.questDif = questDif;
    }

    draw(){
        context.drawImage(this.img,20,100);
    }

    loseHP(){
        this.hp -= 1;
        if(this.hp <= 0){
            alert("W");
        }
        q = Math.floor(Math.random() * 3);
        document.getElementById("1").innerHTML = questions[q].an1;
        document.getElementById("2").innerHTML = questions[q].an2;
        document.getElementById("3").innerHTML = questions[q].an3;
        document.getElementById("4").innerHTML = questions[q].an4;
    }
}


const dum = new BattleEnemy(img, 5, 0);


function init() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    //document.getElementById("1").innerHTML = questions[q].an1;
    //document.getElementById("2").innerHTML = questions[q].an2;
    //document.getElementById("3").innerHTML = questions[q].an3;
    //document.getElementById("4").innerHTML = questions[q].an4;

    gameloop();
}

function anwser(test) {
    if(test.id == 1){
        opt_1 = true;
    } 
    if(test.id == 2){
        opt_2 = true;
    } 
    if(test.id == 3){
        opt_3 = true;
    } 
    if(test.id == 4){
        opt_4 = true;
    } 
}

function update() {
    if(opt_1 == true ){
        if(questions[q].correct == "an1"){
            dum.loseHP();
            opt_1 = false;
        } else{
            opt_1 = false;
        }
    }
    if(opt_2 == true){
        if(questions[q].correct == "an2"){
            dum.loseHP();
            opt_2 = false;
        } else{
            opt_2 = false;
        }
    }
    if(opt_3 == true){
        if(questions[q].correct == "an3"){
            dum.loseHP();
            opt_3 = false;
        } else{
            opt_3 = false;
        }
    }
    if(opt_4 == true){
        if(questions[q].correct == "an4"){
            dum.loseHP();
            opt_4 = false;
        } else{
            opt_4 = false;
        }
    }
}

function checkmouse(){

}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    dum.draw();
    context.fillText(questions[q].Quest, 10, 50); 
    context.fillText(dum.hp, 0, 400);
    
}

function gameloop() {
    //draw();
    //checkmouse();
    //update();
    requestAnimationFrame(gameloop);
}


window.onload = init();