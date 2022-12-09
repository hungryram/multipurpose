import Link from "next/link"
import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import { BsBriefcase } from "react-icons/bs"

export default function ServiceCard({
    title,
    headerImage,
    altText,
    slug,
    blurData
}: any) {
    return (
        <div className="h-full">
        <Link href={`/services/${slug}`} arial-label={`Link to more information on ${title}`}>
            <div className="relative overflow-hidden rounded-sm">
                {headerImage ?
                    <Image
                        src={headerImage}
                        alt={altText ?? title}
                        width={800}
                        height={0}
                        className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                        placeholder={blurData ? 'blur' : 'empty'}
                        blurDataURL={blurData}
                    />
                    :
                    <div className="h-[350px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-secondary flex justify-center items-center">
                        <div>
                            <BsBriefcase className="text-6xl text-white" />
                        </div>
                    </div>
                }
                <div className="left-0 right-0 p-4 rounded-sm bg-white">
                    <h3 className="mb-1 text-xl leading-snug">{title}</h3>
                </div>
            </div>
        </Link>
    </div>
    )
}