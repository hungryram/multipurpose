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
}: any) {


    return (

        <div className={`relative flex items-center justify-center ${imageHeight ?? 'py-12 sm:py-16 lg:pt-60 lg:pb-32'}`}>
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
            </div>

            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="mx-auto" style={{
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
        </div>
    )
}
