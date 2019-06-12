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
    var el = document.body.querySelector('#viewport');
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

      result += config.tileW / 8;

      return result + config.tileW / 8;
    },

    getRowTranslate(rowIndex) {
      return rowIndex * config.tileH;
      // return rowIndex * config.tileH * 29.5/40 - config.tileH / 4;
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
  },

  getColorForPercentage(pct) {
    const percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

    for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break;
      }
    }
    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (pct - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
  }
};
