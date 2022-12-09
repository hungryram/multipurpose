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
    buttonTextColor,
    buttonBackground,
    disablePagination,
    disableNavigation,
    heading,
    textStyle,
    headerStyle,
    backgroundStyles,
    removePadding,
    buttonText,
    buttonLink,
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {

    SwiperCore.use([Autoplay, Pagination, Navigation, A11y])


    // const [clickedImg, setClickedImg] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(null);
    // const [clickedAlt, setAlt] = useState(null)


    // const handleClick = (item, index) => {
    //     setCurrentIndex(index);
    //     setClickedImg(item.url);
    //     setAlt(item.altText)
    // };

    // const handelRotationRight = () => {
    //     const totalLength = images.length;

    //     if (currentIndex + 1 >= totalLength) {
    //         setCurrentIndex(0);
    //         const newUrl = urlForImage(images[0]).url();
    //         setClickedImg(newUrl);
    //         return;
    //     }
    //     const newIndex = currentIndex + 1;
    //     const newUrl = images?.filter((item) => {
    //         return images.indexOf(item) === newIndex;
    //     });
    //     const newItem = newUrl[0];
    //     setClickedImg(urlForImage(newItem)?.url());
    //     setCurrentIndex(newIndex);
    //     console.log(newUrl)

    // };

    // const handelRotationLeft = () => {
    //     const totalLength = images?.length;
    //     if (currentIndex === 0) {
    //         setCurrentIndex(totalLength - 1);
    //         const newUrl = images[totalLength - 1];
    //         setClickedImg(newUrl);
    //         return;
    //     }
    //     const newIndex = currentIndex - 1;
    //     const newUrl = images.filter((item) => {
    //         return images.indexOf(item) === newIndex;
    //     });
    //     const newItem = newUrl[0];
    //     setClickedImg(urlForImage(newItem).url());
    //     setCurrentIndex(newIndex);
    // };
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
                                buttonStyle={buttonStyle}
                                secondButtonText={secondButtonText}
                                secondButtonLink={secondButtonLink}
                                secondaryButtonStyle={secondaryButtonStyle}
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
                                return (
                                    <>
                                        <SwiperSlide key={node?._key}>
                                            <div className="w-full relative">
                                                <Image
                                                    src={node?.asset?.url}
                                                    alt={node?.asset?.altText}
                                                    width={fullWidth ? 2000 : 900}
                                                    height={0}
                                                    placeholder={node?.asset?.lqip ? 'blur' : 'empty'}
                                                    blurDataURL={node?.asset?.lqip}                                  
                                                    className={`object-cover h-96 w-full ${fullWidth ? 'md:h-screen' : ''}`}
                                                    sizes={fullWidth ? '100vw' : '50vw'}
                                                    // onClick={() => handleClick(node, index)}
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
                {/* {clickedImg && (
                    <Modal
                        clickedImg={clickedImg}
                        handelRotationRight={handelRotationRight}
                        setClickedImg={setClickedImg}
                        handelRotationLeft={handelRotationLeft}
                        title={setAlt}
                    />
                )} */}
            </div>
        </Wrapper>
    )
}