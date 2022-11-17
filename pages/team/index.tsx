import { queryTeam } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Link from "next/link"
import Layout from "../../components/global/layout"
import Image from "next/image"
import { urlForImage } from "../../lib/sanity"
import Header from "../../components/templates/header"

export async function getStaticProps({ preview = false }) {

    /* check if the project id has been defined by fetching the vercel envs */
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const teamQuery = await getClient(preview).fetch(queryTeam)

        return {
            props: { preview, teamQuery },
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


export default function TeamIndex({ teamQuery }) {

    return (
        <Layout>
            <Header 
                image={teamQuery.header.image}
                title={"Our Services"}
            />
            <div className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {teamQuery.team.map((node) => {
                            return (
                                <div className="my-2" key={node._id}>
                                    <Link href={`team/${node.slug}`}>
                                        <div>
                                            <Image 
                                                src={urlForImage(node.image).url()}
                                                width={600}
                                                height={0}
                                                alt={node.name}
                                                style={{
                                                    width: '100%',
                                                    height: '400px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                        <div className="bg-gray-100 p-4 text-center">
                                            <h3 className="font-bold text-lg">{node.name}</h3>
                                            <p>{node.position}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}