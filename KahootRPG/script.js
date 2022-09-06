var x = 0;

var questChoosen = false;

var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

var q = 0;

let questions = [];
let anwsers = [];
let poAnwsers = [];

var img = new Image();
img.src = "png/Enemy.png";




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
        document.getElementById("1").innerHTML = questions_old[q].an1;
        document.getElementById("2").innerHTML = questions_old[q].an2;
        document.getElementById("3").innerHTML = questions_old[q].an3;
        document.getElementById("4").innerHTML = questions_old[q].an4;
    }
}


const dum = new BattleEnemy(img, 5, 0);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function init() {
    var Q_Done = false;
    var A_Done = false;
    
    fetch('getQue.php').then(function(response) {
        return response.json();
    })
    .then(function(data){
        questions = data;
        console.log(1);
        fetch('getAnw.php').then(function(response) {

            return response.json();
        })
        .then(function(data){
            anwsers = data;
            console.log(anwsers);
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            q = Math.floor(Math.random() * questions.length);
            console.log(anwsers);
            for(let i = 0; i < anwsers.length; i++){
                        
            console.log("Hej");
            if(anwsers[i].qID == questions[q].qID){
                console.log("då");
                poAnwsers.push(anwsers[i]);
            };
            };
                
            shuffleArray(poAnwsers);
            console.log(poAnwsers);
            
                    
                
            document.getElementById("1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("4").innerHTML = poAnwsers[3].Answer;
                
            gameloop();
        });
    })

    



    };    

    
    
        
    


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
    if(!questChoosen){
        q = Math.floor(Math.random() * questions.length);
        console.log(q);
        questChoosen = true;
    } else {
        if(opt_1 == true ){
            if(questions_old[q].correct == "an1"){
                dum.loseHP();
                opt_1 = false;
            } else{
                opt_1 = false;
            }
        }
        if(opt_2 == true){
            if(questions_old[q].correct == "an2"){
                dum.loseHP();
                opt_2 = false;
            } else{
                opt_2 = false;
            }
        }
        if(opt_3 == true){
            if(questions_old[q].correct == "an3"){
                dum.loseHP();
                opt_3 = false;
            } else{
                opt_3 = false;
            }
        }
        if(opt_4 == true){
            if(questions_old[q].correct == "an4"){
                dum.loseHP();
                opt_4 = false;
            } else{
                opt_4 = false;
            }
        }
    }

}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    dum.draw();
    context.fillText(questions[q].Question, 10, 50); 
    context.fillText(dum.hp, 0, 400);
    
}

function gameloop() {
    draw();
    //checkmouse();
    update();
    
    requestAnimationFrame(gameloop);
}



window.onload = init();