// var coins = 0;
// var gondolas = 0;
var gondolas = [];


//Buildings objects
function Gondola() {
    this.name = "Gondola";
    this.cost = 10;
    this.persec = 1;
}

//Game object
function GameSave() {
    this.money = 0;
    this.gondolas = [];                             //qty of gondolas in this game? Creo que cuenta la cantidad de gondolas en un campo del arreglo gondolas
    for (var i = 0;i < gondolas.length;i++) {       //cuando yo quiera crear gondolas en distintas posiciones del arreglo esto va a hacer ruido
        this.gondolas[i] = 0;
    }
}

//Loads the first gondola
function InitGondolas() {
    LoadGondolas("Mercaderia ",10,1);
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
    document.getElementById("coinCounter").innerHTML = game.money;
}

//automated click when have gondolas
function coinClick (){
    for (var i = 0;i < gondolas.length;i++) {
        game.money += game.gondolas[i] * gondolas[i].persec;
    }
    document.getElementById("coinCounter").innerHTML = game.money;
}

function buy(id){
    if(game.money >= gondolas[id].cost){                                       //checks that the player can afford the gondola
        game.gondolas[id]++;                                                 //increases number of gondolas
        game.money -= gondolas[id].cost;                                       //removes the coins spent
        document.getElementById('gondola').innerHTML = game.gondolas[id];    //updates the number of gondolas for the user
        document.getElementById('coinCounter').innerHTML = game.money;   //updates the number of coins for the user
        show(id);
    };
    gondolas[id].cost = Math.floor(10 * Math.pow(1.1,game.gondolas[id]));         //works out the cost of the next gondola
    document.getElementById('gondolaCost').innerHTML = gondolas[id].cost;    //updates the Gondola cost for the user
    
};

function show (i) {
    document.getElementById('Piso').insertAdjacentHTML('afterend',gondolas[i].name + game.gondolas[i]);
}


//Game Loop
window.setInterval(function(){
    coinClick();
}, 1000);


window.onload = function() {
    InitGondolas();
    window.game = new GameSave();
};