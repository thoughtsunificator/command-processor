/** @module processor */

/**
 * @memberof: module:processor
 */
class Processor {

	/**
	 * @type {String}
	 */
	static PREFIX_COMMAND = "/"
	static ERROR = {
		COMMAND_NOT_FOUND: "COMMAND_NOT_FOUND",
		MISSING_ARGS: "MISSING_ARGS"
	}

	/**
	 * @param {Command[]} commands
	 */
	constructor(commands) {
		this._commands = commands
	}

	run(str) {
		const tokens = str.trim().substr(1).split(" ")
		const name = tokens[0].toLowerCase()
		let args = []
		if (tokens.length > 1) {
			args = tokens.slice(1)
		}
		for (const command of this.commands) {
			const itemTokens = command.syntax.split(" ")
			const itemName = itemTokens[0].toLowerCase()
			let itemArgs = []
			if (itemTokens.length > 1) {
				itemArgs = itemTokens.slice(1)
			}
			const commandArguments = {}
			if(itemName === name) {
				for (const [index, arg] of itemArgs.entries()) {
					const optional = arg.substr(1, 1) === "?"
					let argName
					if(optional === true) {
						argName = arg.substr(2, arg.length - 3)
					} else {
						argName = arg.substr(1, arg.length - 2)
					}
					if (index + 1 > args.length && optional === false) {
						return { error: Processor.ERROR.MISSING_ARGS }
					} else {
						if(index === itemArgs.length - 1) {
							commandArguments[argName] = args.slice(index).join(" ")
						} else {
							commandArguments[argName] = args[index]
						}
					}
				}
				const keys = Object.keys(commandArguments)
				let dataArgs
				if(keys.length === 1) {
					dataArgs = commandArguments[keys[0]]
				} else {
					dataArgs = commandArguments
				}
				return { data: command.data, args: dataArgs }
			}
		}
		return { error: Processor.ERROR.COMMAND_NOT_FOUND }
	}

	/**
	 * @type {Command[]}
	 */
	get commands() {
		return this._commands
	}

	set commands(commands) {
		this._commands = commands
	}

}

export default Processor
