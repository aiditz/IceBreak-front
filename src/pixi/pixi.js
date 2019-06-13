import * as PIXI from 'pixi.js';
import layerIcePieces from './layerIcePieces';
import layerBackground from './layerBackground';
import layerShips from './layerShips';
import pixiHelpers from './helpers';
import config from '../common/config';

const layers = [
  layerBackground,
  layerIcePieces,
  layerShips,
];

let app;
let inited = false;
let initHandlers = [];

export default {
  get app() {
    return app;
  },

  get inited() {
    return inited;
  },

  init() {
    const pixelRatio = pixiHelpers.getPixelRatio();

    app = new PIXI.Application({
      width: config.mapWidth * pixelRatio,
      height: config.mapHeight * pixelRatio,
      transparent: true
    });

    window.pixi = this;

    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.view.style['touch-action'] = 'auto';
    app.view.style['width'] = '100%';
    app.view.style['height'] = '100%';
    // app.view.style['transform'] = `scale(${1/pixelRatio})`;
    // app.view.style['transform-origin'] = 'top left';

    inited = true;

    layers.forEach(layer => {
      layer.resources.forEach(resource => {
        app.loader.add(...resource);
      });
    });

    app.loader.load(() => {
      console.log('pixi loader done');

      layers.forEach(layer => {
        const container = new PIXI.Container();
        layer.init(app, container);
        app.stage.addChild(container);
      });

      initHandlers.forEach(fn => fn(app));
      initHandlers = [];
    });

    console.log('pixi init.done');
  },

  addInitHandler(fn) {
    if (inited) {
      fn(app);
      return;
    }

    initHandlers.push(fn);
  },
};
