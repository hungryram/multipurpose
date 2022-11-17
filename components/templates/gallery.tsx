import Image from 'next/image';
import { urlForImage } from '../../lib/sanity'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import SwiperCore, { EffectFade, Autoplay, Pagination, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// TEMPLATES
import ContentEditor from './contenteditor';
import PrimaryButton from '../util/primary-button';
import Link from 'next/link';

export default function Gallery({ images, content, fullWidth, animation, backgroundColor, textColor, buttonText, buttonLink, buttonTextColor, buttonBackground, altTag }: any) {
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
                            modules={[EffectFade, Autoplay, Pagination]}
                            effect={animation}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                        >
                            {images?.map((node) => {
                                console.log(node.image.asset.altText)
                                return (
                                    <SwiperSlide key={node?._key}>
                                        <div className="w-full relative">
                                            <Image
                                                src={urlForImage(node.image).url()}
                                                alt={node.altText}
                                                width={fullWidth ? 2000 : 900}
                                                height={0}
                                                className={`object-cover w-full ${fullWidth ? 'md:h-screen' : ''}`}
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