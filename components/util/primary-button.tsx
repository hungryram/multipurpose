import Link from "next/link"
import Styles from "../../styles/util.module.css"

export default function PrimaryButton({ buttonLabel, buttonLink, buttonBackground, buttonTextColor }: any) {


  const buttonLinking =
    (buttonLink?.internalLink?._type === "pages" && `/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "blog" && `/blog/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "legal" && `/legal/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "author" && `/authors/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "services" && `/services/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.externalUrl && `${buttonLink?.externalUrl}`)

  return (
    <>
      {buttonLinking || buttonLink ?
        <Link href={buttonLinking ?? buttonLink} className={Styles.primaryButton} style={{
          background: `${buttonBackground ?? 'var(--primary-button-background)'}`,
          color: `${buttonTextColor ?? 'var(--primary-button-text)'}`
        }}>{buttonLabel ?? buttonLink.buttonText}</Link>
        : null
      }
    </>
  )
}
