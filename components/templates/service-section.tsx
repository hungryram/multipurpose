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
import Image from "next/image";
import { urlForImage } from "../../lib/sanity";
import Link from "next/link";
import { BiUser } from 'react-icons/bi'

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
                    loop={false}
                    spaceBetween={20}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@0.75": {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    style={{
                        "--swiper-navigation-size": "30px",
                        "--swiper-navigation-color": `${arrowColor}`,
                    }}
                >
                    {services?.map((node) => {
                        return (
                            <SwiperSlide key={node._key}>
                                <div className="h-full">
                                    <Link href={`team/${node.slug.current}`} arial-label={`Link to more information on ${node.title}`}>
                                        <div className="relative overflow-hidden rounded-sm">
                                            {node?.headerImage ?
                                                <Image
                                                    src={urlForImage(node?.headerImage).url()}
                                                    alt={node?.imageData?.asset?.altText ?? node?.name}
                                                    width={800}
                                                    height={0}
                                                    className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                                                    placeholder="blur"
                                                    blurDataURL={node?.imageData?.asset?.lqip ?? urlForImage(node?.headerImage).width(1).height(1).quality(1).url()}
                                                />
                                                :
                                                <div className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-slate-400 flex justify-center items-center">
                                                    <div>
                                                        <BiUser className="text-6xl text-white" />
                                                    </div>
                                                </div>
                                            }
                                            <div className="left-0 right-0 p-4 rounded-sm bg-white">
                                                <h3 className="mb-1 text-xl font-semibold leading-snug">{node?.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                :
                <div className="grid md:grid-cols-3 gap-4 h-full">
                    {services?.map((node) => {
                        return (
                            <div className="h-full shadow-md" key={node._key}>
                                <Link href={`team/${node.slug.current}`} arial-label={`Link to more information on ${node.title}`}>
                                    <div className="relative overflow-hidden rounded-sm">
                                        {node?.headerImage ?
                                            <Image
                                                src={urlForImage(node?.headerImage).url()}
                                                alt={node?.imageData?.asset?.altText ?? node?.name}
                                                width={800}
                                                height={0}
                                                className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                                                placeholder="blur"
                                                blurDataURL={node?.imageData?.asset?.lqip ?? urlForImage(node?.headerImage).width(1).height(1).quality(1).url()}
                                            />
                                            :
                                            <div className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-slate-400 flex justify-center items-center">
                                                <div>
                                                    <BiUser className="text-6xl text-white" />
                                                </div>
                                            </div>
                                        }
                                        <div className="left-0 right-0 p-4 rounded-sm bg-white">
                                            <h3 className="mb-1 text-xl font-semibold leading-snug">{node?.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            }
        </Wrapper>
    )
}