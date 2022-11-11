import ContentEditor from "../templates/contenteditor";

export default function Heading({ heading, body, bodyStyle, headerStyle, textAlign }: any) {
    return (
        <div className="md:flex justify-center py-6">
            <div className="md:w-3/5">
                <div className={textAlign ? textAlign : 'text-center'}>
                    <h2 className="h2 mb-6" style={headerStyle}>{heading}</h2>
                    <div style={bodyStyle}>
                        <ContentEditor
                            content={body}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}