import { AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle, AiFillYoutube, AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { FaYelp, FaTiktok } from "react-icons/fa"
import { BsPinterest } from "react-icons/bs"
import { SiZillow } from "react-icons/si"

export default function Social({ 
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
    size
 }: any) {
    
    return (
        <div className="py-4">
            <ul className="social-component">
                {facebook && <li><a href={facebook} target="_blank" rel="noreferrer"><AiFillFacebook className={size} /></a></li>}
                {youtube && <li><a href={youtube} target="_blank" rel="noreferrer"><AiFillYoutube className={size} /></a></li>}
                {instagram && <li><a href={instagram} target="_blank" rel="noreferrer"><AiFillInstagram className={size} /></a></li>}
                {twitter && <li><a href={twitter} target="_blank" rel="noreferrer"><AiFillTwitterCircle className={size} /></a></li>}
                {reddit && <li><a href={reddit} target="_blank" rel="noreferrer"><AiFillRedditCircle className={size} /></a></li>}
                {linkedin && <li><a href={linkedin} target="_blank" rel="noreferrer"><AiFillLinkedin className={size} /></a></li>}
                {yelp && <li><a href={yelp} target="_blank" rel="noreferrer"><FaYelp className={size} /></a></li>}
                {pinterest && <li><a href={pinterest} target="_blank" rel="noreferrer"><BsPinterest className={size} /></a></li>}
                {tiktok && <li><a href={tiktok} target="_blank" rel="noreferrer"><FaTiktok className={size} /></a></li>}
                {zillow && <li><a href={zillow} target="_blank" rel="noreferrer"><SiZillow className={size} /></a></li>}
            </ul>
        </div>
    )
}