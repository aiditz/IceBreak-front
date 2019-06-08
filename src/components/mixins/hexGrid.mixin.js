export default {
  methods: {
    getColTranslate(colIndex) {
      return colIndex * this.$store.state.config.tileW;
    },

    getRowTranslate(rowIndex) {
      return colIndex * this.$store.state.config.tileW;
    },

    getItemTranslate(row) {
      let y = row * this.$store.state.config.tileH * 29/40;
      let x = 0;

      if (row % 2 === 0) {
        x += this.$store.state.config.tileW / 2;
      }

      return `${x} ${y}`;
    },
  }
};
