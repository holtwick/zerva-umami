// (C)opyright 2021 Dirk Holtwick, holtwick.it. All rights reserved.

import { Logger } from "zeed"
import { emit, on, register } from "zerva"

const name = "counter"
const log = Logger(`zerva:${name}`)

interface Config {
  start?: number
}

export function useCounter(config: Config) {
  const { start = 0 } = config
  log.info(`use ${name}`)
  register(name, ["http"])
  let counter = start
  on("httpInit", ({ get }) => {
    get("/", async () => {
      await emit("counterIncrement", ++counter)
      return `Counter ${counter}.<br><br>Reload page to increase counter.`
    })
  })
}
