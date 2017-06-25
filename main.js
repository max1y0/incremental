var coins = 0;
var gondolas = 0;

function coinClick (n){
	coins += n;
	document.getElementById("coinCounter").innerHTML = coins;
}

function buyGondola(){
    var gondolaCost = Math.floor(10 * Math.pow(1.1,gondolas));     //works out the cost of this gondola
    if(coins >= gondolaCost){                                   //checks that the player can afford the cursor
        gondolas++;                                   //increases number of cursors
    	coins -= gondolaCost;                          //removes the cookies spent
        document.getElementById('gondola').innerHTML = gondolas;  //updates the number of cursors for the user
        document.getElementById('coinCounter').innerHTML = coins;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,gondolas));       //works out the cost of the next cursor
    document.getElementById('gondolaCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	coinClick(gondolas);
}, 1000);