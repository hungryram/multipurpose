import Wrapper from "../util/wrapper";
import ContactBlock from "./contact-block";
import Form from "./form";
import Social from "./social";

import Styles from "../../styles/templates.module.css"
import BodyText from "../util/body-text";

export default function ContactPage({
    heading,
    backgroundColor,
    textColor,
    phone_number,
    office_number,
    email,
    address,
    city,
    state,
    zip_code,
    content,
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
    size,
    emailAlerts,
    sendFrom,
    emailBcc,
    emailCc,

    hours,
    monday, 
    tuesday, 
    wednesday, 
    thursday, 
    friday, 
    saturday, 
    sunday

}: any) {
    return (
        <Wrapper>
            <div className={`md:flex md:space-x-20 md:space-y-0 space-y-10 ${Styles.contactPage}`}>
                <div className="md:w-1/3">
                    <div style={{
                        backgroundColor: `${backgroundColor}`
                    }}>
                        <div className="p-6">
                            <div className={Styles.contactBlock} style={{
                                color: `${textColor}`
                            }}>
                            <h3 className="uppercase font-semibold mb-4">CONTACT</h3>
                                <ContactBlock
                                    email={email}
                                    phone={phone_number}
                                    office={office_number}
                                    address={address}
                                    city={city}
                                    state={state}
                                    zipCode={zip_code}
                                    hours={hours}
                                    monday={monday}
                                    tuesday={tuesday}
                                    wednesday={wednesday}
                                    thursday={thursday}
                                    friday={friday}
                                    saturday={saturday}
                                    sunday={sunday}
                                />
                            </div>
                            <div className="mt-6">
                                <Social
                                    facebook={facebook}
                                    youtube={youtube}
                                    instagram={instagram}
                                    twitter={twitter}
                                    reddit={reddit}
                                    linkedin={linkedin}
                                    yelp={yelp}
                                    pinterest={pinterest}
                                    tiktok={tiktok}
                                    zillow={zillow}
                                    size={size}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <BodyText
                        heading={heading}
                        body={content}
                        textAlign="false"
                        fullWidth="false"
                    />
                    <div className="px-4">
                        <Form
                            emailAlerts={emailAlerts}
                            sendFrom={sendFrom}
                            emailBcc={emailBcc}
                            emailCc={emailCc}
                        />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}