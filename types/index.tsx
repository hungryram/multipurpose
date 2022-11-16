export interface AuthorProps {
  name: string
  picture: any
}

export interface PostProps {
  title: string
  coverImage: any
  date: string
  excerpt?: string
  author: AuthorProps
  slug?: string
  content?: any
}

export interface PageProps {
  title: string
  headerImage: any
  slug?: string
  content?: any
  pages?: any
}

export interface ServiceProps {
  title: string
  headerImage: any
  slug?: string
  content?: any
  services: any
}

export interface TeamProps {
  name: string
  headerImage: any
  image: any
  slug?: string
  content?: any
  about?: any
}

export interface LegalProps {
  title: string
  image: any
  slug?: string
  content?: any
}