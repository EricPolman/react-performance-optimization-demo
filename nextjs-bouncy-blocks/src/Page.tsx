import { useEffect, useState } from 'react';
import Controls from './Controls';
import {
  GameBlock,
  GameConfig,
  GameContextProvider,
  GameData,
} from './GameContext';
import Game from './Game';
import { generateRandomNumber, getMousePosition } from './utils';
import { cloneDeep } from 'lodash';

const Page = () => {
  const [frame, setFrame] = useState<number>(0);
  // // alle blocks los bijhouden en in grid plaatsen op basis van caching key
  // // canvas toepassen om uberhaupt geen components te renderen
  // // gewoon geen cloneDeep doen en see what happens
  // //

  useEffect(() => {
    setInterval(() => {
      setFrame((prev) => prev + 1);
    }, 8);
  }, []);

  const [gameConfig, setGameConfig] = useState<GameConfig>({
    rows: 10,
    columns: 10,
    blockWidth: 100,
    blockHeight: 100,
    maxDistance: 200,
  });

  const [gameData, setGameData] = useState<GameData>({ blocks: [] });

  useEffect(() => {
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
    setGameData({ blocks });
  }, [gameConfig]);

  return (
    <GameContextProvider
      value={{
        config: gameConfig,
        data: gameData,
        setConfig: setGameConfig,
        updateBlock: (x, y, block) => {
          setGameData((prevData) => {
            const updatedData = cloneDeep(prevData);
            updatedData.blocks[x][y] = block;
            return updatedData;
          });
        },
        updateBlocks: (blocks) => setGameData({ blocks }),
      }}
    >
      <div>
        <Controls />
        <Game
          frame={0}
          gameData={gameData}
          gameConfig={gameConfig}
          getMousePosition={getMousePosition}
        />
      </div>
    </GameContextProvider>
  );
};

export default Page;
