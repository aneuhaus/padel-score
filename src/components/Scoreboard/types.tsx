export type Player = {
  name: string;
  code: string;
};

export type Double = {
  left: Player;
  right: Player;
};

export type SetScore = [number, number];

export type Service = 0 | 1 | 2 | 3;

export type GameScore = [number, number];

