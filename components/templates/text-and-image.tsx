import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import BodyText from "../util/body-text"
import Wrapper from "../util/wrapper"
import Styles from "../../styles/templates.module.css"

export default function TextImage({ image, heading, blurData, content, textLeft, textStyle, headerStyle, buttonText, buttonLink, altText, rowReverse, backgroundStyles, buttonBackground, buttonTextColor }: any) {
    

    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
        >
            <div className={`${Styles.textAndImage} md:flex items-center ${rowReverse ? 'flex-row-reverse' : ''}`}>
                {image &&
                    <div className="md:w-1/2 text-center">
                        <Image
                            src={image}
                            width={500}
                            height={200}
                            alt={altText}
                            placeholder={blurData ? 'blur' : 'empty'}
                            blurDataURL={blurData}
                            style={{
                                height: 'auto',
                                margin: '20px auto',
                            }}
                        />
                    </div>
                }
                <div className={`${image ? 'md:w-1/2' : 'w-full'} ${textLeft || image ? 'text-left' : 'text-center'}`}>
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
                    />
                </div>
            </div>
        </Wrapper>
    )
}