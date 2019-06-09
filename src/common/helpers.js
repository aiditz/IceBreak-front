import config from './config';

export default {
  capitalizeFirstLetter(s) {
    return s.charAt(0).toLocaleUpperCase() + s.substr(1);
  },

  getNextId: (function () {
    let nextId = 1;

    return function() {
      return nextId++;
    };
  }()),

  getCase(i, var1, var2, var3) {
    if (i % 10 === 1) {
      return var1;
    }

    if ((i % 10 >= 2) && (i % 10 <= 4)) {
      return var2;
    }

    return var3;
  },

  getCaseFull(i, var1, var2, var3) {
    return i + ' ' + this.getCase(i, var1, var2, var3);
  },

  formatMoney(value) {
    return new Intl.NumberFormat('ru', {currency: 'RUB'}).format(value);
  },

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  degToRad(degrees) {
    return degrees * Math.PI / 180;
  },

  scrollToShip(ship) {
    var el = document.body.querySelector('#map-wrapper');
    const [row, col] = ship.movements[1].hex;
    const {x, y} = this.hexMath.getItemXY(col, row);

    el.scrollTo({
      left: x - window.screen.width / 2,
      top: y - window.screen.height / 2,
      behavior: 'smooth'
    });
  },

  hexMath: {
    getColTranslate(colIndex, rowIndex) {
      let result = colIndex * config.tileW - config.tileW / 2;

      if (rowIndex % 2 === 0) {
        result += config.tileW / 2;
      }

      return result;
    },

    getRowTranslate(rowIndex) {
      return rowIndex * config.tileH * 29/40 - config.tileH * 1/4;
    },

    getItemXY(col, row) {
      if (!config) {
        return {x: 0, y: 0};
      }

      const x = this.getColTranslate(col, row);
      const y = this.getRowTranslate(row);

      return {x, y};
    },

    getItemCenterXY(col, row) {
      const {x, y} = this.getItemXY(col, row);

      return {
        x: x + config.tileW / 2,
        y: y + config.tileH / 2,
      };
    },

    getItemTranslate(col, row) {
      const {x, y} = this.getItemXY(col, row);

      return `${x} ${y}`;
    },
  }
};
