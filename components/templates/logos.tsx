import Image from 'next/image';

// TEMPLATES
import BodyText from '../util/body-text';
import Wrapper from '../util/wrapper';

export default function Logos({ images,
    content,
    fullWidth,
    heading,
    textStyle,
    headerStyle,
    backgroundStyles,
    removePadding
}: any) {


    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
            fullWidthContainer={fullWidth}
            removePadding={removePadding}
        >
            <div>
                <div className="content">
                    <div>
                        <BodyText
                            heading={heading}
                            body={content}
                            bodyStyle={textStyle}
                            headerStyle={headerStyle}
                        />
                    </div>
                </div>
                {images ?
                    <div className="text-center flex items-center justify-center flex-wrap">
                        {images?.map((node) => {
                            return (
                                <>
                                    <div className="m-4">
                                        <Image
                                            src={node?.asset?.url}
                                            alt={node?.asset?.altText}
                                            width={150}
                                            height={150}
                                            placeholder={node?.asset?.lqip ? 'blur' : 'empty'}
                                            blurDataURL={node?.asset?.lqip}
                                            className="object-contain"
                                        />
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    : null
                }
            </div>
        </Wrapper>
    )
}