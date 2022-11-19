import Styles from "../../styles/util.module.css"

export default function Wrapper({ children, backgroundStyles }: any) {
    return (
        <div className={`section ${Styles.section}`} style={backgroundStyles}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}