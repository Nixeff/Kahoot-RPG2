// Används för att se villget allternativ som blev valt
var opt_1 = false;
var opt_2 = false;
var opt_3 = false;
var opt_4 = false;

// Håller koll på vilken fråga vi är på
var q = 0;

// Är vi i combat??
var inCombat = true;

let questions = [];     // Där vi sparar ner frågorna
let anwsers = [];       // Där vi sparar ner potentiella svar
let poAnwsers = [];     // Används för att slumpa ut vart svaren ska vara

//--------------------------------------------------------------------------
//                   BILDER
//-------------------------------------------------------------------------- 

// För att spara Sprites till motståndaren
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

//----------------------------------------------------------
//              AJAX
//----------------------------------------------------------


//Alla input type button activerar denna funktion som sickar iväg att man använder ett item till databas
function updateUseItem(thisThing){
        $input = thisThing;
        console.log($input);
            //Define the data to be sent by the post method var data = {parameter name : value};
            var data = {
		uID : $('#uID').val(),
		itemID : $input["id"].slice(6),
        use : 1,
	};
            $.ajax({
                type: "post",
                url: "inventoryChange.php",
                data: data,
                //If Ajax communication succeeds
                success: function(data, dataType)
                {
                    //Sickar data via JSON
                    data = JSON.parse(data);
                    //Är den inte tom ändra amount
                    if(data[1]>=1){
                        items[data[0]].use();
                        try{   
                            document.getElementById("amount"+data[0]).innerHTML = "x"+parseInt(data[1]-1);
                        }catch(err){
                            alert("ohh shit");
                        }
                    // är den tom? ta bort den
                    }
                    if(data[1]-1 == 0){
                        document.getElementById("button"+data[0]).remove();
                    }
                },
               //Message when Ajax communication fails
                error: function()
                {
                alert('Failed to use item');
                }
            });
            return false;
}

function addItem(id,uID){

    //Define the data to be sent by the post method var data = {parameter name : value};
    var data = {
        uID : uID,
        itemID : id,
    };
    $.ajax({
        type: "post",
        url: "inventoryChange.php",
        data: data,
        //If Ajax communication succeeds
        success: function(data, dataType)
        {
            data = JSON.parse(data);
            //Är det en ny element som behöver skapas?
            console.log(data[1]);
                //Ändra amount
            try{   
                let am = parseInt(data[1])+1;
                document.getElementById("amount"+data[0].toString()).innerHTML = "x"+am.toString();
            }catch(err){
                alert("ohh shit");
            }
            if(data[1]+1 == 1){
                var tag = document.createElement("input");
                tag.setAttribute("id","button"+data[0].toString());
                tag.setAttribute("type","button");
                tag.setAttribute("value","Use Item");
                tag.setAttribute("onclick","updateUseItem(this)");
                var element = document.getElementById(data[0].toString());
                element.appendChild(tag);
            }
        }
    });
    return false;
}

//------------------------------------------------------------------------------------
//                          CLASSER
//--------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
//              ITEM
// name str             (är namnet på saken)
// description str      (en beskriving på saken så som "Eat for 2HP")
// effect int           (0 = heal 1 = damage)
// amount int           (hur mycket damage eller heal)
//---------------------------------------------------------------------------------------
let Item = class {
    constructor(name, description, effect, amount){
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.amount = amount;
    }
    use(){
        if(this.effect == 0){
            player.gainHp(this.amount);
        }
        if(this.effect == 1){
            dum.loseHP(this.amount);
        }
    }
}

// Lägger alla items i en lista för att gära det enklare att hantera
let items = [];
const food = new Item("Pebble", "Throw to del 1HP to the enemy", 1, 1);
items.push(food);
const beef = new Item("Beef Jerky", "Eat to heal 1 HP", 0, 1);
items.push(beef);
const ration = new Item("Old Ration", "Eat to heal 2 HP", 0, 2);
items.push(ration);
const throwingKnife = new Item("Throwing Knife", "Throw to deal 2HP to the enemy", 1, 2);
items.push(throwingKnife);



//-----------------------------------------------------------------------------------
//                  MOTSÅNDARE
// li img ImageClass       (lista på bilder som ska användas 0,1 = idle 2 = hurt)
// var hp int              (hur mycket hälsa har motståndaren)
//------------------------------------------------------------------------------------
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
    loseHP(loss){
        this.hp -= loss;
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
        document.getElementById("a1").innerHTML = poAnwsers[0].Answer;
        document.getElementById("a2").innerHTML = poAnwsers[1].Answer;
        document.getElementById("a3").innerHTML = poAnwsers[2].Answer;
        document.getElementById("a4").innerHTML = poAnwsers[3].Answer;
        if(this.hp <= 0){
            inCombat = false;
            this.hp = this.maxHp;
            document.getElementById("a1").innerHTML = "Keep Moving";
            document.getElementById("a2").innerHTML = "Search";
            document.getElementById("a3").innerHTML = " ";
            document.getElementById("a4").innerHTML = " ";
        }
    }
}
//-----------------------------------------------------------------------------------------
//                      PLAYER
// var hp int       (hur mycket hälsa har spelaren)
// li img obj       (lista på bilder för spelaren ska använda 0 = idle 1 = skadad)
//..........................................................................................
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
            if (this.hp>this.maxHp){
                this.hp = this.maxHp;
            }
        }else{
            this.hp += gain;
        }
    }
}

