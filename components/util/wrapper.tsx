import Styles from "../../styles/util.module.css"

export default function Wrapper({ children, backgroundStyles, fullWidthContainer, removePadding, innerPadding }: any) {
    return (
        <div className={`${removePadding ? 'remove-section' : 'section'} ${Styles.section}`} style={backgroundStyles}>
            <div className={innerPadding}>
                <div className={`${fullWidthContainer ? 'remove-container' : 'container'}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}