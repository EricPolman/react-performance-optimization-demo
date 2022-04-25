import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useGameContext } from './GameContext';
import { findNthPrime } from './utils';

type Props = {};

export default function Controls({}: Props) {
  const { config, setConfig } = useGameContext();
  const [nthPrime, setNthPrime] = useState<number>(1000000);
  const [useWorker, setUseWorker] = useState<boolean>(false);

  const workerRef = useRef<Worker>();
  const handleWork = useCallback(async () => {
    if (useWorker) {
      workerRef.current!.postMessage(nthPrime);
    } else {
      const prime = findNthPrime(nthPrime);

      alert(`Single thread Response => ${prime}`);
    }
  }, [nthPrime, useWorker]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/example.ts', import.meta.url)
    );
    workerRef.current.onmessage = (evt) =>
      alert(`WebWorker Response => ${evt.data}`);

    return () => {
      workerRef.current!.terminate();
    };
  }, []);

  return (
    <div className="card m-5">
      <div className="flex flex-row flex-wrap card-container">
        <span className="p-float-label">
          <InputText
            type="number"
            value={config.blockWidth}
            onChange={(e) =>
              setConfig({ ...config, blockWidth: +e.target.value })
            }
          />
          <label htmlFor="in">Block Width</label>
        </span>
        <span className="p-float-label">
          <InputText
            type="number"
            value={config.blockHeight}
            onChange={(e) =>
              setConfig({ ...config, blockHeight: +e.target.value })
            }
          />
          <label htmlFor="in">Block Height</label>
        </span>
        <span className="p-float-label">
          <InputText
            type="number"
            value={config.rows}
            onChange={(e) => setConfig({ ...config, rows: +e.target.value })}
          />
          <label htmlFor="in">Rows</label>
        </span>
        <span className="p-float-label">
          <InputText
            type="number"
            value={config.columns}
            onChange={(e) => setConfig({ ...config, columns: +e.target.value })}
          />
          <label htmlFor="in">Columns</label>
        </span>
        <span className="p-float-label">
          <InputText
            type="number"
            value={config.maxDistance}
            onChange={(e) =>
              setConfig({ ...config, maxDistance: +e.target.value })
            }
          />
          <label htmlFor="in">Max distance</label>
        </span>
      </div>
      <div className="flex flex-row flex-wrap card-container mt-5">
        <span className="p-float-label">
          <InputText
            type="number"
            value={nthPrime}
            onChange={(e) => setNthPrime(+e.target.value)}
          />
          <label htmlFor="in">Nth prime</label>
        </span>
        <Button onClick={handleWork}>Calculate Nth prime</Button>
        <Button onClick={() => setUseWorker(!useWorker)}>
          Use {useWorker ? 'single thread' : 'web worker'}
        </Button>
      </div>
    </div>
  );
}
