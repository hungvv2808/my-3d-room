import * as THREE from "three";
import { random, degreesToRadians } from "./utils";

export class Model {
  static floorGroup = undefined;

  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ...params,
    };

    this.dimensions = {
      head: random(2, 3),
      bodyWidth: random(1, 3),
      bodyHeight: random(2, 3),
      legHeight: random(3, 4),
    };

    // Create group and add to scene
    this.floorGroup = new THREE.Group();
    this.group = new THREE.Group();
    this.floorGroup.add(this.group);
    this.floorGroup.name = this.params.name || 'object';

    // Position according to params
    this.group.position.set(this.params.x, this.params.y, this.params.z);

    // Material
    this.headHue = random(0, 260);
    this.bodyHue = random(0, 260);
    this.headMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.headHue}, 36%, 83%)`,
    });
    this.bodyMaterial = new THREE.MeshLambertMaterial({
      color: `hsl(${this.bodyHue}, 85%, 40%)`,
    });
  }

  getter() {
    return {
      floorGroup: this.floorGroup,
    }
  }

  createBody() {
    this.body = new THREE.Group();
    const geometry = new THREE.BoxGeometry(
      this.dimensions.bodyWidth,
      this.dimensions.bodyHeight,
      this.dimensions.bodyWidth
    );
    const bodyMain = new THREE.Mesh(geometry, this.bodyMaterial);

    this.body.add(bodyMain);
    this.group.add(this.body);

    this.createLegs();
  }

  createHead() {
    const headSize = this.dimensions.head;
    // Create a new group for the head
    this.head = new THREE.Group();

    // Create the main cube of the head and add to the group
    const geometry = new THREE.BoxGeometry(headSize, headSize, headSize);
    const headMain = new THREE.Mesh(geometry, this.headMaterial);
    this.head.add(headMain);

    // Add the head group to the figure
    this.group.add(this.head);

    // Position the head group
    this.head.position.y =
      this.dimensions.bodyHeight * 0.5 + this.dimensions.head * 0.5 + 0.4;

    // Add the eyes
    this.createEyes();
  }

  createArms() {
    const height = random(2, 3);
    const width = 0.6;
    const xPos = this.dimensions.bodyWidth * 0.5 + width;

    const rz = random(1, 180);

    for (let i = 0; i < 2; i++) {
      const armGroup = new THREE.Group();
      const geometry = new THREE.BoxGeometry(width, height, width);
      const arm = new THREE.Mesh(geometry, this.headMaterial);
      const m = i % 2 === 0 ? 1 : -1;

      // Add arm to group
      armGroup.add(arm);

      // Add group to figure
      this.body.add(armGroup);

      // Translate the arm by half the height
      arm.position.y = height * -0.5;

      // Position the arm relative to the figure
      armGroup.position.x = m * xPos;
      armGroup.position.y = this.dimensions.bodyHeight * 0.5 - 0.5;

      // Rotate the arm
      armGroup.rotation.z = degreesToRadians(rz * m);
    }
  }

  createEyes() {
    const eyes = new THREE.Group();
    const r = random(0.35, 0.6, true);
    const geometry = new THREE.SphereGeometry(r, 12, 8);
    const material = new THREE.MeshLambertMaterial({ color: 0x44445c });

    // Position eyes at random, but must be within the head width, and not too close together
    const eyeX = random(r + 0.2, this.dimensions.head * 0.5 - r, true);
    const eyeY = random(0, 1, true);

    for (let i = 0; i < 2; i++) {
      const eye = new THREE.Mesh(geometry, material);
      const m = i % 2 === 0 ? 1 : -1;

      eyes.add(eye);
      eye.position.x = eyeX * m;
    }

    this.head.add(eyes);

    eyes.position.y = eyeY * -1;
    eyes.position.z = this.dimensions.head * 0.5;
  }

  createLegs() {
    const width = 0.6;
    const legs = new THREE.Group();
    const geometry = new THREE.BoxGeometry(
      width,
      this.dimensions.legHeight,
      width
    );

    for (let i = 0; i < 2; i++) {
      const leg = new THREE.Mesh(geometry, this.headMaterial);
      const m = i % 2 === 0 ? 1 : -1;

      legs.add(leg);
      leg.position.x = m * 0.7;
      leg.position.y = this.dimensions.legHeight * -0.5;
    }

    this.group.add(legs);
    legs.position.y = this.dimensions.bodyHeight * -0.5;

    this.body.add(legs);
  }

  positionVertically() {
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(this.floorGroup);
    const size = boundingBox.getSize(new THREE.Vector3());

    this.group.position.y = size.y * 0.5;
    this.floorGroup.position.y = this.params.y;
  }

  init() {
    this.createBody();
    this.createHead();
    this.createArms();
    this.positionVertically();
  }
}
