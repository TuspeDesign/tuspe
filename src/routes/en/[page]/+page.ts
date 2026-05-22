import {error} from '@sveltejs/kit'
import type {PageContent} from '$lib/types'

export const load = async ({params}: {params: {page: string}}): Promise<PageContent> => {
  try {
    const module = await import(`../../../lib/i18n/en/${params.page}.json`)
    return module.default
  } catch {
    throw error(404, 'Page not found')
  }
}
