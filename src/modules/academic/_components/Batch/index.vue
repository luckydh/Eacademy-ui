<template>
	<v-container grid-list-md pa-0 relative>
		<v-layout row wrap>
			<v-flex xs12 sm8>
				<v-card>
					<v-card-title class="title">
						Batches
						<v-spacer></v-spacer>
						<!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="pt-0"></v-text-field> -->
						<v-btn outline @click="form.dialog = true" ma-0 small>New Batch</v-btn>
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
							<td class="text-xs-right">
								<edit-button permission="edit-batch" @agree="form.edit(props.item)"/>
								<delete-button permission="delete-batch" @agree="form.delete(props.item.id)"/>
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
							<v-text-field label="Batch Name*" autocomplete="off" required class="pa-0" v-model="form.name" name="name" :error-messages="form.errors.get('name')"/>
							
							<v-text-field label="Start Date*" autocomplete="off" required class="pa-0" v-model="batchStart" name="batch_start" :error-messages="form.errors.get('batch_start')" id="batch_start" />

							<v-text-field label="End Date*" autocomplete="off" required class="pa-0" v-model="batchEnd" name="batch_end" :error-messages="form.errors.get('batch_end')" id="batch_end"/>

							<v-select v-model="form.grades" :items="grades" label="Select Grades" multiple>
								<v-list-tile
									slot="prepend-item"
									ripple
									@click="toggle">
									<v-list-tile-action>
										<v-icon :color="form.grades.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
									</v-list-tile-action>
									<v-list-tile-title>Select All</v-list-tile-title>
								</v-list-tile>
								<v-divider slot="prepend-item" class="mt-2"></v-divider>
								<v-divider slot="append-item" class="mb-2"></v-divider>
							</v-select>
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
			batch_start: '',
			batch_end: '',
			grades: []
		}, '/api/batch'),
		search: null,
		pagination: {
			rowsPerPage: 10
		},
		headers: [
			{ text: 'SN', align: 'center', value: 'id', width: 50 },
			{ text: 'Name', align: 'left', value: 'name' },
			{ text: 'Action', align: 'right', sortable: false, width: 200 }
		],
		grades: [],
		batchStart: '',
		batchEnd: '',
		chartData: [],
		chartOptions: {
			title: {
                text: 'Batch-Wise Students',
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
		},
		'form.dialog': function(value) {
			if(value === true) this.getBatches();
		}
	},
	computed: {
		selectAllGrades() {
			return this.form.grades.length === this.grades.length
		},
		selectFewGrades() {
			return this.form.grades.length > 0 && !this.selectAllGrades
		},
		icon() {
			if (this.selectAllGrades) return 'check_box'
			if (this.selectFewGrades) return 'indeterminate_check_box'
			return 'add_box'
		}
	},

	mounted() {
		jQuery("#batch_start").nepaliDatePicker({
			dateFormat: "%y-%m-%d",
			closeOnDateSelect: true
		});
		jQuery("#batch_end").nepaliDatePicker({
			dateFormat: "%y-%m-%d",
			closeOnDateSelect: true
		});
		jQuery('#batch_start').on('dateChange', function(event) {
			this.batchStart = event.datePickerData.formattedDate;
			this.form.batch_start = `${event.datePickerData.bsYear}-${event.datePickerData.bsMonth.pad()}-${event.datePickerData.bsDate.pad()}`;
		}.bind(this))
		jQuery('#batch_start').on("dateSelect", function (event) {
			this.batchStart = event.datePickerData.formattedDate
			this.form.batch_start = `${event.datePickerData.bsYear}-${event.datePickerData.bsMonth.pad()}-${event.datePickerData.bsDate.pad()}`;
		}.bind(this));
		jQuery('#batch_end').on('dateChange', function(event) {
			this.batchEnd = event.datePickerData.formattedDate;
			this.form.batch_end = `${event.datePickerData.bsYear}-${event.datePickerData.bsMonth.pad()}-${event.datePickerData.bsDate.pad()}`;
		}.bind(this))
		jQuery('#batch_end').on("dateSelect", function (event) {
			this.batchEnd = event.datePickerData.formattedDate;
			this.form.batch_end = `${event.datePickerData.bsYear}-${event.datePickerData.bsMonth.pad()}-${event.datePickerData.bsDate.pad()}`;
		}.bind(this));
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
		},

		store() {
			this.form.store();
		},

		getBatches() {
			this.$rest.get('/api/grades').then(({data}) => {
				this.grades = data.data.map(item => {
					return {text:item.name, value: item.id};
				});
			})
		},

		toggle () {
			this.$nextTick(() => {
				if (this.selectAllGrades) {
					this.form.grades = []
				} else {
					this.form.grades = this.grades.map(grade => {
						return grade.value;
					})
				}
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
				return Math.floor(Math.random() * Math.floor(50));
			})
		}

	}
}
</script>
<style lang="scss" scoped></style>