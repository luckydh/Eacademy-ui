<template>
	<!-- <v-btn outline small icon color="warning" v-if="$auth.can(permission)"><v-icon small>{{ icon || 'edit'}}</v-icon></v-btn> -->
	<v-hover><v-btn small icon color="primary" class="pa-0 ma-1"><v-icon small>{{ icon || 'crop_free'}}</v-icon></v-btn></v-hover>
</template>
<script>
	export default{
		props: ['icon', 'permission']
	}
</script>