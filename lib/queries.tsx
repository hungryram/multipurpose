import groq from 'groq'

const postFields = groq`
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const homeQuery = groq`
{
	'homeDesign': *[_type == 'homeDesign'][0],
  'team': *[_type == 'team'][0..6]{
    name,
    _id,
    image,
    'slug': slug.current
  },
  'blog': *[_type == 'blog'][0..4]{
    'slug': slug.current,
    title,
    _id,
    excerpt,
    date,
    mainImage
  },
}
`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// APPEARANCES PULLED FROM /COMPONENTS/GLOBAL/LAYOUT
export const appearances = groq`
{
    'appearances': *[_type == 'appearances'][0]{
    'loader': branding.loadingLogo.asset->url,
    'loaderColor': branding.loadingBackground.hex,
    'loaderImage': branding.loadingLogo.asset->url,
    'navColor': header.navColor.hex,
    'navBgColor': header.headerColor.hex,
    'primaryButtonBg': mainColors.buttonBackgroundColor.hex,
    'primaryButtonText': mainColors.buttonTextColor.hex,
    'footerHeader': footer.headerColor.hex,
    'footerText': footer.textColor.hex,
    'footerBg': footer.footerBackground.color.hex,
    'primaryAccent': mainColors.primaryColor.hex,
    'secondaryColor': mainColors.secondaryColor.hex,
    'branding': branding {
            logo,
            logoWidth
        },
        'header': header {
            ctaLink,
            ctaText,
            '': mainNav->{
            'navItems':items[]{
              'subMenu':subMenu[]{
              newTab,
              _key,
              linkType,
              externalUrl,
              text,
              internalLink->{
              title,
              'slug': slug.current,
              _type
        }
        },
              linkType,
              externalUrl,
              text,
              _key,
              newTab,
              internalLink->{
              title,
              'slug': slug.current,
              _type
            }
            }
          }
          },
   footer {
    ...,
   quickLinks[]{
               newTab,
               linkType,
               externalUrl,
               text,
               internalLink->{
               title,
               name,
               'slug': slug.current,
               _type
   }
 }
 },
  },
  'legal': *[_type == 'legal']{
    title,
    'slug': slug.current,
    _id
  },
    'profileSettings': *[_type == 'profile'][0]{
        company_name,
        contact_information {
            ...
        },
        address {
            ...
        }
    },
  }
`