import ContentEditor from "../templates/contenteditor";
import PrimaryButton from "./primary-button";

export default function BodyText({
    heading,
    body,
    bodyStyle,
    fullWidth,
    headerStyle,
    textAlign,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor
}: any) {
    return (
        <div className="md:flex justify-center py-6">
            <div className={fullWidth ? 'w-full' : 'md:w-3/5'}>
                <div className={`px-4 ${textAlign ? 'text-left' : 'text-center'}`}>
                    <div className="content">
                        {heading && <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>}
                        {body &&
                            <div className="content" style={bodyStyle}>
                                <ContentEditor
                                    content={body}
                                />
                            </div>
                        }
                    </div>
                    {buttonLink &&
                        <div className="mt-10">
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
    )
}