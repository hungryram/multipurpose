import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import BodyText from "../util/body-text"
import Styles from "../../styles/templates.module.css"

export default function Hero({
    image,
    blurData,
    body,
    imageHeight,
    buttonLink,
    altText,
    textStyle,
    headerStyle,
    buttonText,
    buttonBackground,
    buttonTextColor
}: any) {

    return (
        <div className="flex items-center relative z-10">
            {image &&
                <Image
                src={image}
                alt={altText}
                className={`w-full ${Styles.hero}`}
                priority
                width={2000}
                height={1000}
                sizes="100vw"
                placeholder={blurData ? 'blur' : 'empty'}
                blurDataURL={blurData}
                style={{
                    objectFit: 'cover',
                    height: `${imageHeight}`
                }}
            />
            }
            <div className="hero-overlay"></div>

            <div className="absolute top-0 bottom-0 left-0 right-0 text-center flex items-center flex-col justify-center" style={{
                color: `${textStyle}`
            }}>
                <BodyText
                    body={body}
                    headerStyle={headerStyle}
                    buttonText={buttonText}
                    fullWidth={false}
                    buttonLink={buttonLink}
                    buttonBackground={buttonBackground}
                    buttonTextColor={buttonTextColor}
                />
            </div>
        </div>
    )
}