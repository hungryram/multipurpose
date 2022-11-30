// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'
import "swiper/css/navigation"
import "swiper/css/pagination"
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper } from 'swiper/react'

export default function Carousel({ children, arrowColor }: any) {
    SwiperCore.use([Autoplay, Pagination, Navigation])
    return (
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
            {children}
        </Swiper>
    )
}