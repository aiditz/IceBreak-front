import * as PIXI from 'pixi.js';

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

  init(el) {
    app = new PIXI.Application({
      width: el.scrollWidth,
      height: el.scrollHeight,
      transparent: true
    });

    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.view.style['touch-action'] = 'auto';

    inited = true;

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
