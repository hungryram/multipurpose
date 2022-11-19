import ContentEditor from "./contenteditor"
import Heading from "../util/heading"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Wrapper from "../util/wrapper";

export default function Testimonials({ carousel, testimonial, heading, content, headerColor, bodyColor, backgroundStyles, arrowColor }: any) {

    SwiperCore.use([Autoplay, Pagination, Navigation])

    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
        >
            {content &&
                <div className="mb-10">
                    <Heading
                        heading={heading}
                        body={content}
                        headerStyle={headerColor}
                        bodyStyle={bodyColor}
                    />
                </div>
            }
            {carousel ?
                <Swiper
                    modules={[EffectFade, Navigation]}
                    navigation={true}
                    effect={"slide"}
                    loop={true}
                    spaceBetween={20}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                        },
                    }}
                    style={{
                        "--swiper-navigation-size": "20px",
                        "--swiper-navigation-color": `${arrowColor}`,
                    }}
                >
                    {testimonial?.map((node) => {
                        return (
                            <SwiperSlide key={node?._key}>
                                <div className="p-4 my-2 text-center h-full" style={bodyColor}>
                                    <div className="mb-6 content">
                                        {node.testimonial &&
                                            <ContentEditor
                                                content={node.testimonial}
                                            />
                                        }
                                    </div>
                                    {node.name && <em className="font-medium">— {node.name}</em>}
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                :
                <div className="grid md:grid-cols-2 gap-4">
                    {testimonial?.map((node) => {
                        return (
                            <div key={node._key}>
                                <div className="border p-4 my-2 h-full" style={bodyColor}>
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