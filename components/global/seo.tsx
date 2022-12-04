import Head from "next/head";
import { urlForImage } from "../../lib/sanity";

export default function Seo({
    title,
    description,
    image,
    company_name,
    twitterHandle,
    favicon,
    themeColor,
    altText,
    ogType = "website",
    robotIndex = "index,follow",
    schemaMarkup
}: any) {

    const defaultTitle = company_name

    return (
        <Head>
            <title key="title">{title}</title>
            <meta name="description" content={description} />
            <meta key="og_type" property="og:type" content={ogType} />
            <meta key="og_title" property="og:title" content={title} />
            <meta key="og_description" property="og:description" content={description} />
            <meta key="og_locale" property="og:locale" content="en_US" />
            <meta key="og_site_name" property="og:site_name" content={company_name} />
            <meta name="robots" content={robotIndex} />
            <meta name="theme-color" content={themeColor} />

            {favicon &&
                <link rel="shortcut icon" href={urlForImage(favicon).url()} />
            }

            {image &&
                <meta
                    key="og_image"
                    property="og:image"
                    content={image}
                />
            }
            {altText &&
                <meta
                    key="og_image:alt"
                    property="og:image:alt"
                    content={altText}
                />
            }
            <meta key="og_image:width" property="og:image:width" content="1200" />
            <meta key="og_image:height" property="og:image:height" content="630" />
            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            {twitterHandle &&
                <meta
                    key="twitter:site"
                    name="twitter:site"
                    content={twitterHandle}
                />
            }
            {twitterHandle &&
                <meta
                    key="twitter:creator"
                    name="twitter:creator"
                    content={twitterHandle}
                />
            }
            <meta
                key="twitter:title"
                property="twitter:title"
                content={title || defaultTitle}
            />
            <meta
                key="twitter:description"
                property="twitter:description"
                content={description}
            />
            {schemaMarkup &&
                <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
            }
        </Head>
    );
}