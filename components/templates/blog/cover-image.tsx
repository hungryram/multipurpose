
import { urlForImage } from '../../../lib/sanity'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
  altText?: string
  blurData: any
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, altText, blurData } = props
  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <Image
        className="h-auto w-full"
        width={2000}
        height={1000}
        alt={altText}
        src={urlForImage(source).height(1000).width(2000).url()}
        sizes="100vw"
        priority={priority}
        placeholder={blurData ? 'blur' : 'empty'}
        blurDataURL={blurData}
      />
    </div>
  ) : (
    <></>
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
