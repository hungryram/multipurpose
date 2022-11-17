import { 
  homeBySlugQuery,
  postBySlugQuery, 
  pagesBySlugQuery, 
  servicesBySlugQuery,
  teamBySlugQuery,
  legalBySlugQuery,
} from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'

function redirectToPreview(res, Location) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

export default async function preview(req, res) {
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }
  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/')
  }

  // Check if the post with the given `slug` exists

  const home = await getClient(true).fetch(homeBySlugQuery, {
    slug: req.query.slug,
  })

  const post = await getClient(true).fetch(postBySlugQuery, {
    slug: req.query.slug,
  })

  const pages = await getClient(true).fetch(pagesBySlugQuery, {
    slug: req.query.slug,
  })

  const services = await getClient(true).fetch(servicesBySlugQuery, {
    slug: req.query.slug,
  })

  const teams = await getClient(true).fetch(teamBySlugQuery, {
    slug: req.query.slug,
  })

  const legal = await getClient(true).fetch(legalBySlugQuery, {
    slug: req.query.slug,
  })


  // If the slug doesn't exist prevent preview mode from being enabled
  if (post) {
    redirectToPreview(res, `/blog/${post.slug}`)
  } else if(pages) {
    redirectToPreview(res, `/${pages.slug}`)
  } else if(services) {
    redirectToPreview(res, `/services/${services.slug}`)
  } else if(teams) {
    redirectToPreview(res, `/team/${teams.slug}`)
  } else if(legal) {
    redirectToPreview(res, `/legal/${legal.slug}`)
  } else if(home) {
    redirectToPreview(res, `/home/${home.slug}`)
  } 
  
  else {
    return res.status(401).json({ message: 'Invalid slug' })
  }

}
