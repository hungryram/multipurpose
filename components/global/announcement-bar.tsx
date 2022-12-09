import Link from "next/link"
import Styles from '../../styles/templates.module.css'

export default function AnnouncementBar({ classes, announcement, announcementLink, announcementLinkText }: any) {
    const announcementLinking =
        (announcementLink?.internalLink?._type === "pages" && `/${announcementLink?.internalLink.slug}`) ||
        (announcementLink?.internalLink?._type === "blog" && `/blog/${announcementLink?.internalLink.slug}`) ||
        (announcementLink?.internalLink?._type === "legal" && `/legal/${announcementLink?.internalLink.slug}`) ||
        (announcementLink?.internalLink?._type === "author" && `/authors/${announcementLink?.internalLink.slug}`) ||
        (announcementLink?.internalLink?._type === "services" && `/services/${announcementLink?.internalLink.slug}`) ||
        (announcementLink?.externalUrl && `${announcementLink?.externalUrl}`)
    return (
        <>
            {announcement ?
                <Link
                    href={announcementLinking ?? '/'}
                    target={announcementLink?.newTab && '_blank'}
                >
                    <div className={`${Styles.announcementBar} ${classes} px-4 py-3`}>
                        <p className="text-center text-sm">
                            {announcement} <span className="underline">{announcementLinkText}</span>
                        </p>
                    </div>
                </Link>

                :
                null
            }
        </>
    )
}