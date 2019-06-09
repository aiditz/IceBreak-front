<template>
  <g class="root">
    <g transform="scale(0.35)">
      <image
        class="ice-peace"
        v-if="data !== 0"
        :xlink:href="`/img/ice/${iceType}.svg`"
        width="50"
        height="50"
        :style="{opacity: data / 100, 'animationDelay': animationDelay + 'ms'}" />
    </g>
  </g>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from './svg/Ship1.svg.vue';
  import Ship2 from './svg/Ship2.svg.vue';

  export default {
    name: 'IcePiece',
    props: ['data'],
    components: {
    },
    beforeCreate() {
      this.iceType = String(Math.floor(Math.random() * 10) + 1);
    },
    computed: {
      animationDelay() {
        return Math.random() * 10000;
      }
    },
  };
</script>

<style scoped>
  @keyframes fluctuation {
    10% {
      transform: translate3d(0, 0, 0);
    }

    20% {
      transform: translate3d(-7px, 0, 0);
    }

    30% {
      transform: translate3d(-10px, 9px, 0);
    }

    40% {
      transform: translate3d(-3px, -3px, 0);
    }

    50% {
      transform: translate3d(0px, -10px, 0);
    }

    60% {
      transform: translate3d(-3px, -7px, 0);
    }

    70% {
      transform: translate3d(3px, -3px, 0);
    }

    80% {
      transform: translate3d(10px, 3px, 0);
    }

    90% {
      transform: translate3d(7px, -3px, 0);
    }

    100% {
      transform: translate3d(3px, 0, 0);
    }
  }

  .ice-peace {
    /* animation: fluctuation 18s linear infinite; */
  }
</style>
