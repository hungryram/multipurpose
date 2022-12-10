import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import BodyText from "../util/body-text"

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
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle,
}: any) {


    return (

        <div className={`relative flex items-center justify-center ${imageHeight ? imageHeight : 'py-12 lg:py-40'}`}>
            {image &&
                <div className="absolute inset-0">
                    <Image
                        src={image.asset !== undefined && urlForImage(image).url()}
                        alt={altText}
                        className="object-cover w-full h-full object-center"
                        priority
                        width={2000}
                        height={1000}
                        sizes="100vw"
                        placeholder={blurData ? 'blur' : 'empty'}
                        blurDataURL={blurData}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

                </div>
            }


            <div className="relative mx-auto sm:px-6">
                <div className="mx-auto" style={{
                    color: `${textStyle}`
                }}>
                    <BodyText
                        body={body}
                        headerStyle={headerStyle}
                        buttonText={buttonText}
                        fullWidth={true}
                        buttonLink={buttonLink}
                        buttonStyle={buttonStyle}
                        // SECONDARY BUTTON
                        secondButtonText={secondButtonText}
                        secondButtonLink={secondButtonLink}
                        secondaryButtonStyle={secondaryButtonStyle}
                    />
                </div>
            </div>
        </div>
    )
}
