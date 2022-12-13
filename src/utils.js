import * as THREE from 'three';

export const onBeforeRender = (function () {
  const vector = new THREE.Vector3();

  return function onBeforeRender(renderer, scene, camera, geometry, material, group) {
    // this is one way. adapt to your use case.
    if (vector.subVectors(camera.position, this.position).dot(this.userData.normal) < 0) {
      geometry.setDrawRange(0, 0);
    }
  };
})();

export const onAfterRender = function (renderer, scene, camera, geometry, material, group) {
  geometry.setDrawRange(0, Infinity);
};

export const hexToHexDecimal = (hex) => {
  return Number(hex.toString().replace('#', '0x'));
}