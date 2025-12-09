// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

// Lazy initialization - only creates live client when actually used
let liveInstance: ReturnType<typeof defineLive> | null = null

function getLive() {
  if (!liveInstance) {
    liveInstance = defineLive({
      client,
    })
  }
  return liveInstance
}

export const sanityFetch = async (options: Parameters<ReturnType<typeof defineLive>['sanityFetch']>[0]) => {
  return getLive().sanityFetch(options)
}

// Create a proxy for SanityLive component to lazy load
const SanityLiveProxy = new Proxy({} as ReturnType<typeof defineLive>['SanityLive'], {
  get(_target, prop) {
    const component = getLive().SanityLive
    return component[prop as keyof typeof component]
  }
})

export { SanityLiveProxy as SanityLive }
