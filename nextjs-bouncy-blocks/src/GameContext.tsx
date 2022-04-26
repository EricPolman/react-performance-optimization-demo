import React, { useContext } from 'react';

export interface GameConfig {
  rows: number;
  columns: number;
  blockWidth: number;
  blockHeight: number;
  maxDistance: number;
}

export interface GameBlock {
  health: number;
}

export interface GameData {
  blocks: GameBlock[][];
}

interface GameContextValue {
  config: GameConfig;
  data: GameData;
  setConfig(newConfig: GameConfig): void;
  updateBlock(x: number, y: number, block: GameBlock): void;
  updateBlocks(blocks: GameBlock[][]): void;
}

const GameContext = React.createContext<GameContextValue | null>(null);

export const GameContextProvider = GameContext.Provider;

export const useGameContext = () => {
  const context = useContext(GameContext)!;
  return context;
};
