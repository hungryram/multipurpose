
import { SwiperSlide } from 'swiper/react'
import Wrapper from "../util/wrapper";

import BodyText from "../util/body-text";
import ServiceCard from "./service-card";
import Carousel from "./carousel";

export default function ServiceSection({
    carousel,
    services,
    heading,
    content,
    bodyColor,
    backgroundStyles,
    arrowColor,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
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
            <div className="mb-10" style={bodyColor}>
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
            {carousel ?
                <Carousel
                    arrowColor={arrowColor ?? '#ffffff'}
                >
                    {services?.map((node) => {
                        return (
                            <SwiperSlide key={node._key}>
                                <ServiceCard
                                    title={node?.title}
                                    altText={node?.imageData?.asset?.altText ?? node?.title}
                                    headerImage={node?.imageData?.asset?.url}
                                    blurData={node?.imageData?.asset?.lqip}
                                    slug={node.slug.current}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Carousel>
                :
                <div className="grid md:grid-cols-3 gap-4 h-full">
                    {services?.map((node) => {
                        return (
                            <ServiceCard
                                key={node._key}
                                title={node?.title}
                                altText={node?.imageData?.asset?.altText ?? node?.title}
                                headerImage={node?.imageData?.asset?.url}
                                blurData={node?.imageData?.asset?.lqip}
                                slug={node.slug.current}
                            />
                        )
                    })}
                </div>
            }
        </Wrapper>
    )
}