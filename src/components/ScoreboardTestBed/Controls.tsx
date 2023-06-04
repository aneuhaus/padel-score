import { MouseEventHandler, ChangeEventHandler } from "react";
import { Double, Player, Service } from "../Scoreboard/types";

export default function Controls(props: {
  handlePoint: MouseEventHandler<HTMLButtonElement>;
  handleFirst: ChangeEventHandler<HTMLSelectElement>;
  handleSecond: ChangeEventHandler<HTMLSelectElement>;
  firstService: Service;
  secondService: Service;
  doubles: Double[];
}) {
  const {
    handlePoint,
    handleFirst,
    handleSecond,
    firstService,
    secondService,
    doubles,
  } = props;
  const players = [
    ...doubles.reduceRight((players: Player[], i: Double) => {
      return [i.left as Player, i.right as Player, ...players];
    }, []),
  ];
  return (
    <div className="controls">
      <form action="">
        <fieldset>
          <h3>First to Serve</h3>
          <select
            name="first-service"
            id="first-service"
            onChange={handleFirst}
          >
            {players.map((player: Player, i: number) => (
              <option value={i} selected={firstService === i}>
                {player.name}
              </option>
            ))}
          </select>
          <h3>Second to Serve</h3>
          <select
            name="second-service"
            id="second-service"
            onChange={handleSecond}
          >
            {players.map((player: Player, i: number) => (
              <option
                value={i}
                selected={secondService === i}
                disabled={
                  firstService === i ||
                  ([0, 1].includes(i) && [0, 1].includes(firstService)) ||
                  ([2, 3].includes(i) && [2, 3].includes(firstService))
                }
              >
                {player.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <h3>Point</h3>
          <label htmlFor="">
            {doubles.map((double, i) => {
              return (
                <>
                  {i > 0 && <span></span>}
                  <button
                    onClick={handlePoint}
                    key={i}
                    className={`double${i + 1}`}
                  >
                    {double.left.code.toUpperCase()} /{" "}
                    {double.right.code.toUpperCase()}
                  </button>
                </>
              );
            })}
          </label>
        </fieldset>
      </form>
    </div>
  );
}
