<template>
  <g
    class="root"
    :transform="`translate(${translate})`"
  >
    <component
      class="ship"
      :is="`Ship${data.id}`"
      :transform="`rotate(${rotate} 0 0)`"
    >
    </component>

    <g v-if="this.$store.state.layers.hexOfShips">
      <circle
        class="control-button"
        v-for="point in controlPositions"
        r="20"
        fill="rgba(0, 91, 151, .9)"
        @click="clickControl(point.angle)"
        :cx="point.x"
        :cy="point.y">
      </circle>

        <!--image
          v-for="point in controlPositions"
          width="40"
          height="40"
          @click="clickControl(point.angle)"
          :transform="`translate(${point.x}px, ${point.y}px) rotate(${point.angle})`"
          xlink:href="/img/right-arrow.png"
        /-->
    </g>
  </g>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from './svg/Ship1.svg.vue';
  import Ship2 from './svg/Ship2.svg.vue';
  import Ship3 from './svg/Ship3.svg.vue';
  import Ship4 from './svg/Ship4.svg.vue';
  import Ship5 from './svg/Ship5.svg.vue';

  export default {
    name: 'Ship',
    mixins: [hexGridMixin],
    components: {
      Ship1,
      Ship2,
      Ship3,
      Ship4,
      Ship5,
    },
    props: ['data'],
    methods: {
      clickControl(angle) {
        this.$store.dispatch('controlShip', {
          shipId: this.data.id,
          direction: this.angleToDirection(angle)
        });

        this.$store.commit('toggleShipControls');
      },
      angleToDirection(angle) {
        angle = (angle + 360) % 360;

        return {
          0: [1, 0],
          60: [1, -1],
          120: [-1, -1],
          180: [-1, 0],
          240: [-1, 1],
          300: [1, 1]
        }[angle];
      }
    },
    computed: {
      controlPositions() {
        const angles = [
          -120,
          -60,
          0,
          +60,
          +120,
          +180,
        ];

        const r = 50 * 1.4;

        const result = angles.map(angle => ({
          x: r * Math.cos(helpers.degToRad(angle)),
          y: r * Math.sin(helpers.degToRad(angle)),
          angle: angle
        }));

        return result;
      },
      col() {
        return this.data.movements[1].hex[1];
      },
      row() {
        return this.data.movements[1].hex[0];
      },
      translate() {
        const {x, y} = helpers.hexMath.getItemCenterXY(this.col, this.row);

        return `${x} ${y}`;
      },

      rotate() {
        let result = (this.data.movements[1].rotation) % 360;

        if (result > 180) {
          result -= 360;
        }

        return result;
      }
    },
  };
</script>

<style scoped>
  .root {
    transition: transform linear 6s;
  }
  .ship {
    transition: transform linear 6s;
  }
  .control-button {

  }


</style>
