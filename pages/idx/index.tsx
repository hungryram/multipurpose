export default function IDX() {
    return (
        <div className="testIDX">
            <div dangerouslySetInnerHTML={{
                __html: `<script>
            document.currentScript.replaceWith(ihfKestrel.render());
        </script>`
            }} />
        </div>
    )
}