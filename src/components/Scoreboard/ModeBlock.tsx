import { GameScore, SetScore } from "./types";
export default function ModeBlock(props: {
  games: GameScore[];
  sets: SetScore[];
  tiebreak: boolean;
}) {
  const { games, sets, tiebreak } = props;

  const isGamePoint =
    games[games.length - 1][0] == 3 || games[games.length - 1][1] == 3;
  const isSetPoint =
    sets[sets.length - 1][0] == 6 || sets[sets.length - 1][1] == 6;
  const isMatchPoint =
    sets[sets.length - 1][0] == 7 || sets[sets.length - 1][1] == 7;
  const isGoldenPoint =
    (!tiebreak && games[games.length - 1][0] == 3) &&
    games[games.length - 1][1] == 3;

  const newGames = [...games];
  const newSets = [...sets];
  const currentGame = newGames[newGames.length - 1];
  const currentSet = newSets[newSets.length - 1];
  let [left, right] = currentGame;
  if (Math.abs(left - right) >= 2 && (left >= 7 || right >= 7)) {
    return;
  }

  return (
    <div className="mode">
      {isGamePoint && !isSetPoint && !isGoldenPoint && (<div className="badge">Game Point</div>)}
      {isSetPoint && isMatchPoint && (<div className="badge">Set Point</div>)}
      {isMatchPoint && (<div className="badge">Match Point</div>)}
      {isGoldenPoint && (<div className="badge">Golden Point</div>)}
      {tiebreak && (<div className="badge">Tiebreak</div>)}
    </div>
  );
}
