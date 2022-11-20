import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import BodyText from "../util/body-text"
import Styles from "../../styles/templates.module.css"

export default function Hero({
    image,
    altTag,
    blurData,
    body,
    imageHeight,
    buttonLink,
    textStyle,
    headerStyle,
    buttonText,
    buttonBackground,
    buttonTextColor
}: any) {


    return (
        <div className="flex items-center relative z-10">
            {image ?
                <>
                    <Image
                        src={urlForImage(image).height(1000).width(2000).url()}
                        alt={altTag}
                        className={`w-full ${imageHeight ? '' : Styles.hero}`}
                        priority
                        width={2000}
                        height={1000}
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={blurData ?? urlForImage(image).width(100).height(100).quality(1).url()}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </>

                :
                <Image
                    src="/assets/banner.jpg"
                    alt="placeholder"
                    className={`w-full ${imageHeight}`}
                    width={2000}
                    height={1000}
                    sizes="100vw"
                    priority
                    style={{
                        objectFit: 'cover'
                    }}
                />
            }
            <div className="hero-overlay"></div>

            <div className="absolute top-0 bottom-0 left-0 right-0 text-center flex items-center flex-col justify-center" style={{
                color: `${textStyle}`
            }}>
                {body &&
                    <BodyText
                        body={body}
                        headerStyle={headerStyle}
                        buttonText={buttonText}
                        buttonLink={buttonLink}
                        buttonBackground={buttonBackground}
                        buttonTextColor={buttonTextColor}
                    />
                }
            </div>
        </div>
    )
}