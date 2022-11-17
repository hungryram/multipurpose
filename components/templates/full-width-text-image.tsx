import Image from "next/image";
import { urlForImage } from "../../lib/sanity";
import PrimaryButton from "../util/primary-button";
import ContentEditor from "./contenteditor";

export default function FullWidthTextImage({ content, buttonText, buttonLink, image, backgroundStyles, textColor, columnReverse }: any) {
    return (
        <div>
            <div className={`md:flex items-center ${columnReverse ? 'flex-row-reverse' : ''}`} style={{
                backgroundColor: `${backgroundStyles ? backgroundStyles : '#cccccc'}`
            }}>
                <div className="md:w-1/2">
                    <div className={`lg:p-20 md:p-10 py-10 px-4 content`} style={{
                        color: `${textColor}`
                    }}>
                        <ContentEditor
                            content={content}
                        />
                        {buttonText &&
                            <div className="mt-10">
                                <PrimaryButton
                                    buttonLabel={buttonText}
                                    buttonLink={buttonLink}
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className="md:w-1/2 md:h-[500px] h-96 bg-cover w-full bg-center" style={{
                    backgroundImage: `url(${urlForImage(image).url()})`
                }}>

                </div>
            </div>
        </div>
    )
}