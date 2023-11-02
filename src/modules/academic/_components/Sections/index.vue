<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12 sm8>
				<v-card>
					<v-card-title class="title">
						Sections
						<v-spacer></v-spacer>
						<v-btn outline @click="form.dialog = true" ma-0 small>New Section</v-btn>
					</v-card-title>

					<v-data-table 
						:headers="headers" 
						hide-actions 
						:items="form.items.data" 
						:search="search" 
						:pagination.sync="pagination"
						:total-items="form.items.meta.total"
						:loading="form.loading">
						<template slot="items" slot-scope="props">
							<td>{{ props.index + form.items.meta.from }}</td>
							<td class="text-xs-left">{{ props.item.name }}</td>
							<td class="text-xs-right">
								<edit-button permission="edit-section" @agree="form.edit(props.item)"/>
								<delete-button permission="delete-section" @agree="form.delete(props.item.id)"/>
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
					<v-card-text v-if="chartData.length == 0">Chart data not available...</v-card-text>
				</v-card>
			</v-flex>
			<v-dialog v-model="form.dialog" persistent max-width="300px">
				<v-card>
					<v-card-title class="primary white--text">
						<span class="title">Add/Update</span>
					</v-card-title>
					<v-card-text class="pb-1">
						<v-form ref="form" @submit.prevent="save" @keydown.native="form.errors.clear($event.target.name)" @keyup.enter="save" lazy-validation>
							<v-text-field autocomplete="off" label="Section Name*" required class="pa-0" v-model="form.name" name="name" :error-messages="form.errors.get('name')"/>
							<v-text-field autocomplete="off" label="Section Code*" required class="pa-0" v-model="form.code" name="code" :error-messages="form.errors.get('code')"/>
							<span v-if="form.errors.message">{{ form.errors.message }}<br/></span>
							<small>*indicates required field</small>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="warning" outline @click="form.dialog = false, form.reset()">Close</v-btn>
						<v-btn color="success" outline @click="save">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</v-container>
</template>
<script>
import { mapState } from 'vuex'
import Form from '@/library/Form'

export default {
	data: () => ({
		form: new Form({
			name: '',
			code: '',
			batch_id: '',
			grade_id: ''
		}, '/api/section'),
		search: null,
		pagination: {
			rowsPerPage: 10
		},
		headers: [
			{ text: 'SN', align: 'center', value: 'id', width: 50 },
			{ text: 'Name', align: 'left', value: 'name' },
			{ text: 'Action', align: 'right', sortable: false, width: 200 }
		],
		chartData: [],
		chartOptions: {
			title: {
                text: 'Section-Wise Students',
                align: 'center'
            },
			legend: {
				show: false,
				floating: true,
			},
  			labels: []
		}
	}),

	computed: {
		...mapState(['batch'])
	},

	watch: {
		'pagination': function() {
			this.get();
		},
		'form.dialog': function(value) {
			if(value) {
				this.form.batch_id = this.batch.id;
				this.form.grade_id = this.$route.params.gradeId
			}
		},
		'batch': function(value) {
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
				}).join('&') + '&batch=' + this.batch.id + '&grade=' + this.$route.params.gradeId;
		},

		get(params) {
			if([null, undefined].includes(this.batch.id)) return;
			let query = [null, undefined].includes(params) ? this.queryString() : params;
			this.form.get(null, query).then(({data}) => {
				this.pagination.totalItems = data.meta.total
			}).finally(() => {
				this.setChart();
			})
		},

		save() {
			this.form.store().then(() => {
				this.setChart();
			});
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