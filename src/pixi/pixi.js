import * as PIXI from 'pixi.js';
import icePieces from './icePieces.pixi';
import pixiHelpers from './helpers';
import config from '../common/config';

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
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

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

    console.log('pixi inited');
    icePieces.init(app);
    /*
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xe74c3c); // Red
    graphics.drawCircle(599, 500, 120); // drawCircle(x, y, radius)
    graphics.endFill();

    app.stage.addChild(graphics);
    */

    initHandlers.forEach(fn => fn(app));
    initHandlers = [];
  },

  addInitHandler(fn) {
    if (inited) {
      fn(app);
      return;
    }

    initHandlers.push(fn);
  },
};
