import * as PIXI from 'pixi.js';
import pixiHelpers from './helpers';

let app;
let container;
const ships = {};

export default {
  resources: [
    ['ship1', '/img/ship1.png'],
    ['ship2', '/img/ship2.png'],
    ['ship3', '/img/ship3.png'],
    ['ship4', '/img/ship4.png'],
    ['ship5', '/img/ship5.png'],
  ],

  init(_app, _container) {
    app = _app;
    container = _container;

    this.render();

    app.ticker.add(delta => {
    });
  },

  forEachShip(fn) {
    for (const item of Object.values(ships)) {
      if (!item.sprite) {
        item.sprite = this.createShip(item.data);
      }

      fn(item.sprite, item.data);
    }
  },

  createShip(ship) {
    console.log('ships create ship');
    const texture = app.loader.resources['ship' + ship.id].texture;
    const sprite = new PIXI.Sprite(texture);

    this.setShipPosition(sprite, ship);
    // sprite.scale = pixiHelpers.translateScale(0.5);
    sprite.vx = 0;
    sprite.vy = 0;
    sprite.anchor.set(0.5);
    ship.sprite = sprite;
    container.addChild(sprite);

    return sprite;
  },

  setShipPosition(sprite, ship) {
    const m = ship.movements[0].hex;
    sprite.x = pixiHelpers.translateCol(m[1], m[0]);
    sprite.y = pixiHelpers.translateRow(m[0]);
    sprite.angle = ship.movements[1].rotation;
  },

  refreshData(_ships) {
    if (!_ships) {
      return;
    }

    _ships.forEach(ship => {
      if (!(ship.id in ships)) {
        ships[ship.id] = {};
      }

      ships[ship.id].data = ship;
    });

    this.render();
  },

  render() {
    if (!app) {
      return;
    }

    this.forEachShip(this.setShipPosition);
  }
};
