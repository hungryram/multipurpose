import Link from "next/link"
import Styles from "../../styles/util.module.css"

export default function SecondaryButton({ buttonLabel, buttonLink, secondaryButtonLink, buttonBackground, buttonTextColor }: any) {

    const secondaryButtonLinking =
    (buttonLink?.internalLink?._type === "pages" && `/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "blog" && `/blog/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "legal" && `/legal/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "author" && `/authors/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "services" && `/services/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "portfolio" && `/portfolio/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "locations" && `/locations/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.externalUrl && `${buttonLink?.externalUrl}`)

  return (
    <>
      {buttonLabel || secondaryButtonLink.buttonText ?
        <Link href={secondaryButtonLinking ?? buttonLink} className={Styles.secondaryButton} style={{
          background: `${buttonBackground ?? 'var(--secondary-button-background)'}`,
          color: `${buttonTextColor ?? 'var(--secondary-button-text)'}`
        }} target={buttonLink.newTab && '_blank'}>{buttonLabel ?? secondaryButtonLink.buttonText }</Link>
        : null
      }
    </>
  )
}
