import * as THREE from 'three';

let woodTextureCache = null;
let concreteTextureCache = null;

export function getWoodTexture() {
  if (woodTextureCache) return woodTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#423020';
  ctx.fillRect(0, 0, 128, 128);

  const imgData = ctx.getImageData(0, 0, 128, 128);
  const data = imgData.data;

  for (let y = 0; y < 128; y++) {
    const grain = Math.sin(y * 0.16) * 10 + (Math.random() - 0.5) * 12;
    for (let x = 0; x < 128; x++) {
      const idx = (y * 128 + x) * 4;
      data[idx] = Math.min(255, Math.max(0, 68 + grain));
      data[idx + 1] = Math.min(255, Math.max(0, 48 + grain * 0.7));
      data[idx + 2] = Math.min(255, Math.max(0, 32 + grain * 0.5));
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  woodTextureCache = texture;
  return texture;
}

export function getConcreteTexture() {
  if (concreteTextureCache) return concreteTextureCache;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#22252a';
  ctx.fillRect(0, 0, 128, 128);

  const imgData = ctx.getImageData(0, 0, 128, 128);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, 35 + noise));
    data[i + 1] = Math.min(255, Math.max(0, 37 + noise));
    data[i + 2] = Math.min(255, Math.max(0, 42 + noise));
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  concreteTextureCache = texture;
  return texture;
}
