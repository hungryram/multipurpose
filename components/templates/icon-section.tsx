import Link from "next/link"
import Image from "next/image"
import BodyText from "../util/body-text"
import Wrapper from "../util/wrapper"

export default function IconSection({
    link,
    centerTextGrid,
    content,
    textOutsideImage,
    textLeft,
    imageHeight,
    blockLeft,
    // SECTION
    fullWidth,
    twoColumn,
    heading,
    columnNumber,
    removeGap,
    removePadding,
    blocks,
    backgroundStyles,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor
}: any) {
    return (
        <Wrapper>
            <div>
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
                <div className="mt-10 grid grid-cols-3">
                    {blocks?.map((node) => {
                        return (
                            <div className="relative" key={node._key}>
                                <Link href={link ?? '/'}>
                                    <div>
                                        <>
                                            {node?.image?.url &&
                                                <Image
                                                    src={node?.image?.url}
                                                    alt={node?.image?.altText}
                                                    height={0}
                                                    width={450}
                                                    placeholder="blur"
                                                    blurDataURL={node?.image?.lqip ?? node?.image?.url}
                                                    style={{
                                                        objectFit: 'cover',
                                                        height: `${imageHeight ? imageHeight : '400px'}`,
                                                    }}
                                                    className="w-full"
                                                />
                                            }
                                            {!textOutsideImage && <div className="featured-grid-overlay"></div>}
                                        </>
                                        <div
                                            className={`lg:px-12 px-6 py-4 justify-center
                                                            `}>
                                            {node.heading &&
                                                <h3 className="h3">{node.heading}</h3>
                                            }
                                            {node.content &&
                                                <div className="mt-6">
                                                    <p>{node.content}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Wrapper>
    )
}
