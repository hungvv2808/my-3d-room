import '../scss/style.scss';
import * as THREE from 'three';
import { 
  onBeforeRender, 
  onAfterRender, 
  hexToHexDecimal 
} from './utils';
import { CONST } from './constants';
import * as processes from './processes';

let mesh = undefined;
let renderer = undefined;
let scene = undefined;
let camera = undefined;
let controls = undefined;

init();
animate();

function init() {
  renderer = processes.setRender();
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(CONST.AMBIENT_LIGHT_COLOR));
  
  camera = processes.setCamera();
  camera.add(new THREE.PointLight(CONST.POINT_LIGHT_COLOR, CONST.INTENSITY_LIGHT));
  scene.add(camera);

  controls = processes.setControls(camera, renderer.domElement);

  const walls = processes.createBoxGeometry();
  const floors = processes.createBoxGeometry(true);
  const meshs = walls.concat(floors);
  meshs.forEach(mesh => {
    scene.add(mesh);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}