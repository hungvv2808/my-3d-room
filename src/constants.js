const COLOR = {
  BACKGROUND_COLOR: '#4285F4',
  WALL_COLOR: '#F4B400',
  FLOOR_COLOR: '#DB4437',
  LIGHT_COLOR: 0xffffff,
}

const DATA = {
  INTENSITY_LIGHT: 0.1,
  CAMERA: {
    FOV: 60,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      VECTOR_X: 5,
      VECTOR_Y: 50,
      VECTOR_Z: 0,
    }
  },
  WALL_GEOMETRY: {
    WIDTH: 40.25,
    HEIGHT: 10,
    DEPTH: 0.25,
  },
  FLOOR_GEOMETRY: {
    WIDTH: 40.25,
    HEIGHT: 40.25,
    DEPTH: 0.25,
  },
  MATRIXS: {
    WALL: [
      { position: [0, 0, 20], rotation: [0, 0, 0], vector: [0, 0, -1] },
      { position: [0, 0, 10], rotation: [0, 0, 0], vector: [0, 0, -1] },
      { position: [0, 0, -20], rotation: [0, 0, 0], vector: [0, 0, 1] },
      { position: [0, 0, -10], rotation: [0, 0, 0], vector: [0, 0, 1] },
      { position: [-20, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [1, 0, 0] },
      { position: [-10, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [1, 0, 0] },
      { position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [-1, 0, 0] },
      { position: [20, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [-1, 0, 0] },
      // { position: [0, 0, 0], rotation: [0, -Math.PI / 10, 0], vector: [1, 0, 0] },
    ],
    FLOOR: [
      { position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0], vector: [0, 1, 0] },
    ],
  },
  ARROW_KEY_CODE: {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
  }
}

export const CONST = {
  ...COLOR,
  ...DATA,
};