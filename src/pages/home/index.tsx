/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PokePageProps } from "../../modules";
import Header from "../../components/Header";
import PokeCard from "../../components/PokeCard";
import Link from 'next/link';

import styles from './styles.module.scss';
import Image from "next/image";

export default function Home() {
    const [pokemons, setPokemons] = useState<PokePageProps>()
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon`)
            .then(response => {
                setPokemons(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    if (pokemons !== undefined) {
        return (
            <>
                <Head>
                    <title>Poke Web | Home</title>
                </Head>
                <Header />
                <main className={styles.container}>
                    <div className={styles.pokeCard}>
                        {
                            pokemons.results.map((pokemon, key) => (
                                <PokeCard
                                    key={key}
                                    data={pokemon}
                                />
                            ))
                        }
                    </div>
                    {/* <button>
                        Show more
                    </button> */}
                </main>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>Poke Web | Home</title>
                </Head>
                <Header />
                <main className={styles.notFound}>
                    <article className={styles.notFoundContainer}>
                        <h1>Ops! No pokemons here.</h1>
                        <section className={styles.imageContainer}>
                            <div onClick={() => { setCurrentPokeball(!currentPokeball) }}>
                                <Image src={currentPokeball ? '/images/pokeball-open.png' : '/images/pokeball.png'} alt='pokeball' width={120} height={160} />
                            </div>
                        </section>
                    </article>
                </main>
            </>
        )
    }
}