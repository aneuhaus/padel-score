import { Double } from "./types";
import { CSSProperties } from "react";

export default function PlayersBlock(props: {
  doubles: Double[];
  serving: number;
  marker: string;
}) {
  const { doubles, serving, marker } = props;
  let playerCounter = 0;
  return (
      <div className="players">
        {doubles.map((double: Double, index: number) => {
          return (
            <div className="double" key={index}>
              <div
                className={
                  "player" + (serving === index * 2 ? " serving" : "")
                }
                data-marker={marker}
              >
                {double.left.code}
              </div>
              <div>/</div>
              <div
                className={
                  "player" + (serving === index * 2 + 1 ? " serving" : "")
                }
                data-marker={marker}
              >
                {double.right.code}
              </div>
            </div>
          );
        })}
      </div>
  );
}