const player = new Player(5,wizardSprites);
const dum = new BattleEnemy(enemy1, 5, 0);

//---------------------------------------------------------------------------------------------------------------
//              FUNCTIONS
//---------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
//              WRAPTEXT
//var text str          (lägg in texten du vill ska dela up sig sjålv)
//var x int             (vilken x coordinat ska den skrivas)
//var y int             (vilken y coordinat ska den skrivas)
//var maxWidth int      (Max längden på textsten. så den vet hur bred den får vara innan den bryter i texten)
//var lineHeight int    (Hur många pixlar emmellan rader ska det vara)
//---------------------------------------------------------------------------------------------------------------

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
    }}
    context.fillText(line, x, y);
}

//---------------------------------------------------------------------------------------------------------------
//              SHUFFLEARRAY
//var array li      (listan som du ska blanda)
//Blandar listan credit: ashleedawg Stackoverflow
//---------------------------------------------------------------------------------------------------------------

function shuffleArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//---------------------------------------------------------------------------------------------------------------
//              INIT
//---------------------------------------------------------------------------------------------------------------
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
            document.getElementById("a1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("a2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("a3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("a4").innerHTML = poAnwsers[3].Answer;
                
            gameloop();
        });
    })
};    

//---------------------------------------------------------------------------------------------------------------
//              ANWSER
//---------------------------------------------------------------------------------------------------------------
//Kollar vilken knapp som blev trycket
function anwser(test) {
    if(test.id == "a1"){
        opt_1 = true;
    } 
    if(test.id == "a2"){
        opt_2 = true;
    } 
    if(test.id == "a3"){
        opt_3 = true;
    } 
    if(test.id == "a4"){
        opt_4 = true;
    } 
}

//----------------------------------------------------------------
//              UPDATE
//----------------------------------------------------------------

//Uppdaterar olika saker
function update() {
    //Kollar om vi slås
    if(inCombat){
        //Kollar om någon knapp blev trycked och ifall det är rätt eller inte
        if(opt_1 == true ){
            if(poAnwsers[0].Correct == 1){
                dum.loseHP(1);
                opt_1 = false;
            } else{
                player.loseHp(1);
                opt_1 = false;
            }
        }
        if(opt_2 == true){
            if(poAnwsers[1].Correct == 1){
                dum.loseHP(1);
                opt_2 = false;
            } else{
                player.loseHp(1);
                opt_2 = false;
            }
        }
        if(opt_3 == true){
            if(poAnwsers[2].Correct == 1){
                dum.loseHP(1);
                opt_3 = false;
            } else{
                player.loseHp(1);
                opt_3 = false;
            }
        }
        if(opt_4 == true){
            if(poAnwsers[3].Correct == 1){
                dum.loseHP(1);
                opt_4 = false;
            } else{
                player.loseHp(1);
                opt_4 = false;
            }
        }
    //om vi inte slås
    } else if(!inCombat){
        // Gå vidare och slås mot något annat
        if(opt_1 == true ){
            inCombat = true;
            document.getElementById("a1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("a2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("a3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("a4").innerHTML = poAnwsers[3].Answer;
            opt_1 = false;
        }
        // hitta ett item och sedan gå vidare
        if(opt_2 == true){
            let it = Math.floor(Math.random() * items.length);
            try{
                addItem(it,document.getElementById("jsUID").value);
            } catch(e){

            }
            
            var tag = document.createElement("p");
            var text = document.createTextNode("You found a "+items[it].name);
            tag.appendChild(text);
            var element = document.getElementById("canvas");
            element.appendChild(tag);

            inCombat = true;
            document.getElementById("a1").innerHTML = poAnwsers[0].Answer;
            document.getElementById("a2").innerHTML = poAnwsers[1].Answer;
            document.getElementById("a3").innerHTML = poAnwsers[2].Answer;
            document.getElementById("a4").innerHTML = poAnwsers[3].Answer;
            opt_2 = false;
        }
        if(opt_3 == true){
            opt_3 = false;
        }
        if(opt_4 == true){
            opt_4 = false;
        }
    }
    for(i = 0; i<items.length;i++){
        try{
            if(document.getElementById("title"+i).innerHTML !== null){
                document.getElementById("title"+i).innerHTML = items[i].name;
                document.getElementById("desc"+i).innerHTML = items[i].description;
            }
        } catch(e){
            
        }
    }
}

//---------------------------------------------------------------------------------------------------------------
//              DRAW 
//---------------------------------------------------------------------------------------------------------------

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bg,0,0);
    context.font = "30px Arial";
    if(inCombat){
        dum.draw();
    }
    player.draw();
}

//---------------------------------------------------------------------------------------------------------------
//          GAMELOOP
//---------------------------------------------------------------------------------------------------------------

function gameloop() {
    draw();
    //checkmouse();
    update();
    
    requestAnimationFrame(gameloop);
}



window.onload = init();