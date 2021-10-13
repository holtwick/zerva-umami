// <reference path="node_modules/zerva-umami/dist/esm/index.d.ts" />

// Simple demo for node and CommonJS loading

import {
  Logger,
  LoggerFileHandler,
  LoggerNodeHandler,
  LogLevel,
  setupEnv,
  valueToInteger,
} from "zeed"
import { serve, useHttp } from "zerva"
import { useUmami } from "zerva-umami"

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

useUmami({
  collectUrl: process.env.UMAMI_COLLECT_URL,
  websiteId: process.env.UMAMI_WEBSITE_ID,
})

serve()
