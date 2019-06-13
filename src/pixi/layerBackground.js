import * as PIXI from 'pixi.js';
import pixiHelpers from './helpers';

export default {
  resources: [
    ['bg', '/img/LayerBackground.svg'],
  ],

  init(app, container) {
    const texture = app.loader.resources['bg'].texture;
    const bg = new PIXI.Sprite(texture);
    bg.scale = pixiHelpers.translateScale(1);
    container.addChild(bg);
  },
};
