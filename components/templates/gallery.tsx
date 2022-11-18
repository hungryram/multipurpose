import { useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '../../lib/sanity'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// TEMPLATES
import ContentEditor from './contenteditor';
import PrimaryButton from '../util/primary-button';

export default function Gallery({ images, content, fullWidth, animation, backgroundColor, textColor, buttonText, buttonLink, buttonTextColor, buttonBackground, altTag, disablePagination, disableNavigation }: any) {

    SwiperCore.use([Autoplay, Pagination, Navigation])

    return (
        <div style={{
            backgroundColor: `${backgroundColor ?? '#ffffff'}`
        }}>
            <div className={`${fullWidth ? '' : 'container'}`}>
                <div className={`${fullWidth ? 'block' : 'md:flex md:space-x-20 md:space-y-0 space-y-10 items-center section'}`}>
                    {content &&
                        <div className={`${fullWidth ? 'w-full text-center section' : 'md:w-1/2'} content`}>
                            <div className="container" style={{
                                color: `${textColor ?? '#222222'}`
                            }}>
                                <ContentEditor
                                    content={content}
                                />
                                {buttonLink &&
                                    <div className="mt-10">
                                        <PrimaryButton 
                                            buttonLabel={buttonText}
                                            buttonLink={buttonLink}
                                            buttonBackground={buttonBackground}
                                            buttonTextColor={buttonTextColor}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    <div className={`${fullWidth ? 'w-full' : 'md:w-1/2'}`}>
                        <Swiper
                            modules={[EffectFade, Pagination, Navigation]}
                            pagination={disablePagination ? false : true}
                            navigation={disableNavigation ? false : true}
                            effect={animation}
                            loop={true}
                            style={{
                                "--swiper-navigation-size": "20px",
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-bullet-inactive-color": "#fff",
                                "--swiper-pagination-color": "var(--primary-accent)"
                            }}
                        >
                            {images?.map((node) => {
                                return (
                                    <SwiperSlide key={node?._key}>
                                        <div className="w-full relative">
                                            <Image
                                                src={urlForImage(node.image).url()}
                                                alt="test"
                                                width={fullWidth ? 2000 : 900}
                                                height={0}
                                                className={`object-cover h-auto w-full ${fullWidth ? 'md:h-screen' : ''}`}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}