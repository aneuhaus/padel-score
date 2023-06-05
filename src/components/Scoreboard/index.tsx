import { Double, GameScore, SetScore, Service } from "./types";

import PlayersBlock from "./PlayersBlock";
import SetsBlock from "./SetsBlock";
import GamesBlock from "./GamesBlock";
import ModeBlock from "./ModeBlock";

const playerOrder = (
  firstToServe: Service = 0,
  secondToServe: Service = 3
): Service[] => {
  const order = new Array<Service>(4);
  order[0] = firstToServe;
  order[1] = secondToServe;
  order[2] =
    firstToServe === 0
      ? 1
      : firstToServe === 2
      ? 3
      : firstToServe === 3
      ? 2
      : 0;
  order[3] = [0, 1, 2, 3].filter((i:Service) => !order.includes(i))[0] as Service;

  return order as Service[];
};

export default function Scoreboard(props: {
  doubles: Double[];
  games: GameScore[];
  sets: SetScore[];
  firstService: Service;
  secondService: Service;
}) {
  const { doubles, games, sets, firstService, secondService } = props;
  const finishedGames = games.filter(
    (game) => game[0] > 3 || game[1] > 3
  ).length;
  const tiebreak =
    sets[sets.length - 1][0] === 6 && sets[sets.length - 1][1] === 6;
  const forth: number = +(finishedGames % 4);
  const order = playerOrder(firstService, secondService);

  let serving = firstService
  if(!tiebreak) serving = order[forth];
  else {
    const currentGame = games[games.length - 1];
    const tieGames = currentGame[0] + currentGame[1];
    switch(tieGames) {
      case 0:
        serving = order[0];
        break;
      case 1:
        serving = order[1];
        break;
      default:
        serving = order[((tieGames-1) % 4)];
    }
  };
  console.log("serving", serving);
  return (
    <div className={`scoreboard`}>
      <div className={`board ${games.length>1?'hasGames':''}`}>
        <PlayersBlock doubles={doubles} serving={serving} marker={"●"} />
        <SetsBlock sets={sets} />
        <GamesBlock games={games} tiebreak={tiebreak} />
      </div>
      <ModeBlock games={games} sets={sets} tiebreak={tiebreak} firstService={firstService} secondService={secondService} />
    </div>
  );
}
