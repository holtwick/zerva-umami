import "cross-fetch/polyfill"
import { Logger, LoggerNodeHandler, LogLevel } from "zeed"
import { emit, serve, useHttp } from "zerva"

Logger.setHandlers([
  LoggerNodeHandler({
    level: LogLevel.info,
    filter: "*",
    colors: true,
    padding: 16,
    nameBrackets: false,
    levelHelper: false,
  }),
])

describe("module", () => {
  beforeAll(async () => {
    useHttp({
      port: 8888,
    })
    await serve()
  })

  afterAll(async () => {
    await emit("serveStop")
  })

  it("should do what it should do", async () => {
    let res = await fetch("http://localhost:8888")
    let content = await res.text()
    expect(content).toMatchInlineSnapshot(`
"<!DOCTYPE html>
<html lang=\\"en\\">
<head>
<meta charset=\\"utf-8\\">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /</pre>
</body>
</html>
"
`)
  })
})
