import Image from "next/image"

export default function Header({ image, title, altText, hideHeader, blurData }: any) {
    return (
        <>
            {hideHeader ?
                <div></div>
                :
                <div className={`relative pt-52 pb-10 lg:pt-72 lg:pb-10 ${image ? '' : 'bg-secondary'}`}>
                    {image &&
                        <>
                            <div className="absolute inset-0">
                                <Image
                                    src={image}
                                    width={2000}
                                    height={0}
                                    alt={altText}
                                    placeholder={blurData ? 'blur' : 'empty'}
                                    blurDataURL={blurData}
                                    priority
                                    className="object-cover w-full h-full object-center"
                                    sizes="100vw"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
                        </>
                    }

                    {title &&
                        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                            <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
                                <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl">{title}</h1>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}
