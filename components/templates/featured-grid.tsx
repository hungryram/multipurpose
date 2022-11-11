import Link from "next/link"
import Image from "next/image"
import { urlForImage } from "../../lib/sanity"


export default function FeaturedGrid({ link, image, value }: any) {
    return (
        <Link href={link ?? '/'}>
            <div className="relative overflow-hidden">
                {image &&
                    <Image
                        src={urlForImage(image).url()}
                        alt={value}
                        height="400"
                        width="450"
                        placeholder="blur"
                        blurDataURL={urlForImage(image).width(50).height(50).quality(1).url()}
                        style={{
                            objectFit: 'cover',
                            height: '500px',
                        }}
                        className="w-full"
                    />
                }
                <div className="featured-grid-overlay"></div>
                <div className="absolute bottom-6 left-0 right-0 text-white px-6 py-4 justify-center text-center">
                    <h3 className="h3 text-white">{value}</h3>
                </div>
            </div>
        </Link>
    )
}
