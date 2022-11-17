import Link from "next/link"

export default function PrimaryButton({ buttonLabel, buttonLink, buttonBackground, buttonTextColor }: any) {
    return <Link href={buttonLink} className="primary-button" style={{
      background: `${buttonBackground ?? 'var(--primary-button-background)'}`,
      color: `${buttonTextColor ?? 'var(--primary-button-text)'}`
    }}>{buttonLabel ?? 'Contact'}</Link>
  }
  