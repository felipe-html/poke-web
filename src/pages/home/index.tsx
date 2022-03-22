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
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    useEffect(() => {
        getPokemons()
    }, [])

    async function getPokemons() {
        await axios.get(`https://pokeapi.co/api/v2/pokemon`)
            .then(response => {
                setPokemons(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function handleShowMorePokemons() {
        setButtonLoading(true)

        await axios.get(pokemons?.next!)
            .then(response => {
                const data = response.data as PokePageProps

                const oldValue = [...pokemons?.results!]

                var newValue = oldValue.concat(data.results)

                setPokemons({
                    ...data,
                    next: data.next,
                    results: newValue
                })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() =>
                setButtonLoading(false)
            )
    }

    return (
        <>
            <Head>
                <title>Poke Web | Home</title>
            </Head>
            <Header />
            <main className={styles.container}>
                {
                    pokemons !== undefined ?
                        <>
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
                            {
                                pokemons.next !== null &&
                                <button className={styles.button} onClick={handleShowMorePokemons}>
                                    {
                                        buttonLoading ?
                                            <>
                                                <div className="loader" />
                                            </>
                                            :
                                            <p>
                                                Show more
                                            </p>
                                    }
                                </button>
                            }

                        </>
                        :
                        <div className={styles.loading}>
                            <p>Loading ...</p>
                        </div>
                }


            </main>
        </>
    )

}