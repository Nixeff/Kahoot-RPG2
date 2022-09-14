

// Används för att se villget allternativ som blev valt
var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

var q = 0;

var inCombat = true;

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

var plate = new Image();
plate.src = "png/Plate.png";
var bg = new Image();
bg.src = "png/Background.png";
var think = new Image();
think.src = "png/Think.png";


wizardSprites = [];
var playerImg = new Image();
playerImg.src = "png/Wizard.png";
wizardSprites.push(playerImg);
var playerHitImg = new Image();
playerHitImg.src = "png/Wizard-Hit.png";
wizardSprites.push(playerHitImg);


$(document).ready(function()
    {
		
        $('#use').click(function()
        {
            //Define the data to be sent by the post method var data = {parameter name : value};
           var data = {
		uID : $('#uID').val(),
		itemID : $('#itemID').val(),
	};
 
            $.ajax({
                type: "post",
                url: "inventoryChange.php",
                data: data,
                //If Ajax communication succeeds
                success: function(data, dataType)
                {
                //Displaying the data returned from PHP
                alert(data);
				
				//Reset the form content after submission.
				if(data == "Transmission complete."){
				document.forms[0].elements[0].value="";
				document.forms[0].elements[1].value="";
			    document.forms[0].elements[2].value="";
				}
                },
               //Message when Ajax communication fails
                error: function()
                {
                alert('Failed to use item');
                }
            });
            return false;
        });
    });




// Motståndare
// obj img ImageClass
// var hp int
//  
let BattleEnemy = class {
    constructor(img, hp){
        this.img = img;
        this.hp = hp;
        this.maxHp = hp;
        this.frameCount = 0;
        this.frame = 0;
    }
    //Måla motståndaren och UI
    draw(){
        this.frameCount++;
        if (this.frameCount >= 20){
            this.frame++;
            this.frameCount = 0;
            if (this.frame >= 2){
                this.frame = 0;
            }
        }
        context.drawImage(this.img[this.frame],0,0);

        context.drawImage(think,0,0);
        wrapText(questions[q].Question, 440, 60, 400,40); 
        context.fillText(this.hp+" / "+this.maxHp, 100, 100);

        
    }
    //Motståndare förlorar liv och den byter fråga 
    loseHP(){
        this.hp -= 1;
        this.frame = 2;
        this.frameCount = 0;

        poAnwsers = [];
        q = Math.floor(Math.random() * questions.length);   //Slumpar en fråga
        for(let i = 0; i < anwsers.length; i++){
            if(anwsers[i].qID == questions[q].qID){
                poAnwsers.push(anwsers[i]);
            };
        };
            
        shuffleArray(poAnwsers);
        
        //Sätter svaren på knapparna
        document.getElementById("1").innerHTML = poAnwsers[0].Answer;
        document.getElementById("2").innerHTML = poAnwsers[1].Answer;
        document.getElementById("3").innerHTML = poAnwsers[2].Answer;
        document.getElementById("4").innerHTML = poAnwsers[3].Answer;

        if(this.hp <= 0){
            inCombat = false;
            this.hp = this.maxHp;
            document.getElementById("1").innerHTML = "Keep Moving";
            document.getElementById("2").innerHTML = "Search";
            document.getElementById("3").innerHTML = " ";
            document.getElementById("4").innerHTML = " ";
        }
    }
}

let Player = class {
    constructor(hp,img) {
        this.hp = hp;
        this.maxHp = hp;
        this.img = img;
        this.hitFrame = 0;
    }

    draw(){
        if(this.hitFrame>0){
            context.drawImage(this.img[1],0,0);
            this.hitFrame --;
        } else {
            context.drawImage(this.img[0],0,0);
        }

        context.fillText(this.hp+" / "+this.maxHp, 830, 100);
    }
    loseHp(lose){
        this.hp -= lose;
        this.hitFrame = 20;
        if (this.hp <=0){
            alert("You Died");
        }
    }
    gainHp(gain){
        if(this.hp+gain > this.maxHp){
            this.hp += this.hp+gain-this.maxHp;
        }else{
            this.hp += gain;
        }
        
    }

}

const player = new Player(5,wizardSprites);
const dum = new BattleEnemy(enemy1, 5, 0);

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
                    poAnwsers.push(anwsers[i]);
                };
            };
                
            shuffleArray(poAnwsers);
            
                    
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
    if(inCombat){
        //Kollar om någon knapp blev trycked och ifall det är rätt eller inte
        if(opt_1 == true ){
            if(poAnwsers[0].Correct == 1){
                dum.loseHP();
                opt_1 = false;
            } else{
                player.loseHp(1);
                opt_1 = false;
            }
        }
        if(opt_2 == true){
            if(poAnwsers[1].Correct == 1){
                dum.loseHP();
                opt_2 = false;
            } else{
                player.loseHp(1);
                opt_2 = false;
            }
        }
        if(opt_3 == true){
            if(poAnwsers[2].Correct == 1){
                dum.loseHP();
                opt_3 = false;
            } else{
                player.loseHp(1);
                opt_3 = false;
            }
        }
        if(opt_4 == true){
            if(poAnwsers[3].Correct == 1){
                dum.loseHP();
                opt_4 = false;
            } else{
                player.loseHp(1);
                opt_4 = false;
            }
        }
    } else if(!inCombat){
        if(opt_1 == true ){
            inCombat = true;
            document.getElementById("1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("4").innerHTML = poAnwsers[3].Answer;
            opt_1 = false;
        }
        if(opt_2 == true){
            opt_2 = false;
        }
        if(opt_3 == true){
            opt_3 = false;
        }
        if(opt_4 == true){
            opt_4 = false;
        }
    }
}

// Mållar saker
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bg,0,0);
    context.font = "30px Arial";

    if(inCombat){
        dum.draw();
    } else{

    }
    player.draw();
    

    
}

// Loop
function gameloop() {
    draw();
    //checkmouse();
    update();
    
    requestAnimationFrame(gameloop);
}



window.onload = init();