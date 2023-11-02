<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-title class="title">
						Schools
						<v-spacer></v-spacer>
						<!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="pt-0"></v-text-field> -->
						<v-btn outline @click="$router.push({name: 'schools-form'})" ma-0 small>New School</v-btn>
					</v-card-title>

					<v-data-table 
						:headers="headers" 
						hide-actions 
						:items="schools.data" 
						:search="search" 
						:pagination.sync="pagination"
						:total-items="schools.meta.total">
						<template slot="items" slot-scope="props">
							<td>{{ props.index + schools.meta.from }}</td>
							<td class="text-xs-left pl-3">
								<v-avatar
						          	:tile="false"
						          	:size="36"
						          	color="grey lighten-4 elevation-2"
						        >
						          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
						        </v-avatar>
							</td>
							<td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-left">
								<v-treeview :items="[JSON.parse(props.item.contact)]"></v-treeview>
							</td>
							<td class="text-xs-left">{{ props.item.domain }}</td>
							<td class="text-xs-right">
								<view-button permission="view-company" @agree=""/>
								<edit-button permission="edit-company" @agree=""/>
								<delete-button permission="delete-company" @agree=""/>
							</td>
						</template>
						<v-alert slot="no-results" :value="true" color="error" icon="warning">
							Your search for "{{ search }}" found no results.
						</v-alert>
					</v-data-table>

					<v-card-actions>
						<v-spacer />
							<v-pagination v-model="pagination.page" :length="schools.meta.last_page"></v-pagination>
						<v-spacer />
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data: () => ({
			search: null,
			pagination: {
				rowsPerPage: 10
			},
			headers: [
				{ text: 'SN', align: 'center', value: 'id', width: 50 },
				{ text: 'Logo', align: 'left', value: 'logo', width: 75 },
				{ text: 'Name', align: 'left', value: 'name' },
				{ text: 'Contact', align: 'left', value: 'contact', width: 100 },
				{ text: 'Domain', align: 'left', value: 'domain', width: 200 },
				{ text: 'Action', align: 'right', sortable: false, width: 200 }
			],
			schools: {
				data: [],
				meta: {}
			}
		}),
		watch: {
			'pagination': function() {
				this.get();
			}
		},
		methods: {
			queryString() {
				let json = this.pagination;
				return '?' + 
					Object.keys(json).map(function(key) {
						return encodeURIComponent(key) + '=' +
							encodeURIComponent(json[key]);
					}).join('&');
			},

			get(params) {
				let query = [null, undefined].includes(params) ? this.queryString() : params;
				this.$rest.get('/api/company'+query).then(({data}) => {
					this.schools = data;
					this.pagination.totalItems = data.meta.total
				})
			},
		}
	}
</script>