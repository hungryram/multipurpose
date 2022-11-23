import { PostProps } from '../../../types'
import Avatar from './avatar'
import CoverImage from './cover-image'
import Date from './date'
import PostTitle from './post-title'

export default function PostHeader(props: PostProps) {
  const { title, coverImage, date, author, slug, altText, blurData } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className=" md:mb-12 md:block text-center">
        {author &&
          <div className="flex justify-center">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        }
      </div>
      <div className="my-8 sm:mx-0 md:mb-16">
        <CoverImage 
          title={title} 
          image={coverImage} 
          priority
          altText={altText}
          blurData={blurData}
          slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-sm">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
