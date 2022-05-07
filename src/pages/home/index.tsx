/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PokeCardProps, PokePageProps } from "../../modules";
import Header from "../../components/Header";
import PokeCard from "../../components/PokeCard";

import styles from './styles.module.scss';
import { api } from "../../services/api";


export default function Home({ count, next, previous, results }: PokePageProps) {

    const [pokemons, setPokemons] = useState<PokeCardProps[]>([])
    const [pokeDetails, setPokeDetails] = useState<PokePageProps>({} as PokePageProps)
    useEffect(() => {
        setPokemons(results)
        setPokeDetails({
            next,
            previous,
            count,
            results
        })
    }, [])

    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    async function handleShowMorePokemons() {
        setButtonLoading(true)

        if (pokeDetails.next) {
            await axios.get(pokeDetails.next)
                .then(response => {
                    const data = response.data as PokePageProps

                    const oldValue = [...pokemons]

                    var newValue = oldValue.concat(data.results)

                    setPokemons(newValue)

                    setPokeDetails({
                        ...data,
                        next: data.next,
                        results: data.results
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() =>
                    setButtonLoading(false)
                )
        }

    }

    return (
        <>
            <Head>
                <title>Poke Web | Home</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.heroText}>
                    <h1>PokeWeb is a website built with <a className={styles.nextLink} rel="noreferrer" href="https://nextjs.org" target={'_blank'}>NextJS</a>.</h1>
                    <p>Select one to see the details, or just spend your time here :)</p>
                </div>

                {pokemons !== undefined ? (
                    <>
                        <div className={styles.pokeCard}>
                            {
                                pokemons.map((pokemon, key) => (
                                    <PokeCard
                                        key={key}
                                        data={{ ...pokemon, id: key + 1 }}
                                    />
                                ))
                            }
                        </div>
                        {
                            pokeDetails &&
                            pokeDetails.next !== null &&
                            <button className={styles.button} onClick={() => {
                                handleShowMorePokemons()
                            }}>
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

                    </>) : (
                    <div className={styles.loading}>
                        <p>Loading ...</p>
                    </div>)
                }

            </main>
        </>
    )

}

export async function getStaticProps() {
    try {
        const pokemons = await api.get(``)
            .then(response => { return response.data })

        pokemons.results.forEach((pokemon: any, index: number) => {
            pokemon.id = index + 1
        })

        return {
            props: {
                count: pokemons.count,
                next: pokemons.next,
                previous: null,
                results: pokemons.results
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/400',
                permanent: false
            }
        }
    }

}