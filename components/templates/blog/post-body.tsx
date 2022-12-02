/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { useRouter } from 'next/router'
import ContentEditor from '../contenteditor'

import portableTextStyles from './portable-text-styles.module.css'

export default function PostBody({ content }) {

  const router = useRouter()
  return (
    <>
      <div className={`mx-auto max-w-2xl ${portableTextStyles.portableText}`}>
        <ContentEditor content={content} />
      </div>

    </>
  )
}
