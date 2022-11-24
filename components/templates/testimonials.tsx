import ContentEditor from "./contenteditor"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Wrapper from "../util/wrapper";

import BodyText from "../util/body-text";

export default function Testimonials({
    carousel,
    testimonial,
    heading,
    content,
    cardBackground,
    cardTextColor,
    bodyColor,
    backgroundStyles,
    arrowColor,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor,
    textLeft,
}: any) {

    SwiperCore.use([Autoplay, Pagination, Navigation])

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
                        buttonBackground={buttonBackground}
                        buttonTextColor={buttonTextColor}
                    />
                </div>
            {carousel ?
                <Swiper
                    modules={[EffectFade, Navigation]}
                    navigation={true}
                    effect={"slide"}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    style={{
                        "--swiper-navigation-size": "20px",
                        "--swiper-navigation-color": `${arrowColor}`,
                    }}
                >
                    {testimonial?.map((node) => {
                        return (
                            <SwiperSlide key={node?._key}>
                                <div className="p-4 my-2 text-center h-full" style={{
                                    backgroundColor: `${cardBackground}`,
                                    color: `${cardTextColor}`
                                }}>
                                    <div className="mb-6 content">
                                        <ContentEditor
                                            content={node.testimonial}
                                        />
                                    </div>
                                    {node.name && <em className="font-medium">— {node.name}</em>}
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                :
                <div className="grid md:grid-cols-3 gap-4 h-full">
                    {testimonial?.map((node) => {
                        return (
                            <div key={node._key}>
                                <div className="border p-4 my-2 h-full" style={{
                                    backgroundColor: `${cardBackground}`,
                                    color: `${cardTextColor}`
                                }}>
                                    <div className="mb-6 content">
                                        {node.testimonial &&
                                            <ContentEditor
                                                content={node.testimonial}
                                            />
                                        }
                                    </div>
                                    {node.name && <em>— {node.name}</em>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </Wrapper>
    )
}