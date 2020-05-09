/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice;
// variables were deleted to create the init function
init();

/* part of my solution 2
var winnerScore, refresh;
newScore();
*/

//dice = Math.floor(Math.random() * 6) + 1;
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
/*  // below was moved to the init function
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
*/
/*  // basic function however in the addEventListener we are going to use an anonymous function
function btn() {
  // do something here
}
btn();
*/

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {
    // do something here
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice +'.png';

    var diceDom2 = document.querySelector('.dice-two');
    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + diceTwo +'.png';

    // 3. Update the round score IF the rolled number is the NOT a 1
    if (dice === 6 && lastDice === 6){
      // player looses score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent =  '0';
      nextPlayer();

    } else if (dice !== 1 && diceTwo !== 1) {
      //Add score
      // below same as saying roundScore = roundScore + dice
      roundScore += dice + diceTwo;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next player
      /* below is the same as saying
        if(activePlayer ===  0) {
          activePlayer = 1;
        } else {
          activePlayer = 0;
        }
      */
      nextPlayer();
    }
    lastDice = dice;
  }
});




document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent =  scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // undefined, 0, null or "" are coerced to false
    // anything else is coerced to true
    if(input) {
      winningScore = input;
      } else {
      winningScore = 20;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});


// start everything from zero
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-two').style.display = 'none'; //added .dice-two
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}; // added dice-two

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
      //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none'; //added dice-two
}; // added dice-two

//below was my solution for part 2
/*
function newScore() {
  winnerScore = document.getElementById('num-setting');
  var defaultScore = winnerScore.defaultValue;
  var currentScore = winnerScore.value;

    if (defaultScore == currentScore) {
      document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying) {
          //Add CURRENT score to GLOBAL score
          scores[activePlayer] += roundScore;
          //Update the UI
          document.querySelector('#score-' + activePlayer).textContent =  scores[activePlayer];

          // check if player won the game
          if (scores[activePlayer] >= 20) {

          document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
          } else {
            //next player
            nextPlayer();
          }
        }
      });
    } else {
      document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying) {
          //Add CURRENT score to GLOBAL score
          scores[activePlayer] += roundScore;
          //Update the UI
          document.querySelector('#score-' + activePlayer).textContent =  scores[activePlayer];

          // check if player won the game
          if (scores[activePlayer] >= currentScore) {

          document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
          } else {
            //next player
            nextPlayer();
          }
        }
      });

    }
};
newScore();
*/
