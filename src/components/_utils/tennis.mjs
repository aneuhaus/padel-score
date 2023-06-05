#! node

export function getMatchResult(gameStates) {
  let player1Sets = 0;
  let player2Sets = 0;
  let player1Games = 0;
  let player2Games = 0;

  gameStates.forEach(([player1Score, player2Score]) => {
    
    // standard game
    if (player1Score === 4 && player1Score > player2Score) {
      player1Games++;
    } else if (player2Score === 4 && player2Score > player1Score) {
      player2Games++;
    }

    // tiebreak game
    else if (Math.max(player1Score, player2Score) >= 7) {
      if (player1Score >= player2Score + 2) {
        player1Games++;
      } else if (player2Score >= player1Score + 2) {
        player2Games++;
      }
    }

    // check if set is over
    if (Math.max(player1Games, player2Games) >= 6) {
      if (player1Games >= player2Games + 2) {
        player1Sets++;
        player1Games = 0;
        player2Games = 0;
      } else if (player2Games >= player1Games + 2) {
        player2Sets++;
        player1Games = 0;
        player2Games = 0;
      }
    }
  });

  // tiebreak set
  if (player1Games === player2Games && player1Games === 6) {
    if (gameStates[gameStates.length - 1][0] >= 7) {
      player1Sets++;
    } else {
      player2Sets++;
    }
  }

  return {
    sets: [player1Sets, player2Sets],
    currentGame: [player1Games, player2Games],
  }

}

export function whoServes(n, firstServer, secondServer) {
  // Assume the players are [0,1,2,3]
  // And players 0,1 form one double and 2,3 form another
  // firstServer and secondServer are from different teams

  // Tennis serving rules
  // The team which did not serve in the first game of a set serves in the first game of the following set.

  // Calculate which team serves
  let teamToServe = n % 2 === 0 ? secondServer % 2 : firstServer % 2;

  // Calculate which player serves
  let server = teamToServe === 0 ? (n % 4 === 0 ? firstServer : firstServer + 1) 
                                  : (n % 4 === 0 ? secondServer : secondServer + 1);
  
  // Because player's numbers are 0 and 1 for one team and 2 and 3 for the other, we should take modulo 2 for server
  return server % 2 === 0 ? server : (server - 1 + 2 * teamToServe);
}


// tennis match simulator
export function simulateMatch(firstServer, secondServer) {

  let gameStates = [];
  let n = 0;
  let matchResult = getMatchResult(gameStates);

  while (matchResult.sets[0] < 2 && matchResult.sets[1] < 2) {
    let server = whoServes(n, firstServer, secondServer);
    let receiver = server % 2 === 0 ? server + 1 : server - 1;
    let gameState = simulateGame(server, receiver);
    gameStates.push(gameState);
    matchResult = getMatchResult(gameStates);
    n++;
  }

  return matchResult;
}