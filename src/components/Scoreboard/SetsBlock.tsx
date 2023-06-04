import { SetScore } from "./types";

export default function SetsBlock(props: { sets: SetScore[] }) {
  const { sets } = props;
  return (
    <>
      {sets.map((set: SetScore, index: number) => {
        if(set[0] == 0 && set[1] == 0) return;
        return (
        <div className={"set" + (index == 0 ? " first" : "")} key={index}>
          <div className="score">{set[0]}</div>
          <div className="score">{set[1]}</div>
        </div>
      )})}
    </>
  );
}
