import {readable, writable} from 'svelte/store'
export const lang = writable<'fi' | 'en'>('fi')
export const host = readable('https://tuspe.com')
export const siteName = readable('Tuspe Design')
export const waLink = 'https://wa.me/358453111786'
