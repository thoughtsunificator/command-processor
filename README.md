# command-processor

Command processor

## Getting started

### Installing

- ``npm install @thoughtsunificator/command-processor``

### Usage

```javascript
import { Processor } from "@thoughtsunificator/command-processor"

const processor = new Processor([
  new Command("foo <arg>", "somedata"),
  new Command("bar <arg1>", "somedata2")
])

processor.run("/foo myArg") // outputs { data: "somedata", args: "myArg" }
```
