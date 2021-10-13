// <reference path="node_modules/zerva-module-template/dist/esm/index.d.ts" />

// Simple demo for node and CommonJS loading

import {
  Logger,
  LoggerFileHandler,
  LoggerNodeHandler,
  LogLevel,
  setupEnv,
  valueToInteger,
} from "zeed"
import { on, serve, useHttp } from "zerva"
import { useCounter } from "zerva-module-template"

Logger.setHandlers([
  LoggerFileHandler("zerva.log", {
    level: LogLevel.debug,
  }),
  LoggerNodeHandler({
    level: LogLevel.info,
    filter: "*",
    colors: true,
    padding: 16,
    nameBrackets: false,
    levelHelper: false,
  }),
])

setupEnv()
const log = Logger("app")

useHttp({
  port: valueToInteger(process.env.PORT, 8080),
})

on("counterIncrement", (counter) => {
  log.info("counter inc", counter)
})

useCounter({
  start: valueToInteger(process.env.MODULENAME_START),
})

serve()
