import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";
import { CONST } from "./constants";
import { Model } from "./model";
import * as room from "./room";
import { randomString } from "./utils";

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
    // Set resize window
    this.windowResize();

    // Init scene and camera
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(CONST.LIGHT_COLOR));

    this.camera.add(
      new THREE.PointLight(CONST.LIGHT_COLOR, CONST.INTENSITY_LIGHT)
    );
    this.scene.add(this.camera);

    // Create wall and floor
    const meshs = room.createRoom();
    meshs.forEach((mesh) => {
      this.scene.add(mesh);
    });

    // Create model 3d
    this.createModelMove();
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
    this.controls.enablePan = false;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  removeEntity(object) {
    var selectedObject = this.scene.getObjectByName(object.name);
    this.scene.remove(selectedObject);
    this.render();
  }

  render(isResize = false) {
    if (isResize) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Resize render view
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Update camera
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    // Update view
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  windowResize() {
    window.addEventListener("resize", () => {
      this.render(true);
    });
  }

  createModel(modelPos) {
    let model = new Model(modelPos);
    model.init();
    let object = model.getter().floorGroup;

    return object;
  }

  createModelMove() {
    const modelPos = {
      x: 1,
      y: -5,
      z: -19,
      name: 'object_' + randomString(),
    }
    let object = this.createModel(modelPos);
    this.scene.add(object);

    window.addEventListener('keydown', (e) => {
      let isArrow = false;
      switch(e.keyCode) {
        case CONST.ARROW_KEY_CODE.UP:
          isArrow = true;
          modelPos.z += 1;
          break;
        case CONST.ARROW_KEY_CODE.RIGHT:
          isArrow = true;
          modelPos.x += 1;
          break;
        case CONST.ARROW_KEY_CODE.DOWN:
          isArrow = true;
          modelPos.z -= 1;
          break;
        case CONST.ARROW_KEY_CODE.LEFT:
          isArrow = true;
          modelPos.x -= 1;
          break;
        default:
          return;
      }

      if (isArrow) {
        this.removeEntity(object);
        modelPos.name = 'object_' + randomString();
        object = this.createModel(modelPos);
        this.scene.add(object);
      }
    });
  }
}
