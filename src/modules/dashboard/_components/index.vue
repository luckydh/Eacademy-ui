<template>
	<v-layout>
		<!-- <v-flex xs12 sm4>
			<apexchart type="bar" :options="options" :series="series" />
		</v-flex>
		<v-flex xs12 sm4>
			<apexchart type="line" :options="options" :series="series" />
		</v-flex>
		<v-flex xs12 sm4>
			<apexchart type="donut" :options="{}" :series="[44, 55, 41, 17, 15]" />
		</v-flex> -->
	</v-layout>
</template>
<script>
export default {
	data: () => ({
		options: {
			chart: {
				width: '100%'
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
			}
		},
		series: [{
			name: 'eAcademy Data',
			data: [30, 40, 45, 50, 49, 60, 70, 91]
		}]
	}),
	computed: {},
	mounted() {
		
	},
	methods: {
		triggerEvent() {
			this.$events.fire('notification', { message: 'Yubaraj Shrestha', status: 'error' })
		}
	},
	beforeDestroy() {
		this.$events.remove('notification')
	}
}
</script>
<style lang="scss" scoped></style>