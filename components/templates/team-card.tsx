import Image from "next/image"
import { BiUser } from "react-icons/bi"
import Link from "next/link"

export default function TeamCard({
    name,
    image,
    slug,
    position,
    altText,
    blurData,
    phone,
    email
}: any) {


    const card = (
        <div className="relative overflow-hidden rounded-sm">
            {image ?
                <Image
                    src={image}
                    alt={altText ?? name}
                    width={800}
                    height={0}
                    className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700"
                    placeholder={blurData ? 'blur' : 'empty'}
                    blurDataURL={blurData}
                />
                :
                <div className="h-[450px] object-cover transform hover:scale-105 transition ease-in-out duration-700 bg-secondary flex justify-center items-center">
                    <div>
                        <BiUser className="text-6xl text-white" />
                    </div>
                </div>
            }
            <div className="absolute bottom-0 left-0 right-0 p-4 m-2 rounded-sm bg-white text-black">
                <h3 className="mb-1 text-xl font-[500] leading-snug">{name}</h3>
                {position && <p className="text-gray-600 font-medium">{position}</p>}
                {phone && <p className="text-gray-600 font-medium"><a href={`tel:${phone}`}>{phone}</a></p>}
                {email && <p className="text-gray-600 font-medium"><a href={`mailto:${email}`}>{email}</a></p>}
            </div>
        </div>
    )
    return (
        <div className="h-full">
            {slug ? (
                <Link href={`/team/${slug}`} arial-label={`Visit profile information for ${name}`}>
                    {card}
                </Link>
            ) :
                card
            }
        </div>
    )
}