import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosMenu } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai"
import { BiCaretDown } from "react-icons/bi"
import { urlForImage } from "../../lib/sanity";
import Styles from "../../styles/navbar.module.css"
import Image from "next/image";

export default function Navbar({ logo, company_name, logoWidth, navItems, ctaText, ctaLink, backgroundColor }: any) {

    const [dropdownActive, setDropdownActive] = useState(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)
    const desktopMenuParentItems = `relative inline-block mx-4 text-md`

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);


    const router = useRouter();

    return (
        <>
            <nav
                className={`${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`} ${backgroundColor ? '' : 'absolute'}`}
                onMouseLeave={() => setDropdownActive(null)}
            >
                <div className="md:flex items-center justify-between flex-wrap md:visible hidden p-4">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <Link href="/" className="relative cursor-pointer">
                            {logo ?
                                <Image
                                    src={urlForImage(logo).url()}
                                    width={logoWidth ? logoWidth : '150'}
                                    height={10}
                                    alt={company_name}
                                />
                                :
                                <h1 className="text-3xl">{company_name ? company_name : 'Company Name'}</h1>
                            }
                        </Link>
                    </div>
                    <div className="flex items-center w-auto">
                        <ul className="items-center text-right md:mr-10 justify-end">
                            {navItems?.map((link) => {

                                const menuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {

                                    return (
                                        <li
                                            key={link._key}
                                            className={`${desktopMenuParentItems}`}
                                            onMouseEnter={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                            <Link
                                                href="/"
                                                target={link?.externalUrl && "_blank"}
                                                rel={link?.externalUrl && "noreferrer"}
                                                aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                className={`cursor-pointer flex flex-row items-center py-10 ${Styles.navItems}`}
                                            >
                                                {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className="ml-1 text-lg" />
                                            </Link>

                                            <ul className={`absolute bottom-0 left-0 translate-y-full bg-white p-2 border text-left min-w-[200px] z-50 ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                {link.subMenu.map((sub) => {

                                                    const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                    return (
                                                        <>
                                                            <li className="whitespace-nowrap text-black" key={sub._key}>
                                                                <Link
                                                                    href={subMenuLinks}
                                                                    target={sub.newTab && '_blank'} aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text} rel={sub?.externalUrl && "noreferrer"} onClick={() => setDropdownActive(null)} className="py-1 block"
                                                                >
                                                                    {sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                                </Link>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <li className={`relative inline-block mx-4 text-md`} key={link._key}>
                                                <Link
                                                    href={menuLinks}
                                                    target={link.newTab && '_blank'} aria-label={link?.name ?? link?.title ?? link.text} rel={link?.externalUrl && "noreferrer"} className={`${router.asPath === menuLinks ? 'active' : 'false'} ${Styles.navItems}`}
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                            })}
                            {ctaText &&
                                <li className={desktopMenuParentItems} key="ctaButtonheadernavigation">
                                    <Link
                                        href={ctaLink}
                                        className="primary-button"
                                    >
                                        <span>{ctaText}</span>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <div className={`z-50 left-0 right-0 md:hidden ${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`}`}>
                <div className="nav px-4 py-2">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <Link href="/" className="relative cursor-pointer">
                                {logo &&
                                    <Image
                                        src={urlForImage(logo).url()}
                                        width={150}
                                        height={50}
                                        alt={company_name}
                                    />
                                }
                            </Link>
                        </div>
                        <div className="flex-1 text-right">
                            <div id="toggle" className="cursor-pointer flex justify-end" onClick={openMobileNav ? () => setOpenMobileNav(false) : () => setOpenMobileNav(true)}>
                                {openMobileNav ?
                                    <AiOutlineClose className="text-xl text-white" />
                                    :
                                    <IoIosMenu className="text-3xl text-white" />
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={`absolute bg-white w-full h-screen top-0 z-50 py-4 transition-all duration-200 ease-linear ${openMobileNav ? "-left-20" : "-left-full"}`}>
                        <ul style={{ listStyle: "none", padding: "0" }} className="mt-5 flex flex-col text-right mr-10">
                            {navItems?.map((link) => {

                                const mobileMenuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {
                                    return (
                                        <>
                                            <li key={link._key} className="relative my-3" onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                                <Link
                                                    href="/"
                                                    className="cursor-pointer flex flex-row items-center text-right justify-end text-2xl primary-heading" onClick={() => setOpenMobileNav(true)}
                                                >
                                                    {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className="ml-1 text-lg" />
                                                </Link>

                                                <ul className={`relative block w-full p-2 text-left ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                    {link.subMenu.map((sub) => {

                                                        const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                        return (
                                                            <>
                                                                <li className="block my-1 justify-end mx-auto text-right" key={sub._key}>
                                                                    <Link
                                                                        href={subMenuLinks}
                                                                        aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text} target={sub?.newTab && "_blank"} rel={sub?.externalUrl && "noreferrer"} onClick={() => setOpenMobileNav(false)}
                                                                    >
                                                                        {sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                                    </Link>
                                                                </li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <li key={link._key} onClick={() => setOpenMobileNav(false)} className="my-3">
                                            <Link
                                                href={mobileMenuLinks}
                                                rel={link?.externalUrl && "noreferrer"}
                                                aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                className={`block w-full h-full text-2xl primary-heading ${router.asPath === mobileMenuLinks ? 'active' : 'false'}`}
                                            >
                                                {link.internalLink?.name ?? link.internalLink?.title ?? link.text}

                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}