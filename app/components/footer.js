import styles from "../styles/Footer.module.css"
import Image from "next/image"
function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <a>
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/logo.svg" alt="Rocket.Chat Logo" width={98} height={32} />
                    </span>
                </a>
            </footer>

        </>

    )


}

export default Footer