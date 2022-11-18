import Styles from "../../styles/navbar.module.css"

export default function HamburgerMenu({ isOpen }: any) {
    return (
        <>
            <style jsx>{`
                .line-one {
                    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};

                }

                .line-two {
                    transform: ${isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${isOpen ? 0 : 1};
                    display: ${isOpen ? 'none' : ''};
                }

                .line-three {
                    transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                    margin-top: ${isOpen ? '-6px' : ''};
                }
            `}</style>
            <div className={Styles.navigationBurger}>
                <div className="line-one" />
                <div className="line-two" />
                <div className="line-three" />
            </div>
        </>
    )
}