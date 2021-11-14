import assert from "assert"

import { Command } from "../index.js"

describe("Command", () => {

	it("instance", () => {
		const command = new Command("foo", "bar")
		assert.deepEqual(command.syntax, "foo")
		assert.deepEqual(command.data, "bar")
		assert.throws(() => {
			command.syntax = []
		})
		assert.throws(() => {
			command.data = []
		})
	})

})
