import BodyText from "../util/body-text";
import Wrapper from "../util/wrapper";
import Form from "./form";
import Styles from "../../styles/templates.module.css"

export default function LeadForm({
    content,
    heading,
    formBackground,
    formTextColor,
    paddingSize,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor,
    backgroundStyles,
    emailAlerts,
    sendFrom,
    emailBcc,
    emailCc
}: any) {
    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
            innerPadding={paddingSize}
        >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <BodyText
                        heading={heading}
                        body={content}
                        bodyStyle={textStyle}
                        headerStyle={headerStyle}
                        fullWidth={true}
                        textAlign={true}
                        buttonText={buttonText}
                        buttonLink={buttonLink}
                        buttonBackground={buttonBackground}
                        buttonTextColor={buttonTextColor}
                    />
                </div>
                <div className="relative">
                    <div className={Styles.formContainer} style={formBackground}>
                        <div style={{
                            color: `${formTextColor}`
                        }}>
                            <Form
                                emailAlerts={emailAlerts}
                                sendFrom={sendFrom}
                                emailBcc={emailBcc}
                                emailCc={emailCc}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}