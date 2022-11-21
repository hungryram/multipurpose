import { useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '../../lib/sanity'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// TEMPLATES
import BodyText from '../util/body-text';
import Wrapper from '../util/wrapper';
import Modal from './modal';

export default function Gallery({ images,
    content,
    fullWidth,
    animation,
    buttonText,
    buttonLink,
    buttonTextColor,
    buttonBackground,
    disablePagination,
    disableNavigation,
    heading,
    textStyle,
    headerStyle,
    backgroundStyles,
    removePadding
}: any) {

    SwiperCore.use([Autoplay, Pagination, Navigation, A11y])

    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
            fullWidthContainer={fullWidth}
            removePadding={removePadding}
        >
            <div className={`${fullWidth ? 'block' : 'md:flex md:space-x-20 md:space-y-0 space-y-10 items-center py-20'}`}>
                {content &&
                    <div className={`${fullWidth ? 'text-center pb-20 pt-20' : 'md:w-1/2 text-left'} content`}>
                        <div>
                            <BodyText
                                heading={heading}
                                body={content}
                                bodyStyle={textStyle}
                                headerStyle={headerStyle}
                                fullWidth={fullWidth ? false : true}
                                textAlign={fullWidth ? false : true}
                                buttonText={buttonText}
                                buttonLink={buttonLink}
                                buttonBackground={buttonBackground}
                                buttonTextColor={buttonTextColor}
                            />
                        </div>
                    </div>
                }
                {images ?
                    <div className={`${fullWidth ? 'w-full' : 'md:w-1/2'}`}>
                        <Swiper
                            modules={[EffectFade, Pagination, Navigation]}
                            pagination={disablePagination ? false : true}
                            navigation={disableNavigation ? false : true}
                            effect={animation}
                            loop={true}
                            A11y={true}
                            style={{
                                "--swiper-navigation-size": "20px",
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-bullet-inactive-color": "#fff",
                                "--swiper-pagination-color": "var(--primary-accent)"
                            }}
                        >
                            {images?.map((node, index) => {
                                console.log(node.lqip)
                                return (
                                    <>
                                        <SwiperSlide key={node?._key}>
                                            <div className="w-full relative">
                                                <Image
                                                    src={urlForImage(node).url()}
                                                    alt={node.altText}
                                                    width={fullWidth ? 2000 : 900}
                                                    height={0}
                                                    placeholder="blur"
                                                    blurDataURL={node.lqip ?? urlForImage(node).height(10).width(10).quality(1).url()}
                                                    className={`object-cover h-96 w-full ${fullWidth ? 'md:h-screen' : ''}`}
                                                    sizes={fullWidth ? '100vw' : '50vw'}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    </>
                                )
                            })}
                        </Swiper>

                    </div>
                    : null
                }
            </div>
        </Wrapper>
    )
}