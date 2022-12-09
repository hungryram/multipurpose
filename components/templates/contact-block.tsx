// ICONS
import { AiOutlineMobile, AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"
import Hours from "./hours"

export default function ContactBlock({
    phone,
    office,
    email,
    address,
    city,
    state,
    zipCode,
    googleBusiness,
    hours,
    monday, tuesday, wednesday, thursday, friday, saturday, sunday
}: any) {
    return (
        <>
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
                {city &&
                    <li>
                        <a href={googleBusiness ?? '#'} target={googleBusiness && '_blank'}>
                            <div className="flex items-center md:justify-start justify-center">
                                <span><MdOutlineLocationOn className="mr-4" /></span>
                                <span>{address} <span className="block">{city} {state} {zipCode}</span></span>
                            </div>
                        </a>
                    </li>
                }
            </ul>
            {hours &&
                <Hours
                    monday={monday}
                    tuesday={tuesday}
                    wednesday={wednesday}
                    thursday={thursday}
                    friday={friday}
                    saturday={saturday}
                    sunday={sunday}
                />
            }
        </>
    )
}