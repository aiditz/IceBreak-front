import * as PIXI from 'pixi.js';
import helpers from '../common/helpers';

let app;
let container;
let ices;

const MAX_FLUCTUATION_RANGE = 7;
const MAX_VANGLE = 0.5;
const FLUCTUATION_TIME_FACTOR = 6; // greater -> slower

function fluctuate(p, delta) {
  if (Math.abs(p.x - p.cx) > MAX_FLUCTUATION_RANGE) {
    p.x += (p.cx - p.x) / MAX_FLUCTUATION_RANGE * delta / FLUCTUATION_TIME_FACTOR;
  } else {
    p.x += (Math.random() - 0.5) * delta / FLUCTUATION_TIME_FACTOR;
  }

  if (Math.abs(p.y - p.cy) > MAX_FLUCTUATION_RANGE) {
    p.x += (p.cy - p.y) / MAX_FLUCTUATION_RANGE * delta / FLUCTUATION_TIME_FACTOR;
  } else {
    p.y += (Math.random() - 0.5) * delta / FLUCTUATION_TIME_FACTOR;
  }
}

export default {
  init(_app) {
    app = _app;

    app.loader
      .add('/img/ice/1.svg')
      .add('/img/ice/2.svg')
      .add('/img/ice/3.svg')
      .add('/img/ice/4.svg')
      .add('/img/ice/5.svg')
      .add('/img/ice/6.svg')
      .add('/img/ice/7.svg')
      .add('/img/ice/8.svg')
      .add('/img/ice/9.svg')
      .add('/img/ice/10.svg')
      .load(() => {
        this.render();

        app.ticker.add(delta => {
          let counter = 0;

          if (!ices) {
            return;
          }

          for (let i = 0; i < ices.length; i++) {
            for (let j = 0; j < ices[i].length; j++) {
              const p = container.children[counter];

              if (!p) {
                return;
              }

              fluctuate(p, delta);

              p.vangle += (Math.random() - 0.5) * delta / 10;

              if (p.vangle > MAX_VANGLE) {
                p.vangle = MAX_VANGLE;
              } else if (p.vangle < -MAX_VANGLE) {
                p.vangle = -MAX_VANGLE;
              }

              p.angle += p.vangle * delta;
              counter++;
            }
          }
        });
      });
  },

  createPieces() {
    container = new PIXI.Container();

    for (let i = 0; i < ices.length; i++) {
      for (let j = 0; j < ices[i].length; j++) {
        const texture = app.loader.resources['/img/ice/' + ((i + j) % 10 + 1) + '.svg'].texture;
        const icePiece = new PIXI.Sprite(texture);
        // icePiece.scale = {x: 0.4, y: 0.4};
        icePiece.x = helpers.hexMath.getColTranslate(j, i);
        icePiece.y = helpers.hexMath.getRowTranslate(i);
        icePiece.cx = icePiece.x;
        icePiece.cy = icePiece.y;
        icePiece.vx = 0;
        icePiece.vy = 0;
        icePiece.vangle = 0;
        icePiece.alpha = ices[i][j] / 100;
        icePiece.anchor.set(0.5);
        container.addChild(icePiece);
      }
    }

    app.stage.addChild(container);
  },

  render(_ices) {
    ices = _ices;
    console.log('icePieces.render()');

    if (!ices) {
      return;
    }

    if (!container) {
      this.createPieces();
    } else {
      let counter = 0;

      for (let i = 0; i < ices.length; i++) {
        for (let j = 0; j < ices[i].length; j++) {
          const icePiece = container.children[counter];
          icePiece.alpha = ices[i][j] / 100;
          counter++;
        }
      }
    }
  }
};
