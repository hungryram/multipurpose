import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosMenu } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai"
import { BiCaretDown } from "react-icons/bi"
import { urlForImage } from "../../lib/sanity";
import Styles from "../../styles/navbar.module.css"
import Image from "next/image";
import HamburgerMenu from "./hamburger-menu";
import PrimaryButton from "../util/primary-button";

export default function Navbar({ logo, company_name, logoWidth, navItems, ctaText, ctaLink, backgroundColor, mobileLogoWidth }: any) {

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
                className={`${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`} ${backgroundColor ? '' : 'absolute top-0'}`}
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
                                                aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                className={`cursor-pointer flex flex-row items-center py-10 ${Styles.navItems}`}
                                            >
                                                {link.text} <BiCaretDown className="ml-1 text-lg" />
                                            </Link>

                                            <ul className={`absolute bottom-0 left-0 translate-y-full bg-white p-2 border text-left min-w-[200px] z-50 ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                {link.subMenu.map((sub) => {

                                                    const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                    return (
                                                        <>
                                                            <li className="whitespace-nowrap text-black" key={sub._key}>
                                                                <Link
                                                                    href={subMenuLinks ?? '/'}
                                                                    target={sub.newTab && '_blank'} 
                                                                    aria-label={sub.text} 
                                                                    onClick={() => setDropdownActive(null)} 
                                                                    className="py-1 block"
                                                                >
                                                                    {sub.text}
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
                                                    href={menuLinks ?? '/'}
                                                    target={link.newTab && '_blank'} 
                                                    aria-label={link?.name ?? link?.title ?? link.text} 
                                                    className={`${router.asPath === menuLinks ? Styles.activeLink : 'false'} ${Styles.navItems}`}
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                            })}
                            {ctaLink &&
                                <li className={desktopMenuParentItems} key="ctaButtonheadernavigation">
                                    <PrimaryButton 
                                        buttonText={ctaText}
                                        buttonLink={ctaLink}
                                    />
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <div className={`z-50 left-0 right-0 md:hidden ${backgroundColor ? '' : 'absolute'} ${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`}`}>
                <div className="nav px-4 py-2">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <Link href="/" className="relative cursor-pointer">
                                {logo &&
                                    <Image
                                        src={urlForImage(logo).url()}
                                        width={mobileLogoWidth ?? 100}
                                        height={50}
                                        alt={company_name}
                                    />
                                }
                            </Link>
                        </div>
                        <div className="flex-1 text-right">
                            <div id="toggle" className="cursor-pointer flex justify-end" onClick={openMobileNav ? () => setOpenMobileNav(false) : () => setOpenMobileNav(true)}>
                                <HamburgerMenu 
                                    isOpen={openMobileNav}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={`fixed bg-white w-full h-full top-0 z-50 py-4 transition-all duration-200 ease-linear ${openMobileNav ? "-left-20" : "-left-full"}`}>
                        <ul style={{ listStyle: "none", padding: "0" }} className="mt-5 flex flex-col text-right mr-10">
                            {navItems?.map((link) => {

                                const mobileMenuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {
                                    return (
                                        <>
                                            <li key={link._key} className="relative my-3" onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                                <Link
                                                    href="/"
                                                    className="cursor-pointer flex flex-row items-center text-right justify-end text-2xl primary-heading" 
                                                    onClick={() => setOpenMobileNav(true)}
                                                >
                                                    {link.text} <BiCaretDown className="ml-1 text-lg" />
                                                </Link>

                                                <ul className={`relative block w-full p-2 text-left ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                    {link.subMenu.map((sub) => {

                                                        const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)
                                                        return (
                                                            <>
                                                                <li className="block my-1 justify-end mx-auto text-right" key={sub._key}>
                                                                    <Link
                                                                        href={subMenuLinks ?? '/'}
                                                                        aria-label={sub.text} 
                                                                        target={sub?.newTab && "_blank"} 
                                                                        onClick={() => setOpenMobileNav(false)}
                                                                    >
                                                                        {sub.text}
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
                                                href={mobileMenuLinks ?? '/'}
                                                aria-label={link.text}
                                                className={`block w-full h-full text-2xl primary-heading ${router.asPath === mobileMenuLinks ? Styles.activeLink : 'false'}`}
                                            >
                                                {link.text}

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