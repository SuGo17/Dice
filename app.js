var scores, roundScore, activePlayer, dice;
var Playing = true;
var closeRules;

closeRules = document.querySelector('.close')

closeRules.addEventListener('click', function (){
    document.querySelector('.rules').style.display = 'none';
    document.querySelector('.main').style.display = 'flex';
})
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    var player1 = document.querySelector('#score--0');
    var player2 = document.querySelector('#score--1');

    player1.textContent = 0;
    player2.textContent = 0;
    
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;

    document.getElementById('name--0').innerHTML = 'Player 1';
    document.getElementById('name--1').innerHTML = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}

init();

document.querySelector('.dice').style.display = 'none'; 

document.querySelector('.btn--roll').addEventListener('click',function (){
    // Generate a Random Number
    if(Playing){
        dice = Math.floor(Math.random() * 6) + 1;

        // Display the Result
        document.querySelector('.dice').src = 'dice-' + dice + '.png'; 
        document.querySelector('.dice').style.display = 'block'; 

        //Update the roundScore if the rolled numberf is not 1
        if(dice !== 1){
            roundScore += dice;
        }
        else{
            nextPlayer();
            
        }
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}

document.querySelector('.btn--hold').addEventListener('click', function (){
    if(Playing){
        scores[activePlayer] += roundScore;
        document.querySelector('.dice').style.display = 'none'; 
        document.querySelector('#score--' + activePlayer).innerHTML = scores[activePlayer];

        if(scores[activePlayer] >= 100){
                document.getElementById('name--' + activePlayer).innerHTML = 'Winner!';
                document.querySelector('.dice').style.display = 'none'; 
                document.querySelector('.player--' + activePlayer).classList.add('player--winner');
                document.querySelector('.player--' + activePlayer).classList.remove('player--active');
                Playing = false;
            }
        else{
            nextPlayer();
        }
        }
});

document.querySelector('.btn--new').addEventListener('click', function(){
    init();
    Playing = true;
});