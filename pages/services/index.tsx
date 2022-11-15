import { queryServices } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Link from "next/link"
import Layout from "../../components/global/layout"

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const serviceQuery = await getClient(preview).fetch(queryServices)

        return {
            props: { preview, serviceQuery },
            // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
            revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
        }
    }

    /* when the client isn't set up */
    return {
        props: {},
        revalidate: undefined,
    }
}


export default function ServiceIndex({ serviceQuery }) {

    console.log(serviceQuery)
    return (
        <Layout>
            <div className="section">
                <div className="container">
                    <div className="bg-slate-200 flex justify-center">
                        <div className="p-10">
                            <ul>
                                {serviceQuery.map((node) => {
                                    return (
                                        <>
                                            <li className="bg-white my-2" key={node._id}>
                                                <Link href={`services/${node.slug}`} className="flex items-center px-20 py-4 hover:bg-orange-600 hover:text-white transition-all ease-linear font-bold"> {node.title}</Link>
                                            </li>
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}