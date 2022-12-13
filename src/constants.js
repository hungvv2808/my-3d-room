const COLOR = {
  BACKGROUND_COLOR: '#4285F4',
  WALL_COLOR: '#F4B400',
  FLOOR_COLOR: '#F4B40012',
  AMBIENT_LIGHT_COLOR: 0x444444,
  POINT_LIGHT_COLOR: 0xffffff,
}

const DATA = {
  INTENSITY_LIGHT: 0.8,
  CAMERA: {
    FOV: 50,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      VECTOR_X: 50,
      VECTOR_Y: 10,
      VECTOR_Z: 0,
    }
  },
  WALL_GEOMETRY: {
    WIDTH: 20.25,
    HEIGHT: 10,
    DEPTH: 0.25,
  },
  FLOOR_GEOMETRY: {
    WIDTH: 20.25,
    HEIGHT: 20.25,
    DEPTH: 0.25,
  },
  MATRIXS: {
    WALL: [
      { position: [0, 0, 10], rotation: [0, 0, 0], vector: [0, 0, -1] },
      { position: [0, 0, -10], rotation: [0, 0, 0], vector: [0, 0, 1] },
      { position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [-1, 0, 0] },
      { position: [-10, 0, 0], rotation: [0, -Math.PI / 2, 0], vector: [1, 0, 0] },
    ],
    FLOOR: [
      { position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0], vector: [0, 1, 0] },
    ],
  }
}

export const CONST = {
  ...COLOR,
  ...DATA,
};