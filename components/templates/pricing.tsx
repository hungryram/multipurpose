import Wrapper from "../util/wrapper";
import BodyText from "../util/body-text";
import Link from "next/link";

import Styles from "../../styles/templates.module.css"
import ButtonStyles from "../../styles/util.module.css"

export default function Pricing({
    heading,
    content,
    columnNumber,
    secondaryBackground,
    blocks,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    backgroundStyles,
    textLeft,
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {
    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
        >
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
            {blocks ?
                <div className={`mt-10 lg:grid-cols-${columnNumber ?? '3'} grid md:grid-cols-2 grid-cols-1 gap-4`}>
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
                            <div className={Styles.priceContainer} key={node._key} style={secondaryBackground}>
                                <div className="p-6 border-b text-center">
                                    <h3 className="uppercase mb-4 h3">
                                        <strong>{node.name}</strong>
                                    </h3>
                                    <h3 className="text-2xl mb-6">
                                        <strong>{node.price}</strong>
                                        {node.packageType &&
                                            <small className="text-sm"> /{node.packageType}</small>
                                        }
                                    </h3>
                                    {content &&
                                        <p className="text-sm">{node.content}</p>
                                    }
                                    {node?.blockLinking?.buttonText &&
                                        <div className="mt-6">
                                            <Link href={blockLinks ?? '/'} target={node?.blockLinking?.newTab && '_blank'} className={ButtonStyles.primaryButton}>
                                                {node?.blockLinking?.buttonText}
                                            </Link>
                                        </div>
                                    }
                                </div>
                                <div className="p-6">
                                    <ol className="list-inside">
                                        {node?.details?.map((node) => {
                                            return (
                                                <li className="mb-4 flex items-center" key={node._key}>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                                        className="accent w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512">
                                                        <path fill="currentColor"
                                                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                                                        </path>
                                                    </svg>{node}
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                null
            }
        </Wrapper>
    )
}