import { GameScore, SetScore, Service } from "./types";
export default function ModeBlock(props: {
  games: GameScore[];
  sets: SetScore[];
  tiebreak: boolean;
  firstService: Service;
  secondService: Service;
}) {
  const { games, sets, tiebreak, firstService, secondService } = props;

  const newGames = [...games];
  const newSets = [...sets];

  const game: GameScore = newGames[newGames.length - 1];
  const set: SetScore = newSets[newSets.length - 1];

  let [L, R] = game;
  let [sL, sR] = set;

  // sets in favor of Left and Right
  const [Lsets, Rsets] = [
    [...newSets].slice(1).filter((set) => set[0] > set[1]).length,
    [...newSets].slice(1).filter((set) => set[1] > set[0]).length,
  ]

  const isTiebreak = sL === 6 && sR === 6;

  //  About do win the Game
  let L2WG: boolean, R2WG: boolean;
  //  About do win the Game and the Set
  let L2WS: boolean, R2WS: boolean;
  //  About do win the Match
  let L2WM: boolean, R2WM: boolean;

  if (isTiebreak) {
    L2WG = L >= 6 && L - R >= 1;
    R2WG = R >= 6 && R - L >= 1;
    L2WS = L2WG;
    R2WS = R2WG;
    L2WM =
      sL >= 6 &&
      sL - sR >= 2 &&
      Lsets > Rsets;
    R2WM =
      sR >= 6 &&
      sR - sL >= 2 &&
      Rsets > Lsets;
  } else {
    L2WG = L >= R && L >= 3;
    R2WG = R >= L && R >= 3;
    L2WS = sL >= 5 && (sL - sR >= 1 || (sL === 6 && sR === 5));
    R2WS = sR >= 5 && (sR - sL >= 1 || (sL === 5 && sR === 6));
    L2WM =
      sL >= 5 &&
      sL - sR >= 1 &&
      sets.filter((set) => set[0] >= 6 && Math.abs(set[0] - set[1]) >= 2)
        .length >= 1;
    R2WM =
      sR >= 5 &&
      sR - sL >= 1 &&
      sets.filter((set) => set[1] >= 6 && Math.abs(set[0] - set[1]) >= 2)
        .length >= 1;
  }

  // console.log(L2WS, R2WS, L2WG, R2WG);

  const isGamePoint = L2WG || R2WG;

  const isSetPoint =
    (L2WS && L2WG) || (R2WS && R2WG) || (isTiebreak && R2WG && R2WG);

  const isMatchPoint = (L2WM && L2WG) || (R2WM && R2WG);

  const isGoldenPoint = !isTiebreak && game[0] == 3 && game[1] == 3;

  const showGamePoint = () => isGamePoint && !isSetPoint && !isGoldenPoint;
  const showSetPoint = () => isSetPoint && !isMatchPoint;
  const showMatchPoint = () => isSetPoint && isMatchPoint;
  const showGoldenPoint = () => isGoldenPoint;
  const showTiebreak = () => isTiebreak;

  const getPointsDiff = (game: GameScore) => Math.abs(game[0] - game[1]);


  return (
    <div className="mode">
      <div className={"badge tiebreak" + (showTiebreak() ? " show" : "")}>
        Tiebreak
      </div>
      <div className={"badge golden" + (showGoldenPoint() ? " show" : "")}>
        Golden Point
      </div>
      <div className={"badge" + (showMatchPoint() ? " show" : "")}>
        {getPointsDiff(game) > 1 && <span>{getPointsDiff(game)} </span>}
        Match Point
      </div>
      <div className={"badge" + (showSetPoint() ? " show" : "")}>
        {getPointsDiff(game) > 1 && <span>{getPointsDiff(game)} </span>}
        Set Point
      </div>
      <div className={"badge" + (showGamePoint() ? " show" : "")}>
        Game Point
      </div>
    </div>
  );
}
