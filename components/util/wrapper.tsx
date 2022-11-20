import Styles from "../../styles/util.module.css"

export default function Wrapper({ children, backgroundStyles,fullWidthContainer, removePadding }: any) {
    return (
        <div className={`${removePadding ? 'remove-section' : 'section'} ${Styles.section}`} style={backgroundStyles}>
            <div className={`${fullWidthContainer ? 'remove-container' : 'container'}`}>
                {children}
            </div>
        </div>
    )
}