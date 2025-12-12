import { createClient } from 'next-sanity'

function getSanityConfig() {
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-27'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  // Debug logging (remove in production if needed)
  if (typeof window === 'undefined') {
    console.log('Sanity Config Check:', {
      hasProjectId: !!projectId,
      hasDataset: !!dataset,
      projectId: projectId ? `${projectId.substring(0, 4)}...` : 'missing',
      dataset: dataset || 'missing',
      apiVersion
    });
  }

  if (!dataset || !projectId) {
    throw new Error(
      'Missing required Sanity environment variables. Please set NEXT_PUBLIC_SANITY_DATASET and NEXT_PUBLIC_SANITY_PROJECT_ID'
    )
  }

  return { projectId, dataset, apiVersion }
}

let clientInstance: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!clientInstance) {
    const config = getSanityConfig()
    clientInstance = createClient({
      ...config,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  }
  return clientInstance
}

// Lazy initialization - only creates client when actually used
export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const client = getClient()
    const value = client[prop as keyof typeof client]
    return typeof value === 'function' ? value.bind(client) : value
  }
})
