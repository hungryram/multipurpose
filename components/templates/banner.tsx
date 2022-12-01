import Wrapper from "../util/wrapper"
import BodyText from "../util/body-text"
import ContentEditor from "./contenteditor"
import PrimaryButton from "../util/primary-button"

export default function Banner({ twoColumn, heading, content, headerStyle, removePadding, textStyle, fullWidth, buttonLink, buttonText, buttonTextColor, buttonBackground, backgroundStyles, bodyColor }: any) {
    return (
        <Wrapper
            fullWidthContainer={false}
            removePadding={removePadding}
            backgroundStyles={backgroundStyles}
        >
            <div className="py-10" style={textStyle}>
                <div>
                    <div className={twoColumn ? 'md:flex items-center' : ''}>
                        <div className={twoColumn ? 'md:w-1/2' : 'md:px-32 px-4 text-center'}>
                            {heading && <h2 className="h2" style={headerStyle}>{heading}</h2>}
                            {content &&
                                <div className="content" style={textStyle}>
                                    <ContentEditor
                                        content={content}
                                    />
                                </div>
                            }
                        </div>
                        <div className={twoColumn && 'md:w-1/2'}>
                            {buttonLink &&
                                <div className={twoColumn ? 'md:text-right text-center md:mt-0 mt-10' : 'text-center mt-10'}>
                                    <PrimaryButton
                                        buttonLabel={buttonText}
                                        buttonLink={buttonLink}
                                        buttonBackground={buttonBackground}
                                        buttonTextColor={buttonTextColor}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Wrapper>
    )
}