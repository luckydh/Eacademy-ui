<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12 sm8>
				<v-card>
					<v-card-title class="title">
						Roles
						<v-spacer></v-spacer>
						<!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="pt-0"></v-text-field> -->
						<v-btn outline ma-0 small @click="$router.push({name: 'add-role'})">New Role</v-btn>
					</v-card-title>
					<v-data-table
						:headers="headers" 
						hide-actions 
						:items="form.items.data" 
						:search="search" 
						:pagination.sync="pagination"
						:total-items="form.items.meta.total"
						:loading="form.loading">>
						<template slot="items" slot-scope="props">
							<td>{{ props.index + form.items.meta.from }}</td>
							<td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-center">{{ props.item.permissions }}</td>
							<td class="text-xs-right">
								<view-button permission="view-role"/>
								<edit-button permission="edit-role" @agree=""/>
								<delete-button permission="delete-role" @agree="form.delete(props.item.id)"/>
							</td>
						</template>
						<v-alert slot="no-results" :value="true" color="error" icon="warning">
							Your search for "{{ search }}" found no results.
						</v-alert>
					</v-data-table>
					<v-card-actions>
						<v-spacer />
							<v-pagination v-model="pagination.page" :length="form.items.meta.last_page"></v-pagination>
						<v-spacer />
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs12 sm4>
				<v-card>
					<v-card-title class="title">
						<v-spacer />
						<v-btn icon ma-0 small @click="setChart()"><v-icon small>autorenew</v-icon></v-btn>
					</v-card-title>
					<apexchart v-if="chartData.length" type="pie" :options="chartOptions" :series="chartData"/>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
import Form from '@/library/Form'
export default {
	data: () => ({
		form: new Form({}, '/api/roles'),
		search: null,
		pagination: {
			rowsPerPage: 10
		},
		headers: [
			{ text: 'SN', align: 'center', value: 'id', width: 50 },
			{ text: 'Name', align: 'left', value: 'name' },
			{ text: 'Permissions', align: 'center', value: 'permissions', width: 100 },
			{ text: 'Action', align: 'right', sortable: false, width: 200 }
		],
		chartData: [],
		chartOptions: {
			title: {
                text: 'Role-wise Users',
                align: 'center'
            },
			legend: {
				show: false,
				floating: true,
			},
  			labels: []
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
					if(![null, undefined].includes(json[key]))
						return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
				}).join('&');
		},

		get(params) {
			let query = [null, undefined].includes(params) ? this.queryString() : params;
			this.form.get(null, query).then(({data}) => {
				this.pagination.totalItems = data.meta.total
				this.setChart(data.data);
			})
		},

		setChart(data) {
			if(data == null) {
				data = this.form.items.data
			}

			let labels = data.map(item => {
				return item.name
			})

			this.chartOptions.labels = labels;

			this.chartData = data.map(item => {
				return item.permissions
			})
		},
	}
}
</script>
<style lang="scss" scoped></style>