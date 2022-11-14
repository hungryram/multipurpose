import Image from "next/image"
import { PortableText } from "@portabletext/react"
import Styles from "../../styles/footer.module.css"
import Link from "next/link"
import { urlForImage } from "../../lib/sanity"

// ICONS
import { AiOutlineMobile, AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"

// UTIL
import Section from "../util/section"
import Container from "../util/container"

export default function Footer({ address, city, state, zipCode, company_name, links, legal, footerText, phone, office_number, email, image }) {
    return (
        <footer className={Styles.footer}>
            <Section>
                <Container>
                    <div className="mx-6 py-10 text-left">
                        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                    <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">{company_name}</h3>
                                }
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Contact Info</h3>
                                <ul>
                                    {phone && <li><a href={`tel:${phone}`} className="flex items-center"> <AiOutlineMobile className="mr-2 text-xl" />{phone}</a></li>}
                                    {office_number && <li><a href={`tel:${office_number}`} className="flex items-center"> <AiOutlinePhone className="mr-2 text-xl" />{office_number}</a></li>}
                                    {email && <li><a href={`tel:${email}`} className="flex items-center"><AiOutlineMail className="mr-2 text-xl" />{email}</a></li>}
                                    {address && <li><a href="" className="flex items-center"><MdOutlineLocationOn className="mr-2 text-2xl" />{address}<br /> {city} {state} {zipCode}</a></li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Useful links</h3>
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
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">About</h3>
                                {footerText &&
                                    <PortableText
                                        value={footerText}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <div className="text-center p-6">
                <p className="text-xs font-light pt-0">&copy; Copyright {new Date().getFullYear()} &middot; {company_name} &middot; Website built by <a href="https://www.hungryram.com/" className="font-bold" target="_blank" rel="noreferrer">Hungry Ram</a></p>
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
            </div>
        </footer>
    )
}