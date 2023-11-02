<template>
    <v-app id="app">
        <transition name="router-anim">
            <router-view class="view"/>
        </transition>
    </v-app>
</template>

<script>
    export default {}
</script>

<style lang="scss">
	html, body {
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
	}

	#app {
		height: 100%;
		width: 100%;
	}

	.relative {
		position: relative;
		min-height: 100%;
		min-width: 100%;
	}

	.router-anim-enter-active {
		animation: coming .8s;
		animation-delay: .5s;
		opacity: 0;
	}

	.router-anim-leave-active {
		animation: going .8s;
	}

	@keyframes coming {
		from {
			transform: translateY(-50px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes going {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-50px);
			opacity: 0;
		}
	}
</style>
