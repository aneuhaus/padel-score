import { GameScore } from "./types";

export default function GamesBlock(props: {
  games: GameScore[];
  tiebreak: boolean;
}) {
  const { games, tiebreak } = props;
  const currentGame = games[games.length - 1];
  const isGoldenPoint = currentGame[0] == 3 && currentGame[1] == 3;

  const pointsMap = !tiebreak
    ? (point: number) => [0, 15, 30, 40, "game"][point]
    : (point: number) => point;

  return (
    <div className="games">
      <div className={"game" + (isGoldenPoint && !tiebreak ? " golden" : "")}>
        <div className="score">{pointsMap(currentGame[0])}</div>
        <div className="score">{pointsMap(currentGame[1])}</div>
      </div>
    </div>
  );
}
