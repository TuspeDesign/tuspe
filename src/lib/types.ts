interface Button {
  icon: string
  link: string
  title: string
}

interface WavesData {
  title: string
  content: string
  image: string
  imageHeight: number
  buttonText?: string
  buttonIcon?: string
}

interface Aside {
  title: string
  items: string[]
}

interface ProgressionItem {
  title: string
  content: string
}

interface Main {
  id?: string
  cols: number
  title: string
  content: string
  aside?: Aside
  progression?: { title: string; items: ProgressionItem[] }
}

interface FaqItem {
  title: string
  content: string
}

interface ReferenceItem {
  title: string
  link: string
  image: string
  alt?: string
}

interface References {
  id?: string
  title: string
  content: string
  imageFull: boolean
  items: ReferenceItem[]
}

export interface PageContent {
  title: string
  headline: string
  description: string
  subtitle: string
  slogan?: string
  language: 'fi' | 'en'
  image: string
  imageHeight: number
  contact?: boolean
  buttons?: Button[]
  waves?: WavesData
  main?: Main
  faq?: { title: string; items: FaqItem[] }
  references?: References
}

export interface Link {
  href: string
  icon: string
  id: number
  title: string
}

export interface MenuLinks {
  en: Link[]
  fi: Link[]
}
