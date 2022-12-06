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
  altText: string
  blurData?: any
  lqip?: any
  coverImageData?: any
  seo?: any
}

export interface PageProps {
  title: string
  headerImage: any
  slug?: string
  content?: any
  pages?: any
  profileSettings?: any
  appearances?: any
  allServices?: any
  allTestimonial?: any
  allBlog?: any
  allTeam?: any
}

export interface ServiceProps {
  title: string
  headerImage: any
  slug?: string
  content?: any
  services: any
  profileSettings?: any
  appearances?: any
  allServices?: any
  allTestimonial?: any
  allBlog?: any
  allTeam?: any
}

export interface TeamProps {
  name: string
  headerImage: any
  image: any
  slug?: string
  content?: any
  about?: any
  profileSettings?: any
  appearances?: any
  team?: any
}

export interface LegalProps {
  title: string
  image: any
  slug?: string
  content?: any
  header: any
  seo: any
  profileSettings?: any
  appearances?: any
  legal?: any
}

export interface HomeProps {
  title: string
  image: any
  slug?: string
  content?: any
  pages?: any
  profileSettings?: any
  appearances?: any
  allServices?: any
  allTestimonial?: any
  allBlog?: any
  allTeam?: any
  homeDesign?: any
}