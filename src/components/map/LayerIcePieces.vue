<template>
  <div id="pixi"></div>
</template>

<script>
  import pixi from '../../pixi/pixi';
  import * as PIXI from 'pixi.js';
  import config from '../../common/config';
  import helpers from '../../common/helpers';

  let iceContainer;

  const maxFluctuationRange = 5;
  const fluctuationStepDurationMs = 1000;

  export default {
    name: 'LayerIcePieces',
    mixins: [],
    mounted() {
      pixi.addInitHandler(app => {
        app.loader
          .add('/img/ice/1.svg')
          .add('/img/ice/2.svg')
          .add('/img/ice/3.svg')
          .add('/img/ice/4.svg')
          .add('/img/ice/5.svg')
          .add('/img/ice/6.svg')
          .add('/img/ice/7.svg')
          .add('/img/ice/8.svg')
          .add('/img/ice/9.svg')
          .add('/img/ice/10.svg')
          .load(() => {
            this.renderIce();

            app.ticker.add(delta => {
              console.log('ticker tick ice');
              let counter = 0;

              if (!this.ices) {
                return;
              }

              for (let i = 0; i < this.ices.length; i++) {
                for (let j = 0; j < this.ices[i].length; j++) {
                  const icePiece = iceContainer.children[counter];

                  if (!icePiece) {
                    return;
                  }

                  icePiece.x += (Math.random() - 0.5) * delta / 10;
                  icePiece.y += (Math.random() - 0.5) * delta / 10;
                  counter++;
                }
              }
            });
          });
      });
    },
    beforeUpdate() {
    },
    computed: {
    },
    components: {
    },
    props: ['ices'],
    watch: {
      ices() {
        this.renderIce();
      }
    },
    methods: {
      renderIce() {
        console.log('renderIce()');
        const ices = this.ices;
        const app = pixi.app;

        if (!ices) {
          return;
        }

        if (!iceContainer) {
          iceContainer = new PIXI.Container();
          console.log('renderIce() 111');

          for (let i = 0; i < ices.length; i++) {
            for (let j = 0; j < ices[i].length; j++) {
              const texture = app.loader.resources['/img/ice/' + ((i + j) % 10 + 1) + '.svg'].texture;
              const icePiece = new PIXI.Sprite(texture);
              icePiece.scale = {x: 0.4, y: 0.4};
              icePiece.x = helpers.hexMath.getColTranslate(j, i);
              icePiece.y = helpers.hexMath.getRowTranslate(i);
              icePiece.cx = icePiece.x;
              icePiece.cy = icePiece.y;
              icePiece.alpha = ices[i][j] / 100;
              iceContainer.addChild(icePiece);
            }
          }

          app.stage.addChild(iceContainer);
        } else {
          console.log('renderIce() 222');
          let counter = 0;

          for (let i = 0; i < ices.length; i++) {
            for (let j = 0; j < ices[i].length; j++) {
              const icePiece = iceContainer.children[counter];
              icePiece.x = helpers.hexMath.getColTranslate(j, i);
              icePiece.y = helpers.hexMath.getRowTranslate(i);
              icePiece.alpha = ices[i][j] / 100;
              counter++;
            }
          }
        }
      }
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
