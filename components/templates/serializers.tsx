import { urlForImage } from "../../lib/sanity"

const serializers = {
    types: {
        image: ({ value }) => {
            return (
                <div className="relative text-center">
                    <img src={urlForImage(value).url()} alt={value.altTag} width={value.imageWidth} className="mx-auto my-10"/>
                </div>
            )
        },
    },
    marks: {
        link: ({value, children}) => {
            return (
                <a href={value.href} target={value.newTab ? '_blank' : '_self'} rel="noreferrer">{children}</a>
            )
        }
    }
}

export default serializers