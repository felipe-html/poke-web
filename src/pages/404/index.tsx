import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../components/Header'

import styles from './styles.module.scss'

export default function Pokemon() {
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)

    return (
        <>
            <Head>
                <title>Poke Web | Not found</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <article className={styles.notFoundContainer}>
                    <h1>Ops! No pokemons here.</h1>
                    <section className={styles.imageContainer}>
                        <div onClick={() => { setCurrentPokeball(!currentPokeball) }}>
                            <Image src={currentPokeball ? '/images/pokeball-open.png' : '/images/pokeball.png'} alt='pokeball' width={120} height={160} />
                        </div>
                    </section>
                    <p>Do not click on pokeball!</p>
                    <Link href='/home' passHref>
                        <p className={styles.link}>Go back to home</p>
                    </Link>
                </article>
            </main>
        </>
    )
}