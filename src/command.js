/** @module command */

/**
 * @memberof: module:command
 */
class Command {

	/**
	 * @param {string} syntax
	 * @param {object} data
	 */
	constructor(syntax, data) {
		this._syntax = syntax
		this._data = data
	}

	/**
	 * @type {string}
	 */
	get syntax() {
		return this._syntax
	}

	/**
	 * @type {string}
	 */
	get data() {
		return this._data
	}

}

export default Command
