import Link from "next/link"
import Image from "next/image"
import BodyText from "../util/body-text"

export default function FeaturedGrid({
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
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {
    return (
        <div style={backgroundStyles}>
            <div className={`relative ${removePadding ? 'remove-section' : 'section'}`}>
                <div className={fullWidth ? 'remove-container' : 'container'}>
                    <div className={`${twoColumn ? 'md:flex items-center md:space-x-10' : ''}`}>
                        <div className={`${twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                            <div className={fullWidth && 'md:flex justify-center text-center'}>
                                <div className={fullWidth && 'md:w-3/5 px-4'}>
                                    <div className="mb-10">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        {blocks ?
                            <div className={`${twoColumn ? 'md:w-1/2' : 'w-full'}`}>
                                <div className={`grid h-full lg:grid-cols-${columnNumber ? columnNumber : '2'} md:grid-cols-2 grid-cols-1 ${removeGap ? '' : 'gap-4'}`}>
                                    {blocks?.map((node) => {
                                        const blockLinks =
                                            (node.blockLinking?.internalLink?._type === "pages" && `/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "blog" && `/blog/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "legal" && `/legal/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "author" && `/authors/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "services" && `/services/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "portfolio" && `/portfolio/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.internalLink?._type === "locations" && `/locations/${node.blockLinking?.internalLink.slug}`) ||
                                            (node.blockLinking?.externalUrl && `${node.blockLinking?.externalUrl}`)
                                        return (
                                            <div className="relative bg-secondary h-full" key={node._key} style={{
                                                background: `${node.backgroundcolor?.hex ?? 'transparent'}`,
                                                color: `${node.textColor?.hex ?? '#ffffff'}`,
                                                border: `${node.borderColor?.hex ? `1px solid ${node.borderColor.hex}` : '0px solid rgba(0,0,0,0)'}`,
                                                height: `${imageHeight ? imageHeight : '200px'}`,
                                            }}>
                                                <Link href={blockLinks ?? '/'} target={node?.blockLinking?.newTab && '_blank'} aria-label={`Learn more about ${node?.value}`}>
                                                    <div>
                                                        <>
                                                            {node?.image?.asset?.url &&
                                                                <Image
                                                                    src={node?.image?.asset?.url}
                                                                    alt={node?.image?.asset?.altText}
                                                                    height={0}
                                                                    width={450}
                                                                    placeholder={node?.image?.asset?.lqip  ? 'blur' : 'empty'}
                                                                    blurDataURL={node?.image?.asset?.lqip ?? node?.image?.asset?.url}
                                                                    className="w-full object-cover h-full"
                                                                    style={{
                                                                        height: `${imageHeight ? imageHeight : '200px'}`,
                                                                    }}
                                                                />
                                                            }
                                                            {!textOutsideImage && <div className="featured-grid-overlay"></div>}
                                                        </>
                                                        <div
                                                            className={`lg:p-12 p-6 justify-center ${textOutsideImage ? '' : 'absolute bottom-0 left-0 right-0'} ${centerTextGrid ? 'top-0 flex flex-col absolute' : ''} ${blockLeft ? 'text-left' : 'text-center'}
                                                            `}>
                                                            {node?.value &&
                                                                <h3 className="text-2xl">{node.value}</h3>
                                                            }
                                                            {node?.content &&
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
                            :
                            null

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
