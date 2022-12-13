import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { CONST } from './constants';
import * as utils from './utils';

export const setRender = () => {
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(CONST.BACKGROUND_COLOR));
  document.body.appendChild(renderer.domElement);

  return renderer;
}

export const setCamera = () => {
  let camera = new THREE.PerspectiveCamera(
    CONST.CAMERA.FOV,
    CONST.CAMERA.ASPECT,
    CONST.CAMERA.NEAR,
    CONST.CAMERA.FAR,
  );
  camera.position.set(
    CONST.CAMERA.POSITION.VECTOR_X,
    CONST.CAMERA.POSITION.VECTOR_Y,
    CONST.CAMERA.POSITION.VECTOR_Z,
  );

  return camera;
}

export const setControls = (camera, renderDom) => {
  let controls = new OrbitControls(camera, renderDom);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.maxPolarAngle = Math.PI / 2;

  return controls;
}

export const createBoxGeometry = (isFloor = false, isHideFirstView = true) => {
  const meshs = [];
  const matrixs = !isFloor ? CONST.MATRIXS.WALL : CONST.MATRIXS.FLOOR;
  const geometryData = !isFloor ? CONST.WALL_GEOMETRY : CONST.FLOOR_GEOMETRY;
  const color = !isFloor ? CONST.WALL_COLOR : CONST.FLOOR_COLOR;

  let geometry = new THREE.BoxGeometry(geometryData.WIDTH, geometryData.HEIGHT, geometryData.DEPTH);
  let material = new THREE.MeshLambertMaterial({ color });
  matrixs.forEach(matrix => {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(matrix.position[0], matrix.position[1], matrix.position[2]);
    mesh.rotation.set(matrix.rotation[0], matrix.rotation[1], matrix.rotation[2]);
    mesh.userData.normal = new THREE.Vector3(matrix.vector[0], matrix.vector[1], matrix.vector[2]);
    if (isHideFirstView) {
      mesh.onBeforeRender = utils.onBeforeRender;
    }
    mesh.onAfterRender = utils.onAfterRender;
    meshs.push(mesh);
  });

  return meshs;
}