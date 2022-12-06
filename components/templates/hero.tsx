import Image from "next/image"
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
    buttonBackground,
    buttonTextColor,
    secondButtonText,
    secondButtonLink,
    secondButtonBackground,
    secondButtonTextColor
}: any) {


    return (

        <div className={`relative flex items-center justify-center ${imageHeight ? imageHeight : 'py-12 lg:py-40'}`}>
            {image &&
                <div className="absolute inset-0">
                    <Image
                        src={image}
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
                        buttonBackground={buttonBackground}
                        buttonTextColor={buttonTextColor}
                        secondButtonText={secondButtonText}
                        secondButtonLink={secondButtonLink}
                        secondButtonBackground={secondButtonBackground}
                        secondButtonTextColor={secondButtonTextColor}
                    />
                </div>
            </div>
        </div>
    )
}
