import '../scss/style.scss';
import { Processes } from './processes';

const processes = new Processes();
const {renderer, scene, camera, controls} = processes.getter();

processes.init();
animate();

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}