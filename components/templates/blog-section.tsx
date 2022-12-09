import BodyText from "../util/body-text";
import PostPreview from "./blog/post-preview";
import Wrapper from "../util/wrapper";

export default function BlogSection({
    blog,
    heading,
    content,
    bodyColor,
    backgroundStyles,
    textStyle,
    headerStyle,
    textLeft,
    buttonText,
    buttonLink,
    buttonStyle,
    secondButtonText,
    secondButtonLink,
    secondaryButtonStyle
}: any) {

    return (
        <Wrapper
            backgroundStyles={backgroundStyles}
        >
            <div className="mb-10" style={bodyColor}>
                <BodyText
                    heading={heading}
                    body={content}
                    bodyStyle={textStyle}
                    headerStyle={headerStyle}
                    fullWidth={textLeft}
                    textAlign={textLeft}
                    buttonText={buttonText}
                    buttonLink={buttonLink}
                    buttonStyle={buttonStyle}
                    secondButtonText={secondButtonText}
                    secondButtonLink={secondButtonLink}
                    secondaryButtonStyle={secondaryButtonStyle}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-4 h-full" style={textStyle}>
                {blog?.map((node) => {
                    return (
                        <PostPreview
                            key={node._id}
                            title={node.title}
                            coverImage={node.coverImage}
                            slug={node.slug.current}
                            date={node.date}
                            author={node.author}
                            excerpt={node.excerpt}
                            altText={node.coverImageData?.altText}
                            blurData={node.coverImageData?.lqip}
                        />
                    )
                })}
            </div>
        </Wrapper>
    )
}