<template>
	<!-- <v-btn outline small icon color="warning" v-if="$auth.can(permission)"><v-icon small>{{ icon || 'edit'}}</v-icon></v-btn> -->
	<v-btn small icon :color="type || 'primary'" class="pa-0 ma-1"><v-icon small>{{ icon || 'home'}}</v-icon></v-btn>
</template>
<script>
	export default{
		props: ['type', 'icon', 'permission']
	}
</script>