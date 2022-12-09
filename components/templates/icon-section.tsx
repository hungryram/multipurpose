import Link from "next/link"
import Image from "next/image"
import BodyText from "../util/body-text"
import Wrapper from "../util/wrapper"

export default function IconSection({
    content,
    textLeft,
    heading,
    columnNumber,
    blocks,
    backgroundStyles,
    textStyle,
    headerStyle,
    blockLeft,
    buttonText,
    buttonLink,
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {
    return (
        <Wrapper
        backgroundStyles={backgroundStyles}
        >
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
                    buttonStyle={buttonStyle}
                    secondButtonText={secondButtonText}
                    secondButtonLink={secondButtonLink}
                    secondaryButtonStyle={secondaryButtonStyle}
                />
                {blocks &&
                    <div className={`grid h-full lg:grid-cols-${columnNumber ? columnNumber : '2'} md:grid-cols-2 grid-cols-1 gap-10 mt-20`}>
                        {blocks?.map((node) => {

                            const blockLinks =
                                (node.blockLinking?.internalLink?._type === "pages" && `/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.internalLink?._type === "blog" && `/blog/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.internalLink?._type === "legal" && `/legal/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.internalLink?._type === "author" && `/authors/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.internalLink?._type === "services" && `/services/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.externalUrl && `${node.blockLinking?.externalUrl}`)

                            return (
                                <div className="relative" key={node._key}>
                                    <div className={`${textLeft ? 'text-left' : 'text-center'}`}>
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
                                                        objectFit: 'contain',
                                                    }}
                                                    className="w-full h-40"
                                                />
                                            }
                                            {node?.iconSvg &&
                                                <div
                                                    className={`w-40 h-40 relative ${textLeft ? 'text-left' : 'mx-auto'}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${node?.iconSvg}`
                                                    }} />
                                            }
                                        </>
                                        <div className={`py-4 content ${blockLeft ? 'text-left': 'text-center'}`} style={textStyle}>
                                            {node.heading &&
                                                <h3 className="h3 font-[600]">{node.heading}</h3>
                                            }
                                            {node.content &&
                                                <div className="mt-6">
                                                    <p>{node.content}</p>
                                                </div>
                                            }
                                            {node?.blockLinking &&
                                                <div className="mt-5">
                                                    <Link href={blockLinks} className="accent font-bold" aria-label={`Learn more about ${node.heading}`} target={node.blockLinking.newTab && '_blank'}>
                                                        {node.blockLinking.buttonText}
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </Wrapper>
    )
}
