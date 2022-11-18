import Link from 'next/link'

import { PostProps } from '../../../types'
import Avatar from './avatar'
import CoverImage from './cover-image'
import Date from './date'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostProps) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className="mb-3 text-2xl leading-snug">
        <Link href={`/blog/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-sm">
        <Date dateString={date} />
      </div>
      <p className="mb-4 leading-relaxed">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
