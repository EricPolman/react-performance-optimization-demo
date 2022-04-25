import { useEffect, useState } from 'react';

export function useMousePosition(): { x: number; y: number } {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    });
  }, []);

  return mousePosition;
}
