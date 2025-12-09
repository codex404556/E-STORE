import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Lazy initialization - only creates builder when actually used
let builderInstance: ReturnType<typeof createImageUrlBuilder> | null = null

function getBuilder() {
  if (!builderInstance) {
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

    if (!dataset || !projectId) {
      throw new Error(
        'Missing required Sanity environment variables. Please set NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_PROJECT_ID'
      )
    }

    builderInstance = createImageUrlBuilder({ projectId, dataset })
  }
  return builderInstance
}

// https://www.sanity.io/docs/image-url
export const urlFor = (source: SanityImageSource) => {
  return getBuilder().image(source)
}
