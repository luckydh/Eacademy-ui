/**
 *
 * Form Handler Class
 *
 */
import rest from './Rest'
import Errors from './Error';
export default class Form {
	/**
	 *
	 * Create a new form instance
	 *
	 * @param {object} data
	 *
	 */
	constructor(data, url) {
		this.originalData = JSON.parse(JSON.stringify(data));
		this.endpoint = url;
		this.dialog = false;
		this.loading = false;
		this.items = {
			data: [],
            links: {},
            meta: {}
		}
		this.dataReset();
		this.errors = new Errors();
	}

	dataReset() {
		let data = JSON.parse(JSON.stringify(this.originalData));
		for (let field in data) {
			if(typeof data[field] === 'object') {
				if(data[field].length > 0) this[field] = data[field];
				else {
					if(JSON.stringify(data[field]).charAt(0) == "{") this[field] = {};
					else if(JSON.stringify(data[field]).charAt(0) == "[") this[field] = [];
				}
			} else {
				this[field] = data[field];
			}
		}
	}

	/**
	 *
	 * Fetch all relevant data for the form.
	 *
	 */
	data() {
		let data = {};
		for (let property in this.originalData) {
			if(!['', 'null', null, undefined].includes(this[property])) data[property] = this[property]
		}
		return data;
	}


	/**
	 *
	 * Submit the data.
	 *
	 * @param {string} requestType
	 *
	 * @param {string} url
	 *
	 */
	submit(requestType, url) {
		this.loading = true;
		return new Promise((resolve, reject) => {
			try {

				let params = {};
				let data = this.data();

				if(['post', 'put', 'patch'].includes(requestType)) {
					params = new FormData();
					Object.keys(data).forEach(item => {
					    if(typeof data[item] === 'object' && data[item] !== null) {
					    	if(item == 'files') {
					    		for(let i = 0; i < data[item].length; i++) {
					    			params.append(`${item}[${i}]`, data[item][i]);
					    		}
								//params.append(`${item}[]`, JSON.stringify(data[item]));
					    	}
					        else params.append(item, JSON.stringify(data[item]));
	                    } else {
	                    	params.append(item, data[item]);
	                    }
	                });

					if(requestType != 'post') params.append('_method', 'put');

				} else {
					Object.keys(data).forEach(item => {
					    if(typeof data[item] === 'object' && data[item] !== null) {
					        params[item] = data[item];
	                    }
	                });
					if (requestType === 'delete') params['_method'] = 'delete';
				}

				if(['put', 'patch'].includes(requestType)) {
					requestType = 'post';
				}

				rest()[requestType](url, params)
					.then(response => {
						if(requestType !== 'get' && !['', null, undefined].includes(response.data.message)) {
							app.$events.fire('notification', { message: response.data.message})
						}
						if(['post', 'put', 'patch', 'delete'].includes(requestType) && this.endpoint !== '/login') this.get(null, this.params);
						this.dialog = false;
						this.success(response.data);
						delete this.id;
						resolve(response);
					}).catch(error => {
						app.$events.fire('notification', { message: error.response.data.message, status: 'error'})
						this.failure(error.response.data);
						reject(error.response);
					}).finally(() => {
						this.loading = false;
					});
			} catch(e) {
				reject(e);
			}
		})
	}

	get(url, params) {
		this.loading = true;
		let path = [undefined, null].includes(url) ? this.endpoint : url;
		path += [undefined, null].includes(params) ? '' : params;
		if(![null, undefined].includes(params)) this.params = params;
		return new Promise((resolve, reject) => {
			this.submit('get', path).then(response => {
				this.items = response.data;
				resolve(response);
			}).catch(error => {
				this.items = {
					data: [],
		            links: {},
		            meta: {}
				};
				reject(error);
			}).finally(() => {
				this.loading = false;
			});
		})
	}

	/**
	 *
	 * Store/Update Data
	 *
	 * @param {string} url
	 */
	store(url) {
		let path = [undefined, null].includes(url) ? this.endpoint : url;
		if([undefined, null].includes(this.id)) {
			return this.submit('post', this.endpoint);
		} else {
			path += '/'+this.id
			return this.submit('put', path);
		}
	}

	/**
	 *
	 * Create new data
	 *
	 * @param {string} url
	 *
	 */
	post(url) {
		let path = [undefined, null].includes(url) ? this.endpoint : url;
		return this.submit('post', path);
	}

	/**
	 *
	 * Update old data
	 *
	 * @param {integer} id
	 *
	 */
	put(id) {
		let path = this.endpoint + '/' + id;
		return this.submit('put', path);
	}

	/**
	 *
	 * Update old data
	 *
	 * @param {string} url
	 *
	 */
	patch(url) {
		let path = [undefined, null].includes(url) ? this.endpoint : url;
		return this.submit('patch', path);
	}

	/**
	 *
	 * Delete data
	 *
	 * @param {string} url
	 *
	 */
	delete(id) {
		if(id) {
			let path = this.endpoint +'/'+ id;
			return this.submit('delete', path);
		}
	}

	/**
	 *
	 * Handle a successful form submission.
	 *
	 * @param {object} response
	 *
	 */
	success(response) {
		// TODO: send success response...
		this.reset();
	}

	/**
	 *
	 * Handle a failed form submission.
	 *
	 * @param {object} error
	 *
	 */
	failure(response) {
		this.errors.record(response.message, response.errors);
	}

	/**
	 *
	 * Reset the form fields.
	 *
	 */
	reset() {
		this.dataReset();
		this.loading = false;
		this.dialog = false;
		delete this.id;
		this.errors.clear();
	}

	edit(data) {
		for (let field in data) {
			this[field] = data[field];
		}
		this.dialog = true;
	}

	confirm(data) {
		this.id = data.id;
	}
}
