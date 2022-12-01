import { queryTeam } from "../../lib/queries"
import { getClient } from "../../lib/sanity.server"
import Layout from "../../components/global/layout"
import Header from "../../components/templates/header"
import Seo from "../../components/global/seo"
import TeamCard from "../../components/templates/team-card"

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
            <Seo
                title={teamQuery?.services?.seo?.title_tag ?? 'Team | ' + teamQuery?.profileSettings?.company_name}
                description={teamQuery?.services?.seo?.meta_description}
                image={teamQuery?.pageSettings?.team?.headerImageData?.asset?.url ?? teamQuery?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.url}
                company_name={teamQuery?.profileSettings?.company_name}
                twitterHandle={teamQuery?.profileSettings?.seo?.twitterHandle}
                favicon={teamQuery?.appearances?.favicon}
                themeColor={teamQuery?.appearances?.themeColor}
                altText={teamQuery?.pageSettings?.team?.headerImageData?.asset?.altText ?? teamQuery?.profileSettings?.defaultImageData?.defaultImageBanner?.asset?.altText}
            />
            <Header
                title={teamQuery?.pageSettings?.team?.title || 'Team'}
                image={teamQuery?.pageSettings?.team?.headerImageData?.asset?.url ?? teamQuery?.appearances?.defaultHeaderBanner?.asset?.url}
                blurData={teamQuery?.pageSettings?.team?.headerImageData?.asset?.lqip ?? teamQuery?.appearances?.defaultHeaderBanner?.asset?.lqip}
                altText={teamQuery?.pageSettings?.team?.headerImageData?.asset?.altText ?? teamQuery?.appearances?.defaultHeaderBanner?.asset?.altText}
            />
            <div className="section">
                <div className="container">
                    {teamQuery?.team > 0 ?
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                            {teamQuery.team.map((node) => {
                                return (
                                    <TeamCard
                                        name={node.name}
                                        position={node?.position}
                                        image={node?.imageData?.asset?.url}
                                        blurData={node?.imageData?.asset?.lqip}
                                        altText={node?.imageData?.asset?.altText}
                                        slug={node?.slug}
                                    />
                                )
                            })}
                        </div>
                        :
                        <h2 className="h2 text-center">No teams added. Check back later</h2>
                    }
                </div>
            </div>
        </Layout>
    )
}