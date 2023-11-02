<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-title class="title">Add/Update Role</v-card-title>
					<v-card-text>
						<v-layout row wrap>
							<v-flex xs12>
								<v-text-field label="Role Name *" required/>
							</v-flex>
							<v-flex xs12 sm3 v-for="(model, key) in models" :key="key">
						    	<v-card>
						    		<v-card-title class="primary white--text">
						    			<!-- <v-btn icon small mr-2 class="white--text" @click="checkAll(model)">
						    				<v-icon>{{ icon(model) }}</v-icon>
						    			</v-btn> -->
						    			<strong>{{ model.toUpperCase() }}</strong>
						    		</v-card-title>
						    		<v-card-text class="pa-1 pl-2">
						    			<v-checkbox :label="`Add ${model}`" v-model="permissions[`add ${getLower(model)}`]" :height="0" color="primary"></v-checkbox>
						    			<v-checkbox :label="`Edit ${model}`" v-model="permissions[`edit ${getLower(model)}`]" :height="0" color="primary"></v-checkbox>
						    			<v-checkbox :label="`View ${model}`" v-model="permissions[`view ${getLower(model)}`]" :height="0" color="primary"></v-checkbox>
						    			<v-checkbox :label="`Delete ${model}`" v-model="permissions[`delete ${getLower(model)}`]" :height="0" color="primary"></v-checkbox>
						    		</v-card-text>
						    	</v-card>
						    </v-flex>
						</v-layout>
					</v-card-text>
					<v-card-actions class="pr-3">
		    			<v-spacer />
		    			<v-btn color="warning" outline @click="">Cancel</v-btn>
						<v-btn color="success" outline @click="">Save</v-btn>
		    		</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data: () => ({
			models: [],
			permissions: {}
		}),
		mounted() {
			this.getModels();
		},
		methods: {
			getModels() {
				let models = ['Role', 'Permission', 'User', 'Company'];
				this.models = models.map(item => {
					this.permissions[item] = {}
					/*this.permissions[item][`add ${item}`] = false;
					this.permissions[item][`edit ${item}`] = false;
					this.permissions[item][`view ${item}`] = false;
					this.permissions[item][`delete ${item}`] = false;*/
					return item;
				})
			},
			getLower: (model) => model.toLowerCase(),
			icon(model) {
				let permissions = Object.keys(this.permissions[model]).map(item => {
					if([`add ${model}`, `edit ${model}`, `view ${model}`, `delete ${model}`].includes(item)) {
						if(this.permissions[model][item] == true) return item;
					}
				})
				if(permissions.length == 4) {
					return 'check_box'
				} else if(permissions.length == 0) {
					return 'add_box'
				} else {
					return 'indeterminate_check_box'
				}
				/*if (this.selectAllGrades) return 'check_box'
				if (this.selectFewGrades) return 'indeterminate_check_box'
				return 'add_box'*/
			}
		}
	}
</script>