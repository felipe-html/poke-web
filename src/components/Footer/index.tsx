import Link from 'next/link'
import styles from './styles.module.scss'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.container}>
                <div className={styles.description}>
                    <h1>
                        <a target='blank' href='https://github.com/felipe-html/poke-web.git'>thePokeweb </a>
                        is an open source project
                    </h1>
                </div>
            </section>
        </footer>
    )
}