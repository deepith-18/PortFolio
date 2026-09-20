import { useState, useEffect, useRef } from 'react';

export default function useKeyboardControls() {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  // Track raw jump press with a ref so PlayerController can consume it once
  const jumpPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':
          setKeys((k) => ({ ...k, forward: true })); break;
        case 'KeyA': case 'ArrowLeft':
          setKeys((k) => ({ ...k, left: true })); break;
        case 'KeyS': case 'ArrowDown':
          setKeys((k) => ({ ...k, backward: true })); break;
        case 'KeyD': case 'ArrowRight':
          setKeys((k) => ({ ...k, right: true })); break;
        case 'ShiftLeft': case 'ShiftRight':
          setKeys((k) => ({ ...k, sprint: true })); break;
        case 'Space':
          e.preventDefault(); // stop page scroll
          jumpPressed.current = true;
          setKeys((k) => ({ ...k, jump: true }));
          break;
        default: break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':
          setKeys((k) => ({ ...k, forward: false })); break;
        case 'KeyA': case 'ArrowLeft':
          setKeys((k) => ({ ...k, left: false })); break;
        case 'KeyS': case 'ArrowDown':
          setKeys((k) => ({ ...k, backward: false })); break;
        case 'KeyD': case 'ArrowRight':
          setKeys((k) => ({ ...k, right: false })); break;
        case 'ShiftLeft': case 'ShiftRight':
          setKeys((k) => ({ ...k, sprint: false })); break;
        case 'Space':
          setKeys((k) => ({ ...k, jump: false }));
          break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { keys, jumpPressed };
}
