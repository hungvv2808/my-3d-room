import { CONST } from './constants';
import { Figure } from './objects/figure';

export const createObject = (scene) => {
  const figure = new Figure();
  figure.init();
}

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
}