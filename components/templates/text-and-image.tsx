import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import BodyText from "../util/body-text"
import PrimaryButton from "../util/primary-button"
import Wrapper from "../util/wrapper"
import ContentEditor from "./contenteditor"

export default function TextImage({ image, heading, content, textLeft, textStyle, headerStyle, buttonLabel, buttonLink, altTag, rowReverse, backgroundStyles, buttonBackground, buttonTextColor }: any) {
    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
        >
            <div className={`md:flex items-center ${rowReverse ? 'flex-row-reverse' : ''}`}>
                {image &&
                    <div className="md:w-1/2 text-center">
                        <Image
                            src={urlForImage(image).url()}
                            width={500}
                            height={0}
                            alt={altTag}
                            placeholder="blur"
                            blurDataURL={urlForImage(image).width(50).height(50).quality(1).url()}
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
                            buttonText={buttonLabel}
                            buttonLink={buttonLink}
                            buttonBackground={buttonBackground}
                            buttonTextColor={buttonTextColor}
                    />
                </div>
            </div>
        </Wrapper>
    )
}