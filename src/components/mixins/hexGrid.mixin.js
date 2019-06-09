import helpers from '../../common/helpers';

export default {
  methods: {
    getColTranslate(colIndex) {
      return helpers.hexMath.getColTranslate(colIndex);
    },

    getRowTranslate(rowIndex) {
      return helpers.hexMath.getRowTranslate(rowIndex);
    },

    getItemTranslate(col, row) {
      return helpers.hexMath.getItemTranslate(col, row);
    },
  }
};
