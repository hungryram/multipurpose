import ContentEditor from "./contenteditor"
import PrimaryButton from "../util/primary-button"

export default function Banner({ twoColumn, heading, content, headerStyle, removePadding, textStyle, fullWidth, buttonLink, buttonText, buttonTextColor, buttonBackground, backgroundStyles }: any) {
    return (
        <div className={`${removePadding ? '' : 'py-20'}`}>
            <div className={`${fullWidth ? 'w-full' : 'container'}`}>
                <div className="py-20" style={backgroundStyles}>
                    <div className={`md:flex justify-center ${twoColumn ? 'items-center container md:px-10 px-5' : 'text-center'}`}>
                        <div className={`${twoColumn ? 'md:w-1/2 md:text-left text-center md:mb-0 mb-10' : 'md:w-3/5'}`}>
                            <div className="block px-4">
                                {heading && <h2 className="h2 mb-4" style={headerStyle}>{heading}</h2>}
                                {content && 
                                <div style={textStyle}>
                                    <ContentEditor 
                                        content={content}
                                    />
                                </div>
                                }
                            </div>
                        </div>
                        {buttonLink &&
                            <div className={`${twoColumn ? 'md:w-1/2 text-center' : 'mt-10'}`}>
                                    <div className="mt-10">
                                        <PrimaryButton 
                                            buttonLabel={buttonText}
                                            buttonLink={buttonLink}
                                            buttonBackground={buttonBackground}
                                            buttonTextColor={buttonTextColor}
                                        />
                                    </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}