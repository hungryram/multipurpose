import { urlForImage } from "../../lib/sanity"
import getYouTubeID from 'get-youtube-id'
import Youtube from "react-youtube"

const serializers = {
    types: {
        youtube: ({ value }) => {

            const opts = {
                height: `${value.height ?? '600'}`,
                width: `${value.width ?? '400'}`,
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            };

            const { url } = value
            const id = getYouTubeID(url)
            return (<Youtube videoId={id} opts={opts} />)
        },
        image: ({ value }) => {
            return (
                <div className="relative text-center">
                        <img src={value.asset !== undefined && urlForImage(value).url()} alt={value.altTag} width={value.imageWidth} className="mx-auto my-10" />
                </div>
            )
        },
    },
    marks: {
        link: ({ value, children }) => {
            return (
                <a href={value.href} target={value.newTab ? '_blank' : '_self'}>{children}</a>
            )
        },
    }
}

export default serializers