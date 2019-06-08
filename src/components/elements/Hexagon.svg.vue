<template>
	<path :fill="colorA" d="M17.32050807568877 0L34.64101615137754 10L34.64101615137754 30L17.32050807568877 40L0 30L0 10Z"></path>
</template>

<script>

export default {
	name: 'Hexagon',
	data() {
		return {}
	},
	computed: {
		randColor() {
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		},
    colorA() {
		  const debugColor = this.arr.find(item => item[0] === this.rowIndex && item[1] === this.colIndex);

		  if (debugColor) {
		    return '#ff0000';
      }

      return this.color;
    }
	},
	props: ['color', 'colIndex', 'rowIndex', 'arr']
}

</script>

<style scoped>

</style>
