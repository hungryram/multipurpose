import Link from "next/link"
import Image from "next/image"
import { urlForImage } from "../../lib/sanity"


export default function FeaturedGrid({ link, image, value, backgroundColor, borderColor, blurData, content, textOutsideImage, textLeft, imageHeight, textColor }: any) {
    return (
        <Link href={link ?? '/'}>
            <div className="relative overflow-hidden">
                {image ?
                    <Image
                        src={urlForImage(image).url()}
                        alt={value}
                        height="0"
                        width="450"
                        placeholder="blur"
                        blurDataURL={blurData ?? urlForImage(image).width(50).height(50).quality(1).url()}
                        style={{
                            objectFit: 'cover',
                            height: `${imageHeight}`,
                        }}
                        className="w-full"
                    />
                    :
                    <div style={{
                        height: `${imageHeight}`,
                        background: `${backgroundColor}`,
                        border: `${borderColor ? `1px solid ${borderColor}` : 'undefined'}`,
                    }}>

                    </div>
                }
                {textOutsideImage || !image ? null : <div className="featured-grid-overlay"></div>}
                <div className={`${textOutsideImage ? null : 'absolute bottom-6 left-0 right-0'} px-6 py-4 justify-center ${textLeft ? 'text-left' : 'text-center'}`} style={{
                    color: `${textColor ? textColor : '#ffffff'}`
                }}>
                    {value &&
                        <h3 className="h3">{value}</h3>
                    }
                    {content &&
                        <div className="mt-6">
                            <p>{content}</p>
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}
