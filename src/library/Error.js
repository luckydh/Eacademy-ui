/**
 *
 * Error Handler Class for Form
 *
 */

export default class Errors {
	/**
	 *
	 * Create a new errors instance.
	 *
	 */
	constructor() {
		this.errors = {};
		this.message = null;
	}

	/**
	 *
	 * Determine if an errors exists for the given field.
	 *
	 * @param {string} field
	 *
	 */
	has(field) {
		if(typeof this.errors == 'object')
			return this.errors.hasOwnProperty(field)
	}

	/**
	 *
	 * Retrieve the error message for the given field.
	 *
	 * @param {string} field
	 *
	 */
	get(field) {
		if(this.errors[field]) return this.errors[field][0];
	}

	/**
	 *
	 * Record the new errors.
	 *
	 * @param {object} errors
	 *
	 */
	record(message, errors) {
		if(message) this.message = message;
		if(errors) this.errors = errors;
	}

	/**
	 *
	 * Determine if we have any errors.
	 *
	 */
	any() {
		if(typeof this.errors == 'object') return Object.values(this.errors).length > 0;
		return false;
	}

	/**
	 *
	 * Clear one or all error fields.
	 *
	 * @param {string|null} field
	 *
	 */
	clear(field) {
		if(field) { 
			if(typeof this.errors == 'object') {
				this.errors[field] = [];
				delete this.errors[field]
			}
		} else this.errors = {};
		this.message = null;
	}
}
