import Link from "next/link"
import Styles from "../../styles/util.module.css"

export default function PrimaryButton({ buttonLabel, buttonLink, buttonBackground, buttonTextColor }: any) {
    return <Link href={buttonLink} className={Styles.primaryButton} style={{
      background: `${buttonBackground ?? 'var(--primary-button-background)'}`,
      color: `${buttonTextColor ?? 'var(--primary-button-text)'}`
    }}>{buttonLabel ?? 'Contact'}</Link>
  }
  