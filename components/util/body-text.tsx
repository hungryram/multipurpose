import ContentEditor from "../templates/contenteditor";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

export default function BodyText({
    heading,
    body,
    bodyStyle,
    fullWidth,
    headerStyle,
    textAlign,
    buttonText,
    buttonLink,
    buttonStyle,
    secondButtonLink,
    secondButtonText,
    secondaryButtonStyle,
    twoColumnText
}: any) {
    return (
        <>
            <div className={`md:flex justify-center`}>
                <div className={fullWidth ? 'w-full' : 'md:w-3/4'}>
                    <div className={`px-4 ${textAlign ? 'text-left' : 'text-center'}`}>
                        {heading && <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>}
                        {body &&
                            <div className={`content mb-10 ${twoColumnText && 'md:columns-2'}`} style={bodyStyle}>
                                <ContentEditor
                                    content={body}
                                />
                            </div>
                        }
                        {buttonText &&
                            <PrimaryButton
                                buttonLabel={buttonText}
                                buttonLink={buttonLink}
                                buttonStyle={buttonStyle}
                            />
                        }
                        {secondButtonText &&
                            <SecondaryButton
                                buttonLabel={secondButtonText}
                                buttonLink={secondButtonLink}
                                secondaryButtonStyle={secondaryButtonStyle}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}