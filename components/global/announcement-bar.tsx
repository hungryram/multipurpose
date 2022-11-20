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
            
                <div className={`${Styles.announcementBar} ${classes} px-4 py-3`}>
                    <p className="text-center text-sm">
                        {announcement}
                        
                        {announcementLinkText &&
                            <Link 
                                href={announcementLinking ?? '/'} 
                                className="underline ml-1"
                                target={announcementLink?.newTab && '_blank'}
                                >
                                {announcementLinkText}
                            </Link>
                        }
                    </p>
                </div>
                :
                null
            }
        </>
    )
}