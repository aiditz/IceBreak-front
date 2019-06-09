import helpers from '../../common/helpers';

export default {
  computed: {
  },
  methods: {
    getColTranslate(colIndex, rowIndex) {
      return helpers.hexMath.getColTranslate(colIndex, rowIndex);
    },

    getRowTranslate(rowIndex) {
      return helpers.hexMath.getRowTranslate(rowIndex);
    },

    getItemTranslate(col, row) {
      return helpers.hexMath.getItemTranslate(col, row);
    },
  }
};
