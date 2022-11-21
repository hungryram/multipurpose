// ICONS
import { AiOutlineMobile, AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"

export default function ContactBlock({
    phone,
    office,
    email,
    address,
    city,
    state,
    zipCode,
    googleBusiness
}: any) {
    return (
        <ul>
            {phone &&
                <li>
                    <a href={`tel:${phone}`}>
                        <div className="flex items-center md:justify-start justify-center">
                            <span><AiOutlineMobile className="mr-4" /></span>
                            <span>{phone}</span>
                        </div>
                    </a>
                </li>
            }
            {office &&
                <li>
                    <a href={`tel:${office}`}>
                        <div className="flex items-center md:justify-start justify-center">
                            <span><AiOutlinePhone className="mr-4" /></span>
                            <span>{office}</span>
                        </div>
                    </a>
                </li>
            }
            {email &&
                <li>
                    <a href={`mailto:${email}`}>
                        <div className="flex items-center md:justify-start justify-center">
                            <span><AiOutlineMail className="mr-4" /></span>
                            <span>{email}</span>
                        </div>
                    </a>
                </li>
            }
            {address &&
                <li>
                    <a href={googleBusiness ?? '#'} target={googleBusiness ?? '_blank'}>
                        <div className="flex items-center md:justify-start justify-center">
                            <span><MdOutlineLocationOn className="mr-4" /></span>
                            <span>{address}<br /> {city} {state} {zipCode}</span>
                        </div>
                    </a>
                </li>
            }
        </ul>
    )
}