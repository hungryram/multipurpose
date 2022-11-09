import Image from "next/image"
import { urlForImage } from "../../lib/sanity"

export default function TextImage({ image, heading, content, textStyle, headerStyle, buttonText, buttonLink, altTag } : any) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex items-center">
                    {image &&
                        <div className="md:w-1/2 relative text-center mb-10">
                            <Image
                                src={urlForImage(image).url()}
                                width={400}
                                height={500}
                                objectFit="contain"
                                alt={altTag}
                                placeholder="blur"
                                blurDataURL={urlFor(image).width(50).height(50).quality(1).url}
                            />
                        </div>
                    }
                    <div className="md:w-1/2">
                        {heading && <h2 className="h2 mb-10" style={headerStyle}>{heading}</h2>}
                        {content &&
                            <div className="content" style={textStyle}>
                                <PortableText
                                    value={content}
                                />
                            </div>
                        }
                        <div className="mt-8">
                            {buttonText &&
                                <PrimaryLink
                                    buttonLink={buttonLink}
                                    buttonText={buttonText}
                                    buttonType="primary-button"
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}