<template>
	<path :fill="color" d="M17.32050807568877 0L34.64101615137754 10L34.64101615137754 30L17.32050807568877 40L0 30L0 10Z"></path>
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
	},
	props: ['color', 'colIndex', 'rowIndex']
}

</script>

<style scoped>

</style>
