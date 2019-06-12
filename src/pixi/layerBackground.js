import * as PIXI from 'pixi.js';
import pixiHelpers from './helpers';

let app;
let container;

export default {
  resources: [
    ['bg', '/img/LayerBackground.svg'],
  ],

  init(_app) {
    app = _app;

    const texture = app.loader.resources['bg'].texture;
    const bg = new PIXI.Sprite(texture);
    bg.scale = pixiHelpers.translateScale(1);
    app.stage.addChild(bg);
  },
};
