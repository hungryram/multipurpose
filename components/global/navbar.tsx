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
import AnnouncementBar from "./announcement-bar";

export default function Navbar({
    logo,
    company_name,
    logoWidth,
    navItems,
    ctaText,
    ctaLink,
    backgroundColor,
    mobileLogoWidth,
    announcementText,
    announcementLinkText,
    announcementLink
}: any) {

    const [dropdownActive, setDropdownActive] = useState(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)
    const desktopMenuParentItems = `relative inline-block mx-4`

    // const [scroll, setScroll] = useState(false);
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         setScroll(window.scrollY > 50);
    //     });
    // }, []);

    const router = useRouter();

    const ctaLinking =
        (ctaLink?.internalLink?._type === "pages" && `/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "blog" && `/blog/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "legal" && `/legal/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "author" && `/authors/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "services" && `/services/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.externalUrl && `${ctaLink?.externalUrl}`)

    return (
        <>

            <nav
                className={`${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`} ${backgroundColor ? '' : 'absolute top-0'}`}
                role="navigation"
                aria-label="Site Header"
                aria-orientation="vertical"
            >
                {announcementText &&
                    <AnnouncementBar
                        classes={'lg:flex lg:visible hidden justify-center'}
                        announcement={announcementText}
                        announcementLinkText={announcementLinkText}
                        announcementLink={announcementLink}
                    />
                }
                <div className="lg:flex items-center justify-between flex-wrap lg:visible hidden p-4">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <Link href="/" className="relative cursor-pointer inline-block">
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
                        <ul
                            className="items-center text-right md:mr-10 justify-end"
                            role="menu"
                            aria-label="Main Navigation Menu"
                        >
                            {navItems?.map((link) => {

                                const menuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {

                                    return (
                                        <li
                                            key={link._key}
                                            className={`${desktopMenuParentItems}`}
                                            onMouseEnter={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}
                                            onMouseLeave={() => setDropdownActive(null)}
                                        >
                                            <Link
                                                href="#"
                                                className={`cursor-pointer flex flex-row items-center ${Styles.navItems}`}
                                                aria-expanded={dropdownActive === link ? "true" : "false"}
                                                role="menuitem"
                                            >
                                                {link.text} <BiCaretDown className="ml-1 text-lg" />
                                            </Link>

                                            <ul
                                                className={`${Styles.dropDown} ${dropdownActive === link ? Styles.activeDropDown : Styles.hideDropDown}`}
                                                role="menu"
                                            >
                                                {link.subMenu.map((sub) => {

                                                    const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                    return (
                                                        <>
                                                            <li className="whitespace-nowrap text-black" key={sub._key}>
                                                                <Link
                                                                    href={subMenuLinks ?? '/'}
                                                                    target={sub.newTab && '_blank'}
                                                                    onClick={() => setDropdownActive(null)}
                                                                    className="py-1 block"
                                                                    role="menuitem"
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
                                            <li className={`relative inline-block mx-4`} key={link._key}>
                                                <Link
                                                    href={menuLinks ?? '/'}
                                                    target={link.newTab && '_blank'}
                                                    className={`${router.asPath === menuLinks ? Styles.activeLink : 'false'} ${Styles.navItems}`}
                                                    role="menuitem"
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                            })}
                            {ctaLinking &&
                                <li className={desktopMenuParentItems} key="ctaButtonheadernavigation">
                                    <Link href={ctaLinking} className={Styles.navbarCta}>
                                        {ctaLink.text}
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <nav>
                <div>
                    <AnnouncementBar
                        classes={'justify-center bg-indigo-600 lg:hidden'}
                        announcement={announcementText}
                        announcementLinkText={announcementLinkText}
                        announcementLink={announcementLink}
                    />
                    <div
                        className={`nav px-4 py-2 lg:hidden ${backgroundColor ? '' : 'absolute'} ${Styles.navbar} ${scroll ? `${Styles.bgScroll}` : `${Styles.bgDefault}`}`}
                    >
                        <div className="flex items-center">
                            <div className="flex-1">
                                <Link href="/" className="relative cursor-pointer block">
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
                                <div
                                    id="toggle"
                                    className="cursor-pointer flex justify-end z-50"
                                    onClick={openMobileNav ? () => setOpenMobileNav(false) : () => setOpenMobileNav(true)}
                                    aria-label={openMobileNav ? 'menu is open' : 'menu is closed'}
                                    aria-expanded={openMobileNav ? 'true' : 'false'}
                                >
                                    <HamburgerMenu
                                        isOpen={openMobileNav}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className={`absolute z-50 bg-white left-0 right-0 h-auto transition-all duration-200 ease-linear ${openMobileNav ? "top-20 opacity-100" : "-top-96 opacity-0"}`}>
                            <ul className={Styles.mobileMenu}>
                                {navItems?.map((link) => {

                                    const mobileMenuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                    if (link.subMenu?.length > 0) {
                                        return (
                                            <>
                                                <li
                                                    key={link._key}
                                                    onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}
                                                >
                                                    <Link
                                                        href="#"
                                                        className="cursor-pointer flex flex-row items-center"
                                                        onClick={() => setOpenMobileNav(true)}
                                                        aria-expanded={dropdownActive === link ? "true" : "false"}
                                                        role="menuitem"
                                                    >
                                                        {link.text} <BiCaretDown className="ml-1 inline" />
                                                    </Link>

                                                    <ul
                                                        className={`${dropdownActive === link ? Styles.mobileDropDown : Styles.mobileHideDropDown}`}
                                                        role="menu"
                                                    >
                                                        {link.subMenu.map((sub) => {

                                                            const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)
                                                            return (
                                                                <>
                                                                    <li key={sub._key}>
                                                                        <Link
                                                                            href={subMenuLinks ?? '/'}
                                                                            target={sub?.newTab && "_blank"}
                                                                            onClick={() => setOpenMobileNav(false)}
                                                                            role="menuitem"
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
                                            <li key={link._key} onClick={() => setOpenMobileNav(false)}>
                                                <Link
                                                    href={mobileMenuLinks ?? '/'}
                                                    className={`${router.asPath === mobileMenuLinks ? Styles.activeLink : 'false'}`}
                                                    target={link?.newTab && "_blank"}
                                                    role="menuitem"

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
            </nav>

        </>
    )
}