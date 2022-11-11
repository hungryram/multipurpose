import Container from "../util/container";
import Section from "../util/section";
import Form from "./form";

export default function ContactPage({ heading } : any) {
    return (
        <Section>
            <Container>
                <h2>{heading}</h2>
                <Form />
            </Container>
        </Section>
    )
}