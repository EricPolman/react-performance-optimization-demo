import chroma from 'chroma-js';
import React from 'react';
import Block from './Block';
import { GameConfig, GameData, useGameContext } from './GameContext';
import { useMousePosition } from './useMousePosition';
import { calculateDistance } from './utils';

type Props = {
  gameData: GameData;
  gameConfig: GameConfig;
};

export default function Game({ gameData, gameConfig }: Props) {
  const mousePosition = useMousePosition();
  const gameContext = useGameContext();

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

  return (
    <>
      <div style={{ position: 'absolute', top: 200 }}>
        {gameData.blocks.map((col, x) =>
          col.map((_, y) => (
            <Block
              onClick={() => onClickBlock(x, y)}
              x={x}
              y={y}
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
