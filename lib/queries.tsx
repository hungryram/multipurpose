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
  seo {
    ...
  }
`

const seoData = groq`
'sanityImages': *[_type == "sanity.imageAsset"][0]{
  'base64': metadata.lqip
},
'profileSettings': *[_type == 'profile'][0]{
  company_name,
  seo {
    ...
  }
},
'appearances': *[_type == 'appearances'][0]{
  'favicon': branding.favicon,
  'themeColor': mainColors.primaryColor.hex,
  'defaultImage': header.defaultHeaderImage
}
`

export const homePageQuery = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0] {
    'base64': metadata.lqip
  },
  'homeAppearance': *[_type == 'appearances'][0]{
  'homePage': homePage-> {
    pageBuilder[]{
        ...,
        'blockImages': blocks[] {
          ...,
      image {
          '':asset-> {
              'altText':altText,
              'lqip':metadata.lqip,
              url
          }
      }
    },
        'childImage': images[] {
          ...,
          '':asset->{
            'altText':altText,
            'lqip':metadata.lqip,
          }
        },
        '': image {
          '':asset->{
            'altText':altText,
            'lqip':metadata.lqip,
          }
        },
      'button':  button.button{
        'buttonText': 
        text,
        externalUrl,
        linkType,
        newTab,
        internalLink->{
            title,
            'slug': slug.current,
            _type
          }
      }
    }
    }
  },
  'testimonialAll': *[_type == 'testimonials'],
  ${seoData}
}
`


export const homeQuery = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0] {
    'base64': metadata.lqip
  },
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
  'profileSettings': *[_type == 'profile'][0]{
    company_name
  }
}
`

export const indexQuery = groq`
*[_type == "blog"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const pageQuery = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0] {
    'base64': metadata.lqip
  },
  'appearances': *[_type == 'appearances'][0]{
    'favicon': branding.favicon,
    'themeColor': mainColors.primaryColor.hex,
    'defaultImage': header.defaultHeaderImage
  },
  'profileSettings': *[_type == 'profile'][0]{
    company_name,
    contact_information {
      ...
    },
    address {
      ...
    },
    social {
      ...
    }
  },
    'pages': *[_type == 'pages' && slug.current == $slug][0],
    ...,
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

export const pagesSlugsQuery = groq`
*[_type == "pages" && defined(slug.current)][].slug.current
`

export const pagesBySlugQuery = groq`
*[_type == "pages" && slug.current == $slug][0] {
  'slug': slug.current
}
`

// All BLOG QUERY
export const queryAllPosts = groq`
{
  'header': *[_type == 'appearances'][0]{
    'image': header.defaultHeaderImage
  },
  'blog':*[_type == 'blog'] {
    title,
    'slug': slug.current,
    coverImage,
    "author": author->{name, picture},
    date,
    excerpt,
  }
}
`

export const postQuery = groq`
{
  "post": *[_type == "blog" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "blog" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  },
  ${seoData}
}
`

export const postSlugsQuery = groq`
*[_type == "blog" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "blog" && slug.current == $slug][0] {
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
  'websiteTextColor': mainColors.websiteTextColor.hex,
  'websiteBodyColor': mainColors.websiteBodyColor.hex,
  'mobileIconColor': header.hamburgerMenuColor.hex,
  'primaryButtonBg': mainColors.buttonBackgroundColor.hex,
  'primaryButtonText': mainColors.buttonTextColor.hex,
  'buttonRadius': globalButtonDesign.buttonCorner,
  'buttonXPadding': globalButtonDesign.xPadding,
  'buttonYPadding': globalButtonDesign.yPadding,
  'footerHeader': footer.headerColor.hex,
  'footerText': footer.textColor.hex,
  'footerBg': footer.footerBackgroundColor.hex,
  'primaryAccent': mainColors.primaryColor.hex,
  'secondaryColor': mainColors.secondaryColor.hex,
  'branding': branding {
          logo,
          logoWidth,
          mobileLogoWidth
      },
      'announcementBar': announcementBar {
        announcement,
        'announcementBarLink': link {
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
        'announcementBgColor': backgroundColor.hex,
        'announcementTextColor': textColor.hex,
      },
      'header': header {
          'ctaLink': cta {
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
      social,
      contact_information {
          ...
      },
      address {
          ...
      },
      settings {
        ...
      }
  },
}
`

// HOME QUERY
export const queryHome = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0] {
    'base64': metadata.lqip
  },
  'profileSettings': *[_type == 'profile'][0]{
    contact_information {
      ...
    },
    address {
      ...
    },
    social {
      ...
    }
  },
    'homeDesign': *[_type == 'homeDesign' && slug.current == $slug ][0]{
      ...,
      pageBuilder[]{
        ...,
      'button':  button.button{
        'buttonText': text,
        linkType,
        externalUrl,
        newTab,
        internalLink->{
            title,
            'slug': slug.current,
            _type
          }
      }
      }
    },
    ...,
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
    'testimonialAll': *[_type == 'testimonials']
}
`

export const homeBySlugQuery = groq`
*[_type == "homeDesign" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryHomeCurrentPage = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"] {
    'base64': metadata.lqip
  },
  'services': *[_type == 'homeDesign' && slug.current == $slug][0],
  ...,
  'allServices': *[_type == 'homeDesign']
}
`

export const homeSlugsQuery = groq`
*[_type == "homeDesign" && defined(slug.current)][].slug.current
`



// SERVICE QUERY
export const queryServices = groq`
*[_type == 'services']{
    name,
    image,
    'slug': slug.current,
    content,
    title,
    content,
    _id
}
`


export const servicesBySlugQuery = groq`
*[_type == "services" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryServiceCurrentPage = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0]{
    'base64': metadata.lqip
  },
  'services': *[_type == 'services' && slug.current == $slug][0],
  ...,
  'allServices': *[_type == 'services'],
  ${seoData}
}
`

export const servicesSlugsQuery = groq`
*[_type == "services" && defined(slug.current)][].slug.current
`

// TEAM QUERY
export const queryTeam = groq`
{
  'header': *[_type == 'appearances'][0]{
    'image': header.defaultHeaderImage
  },
  'team':*[_type == 'team']{
  name,
    _id,
  image,
  'slug': slug.current,
  about,
  position,
  contactInformation {
    ...
  },
  social {
    ...
  }
}
}
`

export const teamBySlugQuery = groq`
*[_type == "team" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryTeamCurrentPage = groq`
{
  'team': *[_type == 'team' && slug.current == $slug][0],
  ...,
  'allTeam': *[_type == 'team'],
  ${seoData}
}
`

export const teamSlugsQuery = groq`
*[_type == "team" && defined(slug.current)][].slug.current
`

// LEGAL QUERY
export const queryLegal = groq`
{
  'header': *[_type == 'appearances'][0]{
    'image': header.defaultHeaderImage
  },
  'legal':*[_type == 'legal']{
  title,
    _id,
  image,
  'slug': slug.current,
  content,
}
}
`

export const legalBySlugQuery = groq`
*[_type == "legal" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryLegalCurrentPage = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"] {
    'base64': metadata.lqip
  },
  'header': *[_type == 'appearances'][0]{
    'image': header.defaultHeaderImage
  },
  'legal': *[_type == 'legal' && slug.current == $slug][0],
  ...,
  'allLegal': *[_type == 'legal'],
  ${seoData}
}
`

export const legalSlugsQuery = groq`
*[_type == "legal" && defined(slug.current)][].slug.current
`