import { groq } from "next-sanity";
import { getClient } from '../lib/sanity.server'
import { sitemapData } from "../lib/queries"

export default function Sitemap() {

    return <div>loading</div>
}

export async function getServerSideProps({ res }) {

    const baseURL = process.env.NEXT_PUBLIC_BASEURL
    const query = groq`
    {
        'profile': *[_type == 'profile'][0]{
            'domain': settings.websiteName
            },
        'pages': *[_type == 'pages']{
            'slug': slug.current,
        },
        'legal': *[_type == 'legal']{
            'slug': slug.current,
        },
        'portfolio': *[_type == 'portfolio']{
            'slug': slug.current,
        },
        'services': *[_type == 'services']{
            'slug': slug.current,
        },
    }
    `
    const sanityPageQuery = await getClient(false).fetch(query)

    const pages = sanityPageQuery.pages.map(page => {
        const slug = page.slug === '/' ? '/' : `/${page.slug}/`

        return `
        <loc>${sanityPageQuery.profile.domain}${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        `
    })


    const legal = sanityPageQuery?.legal?.map(legal => {
        const slug = legal.slug === '/' ? '/' : `/legal/${legal.slug}/`

        return `
        <loc>${sanityPageQuery.profile.domain}${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        `
    })


    const services = sanityPageQuery.services.map(services => {
        const slug = services.slug === '/' ? '/' : `/services/${services.slug}/`

        return `
        <loc>${sanityPageQuery.profile.domain}${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
        `
    })


    const sanityPages = [...pages]
    const sanityLegal = [...legal]
    const sanityServices = [...services]
    const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
            <loc>${sanityPageQuery.profile.domain}/</loc>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
            </url>
            <url>
            <loc>${sanityPageQuery.profile.domain}/legal/</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
            </url>
            <url>
            <loc>${sanityPageQuery.profile.domain}/services/</loc>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
            </url>
          ${sanityPages
            .map(pages => {
                return `<url>
                        ${pages}
                      </url>
                    `
            })
            .join('')}
            ${sanityLegal
            .map(legal => {
                return `<url>
                            ${legal}
                          </url>
                        `
            })
            .join('')}

            .join('')}
                ${sanityServices
            .map(services => {
                return `<url>
                                    ${services}
                                  </url>
                                `
            })
            .join('')}
      </urlset>
      `
    res.setHeader('Content-Type', 'text/xml')
    res.write(createSitemap())
    res.end()

    return {
        props: {},
    }
}