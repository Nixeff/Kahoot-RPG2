var x = 0;

var questChoosen = false;

// Används för att se villget allternativ som blev valt
var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

var q = 0;

let questions = [];     // Där vi sparar ner frågorna
let anwsers = [];       // Där vi sparar ner potentiella svar
let poAnwsers = [];     // Används för att slumpa ut vart svaren ska vara

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

// Motståndare
let BattleEnemy = class {
    constructor(img, hp, questDif){
        this.img = img;
        this.hp = hp;
        this.questDif = questDif;
    }
    //Måla motståndaren
    draw(){
        context.drawImage(this.img,20,100);
    }
    //Motståndare förlorar liv och den byter fråga 
    loseHP(){
        this.hp -= 1;
        if(this.hp <= 0){
            alert("W");
        }
        poAnwsers = [];
        q = Math.floor(Math.random() * questions.length);   //Slumpar en fråga
        for(let i = 0; i < anwsers.length; i++){
            if(anwsers[i].qID == questions[q].qID){
                console.log("då");
                poAnwsers.push(anwsers[i]);
            };
        };
            
        shuffleArray(poAnwsers);
        console.log(poAnwsers);
        
                
        //Sätter svaren på knapparna
        document.getElementById("1").innerHTML = poAnwsers[0].Answer;
        document.getElementById("2").innerHTML = poAnwsers[1].Answer;
        document.getElementById("3").innerHTML = poAnwsers[2].Answer;
        document.getElementById("4").innerHTML = poAnwsers[3].Answer;
    }
}


const dum = new BattleEnemy(img, 5, 0);

//Blandar listan credit: ashleedawg Stackoverflow
function shuffleArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Startar helaprogrammet
function init() {
    //Fångar in frågorna
    fetch('getQue.php').then(function(response) {
        return response.json();
    })
    .then(function(data){
        questions = data;       
        fetch('getAnw.php').then(function(response) {   //Fångar in svaren till frågorna
            return response.json();
        })
        .then(function(data){
            anwsers = data;     
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            q = Math.floor(Math.random() * questions.length);   //Slumpar en fråga
            for(let i = 0; i < anwsers.length; i++){
                if(anwsers[i].qID == questions[q].qID){
                    console.log("då");
                    poAnwsers.push(anwsers[i]);
                };
            };
                
            shuffleArray(poAnwsers);
            console.log(poAnwsers);
            
                    
            //Sätter svaren på knapparna
            document.getElementById("1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("4").innerHTML = poAnwsers[3].Answer;
                
            gameloop();
        });
    })
};    

//Kollar vilken knapp som blev trycket
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

//Uppdaterar olika saker
function update() {
    //Om det inte finns en fråga vald tar den en slump fråga
    if(!questChoosen){
        q = Math.floor(Math.random() * questions.length);
        questChoosen = true;
    } else {
        //Kollar om någon knapp blev trycked och ifall det är rätt eller inte
        if(opt_1 == true ){
            if(poAnwsers[0].Correct == 1){
                dum.loseHP();
                opt_1 = false;
            } else{
                opt_1 = false;
            }
        }
        if(opt_2 == true){
            if(poAnwsers[1].Correct == 1){
                dum.loseHP();
                opt_2 = false;
            } else{
                opt_2 = false;
            }
        }
        if(opt_3 == true){
            if(poAnwsers[2].Correct == 1){
                dum.loseHP();
                opt_3 = false;
            } else{
                opt_3 = false;
            }
        }
        if(opt_4 == true){
            if(poAnwsers[3].Correct == 1){
                dum.loseHP();
                opt_4 = false;
            } else{
                opt_4 = false;
            }
        }
    }

}

// Mållar saker
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    dum.draw();
    context.fillText(questions[q].Question, 10, 50); 
    context.fillText(dum.hp, 0, 400);
    
}

// Loop
function gameloop() {
    draw();
    //checkmouse();
    update();
    
    requestAnimationFrame(gameloop);
}



window.onload = init();