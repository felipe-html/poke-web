import Head from "next/head";
import Link from 'next/link'

import styles from './styles.module.scss'

export default function About() {
    return (
        <>
            <Head>
                <title>Poke Web | About</title>
            </Head>
            <main className={`main ${styles.container}`}>
                <section className={styles.content}>
                    <h1>About</h1>
                    <article className={styles.article}>
                        <h2>What is Pokeweb?</h2>
                        <p>
                            It is a site that uses the <a href='https://pokeapi.co/' className='link' target='blank' >PokéApi</a>
                            to list all the pokémons and their respective details.
                        </p>
                    </article>

                    <article className={styles.article}>
                        <h2>How was it built?</h2>
                        <p>
                            The application was built using <a href='https://reactjs.org/' className='link' target='blank'>React.JS </a>
                            with <a href='https://www.typescriptlang.org/' className='link' target='blank'>Typescript</a>,
                            taking advantage of componentization concepts. The <a href='https://nextjs.org/' className='link' target='blank'>Next.JS </a>
                            framework was also used, thinking about the Server Rendering and Dynamic Routes features, to render the 1026 pokemon pages that we have available here.
                        </p>
                    </article>
                </section>
            </main>
        </>


    )
}