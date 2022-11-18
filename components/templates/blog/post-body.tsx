/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react'
import ShareSocial from '../share'
import Router, { useRouter } from 'next/router'

import portableTextStyles from './portable-text-styles.module.css'

export default function PostBody({ content }) {

  const router = useRouter()
  return (
    <>
      <div className={`mx-auto max-w-2xl ${portableTextStyles.portableText}`}>
        <PortableText value={content} />
      </div>
      <div className="my-10 mx-auto max-w-2xl">
        <ShareSocial
          url={process.env.VERCEL_URL + router.asPath}
        />
      </div>
    </>
  )
}
