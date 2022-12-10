import Image from "next/image"
import BodyText from "../util/body-text"
import Wrapper from "../util/wrapper"
import Styles from "../../styles/templates.module.css"

export default function TextImage({ image, heading, blurData, content, textLeft, textStyle, headerStyle, buttonText, buttonLink, removePadding, altText, rowReverse, backgroundStyles, buttonStyle, imageWidth, secondaryButtonStyle, secondButtonLink, secondButtonText, twoColumnText, removeShadow }: any) {
    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
            removePadding={removePadding}
        >
            <div className={`${Styles.textAndImage} ${content && 'lg:flex gap-10 md:space-y-0 space-y-20'} items-center ${rowReverse ? 'flex-row-reverse' : ''}`}>
                {image &&
                    <div className={`text-center ${content ? 'lg:w-1/2' : 'w-full'}`}>
                        <Image
                            src={image}
                            width={600}
                            height={200}
                            alt={altText}
                            placeholder={blurData ? 'blur' : 'empty'}
                            blurDataURL={blurData}
                            className="mx-auto md:py-0 py-5"
                            style={{
                                height: 'auto',
                                width: `${imageWidth ? imageWidth + 'px' : '300px'}`,
                                boxShadow: `${removeShadow ? 'none' : '0 5px 12px rgb(0 0 0 / 20%)' }`
                            }}
                        />
                    </div>
                }
                <div className={`${image ? 'lg:w-1/2' : 'w-full'} ${textLeft || image ? 'text-left' : 'text-center'}`}>
                    <BodyText 
                            heading={heading}
                            body={content}
                            bodyStyle={textStyle}
                            headerStyle={headerStyle}
                            fullWidth={true}
                            textAlign={textLeft}
                            buttonText={buttonText}
                            buttonLink={buttonLink}
                            buttonStyle={buttonStyle}
                            secondButtonText={secondButtonText}
                            secondButtonLink={secondButtonLink}
                            secondaryButtonStyle={secondaryButtonStyle}
                            twoColumnText={twoColumnText}
                    />
                </div>
            </div>
        </Wrapper>
    )
}