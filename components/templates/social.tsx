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
                {facebook && <li><a href={facebook} target="_blank" rel="noreferrer" aria-label="Open link to facebook" title="Open link to facebook"><AiFillFacebook className={size} /></a></li>}
                {youtube && <li><a href={youtube} target="_blank" rel="noreferrer" aria-label="Open link to youtube" title="Open link to youtube"><AiFillYoutube className={size} /></a></li>}
                {instagram && <li><a href={instagram} target="_blank" rel="noreferrer" aria-label="Open link to instagram" title="Open link to instagram"><AiFillInstagram className={size} /></a></li>}
                {twitter && <li><a href={twitter} target="_blank" rel="noreferrer" aria-label="Open link to twitter" title="Open link to twitter"><AiFillTwitterCircle className={size} /></a></li>}
                {reddit && <li><a href={reddit} target="_blank" rel="noreferrer" aria-label="Open link to reddit" title="Open link to reddit"><AiFillRedditCircle className={size} /></a></li>}
                {linkedin && <li><a href={linkedin} target="_blank" rel="noreferrer" aria-label="Open link to linkedin" title="Open link to linkedin"><AiFillLinkedin className={size} /></a></li>}
                {yelp && <li><a href={yelp} target="_blank" rel="noreferrer" aria-label="Open link to yelp" title="Open link to yelp"><FaYelp className={size} /></a></li>}
                {pinterest && <li><a href={pinterest} target="_blank" rel="noreferrer" aria-label="Open link to pinterest" title="Open link to pinterest"><BsPinterest className={size} /></a></li>}
                {tiktok && <li><a href={tiktok} target="_blank" rel="noreferrer" aria-label="Open link to tiktok" title="Open link to tiktok"><FaTiktok className={size} /></a></li>}
                {zillow && <li><a href={zillow} target="_blank" rel="noreferrer" aria-label="Open link to zillow" title="Open link to zillow"><SiZillow className={size} /></a></li>}
            </ul>
        </div>
    )
}