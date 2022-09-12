var questChoosen = false;


var inCombat = false;

function startCombat(){
    inCombat = true;
    poAnwsers = [];
    q = Math.floor(Math.random() * questions.length);   //Slumpar en fråga
    for(let i = 0; i < anwsers.length; i++){
        if(anwsers[i].qID == questions[q].qID){
            console.log(questions[q].Question);
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

// Används för att se villget allternativ som blev valt
var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

var q = 0;

let questions = [];     // Där vi sparar ner frågorna
let anwsers = [];       // Där vi sparar ner potentiella svar
let poAnwsers = [];     // Används för att slumpa ut vart svaren ska vara

var enemy1 = [];

var enemy1F1 = new Image();
enemy1F1.src = "png/Monster/Monster1-1.png";
enemy1.push(enemy1F1);
var enemy1F2 = new Image();
enemy1F2.src = "png/Monster/Monster1-2.png";
enemy1.push(enemy1F2);
var enemy1Hurt = new Image();
enemy1Hurt.src = "png/Monster/Monster1-Hurt.png"
enemy1.push(enemy1Hurt);

var outCombatPlayerImg = [];
var playerN = new Image();
playerN.src = "png/Player/Wizard-N.png";
outCombatPlayerImg.push(playerN);
var playerW = new Image();
playerW.src = "png/Player/Wizard-W.png";
outCombatPlayerImg.push(playerW);
var playerS = new Image();
playerS.src = "png/Player/Wizard-S.png";
outCombatPlayerImg.push(playerS);
var playerE = new Image();
playerE.src = "png/Player/Wizard-E.png";
outCombatPlayerImg.push(playerE);

var overworldBG = new Image();
overworldBG.src = "png/Map.png";

var bg = new Image();
bg.src = "png/Background.png";
var think = new Image();
think.src = "png/Think.png";
var combatPlayerImg = new Image();
combatPlayerImg.src = "png/Wizard.png";

let Grid = class {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    move(way){
        if(way == "w"){
            for(i = 0; i < grids.length;i++){
                if (grids[i].y == this.y-50 && grids[i].x == this.x){
                    return(i);
                }
            }
        }
        if(way == "s"){
            for(i = 0; i < grids.length;i++){
                if (grids[i].y == this.y+50 && grids[i].x == this.x){
                    return(i);
                }
            }
        }
        if(way == "d"){
            for(i = 0; i < grids.length;i++){
                if (grids[i].x == this.x+50 && grids[i].y == this.y){
                    return(i);
                }
            }
        }
        if(way == "a"){
            for(i = 0; i < grids.length;i++){
                if (grids[i].x == this.x-50 && grids[i].y == this.y){
                    return(i);
                }
            }
        }
    }
}
let grids = [];

function createGrid(length, width,size){
    length = length/size;
    width = width/size;
    for(i = 0; i<= length; i++){
        for(x = 0; x<= width; x++){
            grids.push(new Grid(x*50,i*50,size));
        }
    }
    console.log(grids);
}


let Player = class {
    constructor(img, hp, grid){
        this.img = img;
        this.hp = hp;
        this.maxHp = hp;
        this.grid = grid;
        this.speed = 10;
        this.facing = 0;
    }
    update(dir){
        if(dir == "w" && grids[this.grid].y != 0){
            this.grid = grids[this.grid].move(dir);
            this.facing = 0;
        }
        if(dir == "d"  && grids[this.grid].x != 1450){
            this.grid = grids[this.grid].move(dir);
            this.facing = 1;
        }
        if(dir == "s"  && grids[this.grid].y != 1450){
            this.grid = grids[this.grid].move(dir);
            this.facing = 2;
        }
        if(dir == "a"  && grids[this.grid].x != 0){
            this.grid = grids[this.grid].move(dir);
            this.facing = 3;
        }

    }
    draw(){
        context.drawImage(this.img[this.facing],grids[this.grid].x, grids[this.grid].y);
    }
}




// Motståndare
// obj img ImageClass
// var hp int
//  
let BattleEnemy = class {
    constructor(img, hp, questDif){
        this.img = img;
        this.hp = hp;
        this.maxHp = hp;
        this.questDif = questDif;
        this.frameCount = 0;
        this.frame = 0;
    }
    //Måla motståndaren och UI
    draw(){
        context.drawImage(bg,0,0);
        this.frameCount++;
        if (this.frameCount >= 20){
            this.frame++;
            this.frameCount = 0;
            if (this.frame >= 2){
                this.frame = 0;
            }
        }
        context.drawImage(this.img[this.frame],0,0);
        context.drawImage(combatPlayerImg,0,0);

        context.drawImage(think,0,0);
        console.log(questions[q].Question);
        wrapText(questions[q].Question, 440, 60, 400,40); 
        context.fillText(this.hp+" / "+this.maxHp, 100, 100);
        
    }
    //Motståndare förlorar liv och den byter fråga 
    loseHP(){
        this.hp -= 1;
        this.frame = 2;
        this.frameCount = 0;
        if(this.hp <= 0){
            inCombat = false;
            this.hp = 5;

            document.getElementById("1").innerHTML = "";
            document.getElementById("2").innerHTML = "";
            document.getElementById("3").innerHTML = "";
            document.getElementById("4").innerHTML = "";
        }
        if(inCombat){
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
}


const dum = new BattleEnemy(enemy1, 5, 0);
const player = new Player(outCombatPlayerImg,5,10);

function wrapText(text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}



//Blandar listan credit: ashleedawg Stackoverflow
function shuffleArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Startar helaprogrammet
function init() {
    createGrid(1500, 1500,50);
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

    if (inCombat){
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
    context.save();



    context.font = "30px Arial";
    if(inCombat){
        dum.draw();
    } else{
        context.translate(grids[player.grid].x *-1 + canvas.width/2, grids[player.grid].y*-1 + canvas.height/2);
        context.drawImage(overworldBG,0,0);
        player.draw();


    }
    context.restore();

}

// Loop
function gameloop() {
    draw();
    //checkmouse();
    update();
    
    requestAnimationFrame(gameloop);
}

// Add event listener on keypress
document.addEventListener('keypress', (event) => {
    var key = event.key;
    player.update(key);
}, false);



window.onload = init();