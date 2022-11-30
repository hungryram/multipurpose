import Link from 'next/link'

import { PostProps } from '../../../types'
import CoverImage from './cover-image'
import Date from './date'
import { FiCameraOff } from "react-icons/fi"

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  altText,
  blurData,
}: PostProps) {
  return (
    <div>
      <div className="mb-5">
        {coverImage ?
          <CoverImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={false}
            altText={altText}
            blurData={blurData}
          />
          :
          <div className="pt-[50%] relative bg-secondary flex justify-center items-center">
            <div className="absolute top-1/2">
              <FiCameraOff className="text-white text-6xl"/>
            </div>
          </div>
        }
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
    </div>
  )
}
