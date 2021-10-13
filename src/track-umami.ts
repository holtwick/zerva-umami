import { getClientIp } from "request-ip"
import { fetchOptionsJson, fetchText, Logger } from "zeed"

const log = Logger("track")

let umamiTrackUrl: string
let umamiWebsiteId: string

export function setTrackWebsiteId(id: string) {
  umamiWebsiteId = id
}

export function setTrackCollectUrl(url: string) {
  umamiTrackUrl = url
}

type TrackEvent = {
  type: "event"
  req: any
  url?: string
  event_type?: string
  event_value?: string
  website?: string
}

type TrackPageview = {
  type: "pageview"
  req: any
  url?: string
  website?: string
}

export async function track(opt: TrackEvent | TrackPageview) {
  setTimeout(async () => {
    try {
      let { type, req, url, website } = opt

      if (!url) url = req.originalUrl
      if (!website) website = umamiWebsiteId

      const language = req.get("accept-language")
      const ua = req.get("user-agent")
      const referrer = req.get("referrer")
      const ip = getClientIp(req)
      const hostname = req.hostname

      let body = {
        type,
        payload: {
          url,
          hostname,
          language,
          referrer,
          website,
        },
      }

      // log.info("track", { body, ua, referrer, ip })

      if (type === "event") {
        let { event_type, event_value } = opt as TrackEvent
        Object.assign(body.payload, { event_type, event_value })
      }

      let options = {
        ...fetchOptionsJson(body),
      }

      Object.assign(options.headers, {
        "Accept-Language": language,
        "User-Agent": ua,
        Referer: referrer,
        "cf-connecting-ip": ip,
      })

      // log.info(`track ${type} to ${umamiTrackUrl}:`, options)

      let response = await fetchText(umamiTrackUrl, options)
      // log.info("tracked", response)
    } catch (err) {
      log.warn("Failed to track", err)
    }
  }, 0)
}

export async function trackEvent(
  req: any,
  event_type: string,
  event_value: string,
  url?: string
) {
  await track({
    type: "event",
    event_type,
    event_value,
    url,
    req,
  })
}

export async function trackPageView(req: any, url?: string) {
  await track({
    type: "pageview",
    url,
    req,
  })
}
