import chroma from 'chroma-js';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useGameContext } from './GameContext';
import { useMousePosition } from './useMousePosition';
import { calculateDistanceToMouse, generateRandomNumber } from './utils';

type Props = {
  x: number;
  y: number;
  onClick(): void;
};

export default function Block({ x, y, onClick }: Props) {
  const gameContext = useGameContext();
  const mousePosition = useMousePosition();
  const { blocks } = gameContext.data;
  const { config } = gameContext;
  const block = { ...blocks[x][y] };

  const position = {
    x: (x + 0.5) * config.blockWidth,
    y: (y + 0.5) * config.blockHeight + 200,
  };

  const { distance, distanceRatio, isWithinRange } = calculateDistanceToMouse(
    position,
    mousePosition,
    config.maxDistance
  );

  useEffect(() => {
    const interval = setInterval(() => {
      block.health = generateRandomNumber() * 100;
      gameContext.updateBlock(x, y, block);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: isWithinRange
          ? config.blockWidth / 4
          : config.blockWidth / 2,
        cursor: 'pointer',
        position: 'absolute',
        backgroundColor: chroma.mix('red', 'green', block.health / 100).hex(),
        left: x * config.blockWidth,
        top: y * config.blockHeight,
        width: config.blockWidth,
        height: config.blockHeight,
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: chroma
            .mix('black', 'white', 1.0 - Math.pow(distanceRatio, 1 / 5))
            .hex(),
          left: config.blockWidth / 4,
          top: config.blockHeight / 4,
          width: config.blockWidth / 2,
          height: config.blockHeight / 2,
          border: `5px solid ${chroma
            .mix('black', 'white', 1.0 - distanceRatio)
            .hex()}`,
          borderRadius: isWithinRange ? '50%' : 0,
        }}
      ></div>
    </div>
  );
}
