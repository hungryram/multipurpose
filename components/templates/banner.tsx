import Link from "next/link"

export default function Banner({ twoColumn, heading, text, headerStyle, removePadding, textStyle, fullWidth, buttonLink, buttonText, buttonStyle, backgroundStyles }: any) {
    return (
        <div className={`${removePadding ? '' : 'py-20'}`}>
            <div className={`${fullWidth ? 'w-full' : 'container'}`}>
                <div className="py-20" style={backgroundStyles}>
                    <div className={`${twoColumn ? 'md:flex justify-center items-center container md:px-20 px-5' : 'text-center'}`}>
                        <div className={`${twoColumn ? 'md:w-1/2 md:text-left text-center md:mb-0 mb-10' : ''}`}>
                            <div className="block">
                                {heading && <h2 className="h2 mb-4" style={headerStyle}>{heading}</h2>}
                                {text && <p style={textStyle}>{text}</p>}
                            </div>
                        </div>
                        {buttonText &&
                            <div className={`${twoColumn ? 'md:w-1/2 text-center' : 'mt-10'}`}>
                                <div>
                                    <Link href={buttonLink} style={buttonStyle} className="primary-button">
                                        {buttonText}
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}