<template>
  <g>
    <template v-for="(col, colIndex) in $store.state.gs.ice">
      <IcePiece
        v-for="(value, rowIndex) in col"
        :opacity="value"
        :colIndex="colIndex"
        :rowIndex="rowIndex"
        :key="`${colIndex}_${rowIndex}`"
        :transform="'translate(' + getItemTranslate(colIndex, rowIndex) + ') scale(1)'"
      ></IcePiece>
    </template>
  </g>
</template>

<script>
  import config from '../../common/config';
  import IcePiece from '../elements/IcePiece.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerIcePieces',
    mixins: [hexGridMixin],
    computed: {
    },
    components: {
      IcePiece
    },
    props: {
    },
    methods: {
    },
  };
</script>

<style scoped>

  .hexTile {
    transition: .15s;
    opacity: .5;
  }
  .hexTile:hover {
    opacity: .9;
  }

</style>
