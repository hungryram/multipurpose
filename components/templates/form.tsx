import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import Styles from "../../styles/util.module.css"

export default function Form({ emailAlerts, sendFrom, emailCc, emailBcc }: any) {

    const [sending, setSending] = useState('Idle')

    const router = useRouter()

    const handleSubmit = async (e) => {
        setSending('Sending')
        e.preventDefault()
        const data = {
            name: e.target.fullName.value,
            email: e.target.emailAddress.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
            emailAlerts: e.target.emailAlerts.value,
            sendFrom: e.target.sendFrom.value,
            emailBcc: e.target.emailBcc.value,
            emailCc: e.target.emailCc.value,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/postmark-contact'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const submit = await fetch(endpoint, options)
        const res = await submit.json()
        if (res.ErrorCode === 0) {
            setSending('Sent')
            console.log('Sent:', res)
            router.push('/thank-you')
        }
        else {
            setSending('Error')
            console.log('Error:', res)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="name" id="name" className="h-0 w-0 opacity-0" autoComplete="off"/>
                <input type="hidden" name="email" id="email" className="h-0 w-0 opacity-0" autoComplete="off"/>
                <input type="hidden" name="emailAlerts" value={emailAlerts ? emailAlerts : 'submissions@hungryramwebdesign.com'} id="emailAlerts" className="h-0 w-0 opacity-0" />
                <input type="hidden" name="sendFrom" value={sendFrom ? sendFrom : 'forms@hungryramwebdesign.com'} id="sendFrom" className="h-0 w-0 opacity-0" />
                <input type="hidden" name="emailBcc" value={emailBcc} id="emailBcc" className="h-0 w-0 opacity-0" />
                <input type="hidden" name="emailCc" value={emailCc} id="emailCc" className="h-0 w-0 opacity-0" />
                <div>
                    <div className="py-5">
                        <div>
                            <div className="flex gap-3 my-2">
                                <div className="w-1/2">
                                    <div>
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            autoComplete="given-name"
                                            className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div>
                                        <label htmlFor="emailAddress">Email Address</label>

                                        <input
                                            type="email"
                                            name="emailAddress"
                                            id="emailAddress"
                                            autoComplete="email"
                                            className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="my-2">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="Phone"
                                    id="phone"
                                    autoComplete="tel"
                                    className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="message">Message</label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-3 w-full border bg-transparent p-2 border-slate-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="m-1 text-xs">By clicking submit, I consent to having this website save my information to respond to my inquiry</p>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={Styles.primaryButton}
                        >
                            {sending === 'Idle' ?
                                'Submit'
                                : sending === 'Sending' ?
                                    <FaSpinner className="animate-spin mx-auto text-2xl" />
                                    : sending === 'Sent' ?
                                        'Sent'
                                        : 'Error'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}