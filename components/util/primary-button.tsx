import Link from "next/link"

export default function PrimaryButton({ buttonLabel, buttonLink }) {
    return <Link href={buttonLink} className="primary-button">{buttonLabel}</Link>
  }
  