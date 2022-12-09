// Import Swiper styles
import { SwiperSlide } from 'swiper/react'
import Wrapper from "../util/wrapper";

import BodyText from "../util/body-text";
import TeamCard from "./team-card";
import Carousel from './carousel';

export default function TeamSection({
    carousel,
    team,
    heading,
    content,
    bodyColor,
    backgroundStyles,
    arrowColor,
    textStyle,
    headerStyle,
    textLeft,
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
                    {team?.map((node) => {
                        return (
                            <SwiperSlide key={node._key}>
                                <TeamCard
                                    key={node._key}
                                    name={node?.name}
                                    altText={node?.imageData?.asset?.altText}
                                    image={node?.imageData?.asset?.url}
                                    blurData={node?.imageData?.asset?.lqip}
                                    slug={node.slug.current}
                                    position={node?.position}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Carousel>
                :
                <div className="grid md:grid-cols-3 gap-4 h-full">
                    {team?.map((node) => {
                        return (
                            <TeamCard
                                key={node._key}
                                name={node?.name}
                                altText={node?.imageData?.asset?.altText}
                                image={node?.imageData?.asset?.url}
                                blurData={node?.imageData?.asset?.lqip}
                                slug={node.slug.current}
                                position={node?.position}
                            />
                        )
                    })}
                </div>
            }
        </Wrapper>
    )
}