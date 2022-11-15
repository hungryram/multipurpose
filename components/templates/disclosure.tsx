import { Disclosure, Transition } from '@headlessui/react'
import { FiChevronUp } from 'react-icons/fi'
import ContentEditor from './contenteditor'

export default function DisclosureSection({ disclosure, disclosureBackgroundColor, disclosureTextColor, disclosureContentColor }: any) {
    return (
        <>
            {disclosure.map((node) => {
                return (
                    <div className="w-full">
                        <div className="mx-auto w-full md:max-w-2xl rounded-2xl p-2">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-md bg-purple-100 px-4 py-2 text-left" style={{
                                            background: `${disclosureBackgroundColor}`,
                                            color: `${disclosureTextColor}`
                                        }}>
                                            {node?.heading && <span>{node.heading}</span>}
                                            <FiChevronUp
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5`}
                                                style={{
                                                    color: `${disclosureTextColor}`
                                                }}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2" style={{
                                            color: `${disclosureContentColor ? disclosureContentColor : '#000000'}`
                                        }}>
                                            {node.content &&
                                                <ContentEditor
                                                    content={node.content}
                                                />
                                            }
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                )
            })}
        </>

    )
}