<template>
  <g class="root">
    <g>
      <image
        class="ice-peace"
        v-if="data !== 0"
        width="20"
        height="20"
        :xlink:href="`/img/ice/${iceType}.svg`"
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
      transform: translate(0, 0);
    }

    20% {
      transform: translate(-7px, 0);
    }

    30% {
      transform: translate(-10px, 9px);
    }

    40% {
      transform: translate(-3px, -3px);
    }

    50% {
      transform: translate(0px, -10px);
    }

    60% {
      transform: translate(-3px, -7px);
    }

    70% {
      transform: translate(3px, -3px);
    }

    80% {
      transform: translate(10px, 3px);
    }

    90% {
      transform: translate(7px, -3px);
    }

    100% {
      transform: translate(3px, 0);
    }
  }

  .ice-peace {
    /* animation: fluctuation 18s linear infinite; */
  }
</style>
