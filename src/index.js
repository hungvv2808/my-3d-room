import '../scss/style.scss';
import { Processes } from './processes';

const processes = new Processes();

processes.init();
animate();

function animate() {
  processes.render();
  requestAnimationFrame(animate);
}