<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12 sm8>
				<v-card>
					<v-card-title class="title">
						Journal Types
						<v-spacer></v-spacer>
						<!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="pt-0"></v-text-field> -->
						<v-btn outline @click="form.dialog = true" ma-0 small>New Journal Type</v-btn>
					</v-card-title>

					<v-data-table 
						:headers="headers" 
						hide-actions 
						:items="form.items.data" 
						:search="search" 
						:pagination.sync="pagination"
						:total-items="form.items.meta.total">
						<template slot="items" slot-scope="props">
							<td>{{ props.index + form.items.meta.from }}</td>
							<td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-left">{{ props.item.code }}</td>
							<td class="text-xs-right">
								<edit-button permission="edit-journal-type" @agree="form.edit(props.item)" v-if="props.item.company_id"/>
								<delete-button permission="delete-journal-type" @agree="form.delete(props.item.id)" v-if="props.item.company_id"/>
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
			<v-dialog v-model="form.dialog" persistent max-width="300px">
				<v-card>
					<v-card-title class="primary white--text">
						<span class="title">Add/Update</span>
					</v-card-title>
					<v-card-text class="pb-1">
						<v-form ref="form" @submit.prevent="store" @keydown.native="form.errors.clear($event.target.name)" @keyup.enter="store" lazy-validation>
							<v-text-field label="Name*" autocomplete="off" required class="pa-0" v-model="form.name" name="name" :error-messages="form.errors.get('name')"/>
							
							<v-text-field label="Code*" autocomplete="off" required class="pa-0" v-model="form.code" name="code" :error-messages="form.errors.get('code')" id="code" />

							<v-text-field label="Description" autocomplete="off" required class="pa-0" v-model="form.description" name="description" :error-messages="form.errors.get('description')" id="description"/>
							<v-select :items="prTypes" required class="pa-0" label="PR Type*" v-model="form.pr_type" :error-messages="form.errors.get('pr_type')" name="pr_type" />
							<small>*indicates required field</small>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="warning" outline @click="form.dialog = false, form.reset()">Close</v-btn>
						<v-btn color="success" outline @click="store">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</v-container>
</template>
<script>
import Form from '@/library/Form'
export default {
	data: () => ({
		form: new Form({
			name: '',
			code: '',
			description: '',
			pr_type: 'default'
		}, '/api/journal-type'),
		search: null,
		pagination: {
			rowsPerPage: 10
		},
		headers: [
			{ text: 'SN', align: 'center', value: 'id', width: 50 },
			{ text: 'Name', align: 'left', value: 'name' },
			{ text: 'Code', align: 'left', value: 'code', sortable: false },
			{ text: 'Action', align: 'right', sortable: false, width: 200 }
		],
		prTypes: [
			{
				text: 'Default',
				value: 'default'
			},  {
				text: 'Payment',
				value: 'payment'
			},  {
				text: 'Receipt',
				value: 'receipt'
			}
		],
		chartData: [],
		chartOptions: {
			title: {
                text: 'Journals',
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
					return encodeURIComponent(key) + '=' +
						encodeURIComponent(json[key]);
				}).join('&');
		},

		get(params) {
			let query = [null, undefined].includes(params) ? this.queryString() : params;
			this.form.get(null, query).then(({data}) => {
				this.pagination.totalItems = data.meta.total
				this.setChart(data.data);
			})

			/*this.$rest.post('/api/asdkfasdf', data).then(response => {
				// success.. 
			}).catch(error => {
				// error...
			}).finally(() => {
				//
			})*/

		},

		store() {
			this.form.store();
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
				return Math.floor(Math.random() * Math.floor(50));
			})
		}

	}
}
</script>
<style lang="scss" scoped></style>