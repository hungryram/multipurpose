import BodyText from "../util/body-text";
import Wrapper from "../util/wrapper";
import Form from "./form";
import Styles from "../../styles/templates.module.css"

export default function LeadForm({
    content,
    heading,
    paddingSize,
    textStyle,
    headerStyle,
    buttonText,
    buttonLink,
    buttonBackground,
    buttonTextColor,
    backgroundStyles
}: any) {
    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
            innerPadding={paddingSize}
        >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    {content &&
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
                    }
                </div>
                <div className="relative">
                    <div className={Styles.formContainer}>
                        <Form />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}