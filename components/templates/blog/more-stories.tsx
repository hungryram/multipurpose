import { PostProps } from '../../../types'
import PostPreview from './post-preview'

export default function MoreStories({ posts }: { posts: PostProps[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl leading-tight tracking-tighter md:text-4xl">
        More Posts
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            altText={post.coverImageData?.asset?.altText}
          />
        ))}
      </div>
    </section>
  )
}
