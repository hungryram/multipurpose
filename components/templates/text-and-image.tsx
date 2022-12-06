import Image from "next/image"
import BodyText from "../util/body-text"
import Wrapper from "../util/wrapper"
import Styles from "../../styles/templates.module.css"

export default function TextImage({ image, heading, blurData, content, textLeft, textStyle, headerStyle, buttonText, buttonLink, removePadding, altText, rowReverse, backgroundStyles, buttonBackground, buttonTextColor, secondButtonBackground, secondButtonLink, secondButtonText, secondButtonTextColor, twoColumnText, removeShadow }: any) {
    
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
                            width={500}
                            height={200}
                            alt={altText}
                            placeholder={blurData ? 'blur' : 'empty'}
                            blurDataURL={blurData}
                            style={{
                                height: 'auto',
                                width: '100%',
                                margin: '20px auto',
                                boxShadow: `${removeShadow ? 'none' : '0 5px 12px rgb(0 0 0 / 15%)' }`
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
                            fullWidth={textLeft}
                            textAlign={textLeft}
                            buttonText={buttonText}
                            buttonLink={buttonLink}
                            buttonBackground={buttonBackground}
                            buttonTextColor={buttonTextColor}
                            secondButtonText={secondButtonText}
                            secondButtonLink={secondButtonLink}
                            secondButtonBackground={secondButtonBackground}
                            secondButtonTextColor={secondButtonTextColor}
                            twoColumnText={twoColumnText}
                    />
                </div>
            </div>
        </Wrapper>
    )
}