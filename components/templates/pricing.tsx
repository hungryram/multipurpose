import Wrapper from "../util/wrapper";
import BodyText from "../util/body-text";
import Link from "next/link"

import Styles from "../../styles/templates.module.css"

export default function Pricing({
    heading,
    content,
    columnNumber,
    packages,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor,
    backgroundStyles,
    textLeft
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
                buttonBackground={buttonBackground}
                buttonTextColor={buttonTextColor}
            />
            {packages ?
                <div className={`lg:grid-cols-${columnNumber ?? '3'} grid md:grid-cols-2 grid-cols-1 gap-4`}>
                    {packages?.map((node) => {
                        return (
                            <div className={Styles.priceContainer}>
                                <div className="p-6 border-b text-center">
                                    <h3 className="uppercase mb-4 text-sm">
                                        <strong>{node.name}</strong>
                                    </h3>
                                    <h3 className="text-2xl mb-6">
                                        <strong>{node.price}</strong>
                                        {node.packageType &&
                                            <small className="text-gray-500 text-sm"> /{node.packageType}</small>
                                        }
                                    </h3>
                                    {content &&
                                        <p className="text-sm">{node.content}</p>
                                    }
                                    {node.link &&
                                        <div className="mt-6">
                                            <Link href={node.link ?? '/'} className={Styles.priceCta}>
                                                {node.buttonText}
                                            </Link>
                                        </div>
                                    }
                                </div>
                                <div className="p-6">
                                    <ol className="list-inside">
                                        {node?.details?.map((node) => {
                                            return (
                                                <li className="mb-4 flex items-center">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                                        className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
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