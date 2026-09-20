import * as THREE from 'three';

let woodTextureCache = null;
let concreteTextureCache = null;

export function getWoodTexture() {
  if (woodTextureCache) return woodTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Simple procedural wood grain
  ctx.fillStyle = '#4a3625';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 512; i += 4) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
    ctx.beginPath();
    ctx.moveTo(0, i + Math.random() * 10);
    ctx.bezierCurveTo(256, i + Math.random() * 20, 256, i - Math.random() * 20, 512, i + Math.random() * 10);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  woodTextureCache = texture;
  return texture;
}

export function getConcreteTexture() {
  if (concreteTextureCache) return concreteTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 10000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  concreteTextureCache = texture;
  return texture;
}
