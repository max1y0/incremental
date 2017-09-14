// var coins = 0;
// var gondolas = 0;
var gondolas = [];
const CANTGONDOLAS = 2


//Gondola object constructor
function Gondola() {     
    this.name = "Gondola";
    this.cost = 10;
    this.persec = 1;
}

//Game object constructor
function GameSave() {
    this.money = 0;
    this.gondolas = [];                             //qty of gondolas in this game? Creo que cuenta la cantidad de gondolas en un campo del arreglo gondolas
    for (var i = 0;i < gondolas.length;i++) {       //cuando yo quiera crear gondolas en distintas posiciones del arreglo esto va a hacer ruido
        this.gondolas[i] = 0;
    }
}

//Loads the firsts gondola
function InitGondolas() {
    LoadGondolas("Mercaderia ",10,0.1); //id 0 
    LoadGondolas("Bazar",100,1);       //id 1

}

//loads the gondola data in the array
function LoadGondolas(name,cost,persec) {
    var cur = gondolas.length;
    gondolas[cur] = new Gondola();
    gondolas[cur].name = name;
    gondolas[cur].cost = cost;
    gondolas[cur].persec = persec;
}

//click for the button
function manualCoinClick (n){
    game.money ++;
    document.getElementById("coinCounter").innerHTML = Math.floor(game.money);
}

//automated click when have gondolas
function coinClick (){
    for (var i = 0;i < gondolas.length;i++) {
        game.money += game.gondolas[i] * gondolas[i].persec;
    }
    renderCoins()
}

//builds a type of gondola based on the id
function build(id){
    if(game.money >= gondolas[id].cost){                                       //checks that the player can afford the gondola
        game.gondolas[id]++;                                                 //increases number of gondolas of that id
        game.money -= gondolas[id].cost;                                       //removes the coins spent
        document.getElementById('gondola').innerHTML = game.gondolas[id];             //updates the number of gondolas for the user
        gondolas[id].cost = Math.floor(gondolas[id].cost * Math.pow(1.1,game.gondolas[id]));         //works out the cost of the next gondola
        renderCoins()                                                                   //updates the number of coins for the user
        renderGondola(id);
    };
};

//buys a gondola, asks what to build and builds on that ID
function buy(){
    //Creating menu
    var menu = "What do you want to build?";
    for (var i = 0; i < CANTGONDOLAS; i++) {
        menu += "\n"  + (i+1) + " - " + gondolas[i].name + " - Costo: " + gondolas[i].cost + " - Coins por segundo: " + gondolas[i].persec
    };
    var idBuilding = prompt(menu);
    //Checking input
    if (idBuilding != null && idBuilding >0 && idBuilding <= CANTGONDOLAS) {
        console.log(idBuilding)
        build(idBuilding-1)
        
    }
}


//Creating info on screen
function renderGondola (i) {
    var append ='';
    if (i==0){
        append = '<div class ="mercaderia">' + gondolas[i].name + game.gondolas[i] + '</div>'
    }
    if (i==1){
        append = '<div class ="bazar">' + gondolas[i].name + game.gondolas[i] + '</div>';
    }
    document.getElementById('Piso').insertAdjacentHTML('afterend',append);
}

function renderCoins() {
    document.getElementById("coinCounter").innerHTML = Math.floor(game.money)
}


//cheats functions
function addCoins(n) {
    game.money += n;
}








//Game Loop 
window.setInterval(function(){
    coinClick();
}, 1000);

//Game load
window.onload = function() {
    InitGondolas();
    window.game = new GameSave();
    renderCoins()
};

