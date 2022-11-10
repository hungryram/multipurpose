import Layout from "../components/global/layout";

export default function Idx() {
    return (
        <>
            <Layout>
                <div
                    dangerouslySetInnerHTML={{
                        __html: `{idx_body}`
                    }}
                />
            </Layout>
        </>
    )
}