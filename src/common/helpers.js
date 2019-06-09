import config from './config';

console.log(1222222222222, config);

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

  formatMoney(value) {
    return new Intl.NumberFormat('ru', {currency: 'USD'}).format(value);
  },

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  degToRad(degrees) {
    return degrees * Math.PI / 180;
  },

  hexMath: {
    getColTranslate(colIndex) {
      return colIndex * config.tileW;
    },

    getRowTranslate(rowIndex) {
      return rowIndex * config.tileH;
    },

    getItemTranslate(col, row) {
      if (!config) {
        return '0 0';
      }

      let x = col * config.tileW;
      let y = row * config.tileH * 29/40;

      if (row % 2 === 0) {
        x += config.tileW / 2;
      }

      if (Number.isNaN(y)) {
        debugger;
      }

      return `${x} ${y}`;
    },
  }
};
