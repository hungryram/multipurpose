import Layout from "../components/global/layout";

export default function Idx() {
    console.log('testidx')
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