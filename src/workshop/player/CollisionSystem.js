import { WALKABLE_BOUNDS, COLLIDERS, getPlayerRadius } from './RoomColliders';

/**
 * Checks a proposed position against all colliders and room boundaries.
 * Handles sliding along walls instead of getting stuck.
 * 
 * @param {number} currentX 
 * @param {number} currentZ 
 * @param {number} nextX 
 * @param {number} nextZ 
 * @returns {{x: number, z: number}} The adjusted position after collision resolution.
 */
export function resolveCollision(currentX, currentZ, nextX, nextZ) {
  const radius = getPlayerRadius();

  // Helper to check if a point + radius intersects an AABB
  const isColliding = (x, z, aabb) => {
    return (
      x + radius > aabb.min.x &&
      x - radius < aabb.max.x &&
      z + radius > aabb.min.z &&
      z - radius < aabb.max.z
    );
  };

  let finalX = nextX;
  let finalZ = nextZ;

  // 1. Constrain to room boundaries (walkable area)
  if (finalX - radius < WALKABLE_BOUNDS.min.x) finalX = WALKABLE_BOUNDS.min.x + radius;
  if (finalX + radius > WALKABLE_BOUNDS.max.x) finalX = WALKABLE_BOUNDS.max.x - radius;
  if (finalZ - radius < WALKABLE_BOUNDS.min.z) finalZ = WALKABLE_BOUNDS.min.z + radius;
  if (finalZ + radius > WALKABLE_BOUNDS.max.z) finalZ = WALKABLE_BOUNDS.max.z - radius;

  // 2. Check collision against obstacles
  // We check X and Z axis separately to allow "sliding" against a wall
  let colX = false;
  let colZ = false;

  for (let box of COLLIDERS) {
    if (isColliding(finalX, currentZ, box)) {
      colX = true;
    }
    if (isColliding(currentX, finalZ, box)) {
      colZ = true;
    }
  }

  // If moving along X causes collision, revert X. Same for Z.
  if (colX) finalX = currentX;
  if (colZ) finalZ = currentZ;

  // Corner case: if moving diagonally hits a corner where checking X and Z independently doesn't collide, 
  // but checking them together DOES collide.
  if (!colX && !colZ) {
    for (let box of COLLIDERS) {
      if (isColliding(finalX, finalZ, box)) {
        // Just cancel the movement entirely to avoid getting stuck in the corner
        finalX = currentX;
        finalZ = currentZ;
        break;
      }
    }
  }

  return { x: finalX, z: finalZ };
}
