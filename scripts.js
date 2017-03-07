var newGameBtn = document.getElementById('js-newGameButton'),
	newGameElem = document.getElementById('js-newGameElement'),
	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement'),
	pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
	playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() {
	playerPick('rock') 
});
pickPaper.addEventListener('click', function() {
	playerPick('paper')
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors')
});

var gameState = 'notStarted',  //started // ended
    player = {
    	name: '',
    	score: 0
	},
	computer = {
		score: 0
    };

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';	
			resultsElem.style.display = 'none';
  }
}

setGameElements();

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		
		playerNameElem.innerHTML = player.name;
		setGamePoints(); // Tutaj jest zdaje się błąd lub niescislosc w zadaniu, trochę kminiłem bo to wywolanie nie ustawia nam wyniku na badgeu, a go resetuje na 0:0. Zatem ta funkcja powinna się wykonać przede wszystkim na końcu funkcji checkRoundWinner, gdzie aktualizuje badgea i tam też ją umieściłem. Teraz elegancko aktualizuje wynik.
	}

}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
	} else if (
		(computerPick == 'rock' &&  playerPick == 'scissors') ||
		(computerPick == 'scissors' &&  playerPick == 'paper') ||
		(computerPick == 'paper' &&  playerPick == 'rock') ) {
			
		winnerIs = 'computer';
	}
	
	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Wygrana!";
		player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Wygrana!";
		computer.score++;
	}
	// tutaj jak wspominalem dodaje funkcję do aktualizacji badgea
	setGamePoints(); 

	//Zakończenie rozgrywki, funkcja niżej (mógłbym jej nie robić i tutaj wcisnąć po prostu te 2 linijki do kazdego z opcji if, ale tak chyba jest łądniej, bo może tę funkcję ktoś użyć dalej w grze :)
	if (player.score == 10) { 
		alert(player.name + ', Gratulacje! Wygrywasz!');
		endGame();
	} else if (computer.score == 10) {
		alert(player.name + ', Niestety! przegrywasz :(');
		endGame();
	}
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}
//Zakonczenie rozgrywki (funkcja)
function endGame() {
	gameState = 'ended';
	setGameElements();
    playerResultElem.innerHTML = "Wynik gracza";
	computerResultElem.innerHTML = "Wynik komputera";
}


	
