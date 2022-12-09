import groq from 'groq'

const postFields = groq`
  _id,
  'coverImageData':coverImage {
    asset-> {
              altText,
      'lqip':metadata.lqip,
      url
    }
  },
  content,
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

const headerImageData = groq`
'headerImageData': headerImage {
  asset-> {
    'altText':altText,
    'lqip':metadata.lqip,
    url
  }
}
`

const pageBuilderData = groq`
'backgroundImage': background.background {    //START Section backgroundSettings Option 
  image {
    asset-> {
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  }
},                                  // END Section backgroundSettings Option
'imageData': image {                // FIRST PARENT IMAGE DATA
  asset-> {
    'altText':altText,
    'lqip':metadata.lqip,
    url
  }
},                                  // END PARENT IMAGE DATA
'blockImages': blocks[] {           // START BLOCK IMAGE DATA
  ...,
'blockLinking':  button{
  'buttonText': text,
  externalUrl,
  linkType,
  newTab,
  internalLink->{
      title,
      'slug': slug.current,
      _type
    }
},
image {
  asset-> {
      'altText':altText,
      'lqip':metadata.lqip,
      url
  }
}
},                                    // END BLOCK IMAGE DATA
'childImage': images[] {              // START GALLERY DATA
...,
asset->{
'altText':altText,
'lqip':metadata.lqip,
url
}
},                                    // END GALLERY DATA
'buttonLinking':  button.button{      // START BUTTONSETTINGS DATA
'buttonText': text,
linkType,
externalUrl,
newTab,
internalLink->{
    title,
    'slug': slug.current,
    _type
  }
},                                     // END BUTTONSETTINGS DATA
'secondButtonLinking':  secondaryButton.button{      // START SECONDARY BUTTON DATA
  'buttonText': text,
  linkType,
  externalUrl,
  newTab,
  internalLink->{
      title,
      'slug': slug.current,
      _type
    }
  }                                     // END SECONDARY BUTTON DATA
`

const otherDocumentSections = groq`
'allServices': *[_type == 'services'] {
  ...,
  'imageData': headerImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTeam': *[_type == 'team'] {
  ...,
  'imageData': image {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allBlog': *[_type == 'blog'][0...4] {
  ...,
  'coverImageData': coverImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTestimonial': *[_type == 'testimonials'],
`

const seoData = groq`
'profileSettings': *[_type == 'profile'][0]{
  ...,
  'defaultImageData': seo {
    defaultImageBanner {
      asset->{
        'altText':altText,
        'lqip':metadata.lqip,
        url
      }
    }
  }
},
'appearances': *[_type == 'appearances'][0]{
  header {
    defaultHeaderImage
  },
  'favicon': branding.favicon,
  'themeColor': mainColors.primaryColor.hex,
  'defaultHeaderBanner': header.defaultHeaderImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  }
},
`

export const homePageQuery = groq`
{
  'homeAppearance': *[_type == 'appearances'][0]{
  'homePage': homePage-> {
    pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }
  },
${otherDocumentSections}
${seoData}
}
`


export const homeQuery = groq`
{
  'sanityImages': *[_type == "sanity.imageAsset"][0] {
    'base64': metadata.lqip
  },
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
  'pages':*[_type == 'pages' && slug.current == $slug][0]{
    ...,
    ${headerImageData},
    pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    },
    ${otherDocumentSections}
    ${seoData}
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
    'pageSettings': *[_type == 'pageSetting'][0] {
    blog {
    title,
    _id,
    headerImage {
      ...
    },
    'headerImageData':headerImage {
      asset-> {
                altText,
        'lqip':metadata.lqip,
        url
      }
    },
      seo {
        ...
      }
    }
    },
  'blog':*[_type == 'blog'] {
    title,
    'slug': slug.current,
    coverImage,
    "author": author->{name, picture},
    date,
    excerpt,
    'coverImageData': coverImage {
      '':asset-> {
        altText,
'lqip':metadata.lqip,
url
}
    }
  },
  ${seoData}
}
`

export const postQuery = groq`
{
  "post": *[_type == "blog" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${postFields}
  },
  "morePosts": *[_type == "blog" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    'coverImageData':coverImage {
      asset-> {
                altText,
        'lqip':metadata.lqip,
        url
      }
    },
    ${postFields}
  },
  ${otherDocumentSections}
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
  'secondaryButtonBg': mainColors.secondaryButtonBackgroundColor.hex,
  'secondaryButtonText': mainColors.secondaryButtonTextColor.hex,
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
      'topHeaderBar': topHeaderBar {
        enableTopHeaderBar,
        'topHeaderBarBgColor': topHeaderBarBgColor.hex,
        'topHeaderBarTextColor': topHeaderBarTextColor.hex,
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
    ...,
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

// HOME QUERY -> /pages/home/[slug]
export const queryHome = groq`
{
    'homeDesign': *[_type == 'homeDesign' && slug.current == $slug ][0]{
      ...,
      pageBuilder[]{
        ...,
        ${pageBuilderData}
      }
    },
  ${otherDocumentSections}
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
{
    'pageSettings': *[_type == 'pageSetting'][0] {
    services {
    title,
    headerImage {
      ...
    },
    'headerImageData':headerImage {
      asset-> {
                altText,
        'lqip':metadata.lqip,
        url
      }
    },
      seo {
        ...
      }
    }
    },
  'services':*[_type == 'services']{
      ${headerImageData},
      'slug': slug.current,
      content,
      title,
      _id
  },
  ${seoData}
}
`


export const servicesBySlugQuery = groq`
*[_type == "services" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryServiceCurrentPage = groq`
{
    'services': *[_type == 'services' && slug.current == $slug ][0]{
      ${headerImageData},
      ...,
      pageBuilder[]{
        ...,
        ${pageBuilderData}
      }
    },
    ...,
    ${otherDocumentSections}
    ${seoData}
}
`

export const servicesSlugsQuery = groq`
*[_type == "services" && defined(slug.current)][].slug.current
`

// TEAM QUERY
export const queryTeam = groq`
{
  'pageSettings': *[_type == 'pageSetting'][0]{
    team {
      ...,
      'headerImageData': headerImage {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      }
    }
  },
  'team':*[_type == 'team']{
name,
  _id,
image,
'imageData': image {
  asset-> {
    altText,
    'lqip':metadata.lqip,
    url
  }
},
'slug': slug.current,
about,
position,
contactInformation {
  ...
},
social {
  ...
}
},
${seoData}
}
`

export const teamBySlugQuery = groq`
*[_type == "team" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryTeamCurrentPage = groq`
{
  'team': *[_type == 'team' && slug.current == $slug][0]{
    ...,
    'imageData': image {
      asset-> {
        altText,
        'lqip':metadata.lqip,
        url
      }
    },
  },
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
  'pageSettings': *[_type == 'pageSetting'][0] {
    legal {
    title,
    headerImage {
      ...
    },
    'headerImageData':headerImage {
      asset-> {
                altText,
        'lqip':metadata.lqip,
        url
      }
    },
      seo {
        ...
      }
    }
    },
  'legal':*[_type == 'legal']{
  title,
    _id,
  image,
  'slug': slug.current,
  content,
},
${seoData}
}
`

export const legalBySlugQuery = groq`
*[_type == "legal" && slug.current == $slug][0] {
  'slug': slug.current
}
`

export const queryLegalCurrentPage = groq`
{
  'legal': *[_type == 'legal' && slug.current == $slug][0],
  ...,
  'allLegal': *[_type == 'legal'],
  ${seoData}
}
`

export const legalSlugsQuery = groq`
*[_type == "legal" && defined(slug.current)][].slug.current
`