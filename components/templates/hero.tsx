import Image from "next/image"
import { urlForImage } from "../../lib/sanity"

export default function Hero({ image, heading, altTag, subtitle, _key, blurData, bodyColor, headerColor, buttonLink, buttonText, idxSubdomain = 'search', idxId = '132970' } : any) {


    return (
        <div className="flex items-center" key={_key}>
            {image ?
                <Image
                    src={urlForImage(image).height(1000).width(2000).url()}
                    alt={altTag}
                    className="w-full h-screen"
                    priority
                    width={2000}
                    height={1000}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={urlForImage(image).width(100).height(100).quality(1).url()}
                    style={{
                        objectFit: 'cover'
                    }}
                />
                :
                <Image
                src="/assets/banner.jpg"
                alt="placeholder"
                className="w-full h-screen"
                width={2000}
                height={1000}
                sizes="100vw"
                priority
                style={{
                    objectFit: 'cover'
                }}
            />
            }
            <div className="overlay"></div>
            <div className="absolute top-1/2 left-0 right-0 text-center -mt-20">
                <h1 className="md:text-5xl text-3xl font-medium" style={headerColor}>{heading}</h1>
                {subtitle &&
                    <div className="mt-4 text-lg" style={bodyColor}>
                        <p>{subtitle}</p>
                    </div>
                }
                <div className="mt-16">

                </div>
            </div>
        </div>
    )
}