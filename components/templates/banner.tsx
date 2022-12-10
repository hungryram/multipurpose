import Wrapper from "../util/wrapper"
import ContentEditor from "./contenteditor"
import PrimaryButton from "../util/primary-button"
import SecondaryButton from "../util/secondary-button"

export default function Banner({ twoColumn, heading, content, headerStyle, removePadding, textStyle, fullWidth, buttonLink, buttonText, buttonTextColor, buttonStyle, backgroundStyles, secondButtonText, secondButtonLink, secondaryButtonStyle }: any) {
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
                            {heading && <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>}
                            {content &&
                                <div className="content" style={textStyle}>
                                    <ContentEditor
                                        content={content}
                                    />
                                </div>
                            }
                        </div>
                        <div className={twoColumn && 'md:w-1/2'}>
                            <div className={twoColumn ? 'md:text-right text-center md:mt-0 mt-4' : 'text-center'}>
                                {buttonText &&
                                    <div className="mt-10 inline">
                                        <PrimaryButton
                                            buttonLabel={buttonText}
                                            buttonLink={buttonLink}
                                            buttonStyle={buttonStyle}
                                            buttonTextColor={buttonTextColor}
                                        />
                                    </div>
                                }
                                {secondButtonText &&
                                    <div className="mt-10 inline">
                                        <SecondaryButton
                                            buttonLabel={secondButtonText}
                                            buttonLink={secondButtonLink}
                                            secondaryButtonStyle={secondaryButtonStyle}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}