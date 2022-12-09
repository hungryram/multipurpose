import Link from "next/link"
import Styles from "../../styles/util.module.css"

export default function PrimaryButton({ buttonLabel, buttonLink, buttonStyle }: any) {


  const buttonLinking =
    (buttonLink?.internalLink?._type === "pages" && `/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "blog" && `/blog/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "legal" && `/legal/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "author" && `/authors/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.internalLink?._type === "services" && `/services/${buttonLink?.internalLink.slug}`) ||
    (buttonLink?.externalUrl && `${buttonLink?.externalUrl}`)

  return (
    <>
      {buttonLabel || buttonLink?.buttonText ?
        <Link href={buttonLinking ?? buttonLink ?? '/'} className={Styles.primaryButton} style={buttonStyle} target={buttonLink?.newTab && '_blank'}>{buttonLabel ?? buttonLink?.buttonText }</Link>
        : null
      }
    </>
  )
}
