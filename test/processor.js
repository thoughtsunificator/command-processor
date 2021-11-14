import assert from "assert"

import { Processor, Command } from "../index.js"

describe("Processor", () => {

	it("instance", () => {
		const processor = new Processor([1])
		assert.deepEqual(processor.commands, [1])
		assert.strictEqual(Processor.PREFIX_COMMAND, "/")
		assert.strictEqual(Processor.ERROR.COMMAND_NOT_FOUND, "COMMAND_NOT_FOUND")
		assert.strictEqual(Processor.ERROR.MISSING_ARGS, "MISSING_ARGS")
		assert.doesNotThrow(() => {
			processor.commands = []
		})
	})

	it("run", () => {
		const processor = new Processor([
			new Command("foo <arg>", "somedata"),
			new Command("bar <arg1>", "somedata2"),
			new Command("test <arg1>", "somedata3"),
			new Command("test2 <arg1> <arg2>", "somedata4"),
		])
		assert.deepEqual(processor.run("foo hello"), { error: Processor.ERROR.COMMAND_NOT_FOUND })
		assert.deepEqual(processor.run("/foo"), { error: Processor.ERROR.MISSING_ARGS })
		assert.deepEqual(processor.run("/bar"), { error: Processor.ERROR.MISSING_ARGS })
		assert.deepEqual(processor.run("/foo hello"), { data: "somedata", args: "hello" })
		assert.deepEqual(processor.run("/bar test"), { data: "somedata2", args: "test" })
		assert.deepEqual(processor.run("/test test dsa dsadsa dsadsa"), { data: "somedata3", args: "test dsa dsadsa dsadsa" })
		assert.deepEqual(processor.run("/test2 test dsa dsadsa dsadsa"), { data: "somedata4", args: {
			arg1: "test",
			arg2: "dsa dsadsa dsadsa"
		} })
	})

})
