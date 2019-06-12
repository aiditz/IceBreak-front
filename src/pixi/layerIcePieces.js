import * as PIXI from 'pixi.js';
import pixiHelpers from './helpers';

let app;
let container;
let ices;

const MAX_FLUCTUATION_RANGE = 7;
const MAX_VANGLE = 0.5;
const FLUCTUATION_TIME_FACTOR = 6; // greater -> slower

function fluctuate(p, delta) {
  /*
  const maxRange = pixiHelpers.translateXY(MAX_FLUCTUATION_RANGE);
  let dx;
  let dy;

  if (Math.abs(p.x - p.cx) > maxRange) {
    dx = (p.cx - p.x) / MAX_FLUCTUATION_RANGE * delta / FLUCTUATION_TIME_FACTOR;
  } else {
    dx = (Math.random() - 0.5) * delta / FLUCTUATION_TIME_FACTOR;
  }

  if (Math.abs(p.y - p.cy) > maxRange) {
    dy = (p.cy - p.y) / MAX_FLUCTUATION_RANGE * delta / FLUCTUATION_TIME_FACTOR;
  } else {
    dy = (Math.random() - 0.5) * delta / FLUCTUATION_TIME_FACTOR;
  }

  p.position = {
    x: p.x + pixiHelpers.translateXY(dx),
    y: p.y + pixiHelpers.translateXY(dy),
  };
  */

  p.vangle += (Math.random() - 0.5) * delta / 10;

  if (p.vangle > MAX_VANGLE) {
    p.vangle = MAX_VANGLE;
  } else if (p.vangle < -MAX_VANGLE) {
    p.vangle = -MAX_VANGLE;
  }

  p.angle += p.vangle * delta;
}

function forEachIcePiece(fn) {
  if (!ices) {
    return;
  }

  let counter = 0;

  for (let i = 0; i < ices.length; i++) {
    for (let j = 0; j < ices[i].length; j++) {
      fn(container.children[counter], ices[i][j], i, j);
      counter++;
    }
  }
}

export default {
  resources: [
    ['icePiece1', '/img/ice/1.svg.32x32.png'],
    ['icePiece2', '/img/ice/2.svg.32x32.png'],
    ['icePiece3', '/img/ice/3.svg.32x32.png'],
    ['icePiece4', '/img/ice/4.svg.32x32.png'],
    ['icePiece5', '/img/ice/5.svg.32x32.png'],
    ['icePiece6', '/img/ice/6.svg.32x32.png'],
    ['icePiece7', '/img/ice/7.svg.32x32.png'],
    ['icePiece8', '/img/ice/8.svg.32x32.png'],
    ['icePiece9', '/img/ice/9.svg.32x32.png'],
    ['icePiece10', '/img/ice/10.svg.32x32.png'],
  ],
  init(_app) {
    app = _app;

    this.render(ices);

    app.ticker.add(delta => {
      forEachIcePiece((p, value) => {
        if (!p || !value) {
          return;
        }

        fluctuate(p, delta);
      });
    });
  },

  createPieces() {
    container = new PIXI.Container();

    forEachIcePiece((icePiece, alpha, i, j) => {
      const texture = app.loader.resources['icePiece' + (((i + j) % 10) + 1)].texture;
      icePiece = new PIXI.Sprite(texture);

      icePiece.scale = pixiHelpers.translateScale(0.75);
      icePiece.x = pixiHelpers.translateCol(j, i);
      icePiece.y = pixiHelpers.translateRow(i);
      icePiece.cx = icePiece.x;
      icePiece.cy = icePiece.y;
      icePiece.vx = 0;
      icePiece.vy = 0;
      icePiece.vangle = 0;
      icePiece.alpha = ices[i][j] / 100;
      icePiece.anchor.set(0.25);
      container.addChild(icePiece);
    });

    app.stage.addChild(container);
  },

  render(_ices) {
    if (!_ices || !_ices.length) {
      return;
    }

    ices = _ices;

    if (!app) {
      return;
    }

    if (!container) {
      this.createPieces();
    } else {
      forEachIcePiece((icePiece, alpha, i, j) => {
        icePiece.alpha = ices[i][j] / 100;
      });
    }
  }
};
