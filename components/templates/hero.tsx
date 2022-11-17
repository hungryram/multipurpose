import Image from "next/image"
import { urlForImage } from "../../lib/sanity"

export default function Hero({ image, heading, altTag, subtitle, _key, blurData, imageHeight, bodyColor, headerColor, buttonLink, buttonText } : any) {


    return (
        <div className="flex items-center relative">
            {image ?
                <Image
                    src={urlForImage(image).height(1000).width(2000).url()}
                    alt={altTag}
                    className={`w-full ${imageHeight}`}
                    priority
                    width={2000}
                    height={1000}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={blurData ?? urlForImage(image).width(100).height(100).quality(1).url()}
                    style={{
                        objectFit: 'cover'
                    }}
                />
                :
                <Image
                src="/assets/banner.jpg"
                alt="placeholder"
                className={`w-full ${imageHeight}`}
                width={2000}
                height={1000}
                sizes="100vw"
                priority
                placeholder="blur"
                blurDataURL={blurData ?? urlForImage(image).width(100).height(100).quality(1).url()}
                style={{
                    objectFit: 'cover'
                }}
            />
            }
            <div className="hero-overlay"></div>
            <div className="absolute top-0 bottom-0 left-0 right-0 text-center flex items-center flex-col justify-center">
                <h1 className="md:text-5xl text-3xl font-medium" style={headerColor}>{heading}</h1>
                {subtitle &&
                    <div className="mt-4 text-lg" style={bodyColor}>
                        <p>{subtitle}</p>
                    </div>
                }
            </div>
        </div>
    )
}