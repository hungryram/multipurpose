export default function IDX() {
    return (
        <div className="testIDX">
            <script dangerouslySetInnerHTML={{
                __html: `document.currentScript.replaceWith(ihfKestrel.render());`
            }} />
            
        </div>
    )
}