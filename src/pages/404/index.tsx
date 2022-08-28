/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import styles from './styles.module.scss'

export default function Pokemon404() {
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)

    return (
        <>
            <Head>
                <title>Poke Web | Not found</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.notFoundContainer}>
                    <h1>Ops! No pokemons here.</h1>
                    <div className={styles.imageContainer}>
                        <div onClick={() => { setCurrentPokeball(!currentPokeball) }}>
                            <Image src={currentPokeball ? '/images/pokeball-open.png' : '/images/pokeball.png'} alt='pokeball' width={120} height={160} />
                        </div>
                    </div>
                    <p>We didn't find any pokemon's here, but will keep trying.</p>
                    <Link href='/home' passHref>
                        <p className={styles.link}>Go back to home</p>
                    </Link>
                </article>
            </main>
        </>
    )
}