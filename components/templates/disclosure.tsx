import { Disclosure, Transition } from '@headlessui/react'
import { FiChevronUp } from 'react-icons/fi'
import ContentEditor from './contenteditor'
import BodyText from '../util/body-text'
import Wrapper from '../util/wrapper'

export default function DisclosureSection({
    disclosure,
    disclosureBackgroundColor,
    disclosureTextColor,
    disclosureContentColor,
    backgroundStyles,
    twoColumn,
    content,
    textLeft,
    heading,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {
    return (
            <Wrapper
                backgroundStyles={backgroundStyles}
            >
                <div className={twoColumn ? 'md:flex md:space-x-20' : ''}>
                    <div className={twoColumn ? 'md:w-1/2' : ''}>
                        <BodyText
                            heading={heading}
                            body={content}
                            bodyStyle={textStyle}
                            headerStyle={headerStyle}
                            fullWidth={textLeft}
                            textAlign={textLeft}
                            buttonText={buttonText}
                            buttonLink={buttonLink}
                            buttonStyle={buttonStyle}
                            secondButtonText={secondButtonText}
                            secondButtonLink={secondButtonLink}
                            secondaryButtonStyle={secondaryButtonStyle}
                        />
                    </div>
                    {disclosure ?
                        <div className={twoColumn ? 'md:w-1/2' : ''}>
                            <div className="mt-10">
                                <>
                                    {disclosure.map((node) => {
                                        return (
                                            <div className="w-full" key={node._key}>
                                                <div className="mx-auto w-full md:max-w-2xl rounded-2xl p-2">
                                                    <Disclosure>
                                                        {({ open }) => (
                                                            <>
                                                                <Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left" style={{
                                                                    background: `${disclosureBackgroundColor?.hex ?? 'var(--primary-button-background)'}`,
                                                                    color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                                                }}>
                                                                    {node?.heading && <span>{node.heading}</span>}
                                                                    <FiChevronUp
                                                                        className={`${open ? 'rotate-180 transform' : ''
                                                                            } h-5 w-5`}
                                                                        style={{
                                                                            color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                                                        }}
                                                                    />
                                                                </Disclosure.Button>
                                                                <Disclosure.Panel className="px-4 pt-4 pb-2" style={{
                                                                    color: `${disclosureContentColor?.hex ?? '#000000'}`
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

                            </div>
                        </div>
                        : null
                    }
                </div>

            </Wrapper>
    )
}