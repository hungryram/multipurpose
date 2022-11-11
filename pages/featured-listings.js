import Head from "next/head"
import Layout from "../components/global/layout"
import Container from "../components/util/container"
import Section from "../components/util/section"


export default function FeaturedListings() {
    return (
        <>
        <Head>
            <script src="https://kestrel.idxhome.com/ihf-kestrel.js" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.ihfKestrel = window.ihfKestrel || { };
                    ihfKestrel.config = {
                        platform: "custom",
                    activationToken: "3779C949-155D-6043-0911FD9A208A875D",};`
                }}
            />
        </Head>
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