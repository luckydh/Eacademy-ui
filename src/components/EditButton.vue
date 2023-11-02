<template>
	<!-- <v-btn outline small icon color="warning" v-if="$auth.can(permission)"><v-icon small>{{ icon || 'edit'}}</v-icon></v-btn> -->
	<v-dialog v-model="dialog" persistent max-width="290">
		<v-btn small icon color="warning" class="pa-0 ma-1" slot="activator"><v-icon small>{{ icon || 'edit'}}</v-icon></v-btn>
		<v-card>
				<v-card-title class="title pa-3 warning white--text"><v-icon class="mr-2 white--text">warning</v-icon>Please, wait!</v-card-title>
				<v-card-text class="ma-0">Are you sure you want to edit this item?</v-card-text>
				<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="success" outline small  @click="dialog = false, $emit('disagree')">No</v-btn>
						<v-btn color="warning" outline small  @click="dialog = false, $emit('agree')">Yes</v-btn>
				</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
	export default{
		props: ['icon', 'permission'],
		data: () => ({
			dialog: false
		})
	}
</script>