import Image from "next/image"
import { PortableText } from "@portabletext/react"
import Styles from "../../styles/footer.module.css"
import Link from "next/link"
import { urlForImage } from "../../lib/sanity"

// ICONS
import { AiOutlineMobile, AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"

// UTIL
import Social from "../templates/social"
import ContentEditor from "../templates/contenteditor"
import ContactBlock from "../templates/contact-block"

export default function Footer({
    address,
    city,
    state,
    zip_code,
    company_name,
    links,
    legal,
    footerText,
    footerDisclaimer,
    phone_number,
    office_number,
    email,
    image,
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
    size
}) {
    return (
        <footer className={Styles.footer}>
            <div className="pt-20 pb-10">
                <div className="container">
                    <div className="mx-6 py-10 md:text-left text-center">
                        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-8">
                            <div className="relative">
                                {image ?
                                    <div>
                                        <Image
                                            src={urlForImage(image).url()}
                                            width="200"
                                            height="50"
                                            objectFit="contain"
                                            alt={company_name}
                                        />
                                    </div>
                                    :
                                    <h3 className="uppercase font-semibold mb-4">{company_name}</h3>
                                }
                                <Social
                                    facebook={facebook}
                                    youtube={youtube}
                                    instagram={instagram}
                                    twitter={twitter}
                                    reddit={reddit}
                                    linkedin={linkedin}
                                    yelp={yelp}
                                    pinterest={pinterest}
                                    tiktok={tiktok}
                                    zillow={zillow}
                                    size={size}
                                />
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4">Contact Info</h3>
                                <ContactBlock
                                    email={email}
                                    phone={phone_number}
                                    office={office_number}
                                    address={address}
                                    city={city}
                                    state={state}
                                    zipCode={zip_code}
                                />
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4">Useful links</h3>
                                <ul>
                                    {links?.map((link, i) => {
                                        return (
                                            <li className="" key={i}>
                                                <Link href={(link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)} target={link.newTab && '_blank'} aria-label={link?.name ?? link?.title ?? link.text}>
                                                    {link?.name ?? link?.title ?? link.text}
                                                </Link>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4">About</h3>
                                {footerText &&
                                    <PortableText
                                        value={footerText}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    {footerDisclaimer &&
                        <div className="text-center text-xs">
                            <ContentEditor
                                content={footerDisclaimer}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className="text-center p-4">
                <p className="text-xs font-light pt-0">&copy; Copyright {new Date().getFullYear()} &middot; {company_name} &middot; Website built by <a href="https://www.hungryram.com/" className="font-bold" target="_blank" rel="noreferrer">Hungry Ram</a></p>
                {legal ?
                    <ul>
                        {legal?.map((node) => {
                            return (
                                <li className="inline text-sm mx-2" key={node._id}>
                                    <Link href={`/legal/${node.slug}`}>
                                        <a>{node.title}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    : null
                }
            </div>
        </footer>
    )
}