import helpers from '../common/helpers';

export default {
  getPixelRatio() {
    return Math.min(2, window.devicePixelRatio);
  },

  translateCol(col, row) {
    return helpers.hexMath.getColTranslate(col, row) * this.getPixelRatio();
  },

  translateRow(row) {
    return helpers.hexMath.getRowTranslate(row) * this.getPixelRatio();
  },

  translateXY(x) {
    return x * this.getPixelRatio();
  },

  translateScale(n = 1) {
    return {
      x: n * this.getPixelRatio(),
      y: n * this.getPixelRatio(),
    };
  }
};
