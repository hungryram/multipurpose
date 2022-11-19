import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import Container from "../util/container"
import PrimaryButton from "../util/primary-button"
import Section from "../util/section"
import Wrapper from "../util/wrapper"
import ContentEditor from "./contenteditor"

export default function TextImage({ image, heading, content, textLeft, textStyle, headerStyle, buttonLabel, buttonLink, altTag, rowReverse, backgroundStyles }: any) {
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
                    {heading && <h2 className="h2" style={headerStyle}>{heading}</h2>}
                    {content &&
                        <div className={`content`} style={textStyle}>
                            <ContentEditor
                                content={content}
                            />
                        </div>
                    }
                    <div className="mt-8">
                        {buttonLabel &&
                            <PrimaryButton
                                buttonLink={buttonLink}
                                buttonLabel={buttonLabel}
                            />
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}