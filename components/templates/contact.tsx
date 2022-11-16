import ContentEditor from "./contenteditor";
import Form from "./form";
import Social from "./social";

export default function ContactPage({ 
    heading, 
    phone_number, 
    email, 
    address, 
    city, 
    state, 
    zipCode, 
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
    size }: any) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex md:space-x-20 md:space-y-0 space-y-10">
                    <div className="md:w-1/3">
                        <div className="bg-slate-100">
                            <div className="p-6">
                                {address &&
                                    <div className="mb-8">
                                        <h3 className="font-bold text-lg mb-2">Location</h3>
                                        <div>
                                            <p>
                                                <>
                                                    {address}<br /> {city} {state} {zipCode}
                                                </>
                                            </p>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <h3 className="font-bold text-lg">Contact</h3>
                                    <ul>
                                        <li className="my-2">Email: <a href={`mailto:${email}`}>{email}</a></li>
                                        <li className="my-2">Phone: <a href={`tel:${phone_number}`}>{phone_number}</a></li>
                                    </ul>
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
                        <h2 className="h2 mb-4">{heading}</h2>
                        <ContentEditor
                            content={content}
                        />
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}