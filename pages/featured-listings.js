import Head from "next/head"
import Layout from "../components/global/layout"
import Container from "../components/util/container"
import Section from "../components/util/section"


export default function FeaturedListings() {
    return (
        <>

        <Layout>
            <Section>
                <Container>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `document.currentScript.replaceWith(ihfKestrel.render());`
                        }}
                        />
                </Container>
            </Section>
        </Layout>
    </>
    )
}