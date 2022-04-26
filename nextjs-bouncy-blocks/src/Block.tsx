import chroma from 'chroma-js';
import React, { useEffect, useMemo } from 'react';
import { useGameContext } from './GameContext';
import { calculateDistanceToMouse } from './utils';

type Props = {
  x: number;
  y: number;
  onClick(): void;
  getMousePosition(): { x: number; y: number };
};

export default function Block({ x, y, onClick, getMousePosition }: Props) {
  const gameContext = useGameContext();
  const mousePosition = getMousePosition();
  const { blocks } = gameContext.data;
  const { config } = gameContext;
  const block = { ...blocks[x][y] };

  const position = {
    x: (x + 0.5) * config.blockWidth - window.scrollX,
    y: (y + 0.5) * config.blockHeight + 200 - window.scrollY,
  };

  const { distance, distanceRatio, isWithinRange } = calculateDistanceToMouse(
    position,
    mousePosition,
    config.maxDistance
  );

  const bgColorOuter = useMemo(
    () => chroma.mix('red', 'green', block.health / 100).hex(),
    [block.health]
  );

  const bgColorInner = useMemo(
    () =>
      chroma.mix('black', 'white', 1.0 - Math.pow(distanceRatio, 1 / 5)).hex(),
    [distanceRatio]
  );

  const borderColorInner = useMemo(
    () => chroma.mix('black', 'white', 1.0 - distanceRatio).hex(),
    [distanceRatio]
  );

  // useEffect(() => {
  //   requestAnimationFrame(() => {})
  // }, []);

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: isWithinRange
          ? config.blockWidth / 4
          : config.blockWidth / 2,
        cursor: 'pointer',
        position: 'absolute',
        backgroundColor: bgColorOuter,
        left: x * config.blockWidth,
        top: y * config.blockHeight,
        width: config.blockWidth,
        height: config.blockHeight,
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: bgColorInner,
          left: config.blockWidth / 4,
          top: config.blockHeight / 4,
          width: config.blockWidth / 2,
          height: config.blockHeight / 2,
          border: `5px solid ${borderColorInner}`,
          borderRadius: isWithinRange ? '50%' : 0,
        }}
      ></div>
    </div>
  );
}
