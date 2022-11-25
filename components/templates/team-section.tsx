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

export default function TeamSection({
    carousel,
    team,
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
                    {team?.map((node) => {
                        return (
                            <SwiperSlide key={node?._key}>
                                <div className="h-full">
                                    <Link href={`team/${node.slug.current}`} arial-label={`Visit profile information for ${node?.name}`}>
                                        <div className="relative overflow-hidden rounded-md">
                                            {node?.image ?
                                                <Image
                                                    src={urlForImage(node?.image).url()}
                                                    alt={node?.imageData?.altText ?? node?.name}
                                                    width={800}
                                                    height={0}
                                                    className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                                                    placeholder="blur"
                                                    blurDataURL={node?.imageData?.lqip}
                                                />
                                                :
                                                <div className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-slate-400 flex justify-center items-center">
                                                    <div>
                                                        <BiUser className="text-6xl text-white" />
                                                    </div>
                                                </div>
                                            }
                                            <div className="absolute bottom-0 left-0 right-0 p-4 m-2 rounded-md bg-white">
                                                <h3 className="mb-1 text-xl font-semibold leading-snug">{node?.name}</h3>
                                                {node?.position && <p className="text-gray-600 font-medium">{node.position}</p>}
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
                    {team?.map((node) => {
                        return (
                            <div className="h-full">
                                <Link href={`team/${node.slug.current}`} arial-label={`Visit profile information for ${node?.name}`}>
                                    <div className="relative overflow-hidden rounded-sm">
                                        {node?.image ?
                                            <Image
                                                src={urlForImage(node?.image).url()}
                                                alt={node?.imageData?.altText ?? node?.name}
                                                width={800}
                                                height={0}
                                                className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                                                placeholder="blur"
                                                blurDataURL={node?.imageData?.lqip}
                                            />
                                            :
                                            <div className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-slate-400 flex justify-center items-center">
                                                <div>
                                                    <BiUser className="text-6xl text-white" />
                                                </div>
                                            </div>
                                        }
                                        <div className="absolute bottom-0 left-0 right-0 p-4 m-2 rounded-sm bg-white">
                                            <h3 className="mb-1 text-xl font-semibold leading-snug">{node?.name}</h3>
                                            {node?.position && <p className="text-gray-600 font-medium">{node.position}</p>}
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