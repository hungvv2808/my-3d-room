import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { CONST } from "./constants";
import { Figure } from "./figure";
import * as utils from "./utils";

export class Processes {
  static mesh = undefined;
  static renderer = undefined;
  static scene = undefined;
  static camera = undefined;
  static controls = undefined;

  constructor() {
    this.setRender();
    this.scene = new THREE.Scene();
    this.setCamera();
    this.setControls();
  }

  getter() {
    return {
      mesh: this.mesh,
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      controls: this.controls,
    };
  }

  init() {
    // init scene and camera
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(CONST.LIGHT_COLOR));

    this.camera.add(
      new THREE.PointLight(CONST.LIGHT_COLOR, CONST.INTENSITY_LIGHT)
    );
    this.scene.add(this.camera);

    // create wall and floor
    const walls = this.createBoxGeometry(false, true);
    const floors = this.createBoxGeometry(true);
    const meshs = walls.concat(floors);
    meshs.forEach((mesh) => {
      this.scene.add(mesh);
    });

    // create model 3d
    const figure = new Figure({ 
      x: 1, 
      ry: -5, 
      z: 1
    });
    this.scene.add(figure.getter().floorGroup);
    figure.init();
  }

  setRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new THREE.Color(CONST.BACKGROUND_COLOR));
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      CONST.CAMERA.FOV,
      CONST.CAMERA.ASPECT,
      CONST.CAMERA.NEAR,
      CONST.CAMERA.FAR
    );
    this.camera.position.set(
      CONST.CAMERA.POSITION.VECTOR_X,
      CONST.CAMERA.POSITION.VECTOR_Y,
      CONST.CAMERA.POSITION.VECTOR_Z
    );
  }

  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  createBoxGeometry(isFloor = false, isHideFirstView = true) {
    const meshs = [];
    const matrixs = !isFloor ? CONST.MATRIXS.WALL : CONST.MATRIXS.FLOOR;
    const geometryData = !isFloor ? CONST.WALL_GEOMETRY : CONST.FLOOR_GEOMETRY;
    const color = !isFloor ? CONST.WALL_COLOR : CONST.FLOOR_COLOR;

    let geometry = new THREE.BoxGeometry(
      geometryData.WIDTH,
      geometryData.HEIGHT,
      geometryData.DEPTH
    );
    let material = new THREE.MeshLambertMaterial({ color });
    matrixs.forEach((matrix) => {
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        matrix.position[0],
        matrix.position[1],
        matrix.position[2]
      );
      mesh.rotation.set(
        matrix.rotation[0],
        matrix.rotation[1],
        matrix.rotation[2]
      );
      mesh.userData.normal = new THREE.Vector3(
        matrix.vector[0],
        matrix.vector[1],
        matrix.vector[2]
      );
      if (isHideFirstView) {
        mesh.onBeforeRender = utils.onBeforeRender;
      }
      mesh.onAfterRender = utils.onAfterRender;
      meshs.push(mesh);
    });

    return meshs;
  }
}
