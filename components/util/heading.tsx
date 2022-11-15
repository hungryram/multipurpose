import ContentEditor from "../templates/contenteditor";

export default function Heading({ heading, body, bodyStyle, fullWidth, headerStyle, textAlign }: any) {
    return (
        <div className="md:flex justify-center py-6">
            <div className={fullWidth ? 'w-full' : 'md:w-3/5'}>
                <div className={textAlign ? 'text-left' : 'text-center'}>
                    <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>
                    <div className="content" style={bodyStyle}>
                        <ContentEditor
                            content={body}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}