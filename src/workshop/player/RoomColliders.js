// Room Colliders — Cross-shaped building layout
// All coordinates match RoomModel.js architecture

const PLAYER_RADIUS = 0.3;

// Overall bounding box of the cross-shaped building
export const WALKABLE_BOUNDS = {
  min: { x: -18.8, z: -18.8 },
  max: { x: 18.8, z: 18.8 },
};

export const COLLIDERS = [
  // ---- 4 Outer corner blockers (the unreachable cross-corner voids) ----
  { min: { x:  7, z: -19 }, max: { x:  19, z:  -7 } },  // NE corner
  { min: { x: -19, z: -19 }, max: { x:  -7, z:  -7 } },  // NW corner
  { min: { x:  7, z:   7 }, max: { x:  19, z:  19 } },   // SE corner
  { min: { x: -19, z:   7 }, max: { x:  -7, z:  19 } },  // SW corner

  // ---- 8 Inner step blockers (between corridors and wider rooms) ----
  // N arm steps
  { min: { x: 1.5, z:  -9 }, max: { x:  7, z:  -5 } },   // NE step
  { min: { x:  -7, z:  -9 }, max: { x: -1.5, z: -5 } },  // NW step
  // S arm steps
  { min: { x: 1.5, z:   5 }, max: { x:  7, z:   9 } },   // SE step
  { min: { x:  -7, z:   5 }, max: { x: -1.5, z:  9 } },  // SW step
  // E arm steps
  { min: { x: 5, z:  -7 }, max: { x: 9, z:  -1.5 } },    // EN step
  { min: { x: 5, z:   1.5 }, max: { x: 9, z:  7 } },     // ES step
  // W arm steps
  { min: { x: -9, z:  -7 }, max: { x: -5, z:  -1.5 } },  // WN step
  { min: { x: -9, z:   1.5 }, max: { x: -5, z:   7 } },  // WS step

  // ---- Station object blockers ----
  { min: { x: -1.2, z:  -1.2 }, max: { x: 1.2, z:  1.2 } },   // Hall bulletin board
  { min: { x: -1.5, z: -15.5 }, max: { x: 1.5, z: -12.5 } },  // Projects station
  { min: { x: 12.5, z:  -1.5 }, max: { x: 15.5, z:  1.5 } },  // Skills station
  { min: { x: -1.5, z:  12.5 }, max: { x:  1.5, z: 15.5 } },  // OpenSource station
  { min: { x:-15.5, z:  -1.5 }, max: { x:-12.5, z:  1.5 } },  // Certs station
];

export function getPlayerRadius() {
  return PLAYER_RADIUS;
}
