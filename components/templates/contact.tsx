import Wrapper from "../util/wrapper";
import ContactBlock from "./contact-block";
import Form from "./form";
import Social from "./social";

import Styles from "../../styles/templates.module.css"
import BodyText from "../util/body-text";

export default function ContactPage({
    heading,
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
    emailCc

}: any) {
    return (
        <Wrapper>
            <div className={`md:flex md:space-x-20 md:space-y-0 space-y-10 ${Styles.contactPage}`}>
                <div className="md:w-1/3">
                    <div className="bg-slate-100">
                        <div className="p-6">
                            <div className={Styles.contactBlock}>
                                <h3 className="font-bold text-lg">Contact</h3>
                                <ContactBlock
                                    email={email}
                                    phone={phone_number}
                                    office={office_number}
                                    address={address}
                                    city={city}
                                    state={state}
                                    zipCode={zip_code}
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