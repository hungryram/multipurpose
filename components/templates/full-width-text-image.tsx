import { urlForImage } from "../../lib/sanity";
import BodyText from "../util/body-text";

export default function FullWidthTextImage({ 
    content, 
    buttonText, 
    buttonLink, 
    image, 
    backgroundStyles, 
    altText, 
    columnReverse, 
    buttonBackground, 
    buttonTextColor, 
    textLeft, 
    headerStyle, 
    textStyle, 
    heading }: any) {
    return (
        <div>
            <div className={`md:flex items-center ${columnReverse ? 'flex-row-reverse' : ''}`} style={backgroundStyles}>
                <div className="md:w-1/2">
                    <div className={`lg:p-20 md:p-10 py-10 px-4 content`}>
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
                <div className="md:w-1/2 md:h-[500px] h-96 bg-cover w-full bg-center" role="img" aria-label={altText} style={{
                    backgroundImage: `url(${urlForImage(image).url()})`
                }}>

                </div>
            </div>
        </div>
    )
}