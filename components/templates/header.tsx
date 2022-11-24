import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import Styles from '../../styles/util.module.css'

export default function Header({ image, title, altText, hideHeader, blurData }: any) {
    return (
        <div className={`flex items-center relative ${image ? `` : ` bg-black`} ${hideHeader ? 'hidden': ''}`}>
            {image &&
                <>
                    <Image
                        src={urlForImage(image).url()}
                        width={2000}
                        height={0}
                        alt={altText}
                        placeholder="blur"
                        blurDataURL={blurData ? blurData : urlForImage(image).width(50).height(50).url()}
                        priority
                        className="lg:h-[20em] h-[15rem] w-full"
                        style={{
                            objectFit: 'cover',
                        }}
                        sizes="100vw"
                    />
                    <div className={Styles.headerOverlay}></div>
                </>
            }
            {title &&
                <div className="absolute md:top-2/3 top-1/2 bottom-0 left-0 right-0 text-white text-center">
                    <h1 className="md:text-5xl text-3xl font-medium text-white">{title}</h1>
                </div>
            }
        </div>
    )
}