import { Double, GameScore, SetScore, Service } from "../Scoreboard/types";
import Scoreboard from "../Scoreboard";
import Controls from "./Controls";

import { useState, MouseEventHandler, ChangeEventHandler, useEffect } from "react";


const double1: Double = {
  left: {
    name: "Allemandi",
    code: "All",
  },
  right: {
    name: "Bergamini",
    code: "Ber",
  },
};

const double2: Double = {
  left: {
    name: "Campagnolo",
    code: "Cam",
  },
  right: {
    name: "Di Nenno",
    code: "DiN",
  },
};

const players = [double1, double2];



export default function TestBed() {
  const [games, setGames] = useState<GameScore[]>([[0, 0]]);
  const [sets, setSets] = useState<SetScore[]>([[0, 0]]);
  const [firstService, setFirstService] = useState<Service>(0);
  const [secondService, setSecondService] = useState<Service>(2);

  const adjustSet = (gameHistory: GameScore[]) => {
    const [left, right] = gameHistory[gameHistory.length - 1];
    const newSets = [...sets];
    const currentSet = newSets[newSets.length - 1];
    let [leftSet, rightSet] = currentSet;
    const newSet = left > right ? [++leftSet, rightSet] : [leftSet, ++rightSet];
    const clearSet: SetScore = [newSet[0] as number, newSet[1] as number];
    newSets[newSets.length - 1] = clearSet;
    if (leftSet === 7 || rightSet === 7) {
      newSets.push([0, 0] as SetScore);
    }
    else if (Math.abs(leftSet - rightSet) >= 2 && (leftSet >= 6 || rightSet >= 6)) {
      newSets.push([0, 0] as SetScore);
    }
    setSets(newSets);
  };

  const handlePoint: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const { currentTarget: target } = event;
    const isService = [...target.classList].includes("double1");
    const newGames = [...games];
    const currentGame = newGames[newGames.length - 1];
    const newSets = [...sets];
    const currentSet = newSets[newSets.length - 1];
    let [left, right] = currentGame;
    const newGame = isService ? [++left, right] : [left, ++right];
    if (currentSet[0] === 6 && currentSet[1] === 6) {
      // Tiebreak
      if (Math.abs(left - right) >= 2 && (left >= 7 || right >= 7)) {
        newGames.push(newGame as GameScore);
        adjustSet([...newGames]);
        newGames.push([0, 0]);
        setGames(newGames);
        return;
      }
      newGames.push(newGame as GameScore);
      setGames(newGames);
      return;
    }
    if (left === 4 || right === 4) {
      // Deuce
      newGames.push(newGame as GameScore);
      adjustSet([...newGames]);
      newGames.push([0, 0]);
      setGames(newGames);
      return;
    }
    newGames.push(newGame as GameScore);
    setGames(newGames);
  };

  const handleFirstService: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { currentTarget: target } = event;
    setFirstService(+target.value as Service);
  }
  const handleSecondService: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { currentTarget: target } = event;
    setSecondService(+target.value as Service);
  }

  return (
    <>
      <Scoreboard
        doubles={players}
        firstService={firstService}
        secondService={secondService}
        sets={sets}
        games={games}
      />
      <Controls doubles={players} handlePoint={handlePoint} handleFirst={handleFirstService} handleSecond={handleSecondService} firstService={firstService} secondService={secondService}/>
    </>
  );
}
