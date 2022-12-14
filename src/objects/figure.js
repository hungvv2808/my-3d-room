import { CONST } from "../constants"
import { Processes } from "../processes";

const material = new THREE.MeshLambertMaterial({ color: CONST.LIGHT_COLOR });

export class Figure extends Processes {
	constructor(params) {
		this.params = {
			x: 0,
			y: 0,
			z: 0,
			ry: 0,
			...params
		}
		
		this.group = new THREE.Group()
    this.scene.add(this.group);
	}

  createBody() {
		const geometry = new THREE.BoxGeometry(1, 1.5, 1)
		const body = new THREE.Mesh(geometry, material)
		this.group.add(body)
	}

  init() {
    this.createBody()
  }
}