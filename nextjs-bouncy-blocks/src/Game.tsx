import React, { useEffect } from 'react';
import Block from './Block';
import { GameBlock, GameConfig, GameData, useGameContext } from './GameContext';
import { calculateDistance, generateRandomNumber } from './utils';

type Props = {
  gameData: GameData;
  gameConfig: GameConfig;
  frame: number;
  getMousePosition(): { x: number; y: number };
};

export default function Game({
  gameData,
  gameConfig,
  frame,
  getMousePosition,
}: Props) {
  const gameContext = useGameContext();
  const mousePosition = getMousePosition();

  const onClickBlock = (x: number, y: number) => {
    for (let _x = 0; _x < gameContext.config.columns; ++_x) {
      for (let _y = 0; _y <= gameContext.config.rows; ++_y) {
        const { isWithinRange } = calculateDistance(
          {
            x: _x * gameContext.config.blockWidth,
            y: _y * gameContext.config.blockHeight,
          },
          {
            x: x * gameContext.config.blockWidth,
            y: y * gameContext.config.blockHeight,
          },
          gameContext.config.maxDistance
        );
        if (isWithinRange) {
          gameContext.updateBlock(_x, _y, {
            ...gameData.blocks[_x][_y],
            health: 0,
          });
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const blocks: GameBlock[][] = [];
      for (let x = 0; x < gameConfig.columns; ++x) {
        const row: GameBlock[] = [];
        for (let y = 0; y < gameConfig.rows; ++y) {
          row.push({
            health: generateRandomNumber() * 100,
          });
        }
        blocks.push(row);
      }
      gameContext.updateBlocks(blocks);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [gameContext.config]);

  return (
    <>
      <div style={{ position: 'absolute', top: 200 }}>
        {gameData.blocks.map((col, x) =>
          col.map((_, y) => (
            <Block
              onClick={() => onClickBlock(x, y)}
              x={x}
              y={y}
              getMousePosition={getMousePosition}
              key={`x:${x},y:${y}`}
            />
          ))
        )}
      </div>
      <div style={{ position: 'fixed', bottom: -30, right: -200 }}>
        X: {mousePosition.x} | Y: {mousePosition.y}
      </div>
    </>
  );
}
