import Image from "next/image"
import { urlForImage } from "../../lib/sanity"

export default function Header({ image, title, altTag }: any) {
    return (
        <div className={`flex items-center relative ${image ? `` : ` bg-black`}`}>
            {image &&
                <Image
                    src={urlForImage(image).url()}
                    width={2000}
                    height={0}
                    alt={altTag}
                    placeholder="blur"
                    blurDataURL={urlForImage(image).width(50).height(50).url()}
                    priority
                    className="lg:h-[20em] h-[15rem]"
                    style={{
                        objectFit: 'cover',
                    }}
                />
            }
            <div className="overlay"></div>
            <div className="absolute md:top-2/3 top-1/2 bottom-0 left-0 right-0 text-white text-center">
                {title && <h1 className="md:text-5xl text-3xl font-medium text-white">{title}</h1>}
            </div>
        </div>
    )
}